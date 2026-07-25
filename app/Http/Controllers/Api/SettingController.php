<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolId = $request->user()->school_id;
            $query = Setting::forSchool($schoolId);

            if ($request->has('group')) {
                $query->where('group', $request->group);
            }

            $settings = $query->orderBy('group')
                ->orderBy('key')
                ->get()
                ->groupBy('group');

            return response()->json([
                'success' => true,
                'data' => $settings,
                'message' => 'Settings retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'settings' => 'required|array',
                'settings.*.key' => 'required|string|max:255',
                'settings.*.value' => 'nullable|string',
                'settings.*.group' => 'nullable|string|max:100',
            ]);

            $schoolId = $request->user()->school_id;

            foreach ($validated['settings'] as $setting) {
                Setting::updateOrCreate(
                    [
                        'school_id' => $schoolId,
                        'key' => $setting['key'],
                    ],
                    [
                        'value' => $setting['value'] ?? null,
                        'group' => $setting['group'] ?? null,
                    ]
                );
            }

            $settings = Setting::forSchool($schoolId)
                ->orderBy('group')
                ->orderBy('key')
                ->get()
                ->groupBy('group');

            return response()->json([
                'success' => true,
                'data' => $settings,
                'message' => 'Settings updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
