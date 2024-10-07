import { SidebarProvider } from "./SidebarContext";
import { AppProvider } from "./AppContext";
import { ConversationProvider } from "./ConversationContext";
import { AssistantProvider } from "./AssistantContext";
import { HeaderProvider } from "./HeaderContext";

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <AppProvider>
        <ConversationProvider>
          <AssistantProvider>
            <HeaderProvider>
              {children}
            </HeaderProvider>
          </AssistantProvider>
        </ConversationProvider>
      </AppProvider>
    </SidebarProvider>
  );
};
