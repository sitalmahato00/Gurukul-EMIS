<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LibraryBook;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LibraryBookController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $query = LibraryBook::forSchool($schoolId)->withCount('issues');

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('author', 'like', "%{$search}%")
                      ->orWhere('isbn', 'like', "%{$search}%")
                      ->orWhere('category', 'like', "%{$search}%");
                });
            }

            if ($request->has('category')) {
                $query->where('category', $request->category);
            }

            if ($request->has('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            }

            $books = $query->orderBy('title')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $books,
                'message' => 'Library books retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $book = LibraryBook::forSchool($request->user()->school_id)
                ->with(['issues' => function ($q) {
                    $q->with(['student.user', 'teacher'])->latest()->limit(10);
                }])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $book,
                'message' => 'Library book retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'author' => 'nullable|string|max:255',
                'isbn' => 'nullable|string|max:20',
                'category' => 'nullable|string|max:100',
                'publisher' => 'nullable|string|max:255',
                'edition' => 'nullable|string|max:50',
                'total_copies' => 'required|integer|min:1',
                'rack_number' => 'nullable|string|max:20',
                'description' => 'nullable|string',
                'is_active' => 'boolean',
            ]);

            $validated['school_id'] = $request->user()->school_id;
            $validated['available_copies'] = $validated['total_copies'];

            $book = LibraryBook::create($validated);

            return response()->json([
                'success' => true,
                'data' => $book,
                'message' => 'Library book created successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $book = LibraryBook::forSchool($request->user()->school_id)->findOrFail($id);

            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'author' => 'nullable|string|max:255',
                'isbn' => 'nullable|string|max:20',
                'category' => 'nullable|string|max:100',
                'publisher' => 'nullable|string|max:255',
                'edition' => 'nullable|string|max:50',
                'total_copies' => 'sometimes|integer|min:1',
                'rack_number' => 'nullable|string|max:20',
                'description' => 'nullable|string',
                'is_active' => 'boolean',
            ]);

            if (isset($validated['total_copies'])) {
                $diff = $validated['total_copies'] - $book->total_copies;
                $validated['available_copies'] = max(0, $book->available_copies + $diff);
            }

            $book->update($validated);

            return response()->json([
                'success' => true,
                'data' => $book->fresh(),
                'message' => 'Library book updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $book = LibraryBook::forSchool($request->user()->school_id)->findOrFail($id);
            $book->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Library book deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
