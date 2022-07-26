import { z } from 'zod';
import PropTypes from 'prop-types';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isPostalCode from 'validator/lib/isPostalCode';
import {
  TextInput, Button, Group,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

const basicFields = [
  {
    name: 'email',
    title: 'Email',
    verify: z.string().email({ message: 'Invalid email' }).trim(),
  },
  {
    name: 'firstName',
    title: 'First Name',
    verify: z.string().min(2, { message: 'Name should have at least 2 letters' }).trim(),
  },
  {
    name: 'lastName',
    title: 'Last Name',
    verify: z.string().min(2, { message: 'Name should have at least 2 letters' }).trim(),
  },
  {
    name: 'phone',
    title: 'Phone Number',
    verify: z.string().refine(isMobilePhone, { message: 'Must be a valid phone number' }),
  },
  {
    name: 'streetAddress',
    title: 'Street Address',
  },
  {
    name: 'unitAddress',
    title: 'Unit Address',
  },
  {
    name: 'city',
    title: 'City',
  },
  {
    name: 'state',
    title: 'State',
  },
  {
    name: 'zipCode',
    title: 'Zip Code',
    verify: z.string().refine((str) => isPostalCode(str, 'US'), { message: 'Invalid zip code' }),
  },
];
const verificationSchema = z.object(
  basicFields.reduce((prevMap, currentValue) => {
    if (currentValue.verify) {
      // eslint-disable-next-line no-param-reassign
      prevMap[currentValue.name] = currentValue.verify;
    }
    return prevMap;
  }, new Map()),
);

function BasicForm({ onFormSubmit }) {
  const form = useForm({
    schema: zodResolver(verificationSchema),
    // Initialize all values to ''
    initialValues: basicFields.reduce((prevMap, currentValue) => {
      // eslint-disable-next-line no-param-reassign
      prevMap[currentValue.name] = '';
      return prevMap;
    }, {}),
  });
  return (
    <form onSubmit={form.onSubmit(onFormSubmit)}>
      {
      basicFields.map(({ name, title }) => (
        <TextInput
          required
          key={name}
          label={title}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...form.getInputProps(name)}
        />
      ))
    }
      <Group position="right" mt="md">
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
}

BasicForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default BasicForm;
