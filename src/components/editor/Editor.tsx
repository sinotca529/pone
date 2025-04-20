// components/editor/Editor.tsx
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { Screen, UIComponent } from "../../types/screen";
import { Toolbar } from "./Toolbar";
import { CanvasArea } from "./CanvasArea";
import { PropertyPanel } from "./PropertyPanel";
import { labelPropSchema } from "../ui/FakeLabel";
import { buttonPropSchema } from "../ui/FakeButton";
import { inputPropSchema } from "../ui/FakeInput";
import { tablePropSchema } from "../ui/FakeTable";

const PROP_PANEL_BACKGROUND = "#2b2b2b";
const PROP_PANEL_TEXT = "#fff";

// 各要素のスキーマを集約（default含む）
const propSchemas = {
  label: labelPropSchema,
  button: buttonPropSchema,
  input: inputPropSchema,
  table: tablePropSchema,
} as const;

export function Editor({
  screen,
  onUpdateScreen,
}: {
  screen: Screen | null;
  onUpdateScreen: (screen: Screen) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 最新の selectedId と screen を ref に保持
  const selectedRef = useRef<string | null>(null);
  useEffect(() => {
    selectedRef.current = selectedId;
  }, [selectedId]);

  const screenRef = useRef<Screen | null>(screen);
  useEffect(() => {
    screenRef.current = screen;
  }, [screen]);

  // Delete キーで要素削除
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selectedRef.current && screenRef.current) {
        const idToDelete = selectedRef.current;
        const sc = screenRef.current;
        onUpdateScreen({
          ...sc,
          components: sc.components.filter((c) => c.id !== idToDelete),
        });
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onUpdateScreen]);

  // 新規要素追加
  const handleAdd = (type: UIComponent["type"]) => {
    if (!screen) return;
    // スキーマから default 値を抽出
    const schema = propSchemas[type] as readonly any[];
    const defaults = schema.reduce<Partial<UIComponent>>((acc, field) => {
      if ("default" in field)
        acc[field.key as keyof UIComponent] = field.default;
      return acc;
    }, {});

    const newComponent = {
      id: nanoid(),
      type,
      x: 0,
      y: 0,
      width: 150,
      height: 100,
      ...defaults,
    } as UIComponent;

    onUpdateScreen({
      ...screen,
      components: [...screen.components, newComponent],
    });
  };

  // 要素位置・サイズ更新
  const handleUpdate = (
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    if (!screen) return;
    onUpdateScreen({
      ...screen,
      components: screen.components.map((c) =>
        c.id === id ? { ...c, x, y, width, height } : c,
      ),
    });
  };

  // プロパティ変更
  const handlePropChange = (key: string, value: any) => {
    if (!screen || !selectedId) return;
    onUpdateScreen({
      ...screen,
      components: screen.components.map((c) =>
        c.id === selectedId ? { ...c, [key]: value } : c,
      ),
    });
  };

  const selectedComp =
    screen?.components.find((c) => c.id === selectedId) || null;

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {screen ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* ツールバー */}
          <div style={{ borderBottom: "1px solid #444" }}>
            <Toolbar onAdd={handleAdd} />
          </div>

          {/* キャンバス */}
          <CanvasArea
            screen={screen}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onUpdate={handleUpdate}
          />
        </div>
      ) : (
        <div style={{ flex: 1, padding: "1rem" }}>画面を選択してください</div>
      )}

      {/* プロパティパネル */}
      <PropertyPanel
        component={selectedComp}
        schema={selectedComp ? propSchemas[selectedComp.type] : []}
        onPropChange={handlePropChange}
        background={PROP_PANEL_BACKGROUND}
        textColor={PROP_PANEL_TEXT}
      />
    </div>
  );
}
