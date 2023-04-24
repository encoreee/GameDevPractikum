import { FunctionComponent } from 'react';
import { useAppDispatch } from '../../app/hooks';

import MainPageTemplate from '../../components/MainPageTemplate';
import DataBox from '../../components/DataBox';
import DataField from '../../components/DataField';
import MainButton from '../../components/MainButton';
import NavLink from '../../components/NavLink';

const ProjectsPage: FunctionComponent = () => {
  return (
    <MainPageTemplate>
      <DataBox>
        <DataField label="Name" value="Alex"></DataField>
        <DataField label="Surname" value="Raykov"></DataField>
        <DataField label="Email" value="alexraykov@gmail.com"></DataField>
        <DataField label="Phone number" value="+7 123 4567890"></DataField>
        <DataField label="Login" value="alexraykov2000"></DataField>
        <MainButton label="Save" />
        <NavLink href="/">cancel</NavLink>
      </DataBox>
    </MainPageTemplate>
  );
};

export default ProjectsPage;
