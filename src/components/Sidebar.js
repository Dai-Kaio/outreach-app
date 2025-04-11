'use client';

import React, { useState } from 'react';
import {
  Drawer, Toolbar, Box, List, Divider, Typography,
  ListItemButton, ListItemText, IconButton, Avatar
} from '@mui/material';
import {
  ViewList as ViewListIcon,
  Description as TemplateIcon,
  Api as ApiIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useAppContext } from '../store/AppContext';

export default function Sidebar() {
  const muiTheme = useMuiTheme();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const {
    activeTab,
    setActiveTab,
    selectedEntity,
    setSelectedEntity,
    entities
  } = useAppContext();

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    setSelectedEntity(null);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerOpen ? 280 : 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerOpen ? 280 : 72,
          boxSizing: 'border-box',
          overflow: drawerOpen ? 'auto' : 'hidden',
          transition: muiTheme.transitions.create('width', {
            easing: muiTheme.transitions.easing.sharp,
            duration: muiTheme.transitions.duration.enteringScreen,
          }),
          bgcolor: 'background.paper'
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', pt: 2 }}>
        <List component="nav">
          <ListItemButton
            selected={activeTab === 0}
            onClick={() => handleTabChange(0)}
            sx={{
              pl: drawerOpen ? 3 : 2.5,
              py: 1.5,
              minHeight: 48,
              justifyContent: drawerOpen ? 'initial' : 'center'
            }}
          >
            <ViewListIcon sx={{ mr: drawerOpen ? 2 : 0 }} />
            {drawerOpen && <ListItemText primary="Podmioty" />}
          </ListItemButton>
          <ListItemButton
            selected={activeTab === 1}
            onClick={() => handleTabChange(1)}
            sx={{
              pl: drawerOpen ? 3 : 2.5,
              py: 1.5,
              minHeight: 48,
              justifyContent: drawerOpen ? 'initial' : 'center'
            }}
          >
            <TemplateIcon sx={{ mr: drawerOpen ? 2 : 0 }} />
            {drawerOpen && <ListItemText primary="Szablony wiadomości" />}
          </ListItemButton>
          <ListItemButton
            selected={activeTab === 2}
            onClick={() => handleTabChange(2)}
            sx={{
              pl: drawerOpen ? 3 : 2.5,
              py: 1.5,
              minHeight: 48,
              justifyContent: drawerOpen ? 'initial' : 'center'
            }}
          >
            <ApiIcon sx={{ mr: drawerOpen ? 2 : 0 }} />
            {drawerOpen && <ListItemText primary="Ustawienia API" />}
          </ListItemButton>
        </List>

        <Divider sx={{ my: 2 }} />

        {drawerOpen && (
          <Typography variant="subtitle2" color="text.secondary" sx={{ px: 3, py: 1 }}>
            Podmioty
          </Typography>
        )}

        <List>
          {entities.map((entity) => (
            <ListItemButton
              key={entity.id}
              selected={selectedEntity?.id === entity.id}
              onClick={() => {
                setSelectedEntity(entity);
                setActiveTab(0);
              }}
              sx={{
                pl: drawerOpen ? 3 : 2,
                py: 1,
                minHeight: 48,
                justifyContent: drawerOpen ? 'initial' : 'center'
              }}
            >
              <Avatar
                sx={{
                  mr: drawerOpen ? 2 : 0,
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main'
                }}
              >
                {entity.name.charAt(0)}
              </Avatar>
              {drawerOpen && (
                <ListItemText
                  primary={entity.name}
                  secondary={entity.url}
                  primaryTypographyProps={{ noWrap: true }}
                  secondaryTypographyProps={{ noWrap: true }}
                />
              )}
            </ListItemButton>
          ))}
        </List>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <IconButton
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ transform: drawerOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
}