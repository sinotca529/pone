import { UIComponent } from "../../types/screen";

type Field = {
  key: string;
  label: string;
  type: "string" | "number" | "color";
};

type Props = {
  component: UIComponent | null;
  schema: readonly Field[];
  onPropChange: (key: string, value: any) => void;
  background: string;
  textColor: string;
};

export function PropertyPanel({
  component,
  schema,
  onPropChange,
  background,
  textColor,
}: Props) {
  return (
    <div
      style={{
        width: "300px",
        borderLeft: "1px solid #444",
        background,
        color: textColor,
        padding: "1rem",
        overflow: "auto",
      }}
    >
      <h3 style={{ color: textColor }}>プロパティ</h3>
      {!component ? (
        <p style={{ color: textColor }}>要素を選択してください</p>
      ) : (
        schema.map((field) => (
          <div key={field.key} style={{ marginBottom: "0.75rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                color: textColor,
              }}
            >
              {field.label}
            </label>
            {field.type === "string" && (
              <input
                type="text"
                value={(component as any)[field.key] || ""}
                onChange={(e) => onPropChange(field.key, e.target.value)}
                style={{ width: "100%" }}
              />
            )}
            {field.type === "number" && (
              <input
                type="number"
                value={(component as any)[field.key] || 0}
                onChange={(e) =>
                  onPropChange(field.key, parseFloat(e.target.value))
                }
                style={{ width: "100%" }}
              />
            )}
            {field.type === "color" && (
              <input
                type="color"
                value={(component as any)[field.key] || "#000000"}
                onChange={(e) => onPropChange(field.key, e.target.value)}
                style={{
                  width: "100%",
                  height: "2rem",
                  padding: 0,
                  border: "none",
                }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}
