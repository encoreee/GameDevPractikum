import { Breadcrumbs, Skeleton, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { BC_PENDING_SYMBOL } from './const';
import { BreadCrumbProps } from './types';

const BreadCrumb: FunctionComponent<BreadCrumbProps> = ({ items = [] }) => {
  return (
    <Breadcrumbs separator="->" sx={{ color: 'white' }}>
      {items.map((item, index) =>
        item === BC_PENDING_SYMBOL ? (
          <Skeleton
            key={index}
            sx={{ backgroundColor: '#ffffff70', fontSize: '1.5rem' }}
            width={'12rem'}
            variant="rounded"
          />
        ) : (
          <Typography color={'#fff'} fontSize={'1.5rem'} key={index}>
            {item}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
