import s from './style.module.css';
import Textarea from 'react-autosize-textarea';
import { Form, Field } from 'components/Form';
import { getCookie } from 'utils/cookies';
import { categories } from 'lib/categories';

export default function RegisterForm({ initialValues = {}, issueType }) {
  const defaultValues = {
    name: '',
    project: '',
    email: '',
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

  return (
    <div className={s.root}>
      <Form
        defaultValues={defaultValues}
        submitLabel="Register!"
        name="register"
      >
        <input type="hidden" name="form-name" value="register" />
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
              ...categories.map(
                (category) => category.name + ' - ' + category.description,
              ),
              'Other - please specify in description :)',
            ]}
          />
          <Field
            name="pitch"
            label="Pitch description"
            placeholder="Define your tool in one sentence"
            validations={{ required: 'Required' }}
          />
        </div>

        <Field
          name="description"
          label="Full description"
          placeholder="Give a description of what your tool does - Markdown accepted"
          validations={{ required: 'Required' }}
          as={<Textarea />}
        />

        {initialValues.errorId && (
          <Field name="errorId" label="Error ID" readOnly />
        )}

        <Field name="logo" label="Add your tool logo" type="file" />

        <Field
          name="Screenshots"
          label="Add some images / screenshots"
          type="file"
          multiple
        />
      </Form>
    </div>
  );
}
