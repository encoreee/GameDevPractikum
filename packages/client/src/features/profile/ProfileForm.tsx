import DataField from '@/components/DataField';
import MainButton from '@/components/MainButton';
import React, { FC, useEffect, useState } from 'react';
import { User, ErrorData } from '../../infrastructure/api/auth/contracts';
import { useUpdateUserInfoMutation } from '@/app/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import FormErrorMessage from '../../components/FormErrorMessage';

type ProfileFormProps = { user?: User };

const ProfileForm: FC<ProfileFormProps> = (props: ProfileFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [login, setLogin] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [updateUserInfo, { error }] = useUpdateUserInfoMutation();
  const updateError = error as FetchBaseQueryError;

  useEffect(() => {
    if (props.user) {
      setFirstName(props.user.first_name);
      setSecondName(props.user.second_name);
      setLogin(props.user.login);
      setEmail(props.user.email);
      setPhone(props.user.phone);
      setDisplayName(props.user.display_name);
    }
  }, [props.user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateUserInfo({
      first_name: firstName,
      second_name: secondName,
      display_name: displayName,
      login: login,
      email: email,
      phone: phone,
    });
  };

  return (
    <React.Fragment>
      {props.user && (
        <form onSubmit={(event) => handleSubmit(event)}>
          <DataField
            label={'name'}
            value={props.user.first_name}
            onChange={setFirstName}></DataField>
          <DataField
            label={'surname'}
            value={props.user.second_name}
            onChange={setSecondName}></DataField>
          <DataField
            label={'login'}
            value={props.user.login}
            onChange={setLogin}></DataField>
          <DataField
            label={'display name'}
            value={props.user.display_name}
            onChange={setDisplayName}></DataField>
          <DataField
            label={'email'}
            value={props.user.email}
            onChange={setEmail}></DataField>
          <DataField
            label={'phone'}
            value={props.user.phone}
            onChange={setPhone}></DataField>
          <FormErrorMessage
            maxWidth="1000px"
            errorMessage={
              updateError ? (updateError.data as ErrorData).reason : ''
            }
          />
          <MainButton label="Save" type="submit" />
        </form>
      )}
    </React.Fragment>
  );
};

export default ProfileForm;
