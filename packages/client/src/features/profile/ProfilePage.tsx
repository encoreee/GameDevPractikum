import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import DataField from '../../components/DataField';
import MainButton from '../../components/MainButton';
import NavLink from '../../components/NavLink';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { User, selectUser, updateProfile } from '@/app/user/userSlice';

const ProjectsPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [first_name, setfirst_name] = useState('');
  const [second_name, setsecond_name] = useState('');
  const [login, setlogin] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');

  useEffect(() => {
    if (user.user) {
      setfirst_name(user.user.first_name);
      setsecond_name(user.user.second_name);
      setlogin(user.user.login);
      setemail(user.user.email);
      setphone(user.user.phone);
    }
  }, [user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      updateProfile({
        first_name: first_name,
        second_name: second_name,
        display_name: login,
        login: login,
        email: email,
        phone: phone,
      })
    );
  };

  const renderbase = (user: User | undefined) => {
    if (user) {
      return (
        <>
          <DataField
            label={'name'}
            value={user.first_name}
            onChange={setfirst_name}></DataField>
          <DataField
            label={'surname'}
            value={user.second_name}
            onChange={setsecond_name}></DataField>
          <DataField
            label={'login'}
            value={user.login}
            onChange={setlogin}></DataField>
          <DataField
            label={'email'}
            value={user.email}
            onChange={setemail}></DataField>
          <DataField
            label={'phone'}
            value={user.phone}
            onChange={setphone}></DataField>
        </>
      );
    }
  };

  return (
    <MainPageTemplate>
      <DataBox>
        <form onSubmit={(event) => handleSubmit(event)}>
          {user.user && renderbase(user.user)}
          <MainButton label="Save" />
          <NavLink href="/">cancel</NavLink>
        </form>
      </DataBox>
    </MainPageTemplate>
  );
};

export default ProjectsPage;
