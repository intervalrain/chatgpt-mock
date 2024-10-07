import { createContext, useContext, useState } from 'react';

type DialogType = 
	| 'assistant' 
	| 'settings'
	| 'hotkey'
	| 'version'
	| 'manual'
	| 'policy'
	| 'document';

interface DialogContextType {
  openDialog: (type: DialogType) => void;
  closeDialog: () => void;
  isDialogOpen: (type: DialogType) => boolean;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onOpenDialog, setOnOpenDialog] = useState<DialogType | null>(null);

  const openDialog = (type: DialogType) => {
    setOnOpenDialog(type);
  };

	const closeDialog = () => {
		setOnOpenDialog(null);
	}

  const isDialogOpen = (type: DialogType) => onOpenDialog === type;

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isDialogOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};