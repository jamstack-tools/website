import { useEffect } from 'react';
import s from './style.module.css';
import cn from 'classnames';
import Button from 'components/Button';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import Link from 'next/link';
import {
  FormProvider,
  useForm,
  useFormContext,
  Controller,
} from 'react-hook-form';

export const Field = ({
  name,
  label,
  placeholder,
  validations,
  options,
  as,
  type,
  multiple,
  readOnly,
}) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const value = watch(name);
  const field = register(name, validations);

  const ref = { ...register('form', validations) };

  let input = (
    <input
      {...field}
      name={name}
      id={name}
      placeholder={placeholder}
      type={type}
      multiple={multiple}
      readOnly={readOnly}
    />
  );

  if (options) {
    input = (
      <>
        {!value && (
          <div className={s.selectPlaceholder}>Please select one...</div>
        )}
        <select name={name} id={name} ref={ref}>
          <option value=""></option>
          {options.map((option) => {
            const value = typeof option === 'string' ? option : option.value;
            const label = typeof option === 'string' ? option : option.label;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </>
    );
  }

  if (as) {
    input = (
      <Controller
        render={as}
        name={name}
        id={name}
        control={control}
        placeholder={placeholder}
        rules={validations}
      />
    );
  }

  return (
    <div
      className={cn(s.field, {
        [s.fieldError]: errors?.[name]?.message,
      })}
    >
      <label htmlFor={name}>{label}</label>

      {errors?.[name] && (
        <div className={s.error}>← {errors[name].message}</div>
      )}
      {input}
    </div>
  );
};

export function FormInner({
  children,
  defaultValues,
  action,
  submitLabel,
  name,
}) {
  const { addToast } = useToasts();

  useEffect(() => {
    var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('code')) {
      const code = urlParams.get('code');

      if (code === 'ok') {
        addToast('Thank you! We will get in touch as soon as possible.', {
          appearance: 'success',
          autoDismiss: true,
        });
      } else {
        addToast('Ouch! There was an error submitting the form!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  }, []);

  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = (values, event) => {
    event.nativeEvent.currentTarget.submit();
  };

  const privacy = (
    <div className={s.agree}>
      <>
        By submitting you agree to our{' '}
        <Link legacyBehavior href="/legal/terms">
          <a>TOS</a>
        </Link>{' '}
        and acknowledge our{' '}
        <Link legacyBehavior href="/legal/privacy-policy">
          <a>Privacy Policy</a>
        </Link>
      </>
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form
        className={s.form}
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        encType="multipart/form-data"
        acceptCharset="utf-8"
        data-netlify="true"
        name={name}
      >
        {children}

        <div className={s.submit}>
          <Button render="button" type="submit">
            {submitLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export function Form(props) {
  return (
    <ToastProvider>
      <FormInner {...props} />
    </ToastProvider>
  );
}
