import { Outlet, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// components
import { Box, Stack } from '@mui/material';
// import { CopyrightSection, FooterSection } from '@pages/landing-page';

// ----------------------------------------------------------------------
const APP_BAR_MOBILE = 70;
const APP_BAR_DESKTOP = 70;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  backgroundColor: '#CDDEE1',
}));



// ----------------------------------------------------------------------

export default function index({ footer = true }) {
  const navigate = useNavigate()
  return (
    <RootStyle>
      {/* <NavbarLogoOnly /> */}
      <MainStyle>
          <Stack direction='row' justifyContent='center' alignItems='center'>
              <Box onClick={() => navigate('/')} component='img' src='/images/logo.png' sx={{ cursor: 'pointer', aspectRatio: '3/2', height: 120, objectFit: 'contain' }} />
          </Stack>
          <Outlet />
          {footer ?
          <>
              {/* <FooterSection /> */}
              {/* <CopyrightSection /> */}
          </>
          :null
          }
      </MainStyle>
    </RootStyle>
  );
}