import { Paper, Stack } from '@mui/material'
import { FunctionComponent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'

import BackGround from '../../assets/backGround.png' // Import using relative path
import MainLabel from './componets/MainLabel'
import DataBox from './componets/DataBox'

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
          <DataBox></DataBox>
        </Stack>
      </Paper>
    </Container>
  )
}

export default ProjectsPage
