import { Switch, TextField, TextFieldProps } from "@mui/material";
import { Field } from "react-final-form";
import { InfoOutlined } from "@mui/icons-material";
import React from "react";

type Props = TextFieldProps & {
  name: string;
  canDisabled?: boolean;
  disabledText?: string;
  disabledHelperText?: string;
};

const FormTextField = ({
  name,
  canDisabled,
  disabledHelperText,
  disabledText,
  ...rest
}: Props) => {
  const [disabled, setDisabled] = React.useState(false);
  return (
    <Field name={name}>
      {(props) => (
        <>
          <TextField
            fullWidth
            name={props.input.name}
            value={props.input.value}
            onChange={props.input.onChange}
            onBlur={props.input.onBlur}
            error={props.meta.touched && !props.meta.valid && props.meta.error}
            slotProps={{
              ...props.slotProps,
              input: {
                endAdornment: (
                  <div>
                    {canDisabled ? (
                      <Switch
                        size={"small"}
                        disabled={false}
                        checked={!disabled}
                        onChange={(e) => {
                          if (e.target.checked) {
                            props.input.onChange("");
                            setDisabled(false);
                          } else {
                            props.input.onChange(disabledText);
                            setDisabled(true);
                          }
                        }}
                      />
                    ) : props.meta.touched && props.meta.error ? (
                      <InfoOutlined color={"error"} />
                    ) : (
                      ""
                    )}
                  </div>
                ),
              },
            }}
            disabled={disabled}
            {...rest}
            helperText={
              disabled ? (
                disabledHelperText
              ) : props.meta.touched &&
                !props.meta.valid &&
                props.meta.error ? (
                <span style={{ textAlign: "right", display: "block" }}>
                  {props.meta.error}
                </span>
              ) : (
                rest.helperText
              )
            }
          />
        </>
      )}
    </Field>
  );
};

export { FormTextField };
