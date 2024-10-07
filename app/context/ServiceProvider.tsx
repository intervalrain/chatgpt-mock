import { SidebarProvider } from "./SidebarContext";
import { AppProvider } from "./AppContext";
import { ConversationProvider } from "./ConversationContext";
import { AssistantProvider } from "./AssistantContext";

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <AppProvider>
        <ConversationProvider>
          <AssistantProvider>
            {children}
          </AssistantProvider>
        </ConversationProvider>
      </AppProvider>
    </SidebarProvider>
  );
};
