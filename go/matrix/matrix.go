package matrix

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
)

type Matrix struct {
	rows    [][]int
	numCols int
}

func New(s string) (Matrix, error) {
	if len(s) == 0 {
		return Matrix{}, nil
	}

	lines := strings.Split(s, "\n")
	rows := make([][]int, 0, len(lines))
	for _, line := range lines {
		line = strings.TrimSpace(line)
		sNums := strings.Split(line, " ")
		row := make([]int, 0, len(sNums))
		for _, sNum := range sNums {
			n, err := strconv.Atoi(sNum)
			if err != nil {
				return Matrix{}, fmt.Errorf("invalid matrix value: %w", err)
			}
			row = append(row, n)
		}
		rows = append(rows, row)
	}

	numCols := len(rows[0])
	for _, row := range rows[1:] {
		if numCols != len(row) {
			return Matrix{}, fmt.Errorf("rows must have same length")
		}
	}

	return Matrix{rows, numCols}, nil
}

// Cols and Rows must return the results without affecting the matrix.

func (m Matrix) Cols() [][]int {
	cols := make([][]int, 0, m.numCols)
	for c := 0; c < m.numCols; c++ {
		col := make([]int, len(m.rows))
		for i, row := range m.rows {
			col[i] = row[c]
		}
		cols = append(cols, col)
	}
	return cols
}

func (m Matrix) Rows() [][]int {
	rows := make([][]int, len(m.rows))
	for i, row := range m.rows {
		rows[i] = slices.Clone(row)
	}
	return rows
}

func (m Matrix) Set(row, col, val int) bool {
	if !(0 <= row && row < len(m.rows) && 0 <= col && col < m.numCols) {
		return false
	}
	m.rows[row][col] = val
	return true
}
