import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

type NavButtonProps = ButtonProps & { active?: boolean };
const NavButton = ({ active = false, ...buttonProps }: NavButtonProps) => {
  const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    color: active ? theme.palette.primary.main : 'black',
    fontWeight: 300,
  }));
  return <StyledButton disableRipple {...buttonProps} />;
};
export default NavButton;
