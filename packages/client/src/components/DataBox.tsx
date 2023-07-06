import { Box, Stack, SxProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type DataBoxProps = PropsWithChildren<{
  height?: number;
  width?: number;
  marginTop?: number;
  sx?: SxProps;
}>;

const DataBox: FC<DataBoxProps> = (props) => {
  const sx: SxProps = {
    marginTop: props.marginTop,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    backgroundColor: 'primary.main',
    width: props.width,
    height: props.height,
  };

  if (props.sx) {
    Object.assign(sx, props.sx);
  }

  return (
    <Box sx={sx}>
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
