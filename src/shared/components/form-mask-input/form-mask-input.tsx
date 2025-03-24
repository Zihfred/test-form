import {
  FormControl,
  InputLabel,
  Input,
  Switch,
  InputProps,
} from "@mui/material";
import { IMaskInput } from "react-imask";
import { Field } from "react-final-form";
import { InfoOutlined } from "@mui/icons-material";
import React from "react";

type Props = InputProps & {
  name: string;
  label: string;
  mask: string;
  canDisabled?: boolean;
  disabledText?: string;
  disabledHelperText?: string;
};

const FormMaskInput = ({
  name,
  mask,
  canDisabled,
  disabledText,
  disabledHelperText,
  label,
  fullWidth,
  ...rest
}: Props) => {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <Field name={name}>
      {({ input, meta }) => (
        <FormControl variant="standard" fullWidth={fullWidth}>
          <InputLabel shrink={true} htmlFor={name}>
            {label}
          </InputLabel>
          <Input
            {...input}
            {...rest}
            id={name}
            inputComponent={TextMaskCustom as never}
            inputProps={{ mask }}
            error={meta.touched && !meta.valid && !!meta.error}
            endAdornment={
              canDisabled ? (
                <Switch
                  checked={!disabled}
                  onChange={(e) => {
                    setDisabled(!e.target.checked);
                    input.onChange(e.target.checked ? "" : disabledText);
                  }}
                />
              ) : meta.touched && meta.error ? (
                <InfoOutlined color="error" />
              ) : null
            }
            disabled={disabled}
          />
          {meta.touched && !meta.valid && meta.error && !disabled ? (
            <span
              style={{
                textAlign: "right",
                display: "block",
                color: "red",
                fontSize: "12px",
                paddingTop: "4px",
              }}
            >
              {meta.error}
            </span>
          ) : disabled ? (
            <span
              style={{
                textAlign: "right",
                display: "block",
                color: "gray",
                fontSize: "12px",
                paddingTop: "4px",
              }}
            >
              {disabledHelperText}
            </span>
          ) : null}
        </FormControl>
      )}
    </Field>
  );
};

const TextMaskCustom = React.forwardRef<
  HTMLInputElement,
  {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    mask: string;
  }
>(function TextMaskCustom(props, ref) {
  const { onChange, mask, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={mask}
      inputRef={ref}
      unmask={true}
      onAccept={(value: unknown) =>
        onChange({
          target: {
            name: props.name,
            value: typeof value === "string" ? value : "",
          },
        })
      }
      overwrite
    />
  );
});

export { FormMaskInput };
