import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DSM } from "../types";
import { getDocuments } from "../api/documents/route";

interface DocumentContextType {
	documents: DSM[];
	selectedDocuments: string[];
	setSelectedDocuments: React.Dispatch<React.SetStateAction<string[]>>;
	loading: boolean;
	error: string | null;
	refreshDocuments: () => Promise<void>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocuments = () => {
	const context = useContext(DocumentContext);
	if (context === undefined) {
		throw new Error("useDocuments must be used within a DocumentProvider");
	}
	return context;
};

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<DSM[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedDocuments = await getDocuments();
      setDocuments(fetchedDocuments);
    } catch (err) {
      setError('Failed to fetch documents');
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshDocuments();
  }, []);

  return (
    <DocumentContext.Provider 
      value={{ 
        documents, 
        selectedDocuments, 
        setSelectedDocuments, 
        loading, 
        error, 
        refreshDocuments 
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};