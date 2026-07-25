<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PlatformSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PlatformSettingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = PlatformSetting::query();

            if ($request->has('group') && $request->group !== '') {
                $query->where('group', $request->group);
            }

            if ($request->has('key')) {
                $query->where('key', $request->key);
            }

            $settings = $query->orderBy('group')->orderBy('key')->get();

            $grouped = $settings->groupBy('group')->map(function ($items) {
                return $items->mapWithKeys(function ($item) {
                    return [$item->key => [
                        'id' => $item->id,
                        'value' => $item->value,
                        'type' => $item->type,
                        'is_active' => $item->is_active,
                        'group' => $item->group,
                        'created_at' => $item->created_at,
                        'updated_at' => $item->updated_at,
                    ]];
                });
            });

            return response()->json([
                'success' => true,
                'data' => $grouped,
                'flat' => $settings->pluck('value', 'key'),
                'message' => 'Platform settings retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(string $key): JsonResponse
    {
        try {
            $setting = PlatformSetting::where('key', $key)->first();

            if (!$setting) {
                return response()->json(['success' => false, 'message' => 'Setting not found.'], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $setting,
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'settings' => 'required|array',
                'settings.*.key' => 'required|string|max:255',
                'settings.*.value' => 'nullable|string',
                'settings.*.group' => 'nullable|string|max:100',
                'settings.*.type' => 'nullable|string|max:50',
                'settings.*.is_active' => 'nullable|boolean',
            ]);

            $created = [];

            foreach ($validated['settings'] as $item) {
                $setting = PlatformSetting::updateOrCreate(
                    ['key' => $item['key']],
                    [
                        'value' => $item['value'] ?? null,
                        'group' => $item['group'] ?? 'general',
                        'type' => $item['type'] ?? 'text',
                        'is_active' => $item['is_active'] ?? true,
                    ]
                );
                $created[] = $setting;
            }

            Cache::forget('platform_settings');

            return response()->json([
                'success' => true,
                'data' => $created,
                'message' => count($created) . ' setting(s) saved successfully.',
            ], 201);
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
                'settings.*.type' => 'nullable|string|max:50',
                'settings.*.is_active' => 'nullable|boolean',
            ]);

            $updated = [];

            foreach ($validated['settings'] as $item) {
                $setting = PlatformSetting::updateOrCreate(
                    ['key' => $item['key']],
                    [
                        'value' => $item['value'] ?? null,
                        'group' => $item['group'] ?? 'general',
                        'type' => $item['type'] ?? 'text',
                        'is_active' => $item['is_active'] ?? true,
                    ]
                );
                $updated[] = $setting;
            }

            Cache::forget('platform_settings');

            $settings = PlatformSetting::orderBy('group')->orderBy('key')->get();
            $grouped = $settings->groupBy('group')->map(function ($items) {
                return $items->pluck('value', 'key');
            });

            return response()->json([
                'success' => true,
                'data' => $grouped,
                'flat' => $settings->pluck('value', 'key'),
                'message' => 'Platform settings updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $setting = PlatformSetting::find($id);

            if (!$setting) {
                return response()->json(['success' => false, 'message' => 'Setting not found.'], 404);
            }

            $setting->delete();
            Cache::forget('platform_settings');

            return response()->json([
                'success' => true,
                'message' => 'Setting deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroyByKey(string $key): JsonResponse
    {
        try {
            $setting = PlatformSetting::where('key', $key)->first();

            if (!$setting) {
                return response()->json(['success' => false, 'message' => 'Setting not found.'], 404);
            }

            $setting->delete();
            Cache::forget('platform_settings');

            return response()->json([
                'success' => true,
                'message' => 'Setting deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
