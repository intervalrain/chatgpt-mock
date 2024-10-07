import React from "react";
import Dialog from "@/app/components/ui/Dialog";

interface ManualDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManualDialog: React.FC<ManualDialogProps> = ({ isOpen, onClose }) => {
  const manualContent = `
## 1. 什麼是 RAG？

RAG 代表 Retrieval-Augmented Generation（檢索增強生成）。這是一種結合了資訊檢索和文本生成的 AI 技術。

- **工作原理**：
  1. 檢索（Retrieval）：從大型知識庫中找出相關資訊。
  2. 增強（Augmented）：將檢索到的資訊與用戶的查詢結合。
  3. 生成（Generation）：基於增強後的輸入生成回答。

- **優點**：
  - 提高回答的準確性和相關性
  - 減少幻覺（生成虛假資訊）的可能性
  - 能夠處理最新資訊，不受訓練數據時間限制

## 2. 怎麼選擇 Top-K？

Top-K 是在檢索階段選擇最相關文檔的參數。選擇合適的 K 值很重要：

- **K 值較小**（如 3-5）：
  - 優點：回答更集中，處理速度更快
  - 缺點：可能遺漏重要資訊

- **K 值較大**（如 10-20）：
  - 優點：提供更全面的資訊
  - 缺點：可能引入無關資訊，降低回答品質

- **建議**：
  1. 從中等值（如 5-10）開始
  2. 根據任務複雜度和資料庫大小調整
  3. 進行 A/B 測試，找出最佳 K 值

## 3. 如何調整 Temperature？

Temperature 控制生成文本的隨機性和創造性：

- **低 Temperature**（接近 0）：
  - 效果：更確定、一致的輸出
  - 適用：需要準確、可預測回答的場景（如客服、技術支持）

- **高 Temperature**（接近 1）：
  - 效果：更多樣、創新的輸出
  - 適用：創意寫作、頭腦風暴等需要多樣性的場景

- **調整建議**：
  1. 從中等值（如 0.5）開始
  2. 根據特定需求逐步調整
  3. 對於 RAG 系統，通常建議使用較低的 Temperature（0.1-0.3），以確保生成的回答緊密貼合檢索到的資訊

記住，這些參數的最佳設置可能因任務和數據集而異。持續測試和調整是找到最佳配置的關鍵。
  `;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="說明與常見問題"
      content={manualContent}
    />
  );
};

export default ManualDialog;
