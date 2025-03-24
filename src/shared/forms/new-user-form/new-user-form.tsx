import { Form } from "react-final-form";

import { Button, MenuItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { FormTextField } from "../../components/form-text-field/form-text-field.tsx";
import { FormMaskInput } from "../../components/form-mask-input/form-mask-input.tsx";

import { validate } from "./validation.ts";
import {
  COMMUNICATION_METHODS,
  countries,
  DOCUMENT_TYPES,
  SEX_OPTIONS,
} from "../../contants/list.ts";

type Props = {
  onSubmit: (FormValues: FormValues) => Promise<void>;
};

const NewUserForm = ({ onSubmit }: Props) => {
  return (
    <>
      <Typography variant="h5">Дані пацієнта</Typography>
      <Form
        initialValues={{
          gender: " ",
          preferedCommunicationMethod: " ",
          birthdayCountry: " ",
          documentType: "passportNote",
        }}
        validate={validate}
        onSubmit={(values, form, callback) => {
          onSubmit(values).then(() => {
            callback?.();
            form.restart();
          });
        }}
        render={({
          handleSubmit,
          submitting,
          pristine,
          values,
          errors,
          form,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={4}>
                <FormTextField
                  name="lastName"
                  required
                  label="Прізвище"
                  variant="standard"
                  placeholder="Введіть прізвище"
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <FormTextField
                  name="name"
                  label="Ім'я"
                  variant="standard"
                  placeholder="Введіть ім'я"
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={4}>
                <FormTextField
                  disabledText={"Немає по батькові"}
                  disabledHelperText={"Немає по батькові згідно документів"}
                  canDisabled
                  name={"middleName"}
                  required
                  label="По батькові"
                  variant="standard"
                  placeholder="Введіть по батькові"
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <FormTextField
                  disabledText={"Немає РНОКПП(ІПН)"}
                  helperText={
                    "Вкажіть унікальний номер запису в Демографічному реєстрі (Запис №)"
                  }
                  disabledHelperText={
                    "Немає ІПН за віком чи має відмітку у паспорті"
                  }
                  canDisabled
                  name={"IPN"}
                  required
                  label="РНОКПП(ІПН)"
                  variant="standard"
                  placeholder="РНОКПП(ІПН)"
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <FormTextField
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  name="birthDate"
                  label="Дата народження"
                  type={"date"}
                  variant="standard"
                  placeholder="Введіть ім'я"
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={4}>
                <FormTextField
                  name="gender"
                  label="Стать"
                  select
                  required
                  variant="standard"
                  fullWidth
                >
                  <MenuItem disabled value={" "}>
                    --Вибрати--
                  </MenuItem>
                  {SEX_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </FormTextField>
              </Grid>
              <Grid size={6}>
                <FormTextField
                  name="birthdayCountry"
                  label="Країна народження"
                  select
                  variant="standard"
                  fullWidth
                  required
                >
                  <MenuItem disabled value={" "}>
                    --Вибрати--
                  </MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.title}
                    </MenuItem>
                  ))}
                </FormTextField>
              </Grid>
              <Grid size={6}>
                <FormTextField
                  name="birthPlace"
                  label="Місце народження"
                  variant="standard"
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={6}>
                <FormTextField
                  name="preferedCommunicationMethod"
                  label="Бажаний спосіб зв'язку із пацієнтом"
                  select
                  variant="standard"
                  fullWidth
                >
                  <MenuItem disabled value={" "}>
                    --Вибрати--
                  </MenuItem>
                  {COMMUNICATION_METHODS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </FormTextField>
              </Grid>
              <Grid size={6}>
                <FormTextField
                  required
                  name="secretWord"
                  label="Секретне слово (не менше 6 символів)"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <FormMaskInput
                  fullWidth
                  name={"phoneNumber"}
                  label="Контактний номер телефону"
                  placeholder={"+38 (___) ___-__-__"}
                  mask={"+38(000)000-00-00"}
                />
              </Grid>
              <Grid size={6}>
                <FormTextField
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  name="email"
                  label="Електронна пошта"
                  variant="standard"
                  fullWidth
                  placeholder={"example@example.com"}
                />
              </Grid>
              <Grid size={12}>
                <Typography variant="h5">
                  Документ що посвідчує особу
                </Typography>
              </Grid>
              <Grid size={6}>
                <FormTextField
                  name="documentType"
                  label="Тип документа"
                  select
                  required
                  variant="standard"
                  fullWidth
                >
                  <MenuItem disabled value={" "}>
                    --Вибрати--
                  </MenuItem>
                  {DOCUMENT_TYPES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </FormTextField>
              </Grid>
              <Grid size={6}>
                <FormTextField
                  name="documentNumber"
                  label="Серія (за наявності), номер"
                  variant="standard"
                  fullWidth
                  required={values?.documentType === "passportNote" || false}
                />
              </Grid>
              <Grid size={6}>
                <FormTextField
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  type={"date"}
                  name="documentStartDate"
                  label="Коли видано"
                  variant="standard"
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={6}>
                <FormTextField
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  type={"date"}
                  name="documentEndDate"
                  label="Діє до"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <FormTextField
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  multiline
                  name="whoIssued"
                  label="Ким видано"
                  variant="standard"
                  placeholder={"Орган, що видав документ"}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={6}>
                <FormTextField
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  placeholder="РРРРММДД-ХХХХХ"
                  name="UNZRquery"
                  label="Запит № (УНЗР)"
                  helperText={
                    errors?.UNZRquery
                      ? errors?.UNZRquery
                      : '"Вкажіть унікальний номер запису в Демографічному реєстрі (Запис №)"'
                  }
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="reset"
              disabled={submitting || pristine}
              onClick={() => {
                form.reset();
              }}
            >
              Скинути
            </Button>
            <Button type="submit" variant={"contained"} disabled={submitting}>
              Submit
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    </>
  );
};

export { NewUserForm };
