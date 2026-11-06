import { Controller } from 'react-hook-form';
import type { Control, FieldError } from 'react-hook-form';
import type { ContactsFormValues } from './CheckoutForm';

interface FormFieldProps {
  name: keyof ContactsFormValues;
  control: Control<ContactsFormValues>;
  error: FieldError | undefined;
  id: string;
  type: string;
  label: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

function FormField({
  name,
  control,
  error,
  id,
  type,
  label,
  disabled = false,
  fullWidth = false,
}: FormFieldProps) {
  const divClassName = `form-group${fullWidth ? ' full-width' : ''}`;
  const inputClassName =
    `${fullWidth ? 'full-width ' : ''}${error ? 'error' : ''}`.trim() || undefined;

  return (
    <div className={divClassName}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type={type}
            placeholder={label}
            id={id}
            {...field}
            disabled={disabled}
            className={inputClassName}
          />
        )}
      />
      {error && <span className="error-text">{error.message}</span>}
    </div>
  );
}

export default FormField;
