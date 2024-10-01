import { SidebarProvider } from "./SidebarContext";
import { AppProvider } from "./AppContext";

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppProvider>
                {children} 
            </AppProvider>
        </SidebarProvider>
    );
};