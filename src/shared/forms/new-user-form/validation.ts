import * as yup from "yup";
import {
  DOCUMENT_WRONG_SERIES,
  INVALID_EMAIL,
  INVALID_PHONE,
  IPN_INVALID,
  LONG_LENGTH,
  NOTE_PASSPORT,
  ONLY_LETTERS,
  REQUIRED_FIELD,
  SECRET_WORD,
  SHORT_LENGTH,
  UNZR_FORMAT,
} from "../../contants/validation.ts";
import {
  OTHER_DOCUMENT_REGEX,
  REGEX_IPN,
  REGEX_ONLY_LETTERS,
  REGEX_PASSPORT_NOTE,
  REGEX_PHONE,
  REGEX_SECRET_WORD,
  REGEX_UNZR_QUERY,
} from "../../contants/regex.ts";
import { validateWithYup } from "../../utils/validation.ts";

const validationSchema: yup.ObjectSchema<FormValues> = yup.object({
  name: yup
    .string()
    .trim()
    .matches(REGEX_ONLY_LETTERS, ONLY_LETTERS)
    .required(REQUIRED_FIELD)
    .min(3, SHORT_LENGTH(3))
    .max(50, LONG_LENGTH(50)),
  secretWord: yup
    .string()
    .trim()
    .matches(REGEX_SECRET_WORD, SECRET_WORD)
    .required(REQUIRED_FIELD)
    .min(6, SHORT_LENGTH(6))
    .max(50, LONG_LENGTH(50)),
  lastName: yup
    .string()
    .trim()
    .matches(REGEX_ONLY_LETTERS, ONLY_LETTERS)
    .required(REQUIRED_FIELD)
    .min(2, SHORT_LENGTH(2))
    .max(50, LONG_LENGTH(50)),
  middleName: yup
    .string()
    .trim()
    .matches(REGEX_ONLY_LETTERS, ONLY_LETTERS)
    .required(REQUIRED_FIELD),
  IPN: yup.lazy((value) => {
    if (value !== "Немає РНОКПП(ІПН)") {
      return yup
        .string()
        .matches(REGEX_IPN, IPN_INVALID)
        .required(REQUIRED_FIELD)
        .length(10, IPN_INVALID);
    }
    return yup.string().required();
  }),
  birthDate: yup.string().required(REQUIRED_FIELD),
  gender: yup.string().trim().required(REQUIRED_FIELD),
  birthdayCountry: yup.string().trim().required(REQUIRED_FIELD),
  birthPlace: yup
    .string()
    .trim()
    .required(REQUIRED_FIELD)
    .min(2, SHORT_LENGTH(2))
    .max(50, LONG_LENGTH(50)),
  preferedCommunicationMethod: yup.string().optional(),
  phoneNumber: yup.string().matches(REGEX_PHONE, INVALID_PHONE).optional(),
  email: yup.string().email(INVALID_EMAIL),
  documentType: yup.string().required(REQUIRED_FIELD),
  UNZRquery: yup.string().matches(REGEX_UNZR_QUERY, UNZR_FORMAT).optional(),
  documentEndDate: yup.string().optional(),
  documentStartDate: yup.string().required(REQUIRED_FIELD),
  documentNumber: yup.lazy((_value, schema) => {
    if (
      schema.parent.documentType === "passportNote" ||
      schema.parent.documentType === "passportId"
    ) {
      return yup
        .string()
        .matches(REGEX_PASSPORT_NOTE, NOTE_PASSPORT)
        .required(REQUIRED_FIELD);
    }
    return yup
      .string()
      .matches(OTHER_DOCUMENT_REGEX, DOCUMENT_WRONG_SERIES)
      .optional();
  }),
  whoIssued: yup
    .string()
    .required(REQUIRED_FIELD)
    .min(5, SHORT_LENGTH(5))
    .max(50, LONG_LENGTH(50)),
});

export const validate = validateWithYup(validationSchema);
