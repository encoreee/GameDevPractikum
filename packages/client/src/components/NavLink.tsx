import { LinkProps, Link as MuiLink } from '@mui/material';
import { FunctionComponent } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const NavLink: FunctionComponent<LinkProps> = (props) => {
  return (
    <MuiLink
      component={ReactRouterLink}
      to={props.href ?? '#'}
      variant={props.variant}
      color={props.color}
      sx={{ margin: 1, textDecoration: 'none' }}
      underline="hover"
      {...props}
    />
  );
};

NavLink.defaultProps = {
  variant: 'h6',
  color: 'secondary.dark',
};

export default NavLink;
