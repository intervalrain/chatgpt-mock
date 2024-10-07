import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
  assistantDialogOpen: boolean;
  settingsDialogOpen: boolean;
  openAssistantDialog: () => void;
  closeAssistantDialog: () => void;
  openSettingsDialog: () => void;
  closeSettingsDialog: () => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assistantDialogOpen, setAssistantDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const openAssistantDialog = () => setAssistantDialogOpen(true);
  const closeAssistantDialog = () => setAssistantDialogOpen(false);
  const openSettingsDialog = () => setSettingsDialogOpen(true);
  const closeSettingsDialog = () => setSettingsDialogOpen(false);

  return (
    <HeaderContext.Provider
      value={{
        assistantDialogOpen,
        settingsDialogOpen,
        openAssistantDialog,
        closeAssistantDialog,
        openSettingsDialog,
        closeSettingsDialog,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};