import dotenv from "dotenv";
dotenv.config();

export const dbUrl = process.env.DB_URL as string;
export const env = process.env.ENVIRONMENT as string;
export const PORT = process.env.PORT as string;

export const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN as string;
export const ZOHO_AUTH_TOKEN = process.env.ZOHO_AUTH_TOKEN as string;
export const ZOHO_CLIENT_ID= process.env.ZOHO_CLIENT_ID as string;
export const ZOHO_CLIENT_SECRET=process.env.ZOHO_CLIENT_SECRET as string;
export const REDIS_URL = process.env.REDIS_URL as string;
export const ZOHO_ORGANIZATION_ID=process.env.ZOHO_ORGANIZATION_ID as string;
export const ZOHO_CREATE_ITEMS_URL=process.env.ZOHO_CREATE_ITEMS_URL as string;
export const ZOHO_REFRESH_TOKEN_URL=process.env.ZOHO_REFRESH_TOKEN_URL as string;
export const ZOHO_INSERT_NOTE_URL=process.env.ZOHO_INSERT_NOTE_URL as string;
export const ZOHO_CREATE_NOTES_URL=process.env.ZOHO_CREATE_NOTES_URL as string;
export const ZOHO_CREATE_USER_URL=process.env.ZOHO_CREATE_USER_URL as string;
