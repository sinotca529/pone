type Props = { onAdd: (type: "label" | "button" | "input" | "table") => void };

export function Toolbar({ onAdd }: Props) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={() => onAdd("label")}>ラベル</button>
      <button onClick={() => onAdd("button")}>ボタン</button>
      <button onClick={() => onAdd("input")}>入力</button>
      <button onClick={() => onAdd("table")}>テーブル</button> {/* ← 追加 */}
    </div>
  );
}
