import { useScroll } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha, styled } from '@mui/material/styles';

import { HEADER } from 'src/layouts/config-layout';
import { bgGradient } from 'src/theme/css';

import { MotionContainer } from 'src/components/animate';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
  height: '100vh',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    marginTop: HEADER.H_DESKTOP_OFFSET,
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const hide = percent > 120;

  return (
    <>
      <StyledRoot
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container columnSpacing={{ md: 10 }} sx={{ height: 1 }}>
              <Grid xs={12} md={6}>
                <List>
                  <Link href={paths.auth.backoffice.jwt.login}>
                    <ListItem>
                      <ListItemText primary="login page" />
                    </ListItem>
                  </Link>
                  <Link href={paths.auth.backoffice.jwt.register}>
                    <ListItem>
                      <ListItemText primary="Create password page" />
                    </ListItem>
                  </Link>
                  <Link href={paths.auth.backoffice.jwt.newPassword}>
                    <ListItem>
                      <ListItemText primary="New password page" />
                    </ListItem>
                  </Link>
                  <Link href={paths.auth.backoffice.jwt.forgotPassword}>
                    <ListItem>
                      <ListItemText primary="Forgot password page" />
                    </ListItem>
                  </Link>
                  <Link href={paths.auth.backoffice.jwt.confirmNewPassword}>
                    <ListItem>
                      <ListItemText primary="Confirmed new password page" />
                    </ListItem>
                  </Link>
                  <Link href={paths.auth.backoffice.jwt.verify}>
                    <ListItem>
                      <ListItemText primary="Verify page" />
                    </ListItem>
                  </Link>
                  <Link href={paths.backoffice.root}>
                    <ListItem>
                      <ListItemText primary="BACKOFFICE MENU" />
                    </ListItem>
                  </Link>
                </List>
              </Grid>
            </Grid>
          </Container>
        </StyledWrapper>
      </StyledRoot>
    </>
  );
}
