import React from "react";
import Dialog from "@/app/components/ui/Dialog";

interface VersionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const VersionDialog: React.FC<VersionDialogProps> = ({ isOpen, onClose }) => {
  const versionContent = `
## 當前版本：v0.0.2

## 更新日誌

### v0.0.1 (2024-10-05)
- UI 改版
- 權限控管功能上線
- 支援多對話視窗
- 支援中英雙語系
- 提供歷史對話紀錄

### v0.0.1 (2024-09-05)
- Proto Type 版本發布
- 實現基本對話功能
- 完成 DSM RAG
`;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="版本資訊"
      content={versionContent}
    />
  );
};

export default VersionDialog;