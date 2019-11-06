import { createSourceFile, ScriptTarget } from 'typescript'
import * as fs from 'fs'

const ast = createSourceFile('test.ts', fs.readFileSync('./test.ts').toString(), ScriptTarget.ES2015)

console.log(ast)