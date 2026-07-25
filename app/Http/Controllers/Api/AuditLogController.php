<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuditLogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = AuditLog::query();

        if ($request->has('action_type') && $request->action_type !== 'all') {
            $query->where('action_type', $request->action_type);
        }

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('user_name', 'like', "%{$search}%")
                  ->orWhere('action', 'like', "%{$search}%")
                  ->orWhere('resource', 'like', "%{$search}%")
                  ->orWhere('ip_address', 'like', "%{$search}%");
            });
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->where('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->where('created_at', '<=', $request->date_to . ' 23:59:59');
        }

        $auditLogs = $query->latest()->paginate($request->get('per_page', 15));

        $summary = [
            'total' => AuditLog::count(),
            'create' => AuditLog::where('action_type', 'create')->count(),
            'update' => AuditLog::where('action_type', 'update')->count(),
            'delete' => AuditLog::where('action_type', 'delete')->count(),
            'auth' => AuditLog::where('action_type', 'auth')->count(),
            'export' => AuditLog::where('action_type', 'export')->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $auditLogs,
            'summary' => $summary,
            'message' => 'Audit logs retrieved successfully.',
        ]);
    }

    public static function log(
        string $userName,
        string $action,
        string $resource,
        string $actionType,
        string $status = 'success',
        ?string $ipAddress = null
    ): void {
        AuditLog::create([
            'user_id' => auth()->id(),
            'user_name' => $userName,
            'action' => $action,
            'resource' => $resource,
            'ip_address' => $ipAddress ?? request()->ip(),
            'status' => $status,
            'action_type' => $actionType,
            'created_at' => now(),
        ]);
    }
}
