<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeePayment;
use App\Models\FeeStructure;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FeePaymentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $query = FeePayment::forSchool($schoolId)
                ->with(['student.user', 'feeStructure', 'installment', 'recordedBy']);

            if ($request->has('student_id')) {
                $query->where('student_id', $request->student_id);
            }

            if ($request->has('fee_structure_id')) {
                $query->where('fee_structure_id', $request->fee_structure_id);
            }

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            if ($request->has('payment_method')) {
                $query->where('payment_method', $request->payment_method);
            }

            if ($request->has('start_date')) {
                $query->where('paid_date', '>=', $request->start_date);
            }

            if ($request->has('end_date')) {
                $query->where('paid_date', '<=', $request->end_date);
            }

            $payments = $query->orderBy('paid_date', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $payments,
                'message' => 'Fee payments retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        try {
            $payment = FeePayment::forSchool($request->user()->school_id)
                ->with(['student.user', 'feeStructure', 'installment', 'recordedBy'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $payment,
                'message' => 'Fee payment retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'student_id' => 'required|exists:students,id',
                'fee_structure_id' => 'required|exists:fee_structures,id',
                'installment_id' => 'nullable|exists:fee_installments,id',
                'amount' => 'required|numeric|min:0',
                'payment_method' => 'required|string|max:50',
                'transaction_id' => 'nullable|string|max:255',
                'receipt_number' => 'nullable|string|max:100',
                'paid_date' => 'required|date',
                'status' => 'required|string|in:paid,pending,partial,failed',
                'remarks' => 'nullable|string|max:255',
            ]);

            $validated['school_id'] = $request->user()->school_id;
            $validated['recorded_by'] = $request->user()->id;

            $payment = FeePayment::create($validated);

            return response()->json([
                'success' => true,
                'data' => $payment->load(['student.user', 'feeStructure']),
                'message' => 'Fee payment recorded successfully.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $payment = FeePayment::forSchool($request->user()->school_id)->findOrFail($id);

            $validated = $request->validate([
                'amount' => 'sometimes|numeric|min:0',
                'payment_method' => 'sometimes|string|max:50',
                'transaction_id' => 'nullable|string|max:255',
                'status' => 'sometimes|string|in:paid,pending,partial,failed',
                'remarks' => 'nullable|string|max:255',
            ]);

            $payment->update($validated);

            return response()->json([
                'success' => true,
                'data' => $payment->fresh()->load(['student.user', 'feeStructure']),
                'message' => 'Fee payment updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            $payment = FeePayment::forSchool($request->user()->school_id)->findOrFail($id);
            $payment->delete();

            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Fee payment deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function receipt(Request $request, $id): JsonResponse
    {
        try {
            $payment = FeePayment::forSchool($request->user()->school_id)
                ->with(['student.user', 'feeStructure.class', 'recordedBy'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $payment,
                'message' => 'Receipt retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function myFees(Request $request): JsonResponse
    {
        $user = $request->user();
        $student = Student::where('user_id', $user->id)->firstOrFail();

        $structures = FeeStructure::where('school_id', $student->school_id)
            ->where('class_id', $student->class_id)
            ->where('is_active', true)
            ->with('installments')
            ->get();

        $payments = FeePayment::where('student_id', $student->id)
            ->with(['feeStructure', 'installment'])
            ->orderBy('paid_date', 'desc')
            ->get();

        $totalFees = $structures->sum('amount');
        $totalPaid = $payments->where('status', 'paid')->sum('amount');

        return response()->json([
            'success' => true,
            'data' => [
                'structures' => $structures,
                'payments' => $payments,
                'total_fees' => $totalFees,
                'total_paid' => $totalPaid,
                'balance' => $totalFees - $totalPaid,
            ],
            'message' => 'Fee details retrieved successfully.',
        ]);
    }

    public function outstandingReport(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;

            $students = Student::where('school_id', $schoolId)
                ->where('is_active', true)
                ->with(['user', 'class'])
                ->get();

            $report = $students->map(function ($student) {
                $totalFees = FeeStructure::where('school_id', $student->school_id)
                    ->where('class_id', $student->class_id)
                    ->where('is_active', true)
                    ->sum('amount');

                $totalPaid = FeePayment::where('student_id', $student->id)
                    ->where('status', 'paid')
                    ->sum('amount');

                return [
                    'student_id' => $student->id,
                    'student_name' => $student->user->name,
                    'admission_number' => $student->admission_number,
                    'class' => $student->class->name . ' ' . $student->class->section,
                    'total_fees' => $totalFees,
                    'total_paid' => $totalPaid,
                    'outstanding' => max(0, $totalFees - $totalPaid),
                ];
            })->filter(function ($item) {
                return $item['outstanding'] > 0;
            })->values();

            return response()->json([
                'success' => true,
                'data' => $report,
                'message' => 'Outstanding report generated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
