'use client';

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(undefined);

// Dane przykładowe
const initialEntities = [
  { id: 1, name: 'Example Corp', url: 'example.com', email: 'contact@example.com', contact: 'Jan Kowalski', description: 'Firma technologiczna' },
  { id: 2, name: 'Test Blog', url: 'testblog.pl', email: 'info@testblog.pl', contact: 'Anna Nowak', description: 'Blog lifestyle\'owy' },
  { id: 3, name: 'E-commerce Shop', url: 'sklep-online.pl', email: null, contact: 'Piotr Wiśniewski', description: 'Sklep internetowy z elektroniką' }
];

const initialTemplates = [
  { 
    id: 1, 
    name: 'Domyślny szablon',
    isDefault: true,
    content: `Szanowni Państwo,

Piszę w sprawie artykułu, który został opublikowany na Państwa stronie - [ADRES_URL].

Zauważyłem, że w treści pojawiło się odniesienie do naszego produktu/usługi, jednak brakuje bezpośredniego linku do naszej strony. Chciałbym zaproponować dodanie linku zwrotnego: [SUGEROWANY_ADRES_URL_LINKU_ZWROTNEGO].

Dodanie tego odnośnika pozwoli Państwa czytelnikom na łatwiejszy dostęp do bardziej szczegółowych informacji o wspomnianym rozwiązaniu, a jednocześnie zwiększy wartość merytoryczną artykułu.

Z poważaniem,
[IMIE_NAZWISKO]
[SPECJALIZACJA]
[NAZWA_ORGANIZACJI]`
  },
  { 
    id: 2, 
    name: 'Krótka wiadomość',
    isDefault: false,
    content: `Dzień dobry,

Znalazłem/am Państwa artykuł: [ADRES_URL]

Proponuję dodanie linku zwrotnego: [SUGEROWANY_ADRES_URL_LINKU_ZWROTNEGO]

Pozdrawiam,
[IMIE_NAZWISKO]
[SPECJALIZACJA]
[NAZWA_ORGANIZACJI]`
  }
];

export function AppProvider({ children }) {
  // Stany aplikacji
  const [activeTab, setActiveTab] = useState(0);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entities, setEntities] = useState(initialEntities);
  const [templates, setTemplates] = useState(initialTemplates);
  const [apiType, setApiType] = useState('openai');

  // Funkcja do usuwania podmiotu
  const deleteEntity = (id) => {
    setEntities(entities.filter(entity => entity.id !== id));
    if (selectedEntity && selectedEntity.id === id) {
      setSelectedEntity(null);
    }
  };

  // Funkcja do ustawiania domyślnego szablonu
  const setDefaultTemplate = (id) => {
    setTemplates(templates.map(template => ({
      ...template,
      isDefault: template.id === id
    })));
  };

  // Funkcja do dodawania nowego szablonu
  const addTemplate = (template) => {
    const newTemplate = {
      ...template,
      id: Math.max(0, ...templates.map(t => t.id)) + 1,
      isDefault: false
    };
    setTemplates([...templates, newTemplate]);
  };

  // Funkcja do usuwania szablonu
  const deleteTemplate = (id) => {
    // Sprawdź, czy to nie jest domyślny szablon
    const template = templates.find(t => t.id === id);
    if (template && template.isDefault) {
      // Nie możemy usunąć domyślnego szablonu
      return false;
    }
    setTemplates(templates.filter(template => template.id !== id));
    return true;
  };

  // Wartość kontekstu
  const value = {
    activeTab,
    setActiveTab,
    selectedEntity,
    setSelectedEntity,
    entities,
    setEntities,
    deleteEntity,
    templates,
    setTemplates,
    setDefaultTemplate,
    addTemplate,
    deleteTemplate,
    apiType,
    setApiType,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};