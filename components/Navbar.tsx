import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import Logo from './Logo';
import NavButton from './NavButton';

function ElevationScroll({ children }: { children: React.ReactElement }) {
  return React.cloneElement(children, {
    elevation: 4,
  });
}

const Navbar = () => {
  return (
    <>
      <ElevationScroll>
        <AppBar sx={{ backgroundColor: '#F9F9F9' }}>
          <Toolbar>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Logo />
              <Box>
                <NavButton>Create Video</NavButton>
                <NavButton>Tutorial</NavButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div css={{ marginBottom: '4.6em' }} />
    </>
  );
};

export default Navbar;
