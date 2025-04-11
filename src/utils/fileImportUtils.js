'use client';

import Papa from 'papaparse';
import * as XLSX from 'xlsx';

// Funkcja do parsowania pliku CSV
export const parseCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Funkcja do parsowania pliku Excel
export const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsArrayBuffer(file);
  });
};

// Funkcja przetwarzająca dane z CSV do formatu podmiotów
export const processCSVToEntities = (data) => {
  // Zakładamy, że CSV ma kolumny: url, email (opcjonalnie), contact (opcjonalnie), description (opcjonalnie)
  return data.map((row, index) => {
    return {
      id: Date.now() + index, // unikalny identyfikator
      name: extractDomainName(row.url || ''),
      url: row.url || '',
      email: row.email || null,
      contact: row.contact || null,
      description: row.description || ''
    };
  }).filter(entity => entity.url); // Odfiltruj wiersze bez URL
};

// Funkcja przetwarzająca dane z Excel do formatu danych wiadomości
export const processExcelToTemplateData = (data) => {
  // Zakładamy, że Excel ma kolumny: url, linkback, name, specialization, organization
  return data.map(row => {
    return {
      adresUrl: row.url || row.URL || row['Link artykułu'] || '',
      sugerowany: row.linkback || row['Link zwrotny'] || row['SUGEROWANY_ADRES_URL_LINKU_ZWROTNEGO'] || '',
      imieNazwisko: row.name || row['Imię i nazwisko'] || row['IMIE_NAZWISKO'] || '',
      specjalizacja: row.specialization || row.Specjalizacja || row.SPECJALIZACJA || '',
      nazwaOrganizacji: row.organization || row['Nazwa organizacji'] || row.NAZWA_ORGANIZACJI || ''
    };
  });
};

// Funkcja pomocnicza do wyodrębnienia nazwy domeny z URL
const extractDomainName = (url) => {
  try {
    // Usuń http://, https://, www. i wszystko po pierwszym /
    let domain = url.replace(/^https?:\/\//i, '')
                   .replace(/^www\./i, '')
                   .split('/')[0];
    
    // Podziel na części i weź pierwszą część (przed kropką) jako nazwę
    let parts = domain.split('.');
    if (parts.length > 1) {
      // Zwróć pierwszą część z dużej litery
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }
    return domain;
  } catch (e) {
    return url; // W przypadku błędu zwróć oryginalny URL
  }
};

// Funkcja do zastąpienia placeholderów w szablonie danymi
export const fillTemplateWithData = (templateContent, data) => {
  let filledContent = templateContent;
  
  filledContent = filledContent.replace('[ADRES_URL]', data.adresUrl || '');
  filledContent = filledContent.replace('[SUGEROWANY_ADRES_URL_LINKU_ZWROTNEGO]', data.sugerowany || '');
  filledContent = filledContent.replace('[IMIE_NAZWISKO]', data.imieNazwisko || '');
  filledContent = filledContent.replace('[SPECJALIZACJA]', data.specjalizacja || '');
  filledContent = filledContent.replace('[NAZWA_ORGANIZACJI]', data.nazwaOrganizacji || '');
  
  return filledContent;
};