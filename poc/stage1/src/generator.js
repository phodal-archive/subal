function codeGenerator(originNode, node, res, result) {
  let firstNode = node[0];

  if (firstNode) {
    // set array children length to 1
    if (firstNode.value && firstNode.value.type === 'Array') {
      firstNode.value.children = [firstNode.value.children[0]]
    }
    res.push(firstNode);
  } else {
    firstNode = res.pop();
    if (!firstNode) {
      return result;
    }

    if (firstNode.children) {
      firstNode.children.shift();
    }

    if (firstNode.value && firstNode.value.children) {
      firstNode.value.children.shift();
    }
  }

  // Object
  if (firstNode && firstNode.children) {
    return codeGenerator(originNode, firstNode.children, res, result);
  }

  // Array
  if (firstNode.value && firstNode.value.children) {
    if (firstNode.value.children.length > 0) {
      console.log(firstNode.key.value);
      console.log(firstNode.type, firstNode.value.type);
    }
    return codeGenerator(originNode, firstNode.value.children, res, result);
  }

  // Generator
  if (firstNode.value && firstNode.value.value) {
    console.log(firstNode.key && firstNode.key.value, typeof firstNode.value.value);
    console.log(firstNode.type, firstNode.value.type);
  } else {
    console.log(firstNode.key && firstNode.key.value, typeof firstNode.value);
    console.log(firstNode.type, firstNode.value.type);
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
  let result = {};

  if (typeof node === 'object') {
    node = [node];
  }

  // TODO: parseObject && parseArray

  let dataSource = JSON.parse(JSON.stringify(node));
  return codeGenerator(node, dataSource, res, result);
}

module.exports = generator;
