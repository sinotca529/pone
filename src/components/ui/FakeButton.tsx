// components/ui/FakeButton.tsx
import { BaseComponent } from "../../types/base";

type Props = {
  text: string;
  fontSize?: number;
  color?: string; // 背景色
  textColor?: string; // 文字色
};

// ボタン用プロパティスキーマ
export const buttonPropSchema = [
  { key: "text", label: "ボタン文字", type: "string", default: "ボタン" },
  { key: "fontSize", label: "フォントサイズ", type: "number", default: 34 },
  { key: "color", label: "背景色", type: "color", default: "#eee" },
  { key: "textColor", label: "文字色", type: "color", default: "#333" },
] as const;

export function FakeButton({ text, fontSize, color, textColor }: Props) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: color,
        color: textColor,
        fontSize: `${fontSize}px`,
        boxSizing: "border-box",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {text}
    </div>
  );
}

// 要素の型定義
export interface ButtonComponent extends BaseComponent {
  type: "button";
  text: string;
  fontSize: number;
  color: string;
  textColor: string;
}
