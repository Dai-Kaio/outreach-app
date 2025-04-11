'use client';

import React from 'react';
import {
  Card, CardHeader, CardContent, Grid, Paper, Typography,
  Box, Button, TextField, IconButton, Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  Send as SendIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { useAppContext } from '../store/AppContext';

export default function EntitiesPanel() {
  const { selectedEntity, setSelectedEntity, templates } = useAppContext();

  // Renderowanie wiadomości szablonu
  const getDefaultTemplate = () => {
    return templates.find(t => t.isDefault)?.content || '';
  };

  if (selectedEntity) {
    return (
      <Card>
        <CardHeader 
          title={selectedEntity.name}
          action={
            <IconButton onClick={() => setSelectedEntity(null)}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>URL:</Typography>
                <Typography 
                  component="a" 
                  href={`https://${selectedEntity.url}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' } 
                  }}
                >
                  {selectedEntity.url}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>Email:</Typography>
                {selectedEntity.email ? (
                  <Typography>{selectedEntity.email}</Typography>
                ) : (
                  <Button 
                    size="small" 
                    variant="contained" 
                    startIcon={<SearchIcon />}
                    color="primary"
                  >
                    Wyszukaj dane kontaktowe
                  </Button>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>Osoba kontaktowa:</Typography>
                <Typography>{selectedEntity.contact || '---'}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>Opis:</Typography>
                <Typography>{selectedEntity.description || '---'}</Typography>
              </Paper>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Szablon wiadomości</Typography>
              <Typography variant="body2" color="text.secondary">
                Szablon: <b>{templates.find(t => t.isDefault)?.name}</b>
              </Typography>
            </Box>
            <TextField
              multiline
              fullWidth
              minRows={10}
              defaultValue={getDefaultTemplate()}
              variant="outlined"
              sx={{ mb: 3, fontFamily: 'monospace' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                startIcon={<SendIcon />}
                size="large"
              >
                Wyślij wiadomość
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="Import podmiotów" 
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <Typography paragraph>
                Zaimportuj plik CSV z adresami URL. Aplikacja automatycznie odszuka dane kontaktowe.
              </Typography>
              <Box 
                sx={{ 
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 5,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <CloudUploadIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Kliknij, aby zaimportować plik CSV
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  lub przeciągnij i upuść plik tutaj
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="Import danych do wiadomości" 
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <Typography paragraph>
                Zaimportuj plik Excel z danymi dla placeholderów:
              </Typography>
              <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.default' }}>
                <Typography variant="body2" gutterBottom><b>Kolumna A:</b> Link artykułu [ADRES_URL]</Typography>
                <Typography variant="body2" gutterBottom><b>Kolumna B:</b> Link zwrotny [SUGEROWANY_ADRES_URL_LINKU_ZWROTNEGO]</Typography>
                <Typography variant="body2" gutterBottom><b>Kolumna C:</b> Imię i nazwisko [IMIE_NAZWISKO]</Typography>
                <Typography variant="body2" gutterBottom><b>Kolumna D:</b> Specjalizacja [SPECJALIZACJA]</Typography>
                <Typography variant="body2" gutterBottom><b>Kolumna E:</b> Nazwa organizacji [NAZWA_ORGANIZACJI]</Typography>
              </Paper>
              <Box 
                sx={{ 
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 5,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <CloudUploadIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Kliknij, aby zaimportować plik Excel
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  lub przeciągnij i upuść plik tutaj
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}