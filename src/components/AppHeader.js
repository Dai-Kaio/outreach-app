'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Brightness7 as LightModeIcon, Brightness4 as DarkModeIcon } from '@mui/icons-material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../providers/ThemeProvider';

export default function AppHeader({ onMobileMenuToggle }) {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: darkMode ? 'background.paper' : 'primary.main'
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMobileMenuToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Outreach App
        </Typography>

        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}