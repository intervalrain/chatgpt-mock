import { useDocuments } from "@/app/context/DocumentContext";
import { DSM } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import { MultiSelect } from "../ui/MultiSelect";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from "lucide-react";

interface DocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FilterOption {
  label: string;
  value: string;
}

const DocumentDialog: React.FC<DocumentDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    documents,
    selectedDocuments,
    setSelectedDocuments,
    loading,
    error,
    refreshDocuments,
  } = useDocuments();
  const [filters, setFilters] = useState({
    category: [] as FilterOption[],
    technology: [] as FilterOption[],
    generation: [] as FilterOption[],
    platform: [] as FilterOption[],
  });

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const filteredDocuments = documents.filter(
    (doc) =>
      (filters.category.length === 0 ||
        filters.category.some((f) => f.value === doc.category)) &&
      (filters.technology.length === 0 ||
        filters.technology.some((f) => f.value === doc.technology)) &&
      (filters.generation.length === 0 ||
        filters.generation.some((f) => f.value === doc.generation)) &&
      (filters.platform.length === 0 ||
        filters.platform.some((f) => f.value === doc.platform))
  );

  const unselectedDocuments = filteredDocuments.filter(
    (doc) => !selectedDocuments.includes(doc.id)
  );
  const selectedDocs = documents.filter((doc) =>
    selectedDocuments.includes(doc.id)
  );

  const handleFilterChange = (
    filterType: keyof typeof filters,
    values: FilterOption[]
  ) => {
    setFilters((prev) => ({ ...prev, [filterType]: values }));
  };

  const getFilterOptions = (
    filterType: keyof typeof filters
  ): FilterOption[] => {
    const options = Array.from(
      new Set(documents.map((doc) => doc[filterType]))
    );
    return options.map((option) => ({ label: option, value: option }));
  };

  const moveSelected = (direction: "right" | "left") => {
    if (direction === "right") {
      setSelectedDocuments((prev) => [
        ...prev,
        ...unselectedDocuments.map((doc) => doc.id),
      ]);
    } else {
      setSelectedDocuments([]);
    }
  };

  const moveOne = (direction: "right" | "left", docId: string) => {
    if (direction === "right") {
      setSelectedDocuments((prev) => [...prev, docId]);
    } else {
      setSelectedDocuments((prev) => prev.filter((id) => id !== docId));
    }
  };

  const removeFilter = (filterType: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].filter((option) => option.value !== value),
    }));
  };

  const handleConfirm = () => {
    // onConfirm(selectedDocs);
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
      <div
        ref={dialogRef}
        className="bg-white rounded-2xl p-6 max-w-3xl w-full"
      >
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
              <div className="grid grid-cols-4 gap-4 mb-4">
                {(Object.keys(filters) as Array<keyof typeof filters>).map(
                  (filterType) => (
                    <MultiSelect
                      key={filterType}
                      options={getFilterOptions(filterType)}
                      selected={filters[filterType]}
                      onChange={(values) =>
                        handleFilterChange(filterType, values)
                      }
                      placeholder={`0 selected`}
                      label={
                        filterType.charAt(0).toUpperCase() + filterType.slice(1)
                      }
                    />
                  )
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(filters).flatMap(([filterType, options]) =>
                  options.map((option) => (
                    <span
                      key={`${filterType}-${option.value}`}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"
                    >
                      {option.label}
                      <button
                        onClick={() =>
                          removeFilter(
                            filterType as keyof typeof filters,
                            option.value
                          )
                        }
                        className="ml-1 font-bold"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>

              <div className="flex flex-1 overflow-hidden h-96 justify-center">
                <div className="w-1/2 bg-white rounded shadow mr-2 flex flex-col">
                  <h2 className="text-base font-semibold p-2 bg-gray-200 text-gray-800">
                    Unselected Documents
                  </h2>
                  <ul className="divide-y divide-gray-200 overflow-auto flex-grow">
                    {unselectedDocuments.map((doc) => (
                      <li
                        key={doc.id}
                        className="p-2 hover:bg-gray-50 flex justify-between items-center"
                      >
                        <span className="text-sm">{doc.name}</span>
                        <button
                          onClick={() => moveOne("right", doc.id)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <button
                    onClick={() => moveSelected("right")}
                    className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    <ChevronsRight size={24} />
                  </button>
                  <button
                    onClick={() => moveSelected("left")}
                    className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    <ChevronsLeft size={24} />
                  </button>
                </div>
                <div className="w-1/2 bg-white rounded shadow ml-2">
                  <h2 className="text-base font-semibold p-2 bg-gray-200 text-gray-800">
                    Selected Documents
                  </h2>
                  <ul className="divide-y divide-gray-200 overflow-auto flex-grow">
                    {selectedDocs.map((doc) => (
                      <li
                        key={doc.id}
                        className="p-2 hover:bg-gray-50 flex justify-between items-center"
                      >
                        <span className="text-sm">{doc.name}</span>
                        <button
                          onClick={() => moveOne("left", doc.id)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <ChevronLeft size={20} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDialog;
