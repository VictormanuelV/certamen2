import { setLocale } from "yup";
import { es } from "yup-locales";
import { object, string, boolean } from "yup";

setLocale(es);

export const createToDoSchema = object({
  title: string().strict().required(),
});

export const updateToDoSchema = object({
  title: string().strict(),
  completed: boolean().strict()
});