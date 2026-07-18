import { useState, useEffect } from 'react';
import { DEFAULT_WIDGET_DATA } from '../constants/widgets';

const STORAGE_KEY = 'readmecraft_widgets_state';

export function useCanvasState() {
  const [widgets, setWidgets] = useState(() => {
    // Load from localStorage if present
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
    
    // Default initial widget
    return [
      {
        id: 'default-profile-card',
        type: 'profile-card',
        data: { ...DEFAULT_WIDGET_DATA['profile-card'] }
      }
    ];
  });

  const [selectedWidgetId, setSelectedWidgetId] = useState('default-profile-card');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [widgets]);

  const addWidget = (type) => {
    const newWidget = {
      id: `${type}-${Date.now()}`,
      type,
      data: JSON.parse(JSON.stringify(DEFAULT_WIDGET_DATA[type] || {}))
    };
    setWidgets((prev) => [...prev, newWidget]);
    setSelectedWidgetId(newWidget.id);
  };

  const updateWidget = (id, updatedData) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, data: updatedData } : w))
    );
  };

  const deleteWidget = (id) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
    if (selectedWidgetId === id) {
      setSelectedWidgetId(null);
    }
  };

  const duplicateWidget = (id) => {
    const index = widgets.findIndex((w) => w.id === id);
    if (index === -1) return;

    const sourceWidget = widgets[index];
    const duplicatedWidget = {
      id: `${sourceWidget.type}-dup-${Date.now()}`,
      type: sourceWidget.type,
      data: JSON.parse(JSON.stringify(sourceWidget.data))
    };

    const newWidgets = [...widgets];
    newWidgets.splice(index + 1, 0, duplicatedWidget);
    setWidgets(newWidgets);
    setSelectedWidgetId(duplicatedWidget.id);
  };

  const moveWidget = (index, direction) => {
    setWidgets((prev) => {
      const newWidgets = [...prev];
      if (direction === 'up' && index > 0) {
        const temp = newWidgets[index];
        newWidgets[index] = newWidgets[index - 1];
        newWidgets[index - 1] = temp;
      } else if (direction === 'down' && index < newWidgets.length - 1) {
        const temp = newWidgets[index];
        newWidgets[index] = newWidgets[index + 1];
        newWidgets[index + 1] = temp;
      }
      return newWidgets;
    });
  };

  const clearCanvas = () => {
    setWidgets([]);
    setSelectedWidgetId(null);
  };

  const loadTemplate = (templateWidgets) => {
    const widgetsWithIds = templateWidgets.map((w, idx) => ({
      ...w,
      id: `${w.type}-tpl-${Date.now()}-${idx}`
    }));
    setWidgets(widgetsWithIds);
    setSelectedWidgetId(widgetsWithIds[0]?.id || null);
  };

  return {
    widgets,
    selectedWidgetId,
    setSelectedWidgetId,
    addWidget,
    updateWidget,
    deleteWidget,
    duplicateWidget,
    moveWidget,
    clearCanvas,
    loadTemplate,
  };
}
export default useCanvasState;
