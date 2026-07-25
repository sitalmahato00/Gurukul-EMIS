<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LibraryIssue;
use App\Models\LibraryBook;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LibraryIssueController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = LibraryIssue::with(['book', 'student.user', 'teacher', 'issuedBy']);

            if ($request->has('book_id')) {
                $query->where('book_id', $request->book_id);
            }

            if ($request->has('student_id')) {
                $query->where('student_id', $request->student_id);
            }

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            $issues = $query->orderBy('issue_date', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $issues,
                'message' => 'Library issues retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $issue = LibraryIssue::with(['book', 'student.user', 'teacher', 'issuedBy'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $issue,
                'message' => 'Library issue retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function issueBook(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'book_id' => 'required|exists:library_books,id',
                'student_id' => 'required_without:teacher_id|nullable|exists:students,id',
                'teacher_id' => 'required_without:student_id|nullable|exists:users,id',
                'due_date' => 'required|date|after:today',
            ]);

            $book = LibraryBook::findOrFail($validated['book_id']);

            if ($book->available_copies <= 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'No copies available for this book.',
                ], 422);
            }

            $issue = LibraryIssue::create([
                'book_id' => $validated['book_id'],
                'student_id' => $validated['student_id'] ?? null,
                'teacher_id' => $validated['teacher_id'] ?? null,
                'issue_date' => now()->toDateString(),
                'due_date' => $validated['due_date'],
                'status' => 'issued',
                'issued_by' => $request->user()->id,
            ]);

            $book->decrement('available_copies');

            return response()->json([
                'success' => true,
                'data' => $issue->load(['book', 'student.user', 'teacher']),
                'message' => 'Book issued successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function returnBook(Request $request, $id): JsonResponse
    {
        try {
            $issue = LibraryIssue::where('status', 'issued')->findOrFail($id);

            $issue->update([
                'return_date' => now()->toDateString(),
                'status' => 'returned',
                'fine_amount' => $request->get('fine_amount', 0),
            ]);

            $issue->book->increment('available_copies');

            return response()->json([
                'success' => true,
                'data' => $issue->fresh()->load(['book', 'student.user', 'teacher']),
                'message' => 'Book returned successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function overdueList(Request $request): JsonResponse
    {
        try {
            $overdue = LibraryIssue::where('status', 'issued')
                ->where('due_date', '<', now()->toDateString())
                ->with(['book', 'student.user', 'teacher'])
                ->orderBy('due_date')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $overdue,
                'message' => 'Overdue list retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
