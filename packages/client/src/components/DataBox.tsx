import { Box, Stack } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'

type DataBoxProps = {
  height?: number
  width?: number
}

const DataBox: FunctionComponent<DataBoxProps> = (
  props: PropsWithChildren<DataBoxProps>
) => {
  return (
    <Box
      sx={{
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        backgroundColor: 'primary.dark',
        width: props.width,
        height: props.height,
      }}>
      <Stack
        margin="auto"
        direction="column"
        justifyContent="center"
        alignItems="center">
        {props.children}
      </Stack>
    </Box>
  )
}

DataBox.defaultProps = {
  height: 550,
  width: 600,
}

export default DataBox
