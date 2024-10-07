import { useDocuments } from "@/app/context/DocumentContext";
import { DSM } from "@/app/types";
import { useEffect, useRef, useState } from "react";

interface DocumentDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (selectedDocuments: DSM[]) => void;
}

export interface FilterOption {
	label: string;
	value: string;
}

const DocumentDialog: React.FC<DocumentDialogProps> = ({ isOpen, onClose, onConfirm }) => {
	const { documents, selectedDocuments, setSelectedDocuments, loading, error, refreshDocuments } = useDocuments();
	const [filters, setFilters] = useState({
		category: [] as FilterOption[],
    technology: [] as FilterOption[],
    generation: [] as FilterOption[],
    platform: [] as FilterOption[]
	});

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen) {
			refreshDocuments();
		}
	}, [isOpen, refreshDocuments]);

  const filteredDocuments = documents.filter(doc => 
    (filters.category.length === 0 || filters.category.some(f => f.value === doc.category)) &&
    (filters.technology.length === 0 || filters.technology.some(f => f.value === doc.technology)) &&
    (filters.generation.length === 0 || filters.generation.some(f => f.value === doc.generation)) &&
    (filters.platform.length === 0 || filters.platform.some(f => f.value === doc.platform))
  );

	const unselectedDocuments = filteredDocuments.filter(doc => !selectedDocuments.includes(doc.id));
  const selectedDocs = documents.filter(doc => selectedDocuments.includes(doc.id));

  const handleFilterChange = (filterType: keyof typeof filters, values: FilterOption[]) => {
    setFilters(prev => ({ ...prev, [filterType]: values }));
  };

  const getFilterOptions = (filterType: keyof typeof filters): FilterOption[] => {
    const options = Array.from(new Set(documents.map(doc => doc[filterType])));
    return options.map(option => ({ label: option, value: option }));
  };

  const moveSelected = (direction: 'right' | 'left') => {
    if (direction === 'right') {
      setSelectedDocuments(prev => [...prev, ...unselectedDocuments.map(doc => doc.id)]);
    } else {
      setSelectedDocuments([]);
    }
  };

  const moveOne = (direction: 'right' | 'left', docId: string) => {
    if (direction === 'right') {
      setSelectedDocuments(prev => [...prev, docId]);
    } else {
      setSelectedDocuments(prev => prev.filter(id => id !== docId));
    }
  };

  const removeFilter = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(option => option.value !== value)
    }));
  };

  const handleConfirm = () => {
    onConfirm(selectedDocs);
    onClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div ref={dialogRef} className="bg-white rounded-2xl p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">DSM Documents</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="my-4 h-px bg-gray-200" role="none" />
        <div className="relative">
          {loading ? (
            <div className="text-center py-4">Loading documents...</div>
          ) : (
            <div>
							documents
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDialog;