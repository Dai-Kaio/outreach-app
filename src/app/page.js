'use client';

import React, { useState } from 'react';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AppHeader from '../components/AppHeader';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';
import EntitiesPanel from '../components/EntitiesPanel';
import TemplatesPanel from '../components/TemplatesPanel';
import ApiSettingsPanel from '../components/ApiSettingsPanel';
import { useAppContext } from '../store/AppContext';

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { activeTab } = useAppContext();

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppHeader onMobileMenuToggle={handleMobileDrawerToggle} />
      
      {isMobile ? (
        <MobileSidebar 
          open={mobileDrawerOpen} 
          onClose={() => setMobileDrawerOpen(false)} 
        />
      ) : (
        <Sidebar />
      )}
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <Toolbar />
        
        {activeTab === 0 && <EntitiesPanel />}
        {activeTab === 1 && <TemplatesPanel />}
        {activeTab === 2 && <ApiSettingsPanel />}
      </Box>
    </Box>
  );
}