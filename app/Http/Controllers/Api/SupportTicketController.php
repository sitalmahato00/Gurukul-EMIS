<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupportTicketController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = SupportTicket::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('priority')) {
            $query->where('priority', $request->priority);
        }

        $tickets = $query->latest()->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $tickets,
            'message' => 'Support tickets retrieved successfully.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'school_name' => 'required|string|max:255',
            'priority' => 'required|in:high,medium,low',
            'message' => 'nullable|string',
        ]);

        $ticket = SupportTicket::create([
            'subject' => $validated['subject'],
            'school_name' => $validated['school_name'],
            'priority' => $validated['priority'],
            'status' => 'open',
            'message_count' => 1,
            'last_message' => $validated['message'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'data' => $ticket,
            'message' => 'Support ticket created successfully.',
        ], 201);
    }

    public function show(SupportTicket $supportTicket): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $supportTicket,
            'message' => 'Support ticket retrieved successfully.',
        ]);
    }

    public function update(Request $request, SupportTicket $supportTicket): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:open,in-progress,resolved',
            'priority' => 'sometimes|in:high,medium,low',
            'assigned_to' => 'nullable|string|max:255',
            'last_message' => 'nullable|string',
        ]);

        if (isset($validated['last_message'])) {
            $validated['message_count'] = $supportTicket->message_count + 1;
        }

        $supportTicket->update($validated);

        return response()->json([
            'success' => true,
            'data' => $supportTicket->fresh(),
            'message' => 'Support ticket updated successfully.',
        ]);
    }
}
