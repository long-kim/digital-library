import { Theme } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navLink: {
      margin: theme.spacing(0, 2),
      padding: '8px 12px',
    },
    active: {
      color: theme.palette.common.white,
    },
  }),
);

type NavLinkProps = Omit<ButtonProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

const NavLink = React.forwardRef<HTMLButtonElement, NavLinkProps>(
  ({ as, children, href, prefetch, ...props }, ref) => {
    const classes = useStyles();
    const router = useRouter();

    return (
      <Link href={href} as={as} prefetch={prefetch} passHref={true}>
        <Button
          className={clsx(classes.navLink, {
            [classes.active]: router.pathname === href,
          })}
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
