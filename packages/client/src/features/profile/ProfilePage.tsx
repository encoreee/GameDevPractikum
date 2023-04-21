import { Paper, Stack, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'

import BackGround from '../../assets/backGround.png' // Import using relative path

import DataBox from '../../components/DataBox'
import MainLabel from '../../components/MainLabel'
import DataField from '../../components/DataField'
import MainButton from '../../components/MainButton'

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  //const user = useAppSelector(selectUser)

  return (
    <Container>
      <Paper sx={{ display: 'flex' }} style={styles.paper}>
        <Stack sx={{ margin: 'auto' }} direction={'column'}>
          <MainLabel />
          <DataBox>
            <DataField label="label" value="value"></DataField>
            <DataField label="label" value="value"></DataField>
            <DataField label="label" value="value"></DataField>
            <DataField label="label" value="value"></DataField>
            <DataField label="label" value="value"></DataField>
            <MainButton label="Save" />
            <Typography sx={{ margin: 1 }} variant="h6" color="secondary.dark">
              cancel
            </Typography>
          </DataBox>
        </Stack>
      </Paper>
    </Container>
  )
}

export default ProjectsPage
