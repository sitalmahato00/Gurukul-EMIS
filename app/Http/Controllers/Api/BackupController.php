<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Backup;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\StreamedResponse;
use Illuminate\Support\Facades\File;

class BackupController extends Controller
{
    public function index(): JsonResponse
    {
        $backups = Backup::latest('created_at')->get();

        $totalSize = 0;
        foreach ($backups as $b) {
            $totalSize += $this->parseSize($b->size);
        }

        $completed = $backups->where('status', 'completed');
        $fullBackups = $completed->where('type', 'full');
        $incrBackups = $completed->where('type', 'incremental');

        $fullSize = 0;
        foreach ($fullBackups as $b) $fullSize += $this->parseSize($b->size);
        $incrSize = $totalSize - $fullSize;

        $logPath = storage_path('logs/laravel.log');
        $logsSize = file_exists($logPath) ? round(filesize($logPath) / (1024 * 1024), 1) : 0;

        $dbPath = database_path('database.sqlite');
        $dbSize = file_exists($dbPath) ? round(filesize($dbPath) / (1024 * 1024), 1) : 0;

        $totalAllSize = $totalSize + $logsSize;

        $summary = [
            'total' => $backups->count(),
            'completed' => $completed->count(),
            'failed' => $backups->where('status', 'failed')->count(),
            'total_size_mb' => round($totalAllSize, 1),
            'full_size_mb' => round($fullSize, 1),
            'incr_size_mb' => round($incrSize, 1),
            'logs_size_mb' => $logsSize,
            'db_size_mb' => $dbSize,
            'success_rate' => $backups->count() > 0 ? round(($completed->count() / $backups->count()) * 100) : 0,
        ];

        return response()->json([
            'success' => true,
            'data' => $backups,
            'summary' => $summary,
            'message' => 'Backups retrieved successfully.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:full,incremental',
        ]);

        $type = $validated['type'];
        $startTime = microtime(true);

        $dbPath = database_path('database.sqlite');
        $backupDir = storage_path('app/backups');
        File::ensureDirectoryExists($backupDir);

        $filename = now()->format('Y-m-d_His') . '_' . $type . '.sqlite';
        $filePath = 'backups/' . $filename;
        $fullPath = storage_path('app/' . $filePath);

        try {
            if (file_exists($dbPath)) {
                copy($dbPath, $fullPath);

                $size = file_exists($fullPath) ? filesize($fullPath) : 0;
            } else {
                $size = 0;
            }

            $duration = round(microtime(true) - $startTime, 1);
            $durationStr = $duration < 60 ? "{$duration}s" : floor($duration / 60) . 'm ' . round($duration % 60) . 's';

            $sizeStr = $size > 1024 * 1024
                ? round($size / (1024 * 1024), 1) . ' MB'
                : round($size / 1024, 1) . ' KB';

            $backup = Backup::create([
                'type' => $type,
                'size' => $sizeStr,
                'status' => 'completed',
                'duration' => $durationStr,
                'file_path' => $filePath,
                'created_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'data' => $backup,
                'message' => 'Backup completed successfully.',
            ], 201);
        } catch (\Exception $e) {
            $backup = Backup::create([
                'type' => $type,
                'size' => '0 B',
                'status' => 'failed',
                'duration' => '0s',
                'file_path' => null,
                'created_at' => now(),
            ]);

            return response()->json([
                'success' => false,
                'data' => $backup,
                'message' => 'Backup failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function show(Backup $backup): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $backup,
        ]);
    }

    public function download(Backup $backup): StreamedResponse|JsonResponse
    {
        if (!$backup->file_path) {
            return response()->json(['success' => false, 'message' => 'No file associated with this backup.'], 404);
        }

        $fullPath = storage_path('app/' . $backup->file_path);

        if (!file_exists($fullPath)) {
            return response()->json(['success' => false, 'message' => 'Backup file not found on disk.'], 404);
        }

        $filename = basename($backup->file_path);

        return response()->streamDownload(function () use ($fullPath) {
            readfile($fullPath);
        }, $filename, [
            'Content-Type' => 'application/octet-stream',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    public function destroy(Backup $backup): JsonResponse
    {
        if ($backup->file_path && file_exists(storage_path('app/' . $backup->file_path))) {
            unlink(storage_path('app/' . $backup->file_path));
        }

        $backup->delete();

        return response()->json([
            'success' => true,
            'message' => 'Backup deleted successfully.',
        ]);
    }

    public function autoBackupSettings(Request $request): JsonResponse
    {
        if ($request->isMethod('GET')) {
            $settings = [
                'auto_backup_enabled' => config('app.auto_backup_enabled', true),
                'backup_frequency' => config('app.backup_frequency', 'daily'),
                'backup_time' => config('app.backup_time', '06:00'),
                'backup_retention_days' => config('app.backup_retention_days', 30),
            ];

            return response()->json(['success' => true, 'data' => $settings]);
        }

        $validated = $request->validate([
            'auto_backup_enabled' => 'required|boolean',
            'backup_frequency' => 'required|in:daily,weekly',
            'backup_time' => 'required|string',
            'backup_retention_days' => 'required|integer|min:1|max:365',
        ]);

        foreach ($validated as $key => $value) {
            config([$key => $value]);
        }

        return response()->json([
            'success' => true,
            'data' => $validated,
            'message' => 'Auto-backup settings saved successfully.',
        ]);
    }

    public function downloadLatest(): StreamedResponse|JsonResponse
    {
        $latest = Backup::where('status', 'completed')
            ->latest('created_at')
            ->first();

        if (!$latest) {
            return response()->json(['success' => false, 'message' => 'No completed backups available.'], 404);
        }

        return $this->download($latest);
    }

    private function parseSize(string $sizeStr): float
    {
        $sizeStr = trim($sizeStr);
        preg_match('/([\d.]+)\s*(KB|MB|GB|B)/i', $sizeStr, $matches);
        if (empty($matches)) return 0;

        $value = floatval($matches[1]);
        $unit = strtoupper($matches[2] ?? 'B');

        return match ($unit) {
            'GB' => $value * 1024,
            'MB' => $value,
            'KB' => $value / 1024,
            default => $value / (1024 * 1024),
        };
    }
}
