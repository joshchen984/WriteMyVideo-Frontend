import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Link from 'next/link';

type NavButtonProps = ButtonProps & { active?: boolean; href: string };
const NavButton = ({
  active = false,
  href,
  ...buttonProps
}: NavButtonProps) => {
  const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    color: active ? theme.palette.primary.main : 'black',
    fontWeight: 300,
  }));
  return (
    <Link href={href} passHref>
      <StyledButton disableRipple {...buttonProps} />
    </Link>
  );
};
export default NavButton;
