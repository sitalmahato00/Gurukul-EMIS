<?php

namespace Database\Seeders;

use App\Models\{FeeStructure, FeeInstallment, FeePayment, Student};
use Illuminate\Database\Seeder;

class FeeSeeder extends Seeder
{
    public function run(): void
    {
        $schoolId = 1;
        $students = Student::where('school_id', $schoolId)->get();
        $accountantId = \App\Models\User::where('school_id', $schoolId)->where('role', 'accountant')->first()?->id;

        $feeTypes = [
            ['name' => 'Tuition Fee', 'amount' => 5000, 'frequency' => 'monthly'],
            ['name' => 'Lab Fee', 'amount' => 2000, 'frequency' => 'quarterly'],
            ['name' => 'Library Fee', 'amount' => 500, 'frequency' => 'yearly'],
            ['name' => 'Sports Fee', 'amount' => 1500, 'frequency' => 'yearly'],
        ];

        for ($classId = 1; $classId <= 5; $classId++) {
            foreach ($feeTypes as $feeType) {
                $structure = FeeStructure::create([
                    'school_id' => $schoolId,
                    'class_id' => $classId,
                    'name' => $feeType['name'],
                    'amount' => $feeType['amount'] + (($classId - 1) * 500),
                    'frequency' => $feeType['frequency'],
                    'due_day' => 10,
                    'is_active' => true,
                ]);

                if ($feeType['frequency'] === 'monthly') {
                    $months = ['April', 'May', 'June', 'July'];
                    foreach ($months as $month) {
                        FeeInstallment::create([
                            'fee_structure_id' => $structure->id,
                            'name' => $month . ' - ' . $feeType['name'],
                            'amount' => $feeType['amount'] + (($classId - 1) * 500),
                            'due_date' => now()->subMonths(array_search($month, $months))->startOfMonth()->addDays(10),
                        ]);
                    }
                }
            }
        }

        // Create payment records
        $structures = FeeStructure::where('school_id', $schoolId)->where('frequency', 'monthly')->get();

        foreach ($students->take(15) as $student) {
            $structuresForClass = $structures->where('class_id', $student->class_id);

            foreach ($structuresForClass->take(2) as $structure) {
                $installments = $structure->installments->take(2);

                foreach ($installments as $installment) {
                    FeePayment::create([
                        'school_id' => $schoolId,
                        'student_id' => $student->id,
                        'fee_structure_id' => $structure->id,
                        'installment_id' => $installment->id,
                        'amount' => $installment->amount,
                        'payment_method' => ['cash', 'online', 'cheque'][array_rand(['cash', 'online', 'cheque'])],
                        'transaction_id' => 'TXN' . strtoupper(uniqid()),
                        'receipt_number' => 'RCP' . str_pad(rand(1, 9999), 5, '0', STR_PAD_LEFT),
                        'paid_date' => $installment->due_date->subDays(rand(0, 5)),
                        'status' => 'paid',
                        'recorded_by' => $accountantId,
                    ]);
                }
            }
        }

        // Create some pending payments
        foreach ($students->slice(15, 5) as $student) {
            $structuresForClass = $structures->where('class_id', $student->class_id)->take(1);

            foreach ($structuresForClass as $structure) {
                FeePayment::create([
                    'school_id' => $schoolId,
                    'student_id' => $student->id,
                    'fee_structure_id' => $structure->id,
                    'installment_id' => $structure->installments->first()?->id,
                    'amount' => $structure->amount,
                    'payment_method' => 'online',
                    'receipt_number' => 'RCP' . str_pad(rand(10000, 99999), 5, '0', STR_PAD_LEFT),
                    'paid_date' => now(),
                    'status' => 'pending',
                    'recorded_by' => $accountantId,
                ]);
            }
        }
    }
}
