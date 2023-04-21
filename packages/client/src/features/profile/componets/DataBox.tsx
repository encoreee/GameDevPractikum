import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { FunctionComponent, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import DataField from './DataField'

const DataBox: FunctionComponent = () => {
  return (
    <Box
      sx={{
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        backgroundColor: 'primary.dark',
        width: 600,
        height: 500,
      }}>
      <Stack direction={'column'}>
        <DataField label="label" value="value"></DataField>
        <DataField label="label" value="value"></DataField>
        <DataField label="label" value="value"></DataField>
        <DataField label="label" value="value"></DataField>
        <DataField label="label" value="value"></DataField>
        <Button variant="contained" color="secondary">
          Save
        </Button>
        <Typography variant="h6" color="secondary.dark">
          cancel
        </Typography>
      </Stack>
    </Box>
  )
}

export default DataBox
