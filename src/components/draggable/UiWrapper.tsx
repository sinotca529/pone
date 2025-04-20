import { Rnd } from "react-rnd";

type Props = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  selected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => void;
  children: React.ReactNode;
};

export function UiWrapper({
  id,
  x,
  y,
  width,
  height,
  scale,
  selected,
  onSelect,
  onUpdate,
  children,
}: Props) {
  return (
    <Rnd
      size={{ width, height }}
      position={{ x, y }}
      scale={scale}
      bounds="parent"
      onDragStop={(_, data) => {
        // data.x, data.y は既にスケール補正済みの座標
        onUpdate(id, data.x, data.y, width, height);
      }}
      onResizeStop={(_, __, ref, ___, pos) => {
        onUpdate(
          id,
          pos.x,
          pos.y,
          parseInt(ref.style.width, 10),
          parseInt(ref.style.height, 10),
        );
      }}
      onClick={() => onSelect(id)}
      style={{
        border: selected ? "2px solid #007acc" : "2px solid #000",
        background: "#000",
      }}
    >
      {children}
    </Rnd>
  );
}
