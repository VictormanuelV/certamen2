import { setLocale } from "yup";
import { es } from "yup-locales";
import { object, string, boolean } from "yup";

setLocale(es);

export const loginSchema = object({
  username: string().strict().required(),
  password: string().strict().required()
});
