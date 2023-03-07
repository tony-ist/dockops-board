import { Link, LinkProps } from 'react-router-dom';

export const LinkStyled = (props: LinkProps) => {
  return <Link {...props} style={{ textDecoration: 'none', color: 'inherit', ...props.style }} />;
};
