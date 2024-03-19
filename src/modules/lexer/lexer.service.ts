// eslint-disable-next-line @typescript-eslint/no-var-requires
const moo = require('moo');
import { Injectable } from '@nestjs/common';

const lexer = moo.compile({
  WS: /[ \t]+/,
  number: /\d*\.?\d+/,
  boolean: ['true', 'false'],
  variable: /[a-zA-Z_$][\w_$]*/,
  operator: ['===', '!==', '>', '>=', '<', '<='],
});

@Injectable()
export class LexerService {
  parseCondition(condition: string) {
    return lexer.reset(condition);
  }
}
