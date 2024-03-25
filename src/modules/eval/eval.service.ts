import { Injectable } from '@nestjs/common';

export type Ops = '' | '===' | '!==' | '>' | '>=' | '<' | '<=';

export type OpToFncMapping =
  | {
      [K in Exclude<Ops, ''>]: (operand1: number, operand2: number) => boolean;
    }
  | {
      '': (operand1: string) => boolean; // In case user just input "true" or "false" condition
    };

@Injectable()
export class EvalService {
  cbs: OpToFncMapping = {
    '': (operand1: string) => operand1 === 'true',
    '===': (operand1: number, operand2: number) => operand1 === operand2,
    '!==': (operand1: number, operand2: number) => operand1 !== operand2,
    '<': (operand1: number, operand2: number) => operand1 < operand2,
    '<=': (operand1: number, operand2: number) => operand1 <= operand2,
    '>': (operand1: number, operand2: number) => operand1 > operand2,
    '>=': (operand1: number, operand2: number) => operand1 >= operand2,
  };

  exe(operand1?: string | number, op: Ops = '', operand2?: number) {
    return this.cbs[op]?.(operand1, operand2);
  }
}
