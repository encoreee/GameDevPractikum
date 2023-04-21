import { Stack, Typography } from '@mui/material'
import { FunctionComponent } from 'react'

const MainLabel: FunctionComponent = () => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-end"
      alignItems="flex-end"
      spacing={1}>
      <Typography
        variant="h1"
        sx={{
          backgroundcolor: 'primary',
          backgroundImage: `linear-gradient(100deg, #CB5DD9, #004FC4)`,
          backgroundSize: '100%',
          backgroundRepeat: 'repeat',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
        Galaga
      </Typography>
      <Typography
        variant="h6"
        sx={{
          backgroundcolor: 'primary',
          backgroundImage: `linear-gradient(100deg, #006569, #035639)`,
          backgroundSize: '100%',
          backgroundRepeat: 'repeat',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
        by react&.
      </Typography>
    </Stack>
  )
}

export default MainLabel
