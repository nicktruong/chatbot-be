import { enumh } from '@/utils/helpers';
import { UserRole } from '@/common/enums';

const USER_ROLE = enumh?.convertToRegex<typeof UserRole>(UserRole);

export default {
  USER_ROLE,
};
