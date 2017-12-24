#[derive(Debug)]
struct Point {
    min_in_col: bool,
    max_in_row: bool,
}
impl Point {
    fn is_saddle(&self) -> bool {
        self.min_in_col && self.max_in_row
    }
}

pub fn _find_saddle_points(matrix: &[Vec<u64>]) -> Vec<(usize, usize)> {
    if !is_valid_matrix(matrix) {
        panic!("This is not a matrix");
    }

    let n_rows = matrix.len();
    let n_cols = matrix[0].len();

    if n_cols == 0 {
        return Vec::new();
    }

    let mut min_col_vals = vec![std::u64::MAX; n_cols];
    let mut points = Vec::with_capacity(n_rows);

    for r in 0..n_rows {
        points.push(Vec::with_capacity(n_cols));
        let max_val = matrix[r].iter().max();

        for c in 0..n_cols {
            let val = matrix[r][c];
            points[r].push(Point {
                min_in_col: false,
                max_in_row: match max_val {
                    Some(max) => val == *max,
                    None => true,
                }
            });
            if min_col_vals[c] > val {
                min_col_vals[c] = val;
            }
        }
    }

    for (c, &min) in min_col_vals.iter().enumerate() {
        for r in 0..n_rows {
            if min == matrix[r][c] {
                points[r][c].min_in_col = true;
            }
        }
    }

    let mut saddles = Vec::new();
    for r in 0..n_rows {
        for c in 0..n_cols {
            if points[r][c].is_saddle() {
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
