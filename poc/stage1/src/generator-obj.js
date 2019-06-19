const ROOT_NAME = 'heimdallRoot';
let lastNodeName = '';

function buildArray(node, rootName, result) {
  if (lastNodeName !== rootName) {
    result.tempObject = {}
  }
  node = node[0];
  switch (node.type) {
    case 'Object': {
      let buildObject1 = buildObject(node, rootName, result, false, false);
      if (buildObject1 && rootName !== ROOT_NAME) {
        result.childObjects[rootName] = buildObject1;
      }
      break;
    }
    case 'Literal':
      if (rootName && rootName !== ROOT_NAME) {
        result.tempObject[rootName] = typeof node.value;
      }
      break;
  }

  lastNodeName = rootName;
  return result;
}

function buildObject(node, rootName, result, isSubObject) {
  let objectResultObj = {};

  let nodeChildren = isSubObject ? node.value.children : node.children;
  for (let i = 0; i < nodeChildren.length; i++) {
    const childNode = nodeChildren[i];
    let objectKey = childNode.key.value;

    let uppercaseFirstLetter1 = uppercaseFirstLetter(childNode.key.value);
    switch (childNode.value.type) {
      case 'Object': {
        let buildObject1 = buildObject(childNode, `${objectKey}`, result, true);
        if (!isSubObject) {
          result.currentObject[uppercaseFirstLetter1] = uppercaseFirstLetter1;
        }

        result.childObjects[uppercaseFirstLetter1] = buildObject1;
        break;
      }
      case 'Array': {
        objectKey = uppercaseLetterAndRemoveLastS(childNode.key.value);
        if (rootName === ROOT_NAME) {
          result.currentObject[objectKey] = `${objectKey}[]`;
        } else {
          objectResultObj[objectKey + 's'] = objectKey + '[]';
        }

        let arrayResult = buildArray([childNode.value.children[0]], `${objectKey}`, result);
        objectResultObj = Object.assign(objectResultObj, arrayResult.tempObject);
        break;
      }
      case 'Literal': {
        objectResultObj[uppercaseFirstLetter1] = typeof childNode.value.value;

        if (rootName === ROOT_NAME) {
          result.currentObject[uppercaseFirstLetter1] = typeof childNode.value.value;
        }
        break;
      }
    }
  }

  return objectResultObj;
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

function uppercaseLetterAndRemoveLastS(str) {
  str = uppercaseFirstLetter(str);

  if (str[str.length - 1] === 's') {
    str = str.substr(0, str.length - 1);
  }

  return str;
}

function generator(node) {
  let result = {
    childObjects: {},
    currentObject: {},
    tempObject: {}
  };

  if (typeof node === 'object') {
    node = [node];
  }

  result = buildArray(node, ROOT_NAME, result);
  return result;
}

module.exports = generator;
