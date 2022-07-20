import { z } from 'zod';
import isMobilePhone from 'validator/lib/isMobilePhone'
import isPostalCode from 'validator/lib/isPostalCode'
import { TextInput, Checkbox, NumberInput, Stepper, Button, Group, Box, LoadingOverlay, Text, Center, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React, { useState } from 'react';
import { CircleX, Ballpen, CircleCheck, UserCheck } from 'tabler-icons-react';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }).trim(),
  firstName: z.string().min(2, { message: 'Name should have at least 2 letters' }).trim(),
  lastName: z.string().min(2, { message: 'Name should have at least 2 letters' }).trim(),
  phone: z.string().refine(isMobilePhone, { message: 'Must be a valid phone number' }),
  zipCode: z.string().refine((str) => { return isPostalCode(str, "US") }, { message: 'Invalid zip code' }),
});

export default function ProjectInfoCollectionForm({ project }) {
  const [active, setActive] = useState(0);
  // INPUT, SUBMITTING, SUCCESS, FAILED
  const [INPUT, SUBMITTING, SUCCESS, FAILED] = ["INPUT", "SUBMITTING", "SUCCESS", "FAILED"];
  const [formState, setFormState] = useState(INPUT);

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      streetAddress: '',
      unitAddress: '',
      city: '',
      state: '',
      zipCode: ''
    },
  });
  const onFormSubmit = (values) => {
    console.log({ ...values, projectId: project.id });
    setFormState(SUBMITTING);
    fetch("/api/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values, projectId: project.id }),
    }).then(res => {
      setActive(active + 2);
      if (res.ok) {
        setFormState(SUCCESS);
      } else {
        setFormState(FAILED);
        console.error(res.status);
      }
    })
  }
  const renderFormOrMessage = () => {
    switch (formState) {
      case INPUT:
      case SUBMITTING:
        return <form onSubmit={form.onSubmit(onFormSubmit)}>
          <TextInput
            disabled={formState !== INPUT}
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <TextInput
            disabled={formState !== INPUT}
            required
            label="First Name"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            disabled={formState !== INPUT}
            required
            label="Last Name"
            {...form.getInputProps('lastName')}
          />
          <TextInput
            disabled={formState !== INPUT}
            required
            label="Phone Number"
            {...form.getInputProps('phone')}
          />
          <TextInput
            disabled={formState !== INPUT}
            required
            label="Street Address"
            {...form.getInputProps('streetAddress')}
          />
          <TextInput
            disabled={formState !== INPUT}
            label="Unit Number"
            {...form.getInputProps('unitAddress')}
          />
          <TextInput
            disabled={formState !== INPUT}
            required
            label="City"
            {...form.getInputProps('city')}
          />
          <TextInput
            disabled={formState !== INPUT}
            required
            label="State"
            {...form.getInputProps('state')}
          />
          <TextInput
            disabled={formState !== INPUT}
            required
            label="Zip Code"
            {...form.getInputProps('zipCode')}
          />
          <Group position="right" mt="md">
            <Button type="submit">{formState === SUBMITTING ? "Submitting.." : "Submit"}</Button>
          </Group>
        </form>;
      case SUCCESS:
        return <Text size="lg" >Thank you, you have successfully signed up!</Text>
      case FAILED:
        return <Text size="lg">Sorry, sign up failed. Please contact your admin.</Text>
    }
  }
  return (
    <Box sx={{ maxWidth: 600 }} mx="auto">

      <Stepper active={active} completedIcon={<CircleCheck />}>
        <Stepper.Step icon={<Ballpen />} label="Sign up" />
        <Stepper.Step
          icon={<UserCheck />}
          color={formState === FAILED ? "red" : undefined}
          completedIcon={formState === FAILED ? <CircleX /> : undefined}
          label="Done!"
        />
      </Stepper>
      <Box sx={{ maxWidth: 350 }} mx="auto">
<Title order={3} align="center">{project.name} Sign Up</Title>
        <LoadingOverlay visible={formState === SUBMITTING} />
        {renderFormOrMessage()}
      </Box>
    </Box>
  );
}