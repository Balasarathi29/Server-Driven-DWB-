"use client";

import React from "react";
import { useNode } from "@craftjs/core";

interface LineProps {
  length?: string;
  thickness?: string;
  color?: string;
  rotation?: string;
  positionMode?: "flow" | "absolute";
  x?: string;
  y?: string;
  zIndex?: string;
}

export const Line = ({
  length = "200px",
  thickness = "2px",
  color = "#e5e7eb",
  rotation = "0",
  positionMode = "flow",
  x = "0px",
  y = "0px",
  zIndex = "1",
}: LineProps) => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ id: node.id }));
  const safeZ = Number.isNaN(Number(zIndex)) ? 1 : Number(zIndex);

  const style: React.CSSProperties = {
    width: length,
    height: thickness,
    backgroundColor: color,
    transform: `rotate(${rotation}deg)`,
    position: positionMode === "absolute" ? "absolute" : "relative",
    left: positionMode === "absolute" ? x : undefined,
    top: positionMode === "absolute" ? y : undefined,
    zIndex: safeZ,
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) connect(drag(ref));
      }}
      style={style}
    />
  );
};

export const LineSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props }));
  return (
    <div className="p-4 space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Length
        </label>
        <input
          aria-label="Length"
          title="Length"
          placeholder="e.g. 200px"
          className="w-full px-2 py-1 border rounded text-sm"
          value={props.length ?? ""}
          onChange={(e) => setProp((p: any) => (p.length = e.target.value))}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Thickness
        </label>
        <input
          aria-label="Thickness"
          title="Thickness"
          placeholder="e.g. 2px"
          className="w-full px-2 py-1 border rounded text-sm"
          value={props.thickness ?? ""}
          onChange={(e) => setProp((p: any) => (p.thickness = e.target.value))}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Color
        </label>
        <input
          aria-label="Color"
          title="Color"
          type="color"
          className="w-full h-9 rounded border"
          value={props.color ?? "#e5e7eb"}
          onChange={(e) => setProp((p: any) => (p.color = e.target.value))}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Rotation (deg)
        </label>
        <input
          aria-label="Rotation"
          title="Rotation"
          type="number"
          className="w-full px-2 py-1 border rounded text-sm"
          value={props.rotation ?? "0"}
          onChange={(e) => setProp((p: any) => (p.rotation = e.target.value))}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Position
        </label>
        <select
          aria-label="Position"
          title="Position"
          className="w-full px-2 py-1 border rounded text-sm"
          value={props.positionMode ?? "flow"}
          onChange={(e) =>
            setProp((p: any) => (p.positionMode = e.target.value))
          }
        >
          <option value="flow">Flow</option>
          <option value="absolute">Absolute</option>
        </select>
      </div>
      {props.positionMode === "absolute" && (
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            X / Y
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              aria-label="X"
              title="X"
              placeholder="e.g. 0px"
              className="px-2 py-1 border rounded text-sm"
              value={props.x ?? ""}
              onChange={(e) => setProp((p: any) => (p.x = e.target.value))}
            />
            <input
              aria-label="Y"
              title="Y"
              placeholder="e.g. 0px"
              className="px-2 py-1 border rounded text-sm"
              value={props.y ?? ""}
              onChange={(e) => setProp((p: any) => (p.y = e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
};

Line.displayName = "Line";

Line.craft = {
  displayName: "Line",
  props: {
    length: "200px",
    thickness: "2px",
    color: "#e5e7eb",
    rotation: "0",
    positionMode: "flow",
    x: "0px",
    y: "0px",
    zIndex: "1",
  },
  related: { toolbar: LineSettings },
};
