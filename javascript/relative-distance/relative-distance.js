export const degreesOfSeparation = (familyTree, personA, personB) => {
  const tree = buildBidirectionalTree(familyTree);
  // console.log(tree);

  return findShortestBFS(tree, personA, personB);
};

const buildBidirectionalTree = (familyTree) => {
  const tree = {};
  for (let child in familyTree) {
    const parents = familyTree[child];
    tree[child] ||= [];
    tree[child].push(...parents);
    for (let parent of parents) {
      const others = parents.filter((p) => p !== parent);
      tree[parent] ||= [];
      tree[parent].push(child, ...others);
    }
  }
  return tree;
};

const findShortestBFS = (tree, from, to) => {
  const queue = [{ node: from, distance: 0 }];
  const visited = new Set([from]);
  while (queue.length > 0) {
    let { node, distance } = queue.shift();
    if (node === to) {
      return distance;
    }
    for (let neighbor of tree[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push({ node: neighbor, distance: distance + 1 });
      }
    }
  }
  return -1;
};

const findShortestDFS = (tree, from, to) => {
  const distances = {};
  const walk = (from, distance) => {
    if (distances[from] != null && distances[from] <= distance) {
      return;
    }
    distances[from] = distance;
    for (let neighbor of tree[from]) {
      walk(neighbor, distance + 1);
    }
  };
  walk(from, 0);
  // console.log(distances);
  return to in distances ? distances[to] : -1;
};
