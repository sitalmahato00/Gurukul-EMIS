<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $userId = $request->user()->id;

            $query = Notification::forSchool($schoolId)
                ->where('user_id', $userId);

            if ($request->has('type')) {
                $query->where('type', $request->type);
            }

            if ($request->has('is_read')) {
                if ($request->boolean('is_read')) {
                    $query->whereNotNull('read_at');
                } else {
                    $query->whereNull('read_at');
                }
            }

            $notifications = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            $unreadCount = Notification::forSchool($schoolId)
                ->where('user_id', $userId)
                ->whereNull('read_at')
                ->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'notifications' => $notifications,
                    'unread_count' => $unreadCount,
                ],
                'message' => 'Notifications retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function markRead(Request $request, $id): JsonResponse
    {
        try {
            $notification = Notification::forSchool($request->user()->school_id)
                ->where('user_id', $request->user()->id)
                ->findOrFail($id);

            $notification->update(['read_at' => now()]);

            return response()->json([
                'success' => true,
                'data' => $notification->fresh(),
                'message' => 'Notification marked as read.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function markAllRead(Request $request): JsonResponse
    {
        try {
            Notification::forSchool($request->user()->school_id)
                ->where('user_id', $request->user()->id)
                ->whereNull('read_at')
                ->update(['read_at' => now()]);

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'All notifications marked as read.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
