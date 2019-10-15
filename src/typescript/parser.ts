/**
 * TypeScript Parser Interface
 *
 * Author   : Jonathan Steven (yondercode@gmail.com)
 * License  : GNU General Public License v3 (GPLv3)
 */

import { TSESTreeOptions } from '@typescript-eslint/typescript-estree'

export function createParserConfig(filePath: string): TSESTreeOptions {
  return {
    filePath,
    tsconfigRootDir: process.cwd(),
  }
}
