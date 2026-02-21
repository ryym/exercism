package tree

import (
	"fmt"
	"slices"
)

type Record struct {
	ID     int
	Parent int
	// feel free to add fields as you see fit
}

type Node struct {
	ID       int
	Children []*Node
	// feel free to add fields as you see fit
}

func Build(records []Record) (*Node, error) {
	if len(records) == 0 {
		return nil, nil
	}

	isValidID := func(id int) bool {
		return 0 <= id && id < len(records)
	}
	isValidRelation := func(id, parent int) bool {
		return id == 0 && parent == 0 || id > parent
	}

	nodeMap := make(map[int]*Node, len(records))
	for _, r := range records {
		if !isValidID(r.ID) || !isValidID(r.Parent) {
			return nil, fmt.Errorf("invalid node: %d", r.ID)
		}
		if !isValidRelation(r.ID, r.Parent) {
			return nil, fmt.Errorf("invalid relationship: %d", r.ID)
		}
		if nodeMap[r.ID] != nil {
			return nil, fmt.Errorf("duplicate node: %d", r.ID)
		}
		nodeMap[r.ID] = &Node{ID: r.ID}
	}

	slices.SortFunc(records, func(a, b Record) int {
		return a.ID - b.ID
	})
	for _, r := range records[1:] {
		node := nodeMap[r.ID]
		parent := nodeMap[r.Parent]
		parent.Children = append(parent.Children, node)
	}

	return nodeMap[0], nil
}
