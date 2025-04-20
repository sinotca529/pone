import React, { useEffect, useRef, useState } from "react";
import { UIComponent, Screen } from "../../types/screen";
import { UiWrapper } from "../draggable/UiWrapper";
import { FakeLabel, labelPropSchema } from "../ui/FakeLabel";
import { FakeButton, buttonPropSchema } from "../ui/FakeButton";
import { FakeInput, inputPropSchema } from "../ui/FakeInput";
import { FakeTable, tablePropSchema } from "../ui/FakeTable";

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

// type→コンポーネントマップ
const componentMap: Record<UIComponent["type"], React.ComponentType<any>> = {
  label: FakeLabel,
  button: FakeButton,
  input: FakeInput,
  table: FakeTable,
};

type CompType = keyof typeof componentMap;

// type→スキーママップ
const propSchemas = {
  label: labelPropSchema,
  button: buttonPropSchema,
  input: inputPropSchema,
  table: tablePropSchema,
} as const;

type Props = {
  screen: Screen;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onUpdate: (id: string, x: number, y: number, w: number, h: number) => void;
};

export function CanvasArea({ screen, selectedId, onSelect, onUpdate }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const updateScale = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const sx = container.clientWidth / CANVAS_WIDTH;
    const sy = container.clientHeight / CANVAS_HEIGHT;
    setScale(Math.min(sx, sy));
  };

  useEffect(() => {
    window.addEventListener("resize", updateScale);
    updateScale();
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    updateScale();
  }, [screen]);

  return (
    <div
      ref={containerRef}
      style={{ flex: 1, overflow: "hidden", padding: "1rem" }}
    >
      <div
        ref={canvasRef}
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "relative",
          background: "#ccc",
        }}
      >
        {screen.components.map((comp) => {
          const Renderer = componentMap[comp.type as CompType];
          const schema = propSchemas[comp.type as CompType] as readonly {
            key: string;
          }[];
          const props = schema.reduce<Record<string, any>>((acc, field) => {
            acc[field.key] = (comp as any)[field.key];
            return acc;
          }, {});

          return (
            <UiWrapper
              key={comp.id}
              id={comp.id}
              x={comp.x}
              y={comp.y}
              width={comp.width}
              height={comp.height}
              scale={scale}
              selected={comp.id === selectedId}
              onSelect={onSelect}
              onUpdate={onUpdate}
            >
              <Renderer {...props} />
            </UiWrapper>
          );
        })}
      </div>
    </div>
  );
}
