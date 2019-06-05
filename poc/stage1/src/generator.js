let modelIndex = 1;

function codeGenerator(input, node, parentNode, index) {
  while (index < 5) {
    switch (node.type) {
      case 'Object':
        console.log(`Model${modelIndex}`);
        codeGenerator(input, node.children[index], node, index);
        modelIndex++;
        index++;
        break;
      // case 'Array':
      //   console.log(`Model${modelIndex} []`);
      //   codeGenerator(input, node, node);
      //   modelIndex++;
      //   break;
      case 'Property':
        console.log(`${node.key.value}: ${node.value.value}`);
        index++;
        codeGenerator(input, parentNode.children[index], parentNode, index);
        break;
      default:
        // do somthing;
        break;
    }
  }
}

function generator(node, results, modelIndex) {
  return codeGenerator(node, node, node, 0);
}

module.exports = generator;
