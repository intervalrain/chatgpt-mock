import React, { createContext, useContext } from 'react'

interface SidebarContextType {
    isCollpased: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCollpased, setIsCollpased] = React.useState(false);

    const toggleSidebar = () => setIsCollpased(!isCollpased);

    return (
        <SidebarContext.Provider value={{ isCollpased, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};