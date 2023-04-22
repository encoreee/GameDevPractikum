import { LinkProps, Link as MuiLink } from '@mui/material';
import { FunctionComponent } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const NavLink: FunctionComponent<LinkProps> = (props) => {
  return (
    <MuiLink
      sx={{ margin: 1, textDecoration: 'none' }}
      component={ReactRouterLink}
      to={props.href ?? '#'}
      variant="h6"
      color="secondary.dark"
      {...props}
    />
  );
};

export default NavLink;
