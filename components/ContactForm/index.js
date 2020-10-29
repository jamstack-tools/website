import s from './style.module.css';
import Textarea from 'react-autosize-textarea';
import { getData } from 'country-list';
import { Form, Field } from 'components/Form';
import { getCookie } from 'utils/cookies';

export default function ContactForm({ initialValues = {}, issueType }) {
  const defaultValues = {
    name: '',
    project: '',
    email: getCookie('datoAccountEmail'),
    phoneNumber: '',
    companyName: '',
    country: '',
    jobTitle: '',
    companyRevenue: '',
    numberEmployees: '',
    body: '',
    errorId: '',
    issueType: issueType,
    ...initialValues,
  };

  function frontUrl() {
    return 'https://webhook.frontapp.com/forms/f51dbf7c0379d350b50e/sWPCwvUmu--UpyGfM9hRVfjaIwWCyVh-3I0nJ4gNZKU6fQeDGRdrNfYSsrIyeoqTcGPguYxKX-ULe-OYj08sar17B0gWytpkKNcAZNZB_0HTwk9jBCh5wEQCmsmm';
  }

  return (
    <div className={s.root}>
      <Form
        action={frontUrl()}
        defaultValues={defaultValues}
        submitLabel="Register!"
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
