import s from './style.module.css';
import Textarea from 'react-autosize-textarea';
import { Form, Field } from 'components/Form';

export default function ContactForm({ initialValues = {} }) {
  const defaultValues = {
    fullName: '',
    email: '',
    message: '',
    ...initialValues,
  };

  return (
    <div className={s.root}>
      <Form defaultValues={defaultValues} submitLabel="Submit" name="contact">
        <input type="hidden" name="form-name" value="contact" />
        <div className={s.formCols}>
          <Field
            name="fullName"
            label="Full name *"
            placeholder="Your full name"
            validations={{ required: 'Required' }}
          />
          <Field
            name="email"
            label="Your email *"
            placeholder="me@example.com"
            validations={{
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,20}$/i,
                message: 'Invalid email',
              },
            }}
          />
        </div>

        <Field
          name="message"
          label="Message *"
          placeholder="Message"
          validations={{ required: 'Required' }}
          as={({ field }) => <Textarea {...field} />}
        />

        {initialValues.errorId && (
          <Field name="errorId" label="Error ID" readOnly />
        )}
      </Form>
    </div>
  );
}
