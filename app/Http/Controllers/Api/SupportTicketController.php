<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SupportTicketController extends Controller
{
    private function handleImages(Request $request, ?array $existing = null): ?array
    {
        $images = $request->input('images', []);
        if (!is_array($images) || empty($images)) {
            return $existing;
        }

        $paths = [];
        foreach ($images as $image) {
            if (is_string($image) && str_starts_with($image, 'data:image')) {
                $parts = explode(',', $image);
                if (count($parts) === 2) {
                    $decoded = base64_decode($parts[1]);
                    if ($decoded !== false) {
                        if (preg_match('/data:image\/(\w+);/', $image, $matches)) {
                            $ext = $matches[1] === 'jpeg' ? 'jpg' : $matches[1];
                        } else {
                            $ext = 'png';
                        }
                        $filename = 'support_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
                        $path = 'support-tickets/' . $filename;
                        Storage::disk('public')->put($path, $decoded);
                        $paths[] = $path;
                    }
                }
            } elseif (is_string($image) && !empty($image)) {
                $paths[] = $image;
            }
        }

        return empty($paths) ? null : $paths;
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $query = SupportTicket::query();

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            if ($request->has('priority')) {
                $query->where('priority', $request->priority);
            }

            if ($request->has('category')) {
                $query->where('category', $request->category);
            }

            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('subject', 'like', "%{$search}%")
                      ->orWhere('school_name', 'like', "%{$search}%")
                      ->orWhere('last_message', 'like', "%{$search}%");
                });
            }

            $tickets = $query->latest()->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $tickets,
                'message' => 'Support tickets retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'subject' => 'required|string|max:255',
                'school_name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'category' => 'nullable|string|max:100',
                'priority' => 'required|in:high,medium,low',
                'assigned_to' => 'nullable|integer|exists:users,id',
                'images' => 'nullable|array',
                'images.*' => 'string',
            ]);

            $images = $this->handleImages($request);

            $ticket = SupportTicket::create([
                'subject' => $validated['subject'],
                'school_name' => $validated['school_name'],
                'description' => $validated['description'] ?? null,
                'category' => $validated['category'] ?? null,
                'priority' => $validated['priority'],
                'status' => 'open',
                'assigned_to' => $validated['assigned_to'] ?? null,
                'message_count' => 1,
                'last_message' => $validated['description'] ?? null,
                'images' => $images,
            ]);

            return response()->json([
                'success' => true,
                'data' => $ticket->fresh(),
                'message' => 'Support ticket created successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $ticket = SupportTicket::findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $ticket,
                'message' => 'Support ticket retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 404);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $ticket = SupportTicket::findOrFail($id);

            $validated = $request->validate([
                'subject' => 'sometimes|string|max:255',
                'school_name' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'category' => 'nullable|string|max:100',
                'status' => 'sometimes|in:open,in_progress,resolved,closed',
                'priority' => 'sometimes|in:high,medium,low',
                'assigned_to' => 'nullable|integer|exists:users,id',
                'last_message' => 'nullable|string',
                'images' => 'nullable|array',
                'images.*' => 'string',
            ]);

            if (isset($validated['last_message'])) {
                $validated['message_count'] = $ticket->message_count + 1;
            }

            if ($request->has('images')) {
                $validated['images'] = $this->handleImages($request, null);
            }

            $ticket->update($validated);

            return response()->json([
                'success' => true,
                'data' => $ticket->fresh(),
                'message' => 'Support ticket updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $ticket = SupportTicket::findOrFail($id);

            if ($ticket->images) {
                foreach ($ticket->images as $imagePath) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $ticket->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Support ticket deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
