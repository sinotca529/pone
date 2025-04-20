import { useState } from 'react';
import { Screen } from '../types/screen';

const SIDEBAR_WIDTH = 250;

type Props = {
  screens: Screen[];
  onSelect: (screen: Screen) => void;
  onAdd: (screenId: string, name: string) => void;
  onDelete: (id: string) => void;
  collapsed: boolean;
};

export function Sidebar({ screens, onSelect, onAdd, onDelete, collapsed }: Props) {
  const [screenIdInput, setScreenIdInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  const handleSubmit = () => {
    if (!screenIdInput.trim() || !nameInput.trim()) return;
    onAdd(screenIdInput.trim(), nameInput.trim());
    setScreenIdInput('');
    setNameInput('');
  };

  const wrapperStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIDEBAR_WIDTH,
    height: '100%',
    transform: collapsed ? `translateX(-${SIDEBAR_WIDTH}px)` : 'translateX(0)',
    transition: 'transform 0.2s ease',
    background: '#000',
    borderRight: '1px solid #ccc',
    zIndex: 1000,
    overflow: 'auto',
  };

  return (
    <div style={wrapperStyle}>
      {!collapsed && (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3>画面一覧</h3>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {screens.map((screen) => (
              <div
                key={screen.id}
                style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', cursor: 'pointer' }}
              >
                <span onClick={() => onSelect(screen)}>
                  {screen.screenId}：{screen.name}
                </span>
                <button onClick={() => onDelete(screen.id)}>✕</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input
              placeholder="画面ID"
              value={screenIdInput}
              onChange={(e) => setScreenIdInput(e.target.value)}
              style={{ width: '100%' }}
            />
            <input
              placeholder="画面名"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              style={{ width: '100%' }}
            />
            <button onClick={handleSubmit} style={{ width: '100%' }}>
              ＋ 画面を追加
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
