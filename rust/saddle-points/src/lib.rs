pub fn find_saddle_points(matrix: &[Vec<u64>]) -> Vec<(usize, usize)> {
    if !is_valid_matrix(matrix) {
        panic!("This is not a matrix");
    }

    let n_rows = matrix.len();
    let n_cols = matrix[0].len();
    if n_cols == 0 {
        return Vec::new();
    }

    let max_cols: Vec<u64> = matrix.iter()
        .map(|row| *row.iter().max().unwrap())
        .collect();

    let min_rows: Vec<u64> = (0..n_cols)
        .map(|c| (0..n_rows).map(|r| matrix[r][c]).min().unwrap())
        .collect();

    let mut saddles = Vec::new();
    for r in 0..n_rows {
        for c in 0..n_cols {
            let v = matrix[r][c];
            if v == max_cols[r] && v == min_rows[c] {
                saddles.push((r, c));
            }
        }
    }
    saddles
}

fn is_valid_matrix(matrix: &[Vec<u64>]) -> bool {
    if matrix.len() == 0 {
        false
    } else {
        let n_cols = matrix[0].len();
        matrix.iter().all(|row| row.len() == n_cols)
    }
}
