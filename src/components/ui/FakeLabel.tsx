// components/ui/FakeLabel.tsx
import { BaseComponent } from "../../types/base";

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
};

// ラベル用プロパティスキーマ
export const labelPropSchema = [
  { key: "text", label: "テキスト", type: "string", default: "ラベル" },
  { key: "fontSize", label: "フォントサイズ", type: "number", default: 34 },
  { key: "color", label: "文字色", type: "color", default: "#333" },
] as const;

export function FakeLabel({ text, fontSize, color }: Props) {
  return (
    <div
      style={{
        fontSize: `${fontSize}px`,
        color,
        userSelect: "none",
        pointerEvents: "none",
        background: "#eee",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {text}
    </div>
  );
}

// 要素の型定義
export interface LabelComponent extends BaseComponent {
  type: "label";
  text: string;
  fontSize: number;
  color: string;
}
