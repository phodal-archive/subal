function codeGenerator(originNode, node, res, result) {
  let firstNode = node[0];

  if (firstNode) {
    res.push(firstNode);
  } else {
    firstNode = res.pop();
    if (!firstNode) {
      return null;
    }
    if (firstNode.children) {
      firstNode.children.shift();
    }
    if (firstNode.value && firstNode.value.children) {
      firstNode.value.children.shift();
    }
  }

  if (firstNode && firstNode.children) {
    return codeGenerator(originNode, firstNode.children, res, result);
  }

  if (firstNode.value && firstNode.value.children) {
    return codeGenerator(originNode, firstNode.value.children, res, result);
  }

  switch (firstNode.type) {
    case 'Object':
      break;
    case 'Literal':
      break;
    case 'Property':
      break;
    default:
      throw new Error('Error Type');
  }

  if (firstNode.value && firstNode.value.value) {
    console.log(firstNode.value.value);
  } else {
    console.log(firstNode.value);
  }

  res.pop();

  if (!res.length) return result;

  let lastNode = res[res.length - 1];

  if (lastNode.children && lastNode.children.length) {
    lastNode.children.shift();
    return codeGenerator(originNode, lastNode.children, res, result);
  }

  delete lastNode.children;
  return codeGenerator(originNode, lastNode, res, result);
}

function generator(node) {
  let res = [];
  let result = '';

  if (typeof node === 'object') {
    node = [node];
  }

  let dataSource = JSON.parse(JSON.stringify(node));
  return codeGenerator(node, dataSource, res, result);
}

module.exports = generator;
