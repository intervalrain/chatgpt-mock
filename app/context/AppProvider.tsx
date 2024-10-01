import { SidebarProvider } from "./SidebarContext";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SidebarProvider>
            {children} 
        </SidebarProvider>
    );
};