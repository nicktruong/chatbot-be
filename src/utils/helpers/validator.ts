import { ValidationError } from 'class-validator';

function extractValidationErrorDetail(errors: ValidationError[]): {
  dto: string;
  firstError: any[];
  detail: { [key: string]: string[] };
} {
  const firstMessage = errors[0];
  const dto = firstMessage.target.constructor.name;

  const detail = errors?.reduce((result, { property, constraints }) => {
    result[property] = Object.values(constraints);

    return result;
  }, {});

  const firstError = Object.values(
    Object.values(detail || {})?.[0] || [] || {},
  );

  return { dto, detail, firstError };
}

export default {
  extractValidationErrorDetail,
};
