import { Env } from '@/utils/constants';

import hash from './hash';
import name from './name';
import enumh from './enumh';
import entity from './entity';
import validator from './validator';

const getEnv = (): string => process.env.NODE_ENV || Env.DEVELOPMENT;

const isDevelopmentEnv = (): boolean => getEnv() !== Env.PRODUCTION;

export { getEnv, isDevelopmentEnv, hash, name, enumh, entity, validator };
