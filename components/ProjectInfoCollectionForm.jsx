import { z } from 'zod';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isPostalCode from 'validator/lib/isPostalCode';
import {
  TextInput, Stepper, Button, Group, Box, LoadingOverlay, Text, Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React, { useState } from 'react';
import {
  CircleX, Ballpen, CircleCheck, UserCheck, Upload, Photo, X,
} from 'tabler-icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import BasicForm from './BasicForm';

export default function ProjectInfoCollectionForm({ project }) {
  const [active, setActive] = useState(0);
  const [INPUT, SUBMITTING, SUCCESS, FAILED] = ['INPUT', 'SUBMITTING', 'SUCCESS', 'FAILED'];
  const [formState, setFormState] = useState(INPUT);
  const onFormSubmit = (values) => {
    console.log({ ...values, projectId: project.id });
    setFormState(SUBMITTING);
    // fetch('/api/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ ...values, projectId: project.id }),
    // }).then((res) => {
    //   setActive(active + 2);
    //   if (res.ok) {
    //     setFormState(SUCCESS);
    //   } else {
    //     setFormState(FAILED);
    //     console.error(res.status);
    //   }
    // });
  };

  const renderFormOrMessage = () => {
    switch (formState) {
      case INPUT:
      case SUBMITTING:
        return (
          <BasicForm onFormSubmit={onFormSubmit} />
        );
      case SUCCESS:
        return <Text size="lg">Thank you, you have successfully signed up!</Text>;
      case FAILED:
        return <Text size="lg">Sorry, sign up failed. Please contact your admin.</Text>;
    }
  };
  return (
    <Box sx={{ maxWidth: 600 }} mx="auto">

      <Stepper active={active} completedIcon={<CircleCheck />}>
        <Stepper.Step icon={<Ballpen />} label="Sign up" />
        <Stepper.Step
          icon={<UserCheck />}
          color={formState === FAILED ? 'red' : undefined}
          completedIcon={formState === FAILED ? <CircleX /> : undefined}
          label="Done!"
        />
      </Stepper>
      <Box sx={{ maxWidth: 350 }} mx="auto">
        <Title order={3} align="center">
          {project.name}
          {' '}
          Info Collection
        </Title>
        <LoadingOverlay visible={formState === SUBMITTING} />
        {renderFormOrMessage()}
      </Box>
    </Box>
  );
}
