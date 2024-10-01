import { createContext, useContext, useState } from "react";
import { LlmModel } from "../types";

interface AppContextType {
    model: LlmModel;
    setModel: (model: LlmModel) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [model, setModel] = useState<LlmModel>('Mistral');

    return (
        <AppContext.Provider value={{ model, setModel }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};