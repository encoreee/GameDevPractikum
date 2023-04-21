import { Paper, Stack, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { styled } from '@mui/system'

import BackGround from '../../assets/backGround.png' // Import using relative path

import DataBox from '../../components/DataBox'
import MainLabel from '../../components/MainLabel'
import DataField from '../../components/DataField'
import MainButton from '../../components/MainButton'
import NavLink from '../../components/NavLink'

const Container = styled('div')({
  height: '98vh',
})

const styles = {
  paper: {
    width: '100%',
    minHeight: '100%',
    backgroundImage: `url(${BackGround})`,
  },
}

const ProjectsPage: FunctionComponent = () => {
  return (
    <Container>
      <Paper sx={{ display: 'flex' }} style={styles.paper}>
        <Stack
          sx={{ margin: 'auto' }}
          direction="column"
          justifyContent="center"
          alignItems="center">
          <MainLabel />
          <DataBox>
            <DataField label="Name" value="Alex"></DataField>
            <DataField label="Surname" value="Raykov"></DataField>
            <DataField label="Email" value="alexraykov@gmail.com"></DataField>
            <DataField label="Phone number" value="+7 123 4567890"></DataField>
            <DataField label="Login" value="alexraykov2000"></DataField>
            <MainButton label="Save" />
            <NavLink href="/">cancel</NavLink>
          </DataBox>
        </Stack>
      </Paper>
    </Container>
  )
}

export default ProjectsPage
