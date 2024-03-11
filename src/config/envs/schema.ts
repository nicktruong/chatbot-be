import * as Joi from 'joi';

export const EnvSchema = Joi.object().keys({
  PORT: Joi.number(),
  NODE_ENV: Joi.string(),

  ADMIN_NAME: Joi.string(),
  ADMIN_EMAIL: Joi.string(),
  ADMIN_PASSWORD: Joi.string(),

  DB_SSL: Joi.string(),
  ORIGIN: Joi.string().required(),
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
});
