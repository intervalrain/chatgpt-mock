import { SidebarProvider } from "./SidebarContext";
import { AppProvider } from "./AppContext";
import { ConversationProvider } from "./ConversationContext";
import { AssistantProvider } from "./AssistantContext";
import { DocumentProvider } from "./DocumentContext";
import { DialogProvider } from "./DialogContext";
import { AuthProvider } from "./AuthContext";

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppProvider>
          <ConversationProvider>
            <AssistantProvider>
              <DocumentProvider>
                <DialogProvider>
                  {children}
                </DialogProvider>
              </DocumentProvider>
            </AssistantProvider>
          </ConversationProvider>
        </AppProvider>
      </SidebarProvider>
    </AuthProvider>
  );
};
