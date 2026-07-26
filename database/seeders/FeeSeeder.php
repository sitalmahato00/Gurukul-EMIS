<?php

namespace Database\Seeders;

use App\Models\{FeeStructure, FeeInstallment};
use Illuminate\Database\Seeder;

class FeeSeeder extends Seeder
{
    public function run(): void
    {
        $schoolId = 1;
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


    }
}
