<?php
// Erlaube CORS für lokale Entwicklung (optional, kann in Produktion entfernt werden)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Empfange JSON Daten
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Ungültiges JSON']);
        exit;
    }

    // Validierung (Optional: Prüfe Struktur)
    if (!isset($data['alert']) || !isset($data['news'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Fehlende Datenfelder (alert oder news)']);
        exit;
    }

    // Pfad zur content.json (relativ zu diesem Script in public/api)
    $file = '../data/content.json';

    // Versuche zu speichern
    if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        echo json_encode(['success' => true, 'message' => 'Daten erfolgreich gespeichert']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Fehler beim Speichern der Datei. Schreibrechte prüfen!']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Methode nicht erlaubt']);
}
?>

