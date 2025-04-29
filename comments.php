<?php
include 'db.php'; 


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT * FROM comments ORDER BY created_at DESC");
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($comments);
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text = $_POST['text'] ?? '';
    if ($text) {
        $stmt = $pdo->prepare("INSERT INTO comments (text) VALUES (:text)");
        $stmt->execute(['text' => $text]);
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Comment text is required']);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_PUT['id'] ?? '';
    if ($id) {
        $stmt = $pdo->prepare("UPDATE comments SET likes = likes + 1 WHERE id = :id");
        $stmt->execute(['id' => $id]);
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Comment ID is required']);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'] ?? '';
    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM comments WHERE id = :id");
        $stmt->execute(['id' => $id]);
        echo json_encode(['status' => 'success', 'message' => 'Comment deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Comment ID is required']);
    }
}
?>