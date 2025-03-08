mod game;

use game::{get_game_status, GameStatus};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// src-tauri/src/main.rs
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct GameState {
    board: Vec<String>,
}

#[tauri::command]
fn check_game_state(board: Vec<String>) -> String {
    match get_game_status(board) {
        GameStatus::Continue => "Continue".to_string(),
        GameStatus::Draw => "Draw".to_string(),
        GameStatus::O => "O".to_string(),
        GameStatus::X => "X".to_string(),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![check_game_state])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
