<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeePayment;
use App\Models\School;
use App\Models\SubscriptionPlan;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class PlatformAnalyticsController extends Controller
{
    public function index(): JsonResponse
    {
        $monthlyRevenue = $this->getMonthlyRevenue();
        $planBreakdown = $this->getPlanBreakdown();
        $topSchools = $this->getTopSchools();
        $forecastData = $this->getForecastData($monthlyRevenue);
        $mrr = $this->calculateMRR();
        $arr = $mrr * 12;
        $churnRate = $this->calculateChurnRate();
        $ltv = $this->calculateLTV();

        return response()->json([
            'success' => true,
            'data' => [
                'monthly_revenue' => $monthlyRevenue,
                'plan_breakdown' => $planBreakdown,
                'top_schools' => $topSchools,
                'forecast_data' => $forecastData,
                'mrr' => $mrr,
                'arr' => $arr,
                'churn_rate' => $churnRate,
                'ltv' => $ltv,
            ],
            'message' => 'Platform analytics retrieved successfully.',
        ]);
    }

    private function getMonthlyRevenue(): array
    {
        return FeePayment::where('status', 'paid')
            ->select(
                DB::raw("strftime('%Y', paid_date) as year"),
                DB::raw("strftime('%m', paid_date) as month"),
                DB::raw('SUM(amount) as revenue'),
                DB::raw('COUNT(*) as transaction_count')
            )
            ->where('paid_date', '>=', now()->subMonths(12))
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get()
            ->toArray();
    }

    private function getPlanBreakdown(): array
    {
        return School::select('subscription_plan_id', DB::raw('count(*) as school_count'))
            ->groupBy('subscription_plan_id')
            ->get()
            ->toArray();
    }

    private function getTopSchools(): array
    {
        return School::withCount('students')
            ->orderByDesc('students_count')
            ->limit(10)
            ->get()
            ->toArray();
    }

    private function getForecastData(array $monthlyRevenue): array
    {
        if (count($monthlyRevenue) < 2) {
            return [];
        }

        $revenues = array_column($monthlyRevenue, 'revenue');
        $n = count($revenues);
        $sumX = $n * ($n + 1) / 2;
        $sumY = array_sum($revenues);
        $sumXY = 0;
        $sumX2 = 0;

        for ($i = 0; $i < $n; $i++) {
            $sumXY += ($i + 1) * $revenues[$i];
            $sumX2 += ($i + 1) * ($i + 1);
        }

        $denominator = ($n * $sumX2 - $sumX * $sumX);
        if ($denominator == 0) return [];

        $slope = ($n * $sumXY - $sumX * $sumY) / $denominator;
        $intercept = ($sumY - $slope * $sumX) / $n;

        $forecast = [];
        for ($i = 1; $i <= 6; $i++) {
            $forecast[] = [
                'month' => now()->addMonths($i)->format('Y-m'),
                'projected_revenue' => round($slope * ($n + $i) + $intercept, 2),
            ];
        }

        return $forecast;
    }

    private function calculateMRR(): float
    {
        return SubscriptionPlan::where('is_active', true)
            ->sum('price') ?: 0;
    }

    private function calculateChurnRate(): float
    {
        $totalSchools = School::count();
        if ($totalSchools == 0) {
            return 0;
        }

        $inactiveSchools = School::where('is_active', false)->count();
        return round(($inactiveSchools / $totalSchools) * 100, 2);
    }

    private function calculateLTV(): float
    {
        $avgRevenuePerSchool = FeePayment::where('status', 'paid')->avg('amount') ?: 0;
        $churnRate = $this->calculateChurnRate();
        if ($churnRate == 0) {
            return round($avgRevenuePerSchool * 12, 2);
        }

        return round($avgRevenuePerSchool / ($churnRate / 100), 2);
    }
}
