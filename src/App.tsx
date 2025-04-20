import { useState } from "react";
import { nanoid } from "nanoid";
import { Sidebar } from "./components/Sidebar";
import { Editor } from "./components/editor/Editor";
import { Screen } from "./types/screen";

export default function App() {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const addScreen = (screenId: string, name: string) => {
    const newScreen: Screen = { id: nanoid(8), screenId, name, components: [] };
    setScreens((prev) => [...prev, newScreen]);
  };

  const deleteScreen = (id: string) => {
    setScreens((prev) => prev.filter((s) => s.id !== id));
    if (selectedScreen?.id === id) setSelectedScreen(null);
  };

  const handleUpdateScreen = (updated: Screen) => {
    setScreens((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setSelectedScreen(updated);
  };

  const TOPBAR_HEIGHT = 48;

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* TopBar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: TOPBAR_HEIGHT,
          background: "#222",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 1rem",
          zIndex: 1001,
        }}
      >
        <button
          onClick={() => setSidebarCollapsed((f) => !f)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
        <h1 style={{ margin: "0 0 0 1rem", fontSize: "1rem" }}>
          Screen Designer
        </h1>
      </div>

      {/* Main Content under TopBar */}
      <div
        style={{
          position: "absolute",
          top: TOPBAR_HEIGHT,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <Sidebar
          screens={screens}
          onSelect={setSelectedScreen}
          onAdd={addScreen}
          onDelete={deleteScreen}
          collapsed={sidebarCollapsed}
        />
        <Editor screen={selectedScreen} onUpdateScreen={handleUpdateScreen} />
      </div>
    </div>
  );
}
