import dotenv from 'dotenv';

export const isDev = () => process.env.NODE_ENV === 'development';

const envPath = isDev() ? '../../.env.development' : '../../.env';

dotenv.config({ path: envPath });

export const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  SERVER_PORT,
  POSTGRES_HOST,
  DOMAIN_REWRITE_HOST
} = process.env;
