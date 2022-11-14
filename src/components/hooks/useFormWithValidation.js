import { useCallback, useState } from "react";
import { validate } from "react-email-validator";

export const useFormWithValidation = (inputValues) => {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });

    if (name === "emailInput") {
      if (value) {
        if (validate(value)) {
          setIsValid(true);
          setErrors({ ...errors, [name]: "" });
        } else {
          setErrors({ ...errors, [name]: "Введен некорректный email" });
          setIsValid(false);
        }
      } else {
        setErrors({ ...errors, [name]: "Заполните это поле" });
        setIsValid(false);
      }
    } else {
      setIsValid(target.closest("form").checkValidity());
      setErrors({ ...errors, [name]: target.validationMessage });
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, setValues, errors, isValid, resetForm };
};
