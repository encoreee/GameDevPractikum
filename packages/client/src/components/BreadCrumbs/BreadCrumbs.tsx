import { Breadcrumbs, Skeleton, Typography } from '@mui/material';
import { FC } from 'react';
import { BC_PENDING_SYMBOL } from './const';
import { BreadCrumbProps } from './types';

const BreadCrumb: FC<BreadCrumbProps> = ({ items = [] }) => {
  return (
    <Breadcrumbs separator="->" sx={{ color: 'white' }}>
      {items.map((item, index) =>
        item === BC_PENDING_SYMBOL ? (
          <Skeleton
            key={index}
            sx={{ backgroundColor: 'primary.dark', fontSize: '1.5rem' }}
            width={'12rem'}
            variant="rounded"
          />
        ) : (
          <Typography color={'text.primary'} fontSize={'1.5rem'} key={index}>
            {item}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
