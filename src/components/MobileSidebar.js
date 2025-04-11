'use client';

import React from 'react';
import {
  Drawer, Toolbar, Box, List, Divider, Typography,
  ListItemButton, ListItemText, Avatar
} from '@mui/material';
import {
  ViewList as ViewListIcon,
  Description as TemplateIcon,
  Api as ApiIcon
} from '@mui/icons-material';
import { useAppContext } from '../store/AppContext';

export default function MobileSidebar({ open, onClose }) {
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
    onClose();
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
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
          >
            <ViewListIcon sx={{ mr: 2 }} />
            <ListItemText primary="Podmioty" />
          </ListItemButton>
          <ListItemButton
            selected={activeTab === 1}
            onClick={() => handleTabChange(1)}
          >
            <TemplateIcon sx={{ mr: 2 }} />
            <ListItemText primary="Szablony wiadomości" />
          </ListItemButton>
          <ListItemButton
            selected={activeTab === 2}
            onClick={() => handleTabChange(2)}
          >
            <ApiIcon sx={{ mr: 2 }} />
            <ListItemText primary="Ustawienia API" />
          </ListItemButton>
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" color="text.secondary" sx={{ px: 3, py: 1 }}>
          Podmioty
        </Typography>
        <List>
          {entities.map((entity) => (
            <ListItemButton
              key={entity.id}
              selected={selectedEntity?.id === entity.id}
              onClick={() => {
                setSelectedEntity(entity);
                setActiveTab(0);
                onClose();
              }}
            >
              <Avatar
                sx={{
                  mr: 2,
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main'
                }}
              >
                {entity.name.charAt(0)}
              </Avatar>
              <ListItemText
                primary={entity.name}
                secondary={entity.url}
                primaryTypographyProps={{ noWrap: true }}
                secondaryTypographyProps={{ noWrap: true }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}