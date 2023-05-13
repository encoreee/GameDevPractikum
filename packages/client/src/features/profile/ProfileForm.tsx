import { FC } from 'react';
import { useForm, FormContainer } from 'react-hook-form-mui';
import { User, ErrorData } from '../../infrastructure/api/auth/contracts';
import { useUpdateUserInfoMutation } from '@/app/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Grid } from '@mui/material';
import { ValidationScheme } from '../auth/SignUpValidationScheme';

import MainButton from '@/components/MainButton';
import FormErrorMessage from '../../components/FormErrorMessage';
import DataFieldLT from '../../components/DataFieldLabelOnTop';

type ProfileFormProps = { user?: User };

const ProfileForm: FC<ProfileFormProps> = (props: ProfileFormProps) => {
  const [updateUserInfo, { error }] = useUpdateUserInfoMutation();
  const updateError = error as FetchBaseQueryError;

  type UserProfile = Omit<User, 'avatar'>;

  const defaultValues = {
    first_name: props?.user?.first_name,
    second_name: props?.user?.second_name,
    email: props?.user?.email,
    login: props?.user?.login,
    display_name: props?.user?.display_name,
    phone: props?.user?.phone,
  };

  const formContext = useForm<UserProfile>({ defaultValues });

  const onSubmit = (data: UserProfile) => {
    console.log(data);

    updateUserInfo(data);
  };

  return (
    <FormContainer
      defaultValues={defaultValues}
      onSuccess={onSubmit}
      formContext={formContext}>
      <Grid
        container
        alignItems="center"
        spacing={4}
        rowSpacing={1}
        width="860px">
        <Grid item xs={6}>
          <DataFieldLT
            label="name"
            name="first_name"
            validation={ValidationScheme.name}
          />
        </Grid>
        <Grid item xs={6}>
          <DataFieldLT
            label="surname"
            name="second_name"
            validation={ValidationScheme.surname}
          />
        </Grid>
        <Grid item xs={6}>
          <DataFieldLT
            label="email"
            type="email"
            validation={{
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <DataFieldLT
            label="phone number"
            name="phone"
            validation={ValidationScheme.phoneNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <DataFieldLT label="login" validation={ValidationScheme.login} />
        </Grid>
        <Grid item xs={6}>
          <DataFieldLT label="display name" name="display_name" />
        </Grid>
      </Grid>
      <FormErrorMessage
        maxWidth="1000px"
        errorMessage={updateError ? (updateError.data as ErrorData).reason : ''}
      />
      <MainButton label="Save" type="submit" />
    </FormContainer>
  );
};

export default ProfileForm;
