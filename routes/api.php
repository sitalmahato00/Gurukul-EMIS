<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\SchoolController;
use App\Http\Controllers\Api\ClassController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\ParentController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\ExamController;
use App\Http\Controllers\Api\MarkController;
use App\Http\Controllers\Api\FeeStructureController;
use App\Http\Controllers\Api\FeePaymentController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\HomeworkController;
use App\Http\Controllers\Api\LibraryBookController;
use App\Http\Controllers\Api\LibraryIssueController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\RouteController;
use App\Http\Controllers\Api\TransportAllocationController;
use App\Http\Controllers\Api\HostelRoomController;
use App\Http\Controllers\Api\HostelAllocationController;
use App\Http\Controllers\Api\HostelVisitorController;
use App\Http\Controllers\Api\HostelComplaintController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\ApiKeyController;
use App\Http\Controllers\Api\AuditLogController;
use App\Http\Controllers\Api\BackupController;
use App\Http\Controllers\Api\SupportTicketController;
use App\Http\Controllers\Api\SubscriptionPlanController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PlatformAnalyticsController;
use App\Http\Controllers\Api\SchoolUsageController;
use App\Http\Controllers\Api\SystemLogController;
use App\Http\Controllers\Api\PlatformSettingController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'index']);

    // Super Admin only
    Route::middleware('role:super_admin')->group(function () {
        Route::apiResource('schools', SchoolController::class);
        Route::apiResource('api-keys', ApiKeyController::class)->only(['index', 'store', 'show', 'destroy']);
        Route::get('/audit-logs', [AuditLogController::class, 'index']);
        Route::get('backups/download/latest', [BackupController::class, 'downloadLatest']);
        Route::get('backups/{backup}/download', [BackupController::class, 'download']);
        Route::match(['get', 'post'], 'auto-backup-settings', [BackupController::class, 'autoBackupSettings']);
        Route::apiResource('backups', BackupController::class)->only(['index', 'store', 'show', 'destroy']);
        Route::apiResource('support-tickets', SupportTicketController::class);
        Route::apiResource('subscription-plans', SubscriptionPlanController::class);
        Route::apiResource('admin/users', UserController::class)->only(['index', 'show', 'update', 'destroy']);
        Route::get('/analytics', [PlatformAnalyticsController::class, 'index']);
        Route::get('/school-usage', [SchoolUsageController::class, 'index']);
        Route::get('/system-logs', [SystemLogController::class, 'index']);

        // Platform Settings (full CRUD)
        Route::get('/platform-settings', [PlatformSettingController::class, 'index']);
        Route::get('/platform-settings/{key}', [PlatformSettingController::class, 'show']);
        Route::post('/platform-settings', [PlatformSettingController::class, 'update']);
        Route::delete('/platform-settings/by-key/{key}', [PlatformSettingController::class, 'destroyByKey']);
        Route::delete('/platform-settings/{id}', [PlatformSettingController::class, 'destroy']);
    });

    // School Admin and above
    Route::middleware('role:super_admin,school_admin,principal')->group(function () {
        Route::apiResource('classes', ClassController::class);
        Route::apiResource('subjects', SubjectController::class);
        Route::apiResource('students', StudentController::class);
        Route::apiResource('parents', ParentController::class);
        Route::apiResource('teachers', TeacherController::class);
        Route::apiResource('employees', EmployeeController::class);
        Route::apiResource('exams', ExamController::class);
        Route::post('/exams/{exam}/publish', [ExamController::class, 'publish']);
        Route::apiResource('marks', MarkController::class)->only(['index', 'store']);
        Route::apiResource('fee-structures', FeeStructureController::class);
        Route::apiResource('fee-payments', FeePaymentController::class);
        Route::get('/fee-report', [FeePaymentController::class, 'outstandingReport']);
        Route::get('/outstanding-dues', [FeePaymentController::class, 'outstandingReport']);
        Route::get('/fee-payments/{id}/receipt', [FeePaymentController::class, 'receipt']);
    });

    // Attendance (school_admin, principal, teacher)
    Route::middleware('role:school_admin,principal,teacher')->group(function () {
        Route::post('/attendance', [AttendanceController::class, 'store']);
        Route::get('/attendance', [AttendanceController::class, 'index']);
        Route::get('/attendance/report', [AttendanceController::class, 'report']);
    });

    // Teacher routes
    Route::middleware('role:teacher')->group(function () {
        Route::apiResource('homeworks', HomeworkController::class);
        Route::get('/homeworks/{homework}/submissions', [HomeworkController::class, 'submissions']);
        Route::post('/homeworks/{homework}/submissions/{submission}/grade', [HomeworkController::class, 'gradeSubmission']);
    });

    // Library
    Route::middleware('role:school_admin,principal,librarian')->group(function () {
        Route::apiResource('library/books', LibraryBookController::class);
        Route::post('/library/issue', [LibraryIssueController::class, 'issueBook']);
        Route::post('/library/return/{id}', [LibraryIssueController::class, 'returnBook']);
        Route::get('/library/issues', [LibraryIssueController::class, 'index']);
        Route::get('/library/overdue', [LibraryIssueController::class, 'overdueList']);
    });

    // Transport
    Route::middleware('role:school_admin,principal,transport_manager')->group(function () {
        Route::apiResource('vehicles', VehicleController::class);
        Route::apiResource('drivers', DriverController::class);
        Route::apiResource('routes', RouteController::class);
        Route::post('/routes/{route}/stops', [RouteController::class, 'addStop']);
        Route::put('/routes/{route}/stops/{stop}', [RouteController::class, 'updateStop']);
        Route::delete('/routes/{route}/stops/{stop}', [RouteController::class, 'removeStop']);
        Route::apiResource('transport-allocations', TransportAllocationController::class);
    });

    // Hostel
    Route::middleware('role:school_admin,principal,hostel_warden')->group(function () {
        Route::apiResource('hostel/rooms', HostelRoomController::class);
        Route::apiResource('hostel/allocations', HostelAllocationController::class);
        Route::apiResource('hostel/visitors', HostelVisitorController::class);
        Route::post('/hostel/visitors/{id}/checkout', [HostelVisitorController::class, 'checkout']);
        Route::apiResource('hostel/complaints', HostelComplaintController::class);
        Route::post('/hostel/complaints/{id}/resolve', [HostelComplaintController::class, 'resolve']);
    });

    // Messages (all authenticated users)
    Route::apiResource('messages', MessageController::class)->only(['index', 'store']);
    Route::get('/messages/{id}', [MessageController::class, 'show']);
    Route::post('/messages/{message}/read', [MessageController::class, 'markRead']);

    // Notifications (all authenticated users)
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'markRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllRead']);

    // Settings (school_admin)
    Route::middleware('role:school_admin,super_admin')->group(function () {
        Route::get('/settings', [SettingController::class, 'index']);
        Route::put('/settings', [SettingController::class, 'update']);
    });

    // Student-specific routes
    Route::middleware('role:student')->group(function () {
        Route::get('/my/attendance', [AttendanceController::class, 'myAttendance']);
        Route::get('/my/marks', [MarkController::class, 'studentResults']);
        Route::get('/my/homeworks', [HomeworkController::class, 'myHomeworks']);
        Route::get('/my/fees', [FeePaymentController::class, 'myFees']);
    });

    // Teacher-specific
    Route::middleware('role:teacher')->group(function () {
        Route::get('/my/classes', [ClassController::class, 'myClasses']);
        Route::get('/my/subjects', [SubjectController::class, 'mySubjects']);
        Route::get('/my/students', [StudentController::class, 'myStudents']);
    });

    // Parent-specific
    Route::middleware('role:parent')->group(function () {
        Route::get('/my/children', [ParentController::class, 'myChildren']);
        Route::get('/my/children/{student}/attendance', [AttendanceController::class, 'studentAttendance']);
        Route::get('/my/children/{student}/marks', [MarkController::class, 'studentResults']);
    });
});
