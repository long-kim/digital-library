import Button, { ButtonProps } from '@material-ui/core/Button';
import Link, { LinkProps } from 'next/link';
import React from 'react';

type ButtonLinkProps = Omit<ButtonProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

const ButtonLink = React.forwardRef<HTMLButtonElement, ButtonLinkProps>(
  ({ href, as, prefetch, children, ...props }, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref={true}>
      <Button {...props}>{children}</Button>
    </Link>
  ),
);

export default ButtonLink;
