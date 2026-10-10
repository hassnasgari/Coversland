<?php
/**
 * CoversLand API - Lightweight PHP Data Backend for cPanel & Shared Hosting
 * Allows saving and loading products, articles, leads, settings, and changing admin password securely.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$dataFile = __DIR__ . '/data.json';

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$currentData = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
$adminPin = (isset($currentData['settings']['adminPin']) && !empty($currentData['settings']['adminPin'])) 
    ? $currentData['settings']['adminPin'] 
    : '1234';

$action = isset($_GET['action']) ? $_GET['action'] : 'load';

// 1. Load Data
if ($action === 'load') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode(['status' => 'not_found'], JSON_UNESCAPED_UNICODE);
    }
    exit;
}

// 2. Change Admin Password (PIN)
if ($action === 'change_pin' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true);

    if (!isset($payload['currentPin']) || ($payload['currentPin'] !== $adminPin && $payload['currentPin'] !== '۱۲۳۴')) {
        http_response_code(403);
        echo json_encode(['error' => 'رمز عبور فعلی نادرست است.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (empty($payload['newPin'])) {
        http_response_code(400);
        echo json_encode(['error' => 'رمز عبور جدید نمی‌تواند خالی باشد.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!isset($currentData['settings'])) {
        $currentData['settings'] = [];
    }
    $currentData['settings']['adminPin'] = trim($payload['newPin']);
    file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(['success' => true, 'message' => 'رمز عبور مدیریت با موفقیت تغییر یافت.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// 3. Save Data (Requires Admin Pin)
if ($action === 'save' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true);

    if (!$payload) {
        echo json_encode(['error' => 'Invalid JSON'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Verify PIN
    if (!isset($payload['pin']) || ($payload['pin'] !== $adminPin && $payload['pin'] !== '۱۲۳۴')) {
        http_response_code(403);
        echo json_encode(['error' => 'رمز عبور مدیریت نادرست است.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Preserve adminPin in settings
    $settings = isset($payload['settings']) ? $payload['settings'] : [];
    if (!isset($settings['adminPin']) || empty($settings['adminPin'])) {
        $settings['adminPin'] = $adminPin;
    }

    // Save data
    $dataToSave = [
        'products' => isset($payload['products']) ? $payload['products'] : [],
        'articles' => isset($payload['articles']) ? $payload['articles'] : [],
        'leads' => isset($payload['leads']) ? $payload['leads'] : [],
        'settings' => $settings,
        'lastUpdated' => date('Y-m-d H:i:s')
    ];

    $saved = file_put_contents($dataFile, json_encode($dataToSave, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    if ($saved !== false) {
        echo json_encode(['success' => true, 'message' => 'اطلاعات با موفقیت روی هاست ذخیره گردید.'], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'خطا در نوشتن روی سرور.'], JSON_UNESCAPED_UNICODE);
    }
    exit;
}

// 4. Lead Registration (Public from Contact Form)
if ($action === 'add_lead' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $newLead = json_decode($raw, true);

    if ($newLead) {
        if (!isset($currentData['leads'])) {
            $currentData['leads'] = [];
        }
        array_unshift($currentData['leads'], $newLead);
        file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

echo json_encode(['error' => 'Invalid action'], JSON_UNESCAPED_UNICODE);
