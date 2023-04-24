import { Box, Stack } from '@mui/material';
import { FunctionComponent, PropsWithChildren } from 'react';

type DataBoxProps = PropsWithChildren<{
  height?: number;
  width?: number;
  marginTop?: number;
}>;

const DataBox: FunctionComponent<DataBoxProps> = (props) => {
  return (
    <Box
      sx={{
        marginTop: props.marginTop,
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
  );
};

DataBox.defaultProps = {
  height: 550,
  width: 700,
  marginTop: 10,
};

export default DataBox;
