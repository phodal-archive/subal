function codeGenerator(originNode, node, res) {
  let firstNode = node[0];

  if (firstNode) {
    res.push(firstNode);
  } else {
    firstNode = res.pop();
    if (!firstNode) {
      return;
    }
    if (firstNode.children) {
      firstNode.children.shift();
    }
  }

  if (firstNode && firstNode.children) {
    return codeGenerator(originNode, firstNode.children, res);
  }

  switch (firstNode.type) {
    case 'Object':
      if (firstNode && firstNode.children) {
        return codeGenerator(originNode, firstNode.children, res);
      }
      break;
    case 'Literal':
      break;
    case 'Property':
      if (firstNode.value && firstNode.value.children) {
        return codeGenerator(originNode, firstNode.value.children, res);
      }
      console.log(firstNode.key.value, firstNode.value.value);
      break;
    default:
      throw new Error('Error Type');
  }

  res.pop();

  if (!res.length) return res;

  let lastNode = res[res.length - 1];

  if (lastNode.children && lastNode.children.length) {
    lastNode.children.shift();
    return codeGenerator(originNode, lastNode.children, res);
  }

  delete lastNode.children;
  return codeGenerator(originNode, res.pop(), res);
}

function generator(node) {
  let res = [];

  if (typeof node === 'object') {
    node = [node];
  }

  let dataSource = JSON.parse(JSON.stringify(node));
  return codeGenerator(node, dataSource, res);
}

module.exports = generator;
