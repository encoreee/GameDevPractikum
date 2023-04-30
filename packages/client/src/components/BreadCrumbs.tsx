import { Breadcrumbs, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

export type Props = {
  items?: string[];
};

const BreadCrumb: FunctionComponent<Props> = ({ items = [] }) => {
  return (
    <Breadcrumbs separator="->" sx={{ color: 'white' }}>
      {items.map((item, index) => (
        <Typography sx={{ color: 'white', fontSize: '1.5rem' }} key={index}>
          {item}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
