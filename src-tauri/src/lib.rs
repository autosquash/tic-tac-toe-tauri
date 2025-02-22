// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// src-tauri/src/main.rs
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct GameState {
    board: Vec<String>,
}

#[tauri::command]
fn check_game_state(board: Vec<String>) -> String {
    // Check if there is a winner
    let winning_combinations = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6],
    ];

    for combination in winning_combinations.iter() {
        let a = &board[combination[0]];
        let b = &board[combination[1]];
        let c = &board[combination[2]];

        if a != "" && a == b && b == c {
            return a.to_string(); // Returns the winner (X or O)
        }
    }

    // Check if there is a tie
    if board.iter().all(|cell| cell != "") {
        return "draw".to_string();
    }

    // If there is no winner or tie, return "continue"
    "continue".to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![check_game_state])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
