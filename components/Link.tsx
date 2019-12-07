/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes, { string } from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';

interface INextComposedProp {
  as: string;
  href: string;
  prefetch: boolean;
  [key: string]: any;
}

const NextComposed = React.forwardRef<HTMLAnchorElement, INextComposedProp>(
  (props, ref) => {
    const { as, href, prefetch, ...other } = props;

    return (
      <NextLink href={href} prefetch={prefetch} as={as}>
        <a ref={ref} {...other} />
      </NextLink>
    );
  },
);

interface ILinkProps {
  activeClassName: string;
  as: string;
  className: string;
  href: string;
  innerRef: React.Ref<HTMLAnchorElement>;
  naked: boolean;
  prefetch: boolean;
  [key: string]: any;
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link: React.FC<ILinkProps> = props => {
  const {
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;
  const router = useRouter();

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
  });

  if (naked) {
    return <NextComposed className={className} ref={innerRef} {...other} />;
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      {...other}
    />
  );
};

export default React.forwardRef<HTMLAnchorElement, ILinkProps>((props, ref) => (
  <Link {...props} innerRef={ref} />
));
