"use client";

import React from "react";
import { useEditor } from "@craftjs/core";
import { Settings, Trash2, Layers, Plus } from "lucide-react";
import { TextBlock } from "../builder-components/TextBlock";
import { ActionButton } from "../builder-components/ActionButton";
import { Container } from "../builder-components/Container";

export const PropertyPanel = () => {
  const { selected, actions, query } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      const node = state.nodes[currentNodeId];
      selected = {
        id: currentNodeId,
        name: node.data.name,
        settings: node.related && node.related.toolbar,
        isDeletable: query.node(currentNodeId).isDeletable(),
        isCanvas: node.data.isCanvas,
      };
    }

    return {
      selected,
    };
  });

  const handleAddComponent = (
    componentType: "text" | "button" | "container",
  ) => {
    if (!selected?.id) return;

    let component;
    switch (componentType) {
      case "text":
        component = React.createElement(TextBlock);
        break;
      case "button":
        component = React.createElement(ActionButton);
        break;
      case "container":
        component = React.createElement(Container);
        break;
      default:
        return;
    }

    const newNode = query.createNode(component);
    actions.add(newNode, selected.id);
  };

  if (!selected) {
    return (
      <div className="w-80 border-l border-slate-200/80 bg-linear-to-b from-slate-50 to-white h-full shrink-0 overflow-y-auto p-8 flex flex-col items-center justify-center text-center">
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 border border-slate-100">
          <Layers className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800 mb-1">
          No component selected
        </h3>
        <p className="text-xs text-slate-500 max-w-55">
          Click on a component to edit its properties.
        </p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-slate-200/80 bg-linear-to-b from-white to-slate-50/40 h-full shrink-0 flex flex-col">
      <div className="p-4 border-b border-slate-200/70 flex items-center justify-between bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/70 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em]">
              Selected
            </p>
            <h3 className="text-sm font-bold text-slate-800 leading-tight">
              {selected.name}
            </h3>
          </div>
        </div>
        {selected.isDeletable && (
          <button
            onClick={() => {
              actions.delete(selected.id);
            }}
            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition border border-transparent hover:border-red-100"
            title="Delete component"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Add Buttons for Canvas Components */}
      {selected.isCanvas && (
        <div className="border-b border-slate-200/70 p-4 space-y-2 bg-linear-to-r from-blue-50 to-cyan-50/60">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.18em] mb-2">
            Quick Add Inside
          </p>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleAddComponent("text")}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-blue-200 rounded-xl hover:bg-blue-100 transition text-xs font-semibold text-blue-700"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Text Inside
            </button>
            <button
              onClick={() => handleAddComponent("button")}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-blue-200 rounded-xl hover:bg-blue-100 transition text-xs font-semibold text-blue-700"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Button Inside
            </button>
            <button
              onClick={() => handleAddComponent("container")}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-blue-200 rounded-xl hover:bg-blue-100 transition text-xs font-semibold text-blue-700"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Container Inside
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-28">
        {selected.settings ? (
          React.createElement(selected.settings)
        ) : (
          <div className="p-8 text-center">
            <p className="text-xs text-slate-500 italic">
              No customizable properties for this component.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
