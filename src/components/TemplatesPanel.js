'use client';

import React from 'react';
import {
  Card, CardHeader, CardContent, Grid, Paper, Typography,
  Box, Button, TextField, IconButton
} from '@mui/material';
import {
  FileCopy as FileCopyIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAppContext } from '../store/AppContext';

export default function TemplatesPanel() {
  const { templates } = useAppContext();

  return (
    <Card>
      <CardHeader 
        title="Szablony wiadomości" 
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container spacing={3}>
          {templates.map(template => (
            <Grid item xs={12} key={template.id}>
              <Paper 
                sx={{ 
                  p: 3, 
                  borderLeft: template.isDefault ? 4 : 0, 
                  borderColor: 'primary.main',
                  position: 'relative',
                  boxShadow: template.isDefault ? 2 : 1
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">
                    {template.name}
                    {template.isDefault && (
                      <Typography 
                        component="span" 
                        variant="caption" 
                        sx={{ 
                          ml: 2, 
                          px: 1, 
                          py: 0.5, 
                          bgcolor: 'primary.main', 
                          color: 'white', 
                          borderRadius: 1 
                        }}
                      >
                        Domyślny
                      </Typography>
                    )}
                  </Typography>
                  <Box>
                    {!template.isDefault && (
                      <Button 
                        size="small" 
                        sx={{ mr: 1 }}
                        variant="outlined"
                      >
                        Ustaw jako domyślny
                      </Button>
                    )}
                    <IconButton color="error" size="small">
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
                <TextField
                  multiline
                  fullWidth
                  minRows={6}
                  value={template.content}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ 
                    mt: 2,
                    mb: 1,
                    fontFamily: 'monospace' 
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    size="small" 
                    startIcon={<FileCopyIcon />}
                    variant="text"
                  >
                    Kopiuj
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
          
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mt: 2, borderLeft: 4, borderColor: 'secondary.main' }}>
              <Typography variant="h6" mb={2}>
                Dodaj nowy szablon
              </Typography>
              <TextField
                fullWidth
                label="Nazwa szablonu"
                variant="outlined"
                placeholder="Np. Szablon biznesowy, Zapytanie formalne..."
                sx={{ mb: 3 }}
              />
              <Typography variant="caption" color="text.secondary" paragraph>
                Dostępne placeholdery: [ADRES_URL], [SUGEROWANY_ADRES_URL_LINKU_ZWROTNEGO], [IMIE_NAZWISKO], [SPECJALIZACJA], [NAZWA_ORGANIZACJI]
              </Typography>
              <TextField
                multiline
                fullWidth
                minRows={8}
                label="Treść szablonu"
                placeholder="Wprowadź treść wiadomości z placeholderami w odpowiednich miejscach..."
                variant="outlined"
                sx={{ 
                  mb: 3,
                  fontFamily: 'monospace' 
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  color="secondary"
                >
                  Dodaj szablon
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}