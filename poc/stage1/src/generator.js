function codeGenerator(originNode, node, res) {
  let firstNode = node[0];
  res.push(firstNode);

  if (firstNode && firstNode.children) {
    return codeGenerator(originNode, firstNode.children, res);
  }

  if (!firstNode) {
    return ;
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

  res.pop();

  let lastNode = res[res.length - 1];
  if (lastNode.children && lastNode.children.length) {
    lastNode.children.shift();
    return codeGenerator(originNode, lastNode.children, res);
  } else if (lastNode.value && lastNode.value.children) {
    console.log(lastNode.value.children);
    lastNode.value.children.shift();
    return codeGenerator(originNode, lastNode.value.children, res);
  } else {
    delete lastNode.children;
    return codeGenerator(originNode, res.pop(), res);
  }
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
