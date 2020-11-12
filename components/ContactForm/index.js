import s from './style.module.css';
import Textarea from 'react-autosize-textarea';
import { Form, Field } from 'components/Form';

export default function ContactForm({ initialValues = {} }) {
  const defaultValues = {
    name: '',
    email: '',
    body: '',
    ...initialValues,
  };

  return (
    <div className={s.root}>
      <Form
        defaultValues={defaultValues}
        submitLabel="Register!"
        name="contact"
      >
        <div className={s.formCols}>
          <Field
            name="name"
            label="Full name"
            placeholder="Your full name"
            validations={{ required: 'Required' }}
          />
          <Field
            name="email"
            label="Your email"
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
          label="Message"
          placeholder="Message"
          validations={{ required: 'Required' }}
          as={<Textarea />}
        />

        {initialValues.errorId && (
          <Field name="errorId" label="Error ID" readOnly />
        )}
      </Form>
    </div>
  );
}
