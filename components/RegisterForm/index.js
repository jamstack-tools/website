import s from './style.module.css';
import Textarea from 'react-autosize-textarea';
import { getData } from 'country-list';
import { Form, Field } from 'components/Form';
import { getCookie } from 'utils/cookies';

export default function RegisterForm({ initialValues = {}, issueType }) {
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
    return 'https://webhook.frontapp.com/forms/f51dbf7c0379d350b50e/4GuYjvVpHX6Xqau-2EggC1eKeg0Iw_fMbehg2EbuLpRQARK6OetUIsAzCTs5-NdwQS_X02Qo1vdMMh6aNGLiySEIPM3EqvAkgNvPW-dQ6BdvbK4bXw1qwh3D2i5j';
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
        <div className={s.formCols}>
          <Field
            name="role"
            label="role"
            validations={{ required: 'Required' }}
            options={['Owner', 'Employee', 'Fan', 'Other']}
          />
          <Field
            name="toolName"
            label="Tool name"
            placeholder="Tool name"
            validations={{ required: 'Required' }}
          />
        </div>
        <div className={s.formCols}>
          <Field
            name="website"
            label="Official website"
            placeholder="what-a-tool.dev"
            validations={{ required: 'Required' }}
          />
          <Field
            name="pricing"
            label="Describe your pricing model"
            placeholder="Describe your pricing model"
            validations={{ required: 'Required' }}
          />
        </div>
        <div className={s.formCols}>
          <Field
            name="category"
            label="Which category best describes your tool?"
            validations={{ required: 'Required' }}
            options={[
              'Headless CMS',
              'Generator',
              'Feedback tool',
              'Payment tool',
              'UX tool',
              'Form tool',
              'other',
            ]}
          />
          <Field
            name="pricing"
            label="Describe your pricing model"
            placeholder="Describe your pricing model"
            validations={{ required: 'Required' }}
          />
        </div>

        <Field
          name="description"
          label="Description"
          placeholder="Give a description of what your tool does"
          validations={{ required: 'Required' }}
          as={<Textarea />}
        />

        {initialValues.errorId && (
          <Field name="errorId" label="Error ID" readOnly />
        )}

        <Field name="logo" label="Add your tool logo" type="file" />

        <Field
          name="Screenshots"
          label="Add some images/screenshots"
          type="file"
          multiple
        />
      </Form>
    </div>
  );
}
