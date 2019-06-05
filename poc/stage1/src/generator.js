let modelIndex = 1;

function codeGenerator(input, node, parentNode, nodeInfo) {
  if (!node) {
    return;
  }
  switch (node.type) {
    case 'Object':
      nodeInfo.currentIndex = 0;
      codeGenerator(input, node.children[nodeInfo.currentIndex], node, nodeInfo);
      break;
    case 'Property':
      nodeInfo.currentIndex++;
      if (node.value.children) {
        nodeInfo.currentIndex = 0;
        nodeInfo.children = nodeInfo;

        console.log(" - " + node.key.value);
        codeGenerator(input, node.value.children[nodeInfo.currentIndex], parentNode, nodeInfo);
      } else {
        if (nodeInfo.children && nodeInfo.children.currentIndex === parentNode.children.length) {
          codeGenerator(input, parentNode.children[nodeInfo.currentIndex], parentNode, nodeInfo);
        }

        console.log(node.key.value);
        codeGenerator(input, parentNode.children[nodeInfo.currentIndex], parentNode, nodeInfo);
      }
      break;
    default:
      node.value = object;
    // do somthing;
  }
}

function generator(node, results, modelIndex) {
  var nodeInfo = {
    currentIndex: 0,
    children: {}
  };
  return codeGenerator(node, node, node, nodeInfo);
}

module.exports = generator;
