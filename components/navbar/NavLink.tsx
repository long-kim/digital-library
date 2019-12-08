import { Theme } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/styles';
import Link, { LinkProps } from 'next/link';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navLink: {
      margin: theme.spacing(0, 2),
      padding: '8px 12px',
    },
  }),
);

type NavLinkProps = Omit<ButtonProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

const NavLink = React.forwardRef<HTMLButtonElement, NavLinkProps>(
  ({ href, as, prefetch, children, ...props }, ref) => {
    const classes = useStyles();

    return (
      <Link href={href} as={as} prefetch={prefetch} passHref={true}>
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
