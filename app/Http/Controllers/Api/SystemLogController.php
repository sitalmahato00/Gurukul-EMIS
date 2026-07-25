<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SystemLogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $logPath = storage_path('logs/laravel.log');

        if (!file_exists($logPath)) {
            return response()->json([
                'success' => true,
                'data' => [],
                'summary' => ['total' => 0, 'info' => 0, 'warning' => 0, 'error' => 0, 'critical' => 0],
                'message' => 'No log file found.',
            ]);
        }

        $lines = (int) $request->get('lines', 200);
        $levelFilter = $request->get('level');
        $search = $request->get('search');

        $content = file_get_contents($logPath);
        $allLines = explode("\n", $content);

        $entries = [];
        $currentEntry = [];

        foreach ($allLines as $line) {
            if (preg_match('/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]/', $line)) {
                if (!empty($currentEntry)) {
                    $parsed = $this->parseLogEntry(implode("\n", $currentEntry));
                    if ($parsed) $entries[] = $parsed;
                }
                $currentEntry = [$line];
            } elseif (!empty(trim($line))) {
                $currentEntry[] = $line;
            }
        }

        if (!empty($currentEntry)) {
            $parsed = $this->parseLogEntry(implode("\n", $currentEntry));
            if ($parsed) $entries[] = $parsed;
        }

        $entries = array_reverse($entries);

        $summary = [
            'total' => count($entries),
            'info' => count(array_filter($entries, fn($e) => $e['level'] === 'info')),
            'warning' => count(array_filter($entries, fn($e) => $e['level'] === 'warning')),
            'error' => count(array_filter($entries, fn($e) => $e['level'] === 'error')),
            'critical' => count(array_filter($entries, fn($e) => in_array($e['level'], ['critical', 'emergency', 'alert']))),
        ];

        if ($levelFilter && $levelFilter !== 'all') {
            if ($levelFilter === 'critical') {
                $entries = array_filter($entries, fn($e) => in_array($e['level'], ['critical', 'emergency', 'alert']));
            } else {
                $entries = array_filter($entries, fn($e) => $e['level'] === $levelFilter);
            }
            $entries = array_values($entries);
        }

        if ($search) {
            $searchLower = strtolower($search);
            $entries = array_filter($entries, function ($e) use ($searchLower) {
                return str_contains(strtolower($e['message']), $searchLower) ||
                       str_contains(strtolower($e['source']), $searchLower) ||
                       str_contains(strtolower($e['channel']), $searchLower);
            });
            $entries = array_values($entries);
        }

        $entries = array_slice($entries, 0, $lines);

        return response()->json([
            'success' => true,
            'data' => $entries,
            'summary' => $summary,
            'message' => 'System logs retrieved successfully.',
        ]);
    }

    private function parseLogEntry(string $entry): ?array
    {
        preg_match('/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]\s*(\w+)\.(\w+)(?:\s+EXCEPTION)?:(.*)/s', $entry, $matches);

        if (empty($matches[1])) return null;

        $channel = $matches[2] ?? 'app';
        $level = strtolower($matches[3] ?? 'unknown');
        $message = trim($matches[4] ?? '');

        $levelMap = [
            'info' => 'info',
            'warning' => 'warning',
            'error' => 'error',
            'critical' => 'critical',
            'debug' => 'info',
            'notice' => 'info',
            'emergency' => 'critical',
            'alert' => 'critical',
        ];

        $channelSourceMap = [
            'local' => 'Application',
            'auth' => 'Auth Service',
            'api' => 'API Gateway',
            'payment' => 'Payment Service',
            'database' => 'Database',
            'user' => 'User Service',
            'mail' => 'Email Service',
            'scheduler' => 'Scheduler',
            'school' => 'School Service',
            'notification' => 'Notification Service',
            'token' => 'Auth Service',
            'sanctum' => 'Auth Service',
        ];

        $firstLine = explode("\n", trim($message))[0];
        $shortMessage = mb_strlen($firstLine) > 200 ? mb_substr($firstLine, 0, 200) . '...' : $firstLine;

        return [
            'id' => md5($entry),
            'timestamp' => $matches[1] ?? null,
            'level' => $levelMap[$level] ?? 'info',
            'raw_level' => $level,
            'channel' => $channel,
            'source' => $channelSourceMap[strtolower($channel)] ?? $channel,
            'message' => $shortMessage,
            'full_message' => trim($message),
        ];
    }
}
