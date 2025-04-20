import { BaseComponent } from "../../types/base";

// Props 定義
type Props = {
  columnNames: string; // カンマ区切りの列名
  rowCount: number; // 行数
  fontSize?: number; // フォントサイズ(px)
};

// テーブル用プロパティスキーマ（default含む）
export const tablePropSchema = [
  {
    key: "columnNames",
    label: "列名 (カンマ区切り)",
    type: "string",
    default: "列1,列2",
  },
  { key: "rowCount", label: "行数", type: "number", default: 3 },
  { key: "fontSize", label: "フォントサイズ", type: "number", default: 34 },
] as const;

// テーブルコンポーネント本体
export function FakeTable({ columnNames, rowCount, fontSize = 14 }: Props) {
  const cols = columnNames.split(",");
  const rows = Array.from({ length: rowCount });
  const totalRows = rowCount + 1; // ヘッダー行 + データ行数
  const rowHeightPercent = 100 / totalRows;

  // セル共通スタイル
  const cellStyle: React.CSSProperties = {
    border: "4px solid #000",
    padding: "4px 8px",
    lineHeight: "1",
    boxSizing: "border-box",
  };

  // 行スタイル (均等高さ)
  const rowStyle: React.CSSProperties = {
    height: `${rowHeightPercent}%`,
  };

  return (
    <table
      style={{
        width: "100%",
        height: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed",
        userSelect: "none",
        pointerEvents: "none",
        fontSize: `${fontSize}px`, // フォントサイズ適用
        color: "#000",
      }}
    >
      <thead>
        <tr style={rowStyle}>
          {cols.map((col, i) => (
            <th key={i} style={cellStyle}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((_, r) => (
          <tr key={r} style={rowStyle}>
            {cols.map((_, c) => (
              <td key={c} style={cellStyle} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// 要素の型定義
export interface TableComponent extends BaseComponent {
  type: "table";
  columnNames: string;
  rowCount: number;
  fontSize: number;
}
