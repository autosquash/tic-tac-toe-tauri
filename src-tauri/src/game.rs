use core::panic;

pub enum GameStatus {
    Continue,
    Draw,
    O,
    X,
}

const WINNING_COMBINATIONS: [[usize; 3]; 8] = [
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

pub fn get_game_status(board: Vec<String>) -> GameStatus {
    // Check if there is a winner

    for combination in WINNING_COMBINATIONS.iter() {
        let a = &board[combination[0]];
        let b = &board[combination[1]];
        let c = &board[combination[2]];

        if a != "" && a == b && b == c {
            // Returns the winner (X or O)
            return match a.as_str() {
                "O" => GameStatus::O,
                "X" => GameStatus::X,
                _ => panic!(),
            };
        }
    }

    if is_a_draw(board) {
        return GameStatus::Draw;
    }

    // If there is no winner or tie, return "continue"
    GameStatus::Continue
}

pub fn is_a_draw(board: Vec<String>) -> bool {
    board.iter().all(|cell| cell != "")
}
