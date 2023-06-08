import { useEffect, useRef } from 'react';
import s from './style.module.css';
import cn from 'classnames';
import { SubmitButton } from 'components/Button';
import { ToastProvider, useToasts } from 'react-toast-notifications';
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

  let input = (
    <input
      name={name}
      id={name}
      placeholder={placeholder}
      type={type}
      multiple={multiple}
      readOnly={readOnly}
      {...register(name, validations)}
    />
  );

  if (options) {
    const ref = { ...register('form', validations) };

    input = (
      <>
        {!value && (
          <div className={s.selectPlaceholder}>Please select one...</div>
        )}
        <select name={name} id={name} ref={ref}>
          <option value="" />
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

export function FormInner({ children, defaultValues, submitLabel, name }) {
  const { addToast } = useToasts();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

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

  const formRef = useRef();
  // this has to be deconstructed like this otherwise it does not work
  const { handleSubmit } = methods;

  const onSubmit = (_values, event) => {
    event.target.submit();
  };

  // const privacy = (
  //   <div className={s.agree}>
  //     <>
  //       By submitting you agree to our{' '}
  //       <Link legacyBehavior href="/legal/terms">
  //         <a>TOS</a>
  //       </Link>{' '}
  //       and acknowledge our{' '}
  //       <Link legacyBehavior href="/legal/privacy-policy">
  //         <a>Privacy Policy</a>
  //       </Link>
  //     </>
  //   </div>
  // );

  return (
    <FormProvider {...methods}>
      <form
        className={s.form}
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        encType="multipart/form-data"
        acceptCharset="utf-8"
        name={name}
        data-netlify="true"
        id={name}
      >
        {children}
        <div className={s.submit}>
          <SubmitButton formHookId={name} label={submitLabel} />
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
