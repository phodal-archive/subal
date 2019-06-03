import * as ts from 'typescript'

const source = "let x: string  = 'string'"

let result = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
})

console.log('........')
console.log(JSON.stringify(result))
console.log('........')
