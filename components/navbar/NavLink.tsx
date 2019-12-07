import React from 'react';
import Link, { LinkProps } from 'next/link';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navLink: {
      margin: `0 ${theme.spacing(2)}px`,
      padding: '8px 12px',
    },
  }),
);

type NavLinkProps = Omit<ButtonProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

const NavLink = React.forwardRef<any, NavLinkProps>(
  ({ href, as, prefetch, children, ...props }, ref) => {
    const classes = useStyles();

    return (
      <Link href={href} as={as} prefetch={prefetch} passHref>
        <Button
          className={classes.navLink}
          color="inherit"
          ref={ref}
          {...props}
        >
          {children}
        </Button>
      </Link>
    );
  },
);

export default NavLink;
