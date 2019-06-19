const ROOT_NAME = 'heimdallRoot';
let lastNodeName = '';

function buildArray(node, rootName, result) {
  if (lastNodeName !== rootName) {
    result.tempNode = '';
  }
  node = node[0];
  switch (node.type) {
    case 'Object': {
      let buildObject1 = buildObject(node, rootName, result);
      if (buildObject1 && rootName !== ROOT_NAME) {
        result.childNodes.push(`interface ${rootName} {\n  ${buildObject1} }\n`);
      }
      break;
    }
    case 'Literal':
      if (rootName && rootName !== ROOT_NAME) {
        result.tempNode += `${rootName}: ${typeof node.value};\n`;
      }
      break;
  }

  lastNodeName = rootName;
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

        if (!isSubObject) {
          result.current += `  ${uppercaseFirstLetter1}: ${uppercaseFirstLetter1};\n`;
        }
        result.childNodes.push(`interface ${uppercaseFirstLetter1} {\n  ${buildObject1} }\n`);
        break;
      }
      case 'Array': {
        objectKey = uppercaseLetter(childNode.key.value);
        if (rootName === ROOT_NAME) {
          result.current += `  ${objectKey}s: ${objectKey}[];\n`;
        } else {
          objectResult += `  ${objectKey}s: ${objectKey}[];\n`;
        }

        let arrayResult = buildArray([childNode.value.children[0]], `${objectKey}`, result);
        objectResult += `${arrayResult.tempNode}`;
        break;
      }
      case 'Literal': {
        if (rootName === ROOT_NAME) {
          result.current += `${uppercaseFirstLetter1}: ${typeof childNode.value.value};\n`;
        } else {
          objectResult += `  ${uppercaseFirstLetter1}: ${typeof childNode.value.value};\n`;
        }
        break;
      }
    }
  }

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

function generator(node) {
  let result = {
    childNodes: [],
    current: '',
    tempNode: ''
  };

  if (typeof node === 'object') {
    node = [node];
  }

  result = buildArray(node, ROOT_NAME, result);
  return result;
}

module.exports = generator;
