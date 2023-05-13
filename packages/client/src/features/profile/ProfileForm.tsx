import { FC } from 'react';
import { useForm, FormContainer } from 'react-hook-form-mui';
import { User, ErrorData } from '../../infrastructure/api/auth/contracts';
import { useUpdateUserInfoMutation } from '@/app/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Grid } from '@mui/material';
import { ValidationScheme } from '../auth/SignUpValidationScheme';

import DataField, { DATA_FIELD_VARIANTS } from '@/components/DataField';
import MainButton from '@/components/MainButton';
import FormErrorMessage from '../../components/FormErrorMessage';

type ProfileFormProps = { user?: User };

const ProfileForm: FC<ProfileFormProps> = (props: ProfileFormProps) => {
  const [updateUserInfo, { error }] = useUpdateUserInfoMutation();
  const updateError = error as FetchBaseQueryError;
  const variant = DATA_FIELD_VARIANTS.LABEL_TOP_RHF;

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
          <DataField
            label="name"
            name="first_name"
            variant={variant}
            validation={ValidationScheme.name}
          />
        </Grid>
        <Grid item xs={6}>
          <DataField
            label="surname"
            name="second_name"
            variant={variant}
            validation={ValidationScheme.surname}
          />
        </Grid>
        <Grid item xs={6}>
          <DataField
            label="email"
            type="email"
            variant={variant}
            validation={{
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <DataField
            label="phone number"
            name="phone"
            variant={variant}
            validation={ValidationScheme.phoneNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <DataField
            label="login"
            variant={variant}
            validation={ValidationScheme.login}
          />
        </Grid>
        <Grid item xs={6}>
          <DataField
            label="display name"
            name="display_name"
            variant={variant}
          />
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
