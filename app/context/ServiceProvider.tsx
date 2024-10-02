import { SidebarProvider } from "./SidebarContext";
import { AppProvider } from "./AppContext";
import { ConversationProvider } from "./ConversationContext";

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SidebarProvider>
            <ConversationProvider>
                <AppProvider>
                    {children} 
                </AppProvider>
            </ConversationProvider>
        </SidebarProvider>
    );
};