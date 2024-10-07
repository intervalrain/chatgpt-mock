import React from "react";
import Dialog from "@/app/components/ui/Dialog";

interface PolicyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PolicyDialog: React.FC<PolicyDialogProps> = ({ isOpen, onClose }) => {
  const policyContent = `
+ **使用條款**：DSM Bot 上的所有服務皆屬公司內部使用。
+ **隱私保護**：SMG 因優化服務為目的收集聊天內容，而不會侵害使用者的隱私。
+ **服務條款**：SMG 有權對使用者的使用進行管理。
+ **商業條款**：DSM Bot 為以研究為目的開發的服務，不具有商業用途。
+ **服務變更**：SMG 保留修改或終止服務的權利。
+ **免責聲明**：DSM Bot 服務不對因使用服務而造成的損失負責。
`;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="使用條款和政策"
      content={policyContent}
    />
  );
};

export default PolicyDialog;