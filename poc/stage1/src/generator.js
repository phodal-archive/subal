const ROOT_NAME = 'heimdallRoot';

function buildArray(node, rootName, result) {
  node = node[0];
  switch (node.type) {
    case 'Object': {
      let buildObject1 = buildObject(node, rootName, result);
      if (buildObject1) {
        result.childNodes.push(buildObject1);
      }
      break;
    }
    case 'Literal':
      if (rootName && rootName !== ROOT_NAME) {
        result.tempNode += rootName + ': ' + typeof node.value + ';\n';
      }
      break;
  }

  return result;
}

function buildObject(node, rootName, result, isSubObject) {
  let objectResult = '';
  let nodeChildren = isSubObject ? node.value.children : node.children;
  for (let i = 0; i < nodeChildren.length; i++) {
    const childNode = nodeChildren[i];
    let objectKey = childNode.key.value;

    let uppercaseFirstLetter1 = uppercaseFirstLetter(childNode.key.value);
    switch (childNode.value.type) {
      case 'Object': {
        let buildObject1 = buildObject(childNode, `${objectKey}`, result, true);

        result.current += `${uppercaseFirstLetter1}: ${uppercaseFirstLetter1};\n`;
        result.childNodes.push(`${uppercaseFirstLetter1}: ${buildObject1}`);
        break;
      }
      case 'Array': {
        objectKey = uppercaseLetter(childNode.key.value);
        if (rootName === ROOT_NAME) {
          result.current += `${objectKey}s: ${objectKey}[];\n`;
        } else {
          objectResult += `${objectKey}s: ${objectKey}[];\n`;
        }

        let arrayResult = buildArray([childNode.value.children[0]], `${objectKey}`, result);
        // objectResult += `${arrayResult.currentNode}`;
        break;
      }
      case 'Literal': {
        if (rootName === ROOT_NAME) {
          result.current += `${uppercaseFirstLetter1}: ${typeof childNode.value.value};\n`;
        } else {
          objectResult += `${uppercaseFirstLetter1}: ${typeof childNode.value.value};\n`;
        }
        break;
      }
    }
  }

  // objectResult += '}\n';
  return objectResult;
}

function uppercaseFirstLetter(str) {
  if (str.charAt(0) === '"') {
    str = str.substr(1);
  }

  if (str.charAt(str.length - 1) === '"') {
    str = str.substr(0, str.length - 1);
  }

  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}

function uppercaseLetter(str) {
  str = uppercaseFirstLetter(str);

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
  let result = {
    childNodes: [],
    current: '',
    tempNode: ''
  };

  if (typeof node === 'object') {
    node = [node];
  }

  // TODO: parseObject && parseArray

  // let dataSource = JSON.parse(JSON.stringify(node));
  // return codeGenerator(node, dataSource, res, result);
  result = buildArray(node, ROOT_NAME, result);
  // console.log('{\n' + result.currentNode + '}');
  // console.log(result.childNodes);
  return result;
}

module.exports = generator;
