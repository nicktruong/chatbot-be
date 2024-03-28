import { spawn } from 'node:child_process';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

type ResolveFn = (value: unknown) => void;

const Future = (fn: (resolve: ResolveFn) => void) => {
  return new Promise((resolve) => fn(resolve));
};

@Injectable()
export class EvalService {
  async eval(command: string, context: any) {
    Object.keys(context).forEach((key) => {
      command = command.replaceAll(key, context[key]);
    });

    const child = spawn('node', ['-e', `console.log(${command})`]);

    setTimeout(() => {
      child.kill();
    }, 5000);

    const eventFn = (resolve: ResolveFn) => {
      child.stdout.on('data', (data) => {
        resolve(data.toString() === 'true\n');
      });

      child.stdout.on('error', (error) => {
        throw new InternalServerErrorException('Error condition');
      });
    };

    const result = await Future(eventFn);

    return result;
  }
}
