<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $userId = $request->user()->id;

            $query = Message::forSchool($schoolId)
                ->with(['sender', 'receiver'])
                ->where(function ($q) use ($userId) {
                    $q->where('sender_id', $userId)
                      ->orWhere('receiver_id', $userId);
                })
                ->whereNull('parent_id');

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('subject', 'like', "%{$search}%")
                      ->orWhere('body', 'like', "%{$search}%");
                });
            }

            if ($request->has('type')) {
                $query->where('type', $request->type);
            }

            if ($request->has('is_read')) {
                $query->where('is_read', $request->boolean('is_read'));
            }

            $messages = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $messages,
                'message' => 'Messages retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $message = Message::forSchool($request->user()->school_id)
                ->with(['sender', 'receiver', 'replies.sender', 'replies.receiver'])
                ->findOrFail($id);

            if ($message->receiver_id == $request->user()->id && !$message->is_read) {
                $message->update(['is_read' => true]);
            }

            return response()->json([
                'success' => true,
                'data' => $message,
                'message' => 'Message retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'receiver_id' => 'required|exists:users,id',
                'subject' => 'nullable|string|max:255',
                'body' => 'required|string',
                'type' => 'nullable|string|max:50',
                'parent_id' => 'nullable|exists:messages,id',
            ]);

            $validated['school_id'] = $request->user()->school_id;
            $validated['sender_id'] = $request->user()->id;

            $message = Message::create($validated);

            return response()->json([
                'success' => true,
                'data' => $message->load(['sender', 'receiver']),
                'message' => 'Message sent successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function markRead(Request $request, $id): JsonResponse
    {
        try {
            $message = Message::forSchool($request->user()->school_id)
                ->where('receiver_id', $request->user()->id)
                ->findOrFail($id);

            $message->update(['is_read' => true]);

            return response()->json([
                'success' => true,
                'data' => $message->fresh(),
                'message' => 'Message marked as read.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
