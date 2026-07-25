<?php

namespace Database\Seeders;

use App\Models\{Vehicle, Driver, Route, RouteStop, TransportAllocation, Student, User};
use Illuminate\Database\Seeder;

class TransportSeeder extends Seeder
{
    public function run(): void
    {
        $schoolId = 1;
        $students = Student::where('school_id', $schoolId)->get();
        $transportManagerId = User::where('school_id', $schoolId)->where('role', 'transport_manager')->first()?->id;

        // Vehicles
        $vehicles = [];
        $vehicleData = [
            ['name' => 'School Bus 1', 'registration_number' => 'RJ14PA1234', 'type' => 'bus', 'capacity' => 40, 'fuel_type' => 'Diesel'],
            ['name' => 'School Bus 2', 'registration_number' => 'RJ14PA5678', 'type' => 'bus', 'capacity' => 40, 'fuel_type' => 'Diesel'],
            ['name' => 'School Van 1', 'registration_number' => 'RJ14PB9012', 'type' => 'van', 'capacity' => 12, 'fuel_type' => 'Petrol'],
            ['name' => 'School Auto 1', 'registration_number' => 'RJ14PC3456', 'type' => 'auto', 'capacity' => 6, 'fuel_type' => 'CNG'],
        ];

        foreach ($vehicleData as $data) {
            $data['school_id'] = $schoolId;
            $vehicles[] = Vehicle::create($data);
        }

        // Drivers
        $drivers = [];
        $driverData = [
            ['name' => 'Mahaveer Singh', 'license' => 'DL-2024-12345', 'expiry' => '2028-12-31', 'phone' => '+91-9500000001'],
            ['name' => 'Balwant Rajput', 'license' => 'DL-2024-67890', 'expiry' => '2027-06-30', 'phone' => '+91-9500000002'],
            ['name' => 'Sohan Lal', 'license' => 'DL-2024-11111', 'expiry' => '2029-03-15', 'phone' => '+91-9500000003'],
        ];

        foreach ($driverData as $i => $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => strtolower(explode(' ', $data['name'])[0]) . '@driver.gurukul.com',
                'password' => bcrypt('password'),
                'role' => 'transport_manager',
                'school_id' => $schoolId,
                'phone' => $data['phone'],
                'is_active' => true,
                'email_verified_at' => now(),
            ]);

            $drivers[] = Driver::create([
                'user_id' => $user->id,
                'school_id' => $schoolId,
                'license_number' => $data['license'],
                'license_expiry' => $data['expiry'],
                'vehicle_id' => $vehicles[$i]->id,
                'phone' => $data['phone'],
                'is_active' => true,
            ]);
        }

        // Routes
        $routes = [];
        $routeData = [
            ['name' => 'Route A - North Delhi', 'start_point' => 'Vivek Vihar', 'end_point' => 'Gurukul Academy', 'distance_km' => 12.5, 'fare' => 1500],
            ['name' => 'Route B - South Delhi', 'start_point' => 'Lajpat Nagar', 'end_point' => 'Gurukul Academy', 'distance_km' => 15.0, 'fare' => 1800],
            ['name' => 'Route C - East Delhi', 'start_point' => 'Mayur Vihar', 'end_point' => 'Gurukul Academy', 'distance_km' => 18.0, 'fare' => 2000],
        ];

        foreach ($routeData as $data) {
            $data['school_id'] = $schoolId;
            $routes[] = Route::create($data);
        }

        // Route Stops
        $stopData = [
            0 => [
                ['name' => 'Vivek Vihar', 'latitude' => 28.6500, 'longitude' => 77.3100, 'order' => 1, 'arrival_time' => '07:00'],
                ['name' => 'Shahdara', 'latitude' => 28.6730, 'longitude' => 77.2870, 'order' => 2, 'arrival_time' => '07:15'],
                ['name' => 'Welcome', 'latitude' => 28.6530, 'longitude' => 77.2710, 'order' => 3, 'arrival_time' => '07:25'],
                ['name' => 'Gurukul Academy', 'latitude' => 28.6139, 'longitude' => 77.2090, 'order' => 4, 'arrival_time' => '07:45'],
            ],
            1 => [
                ['name' => 'Lajpat Nagar', 'latitude' => 28.5700, 'longitude' => 77.2400, 'order' => 1, 'arrival_time' => '07:05'],
                ['name' => 'South Extension', 'latitude' => 28.5680, 'longitude' => 77.2270, 'order' => 2, 'arrival_time' => '07:15'],
                ['name' => 'AIIMS', 'latitude' => 28.5672, 'longitude' => 77.2100, 'order' => 3, 'arrival_time' => '07:30'],
                ['name' => 'Gurukul Academy', 'latitude' => 28.6139, 'longitude' => 77.2090, 'order' => 4, 'arrival_time' => '07:45'],
            ],
            2 => [
                ['name' => 'Mayur Vihar Phase 1', 'latitude' => 28.6050, 'longitude' => 77.2950, 'order' => 1, 'arrival_time' => '06:50'],
                ['name' => 'Akshardham', 'latitude' => 28.6127, 'longitude' => 77.2773, 'order' => 2, 'arrival_time' => '07:10'],
                ['name' => 'ITO', 'latitude' => 28.6280, 'longitude' => 77.2430, 'order' => 3, 'arrival_time' => '07:30'],
                ['name' => 'Gurukul Academy', 'latitude' => 28.6139, 'longitude' => 77.2090, 'order' => 4, 'arrival_time' => '07:45'],
            ],
        ];

        foreach ($stopData as $routeIdx => $stops) {
            foreach ($stops as $stopDataItem) {
                $stopDataItem['route_id'] = $routes[$routeIdx]->id;
                RouteStop::create($stopDataItem);
            }
        }

        // Transport Allocations (assign 10 students to transport)
        $routeStops = RouteStop::all();
        foreach ($students->take(10) as $i => $student) {
            $route = $routes[$i % count($routes)];
            $stops = $routeStops->where('route_id', $route->id);
            $stop = $stops->first();

            TransportAllocation::create([
                'student_id' => $student->id,
                'vehicle_id' => $vehicles[$i % count($vehicles)]->id,
                'route_id' => $route->id,
                'stop_id' => $stop->id,
                'academic_year' => '2025-26',
                'monthly_fee' => $route->fare,
                'is_active' => true,
            ]);
        }
    }
}
