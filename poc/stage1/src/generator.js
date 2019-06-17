function buildArray(node, rootName) {
  let result = '';
  node = node[0];
  switch (node.type) {
    case 'Object': {
      buildObject(node);
      break;
    }
    case 'Literal':
      if (rootName) {
        result = result + typeof node.value;
      }
      break;
  }

  return result;
}

function buildObject(node) {
  let result = '';
  for (let i = 0; i < node.children.length; i++) {
    const childNode = node.children[i];
    const objectKey = uppercaseLetter(childNode.key.value);
    switch (childNode.value.type) {
      case 'Array': {
        console.log(`${objectKey}s:${objectKey}[]`);
        // result += `${objectKey}s:${objectKey}[]\n` ;
        let arrayResult = buildArray([childNode.value.children[0]], `${objectKey}`);
        console.log(`${objectKey}: ${arrayResult}`);
        break;
      }
      case 'Literal': {
        // result += `${uppercaseLetter(childNode.key.value)}:${typeof childNode.value.value}\n`;
        break;
      }
    }
  }
  // result += '}';
  return result;
}

function uppercaseLetter(str) {
  if (str.charAt(0) === '"') {
    str = str.substr(1);
  }

  if (str.charAt(str.length - 1) === '"') {
    str = str.substr(0, str.length - 1);
  }

  str = str.charAt(0).toUpperCase() + str.slice(1);
  if (str[str.length - 1] === 's') {
    str = str.substr(0, str.length - 1);
  }

  return str;
}

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
      buildArray(firstNode.value.children);
    }
    // return codeGenerator(originNode, firstNode.value.children, res, result);
  }

  // Generator
  if (firstNode.value && firstNode.value.value) {
    // console.log(firstNode.key && firstNode.key.value, typeof firstNode.value.value);
    // console.log(firstNode.type, firstNode.value.type);
  } else {
    // console.log(firstNode.key && firstNode.key.value, typeof firstNode.value);
    // console.log(firstNode.type, firstNode.value.type);
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

  // let dataSource = JSON.parse(JSON.stringify(node));
  // return codeGenerator(node, dataSource, res, result);
  return buildArray(node, null);
}

module.exports = generator;
