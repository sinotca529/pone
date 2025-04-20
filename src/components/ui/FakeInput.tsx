// components/ui/FakeInput.tsx
import { BaseComponent } from "../../types/base";

type Props = {
  placeholder?: string;
  fontSize?: number;
  color?: string; // テキスト色
  backgroundColor?: string; // 背景色
};

// 入力欄用プロパティスキーマ
export const inputPropSchema = [
  {
    key: "placeholder",
    label: "プレースホルダー",
    type: "string",
    default: "入力してください",
  },
  { key: "fontSize", label: "フォントサイズ", type: "number", default: 34 },
  { key: "color", label: "文字色", type: "color", default: "#888" },
  { key: "backgroundColor", label: "背景色", type: "color", default: "#fff" },
] as const;

export function FakeInput({
  placeholder,
  fontSize,
  color,
  backgroundColor,
}: Props) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor,
        color,
        fontSize: `${fontSize}px`,
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {placeholder}
    </div>
  );
}

// 要素の型定義
export interface InputComponent extends BaseComponent {
  type: "input";
  placeholder: string;
  fontSize: number;
  color: string;
  backgroundColor: string;
}
