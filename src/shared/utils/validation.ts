import * as yup from "yup";

export const validateWithYup =
  <T extends yup.AnyObject>(schema: yup.ObjectSchema<T>) =>
  async (values: T): Promise<Record<string, string>> => {
    try {
      await schema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return err.inner.reduce((acc: Record<string, string>, cur) => {
          if (cur.path) acc[cur.path] = cur.message;
          return acc;
        }, {});
      }
      return {};
    }
  };
