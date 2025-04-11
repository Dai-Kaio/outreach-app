'use client';

import React from 'react';
import {
  Card, CardHeader, CardContent, Typography, Box,
  Button, TextField, FormControl, FormControlLabel,
  Radio, RadioGroup, Paper
} from '@mui/material';
import { useAppContext } from '../store/AppContext';

export default function ApiSettingsPanel() {
  const { apiType, setApiType } = useAppContext();

  return (
    <Card>
      <CardHeader 
        title="Ustawienia API" 
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Typography paragraph>
          Wybierz dostawcę API do automatycznego wyszukiwania danych kontaktowych.
        </Typography>
        
        <FormControl fullWidth component="fieldset">
          <RadioGroup
            aria-label="api-provider"
            name="api-provider"
            value={apiType}
            onChange={(e) => setApiType(e.target.value)}
          >
            <Paper sx={{ p: 3, mb: 3, position: 'relative' }}>
              <FormControlLabel 
                value="openai" 
                control={<Radio />} 
                label={
                  <Box>
                    <Typography variant="subtitle1">OpenAI API</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Wykorzystuje zaawansowane modele językowe do wyszukiwania informacji.
                    </Typography>
                  </Box>
                } 
              />
              {apiType === 'openai' && (
                <Box sx={{ mt: 2, ml: 4 }}>
                  <TextField
                    fullWidth
                    label="Klucz API"
                    variant="outlined"
                    type="password"
                    placeholder="sk-..."
                    helperText="Klucz API znajdziesz w panelu OpenAI: https://platform.openai.com/api-keys"
                  />
                </Box>
              )}
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute', 
                  top: 10, 
                  right: 10, 
                  px: 1, 
                  py: 0.5, 
                  bgcolor: 'success.main', 
                  color: 'success.contrastText', 
                  borderRadius: 1 
                }}
              >
                Rekomendowane
              </Typography>
            </Paper>
            
            <Paper sx={{ p: 3, mb: 3 }}>
              <FormControlLabel 
                value="claude" 
                control={<Radio />} 
                label={
                  <Box>
                    <Typography variant="subtitle1">Claude API</Typography>
                    <Typography variant="body2" color="text.secondary">
                      API od Anthropic, specjalizujące się w rozumieniu kontekstu.
                    </Typography>
                  </Box>
                } 
              />
              {apiType === 'claude' && (
                <Box sx={{ mt: 2, ml: 4 }}>
                  <TextField
                    fullWidth
                    label="Klucz API"
                    variant="outlined"
                    type="password"
                    placeholder="sk-ant-..."
                    helperText="Klucz API znajdziesz w panelu Anthropic: https://console.anthropic.com/keys"
                  />
                </Box>
              )}
            </Paper>
            
            <Paper sx={{ p: 3 }}>
              <FormControlLabel 
                value="perplexity" 
                control={<Radio />} 
                label={
                  <Box>
                    <Typography variant="subtitle1">Perplexity API</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Specjalizuje się w wyszukiwaniu najnowszych informacji z internetu.
                    </Typography>
                  </Box>
                } 
              />
              {apiType === 'perplexity' && (
                <Box sx={{ mt: 2, ml: 4 }}>
                  <TextField
                    fullWidth
                    label="Klucz API"
                    variant="outlined"
                    type="password"
                    placeholder="pplx-..."
                    helperText="Klucz API znajdziesz w panelu Perplexity: https://perplexity.ai/settings/api"
                  />
                </Box>
              )}
            </Paper>
          </RadioGroup>
        </FormControl>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button 
            variant="contained" 
            size="large"
          >
            Zapisz ustawienia
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}