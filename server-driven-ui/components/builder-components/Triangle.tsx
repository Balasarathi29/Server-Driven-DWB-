"use client";

import React from "react";
import { useNode } from "@craftjs/core";

interface ShapeProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  rotation?: string;
  positionMode?: "flow" | "absolute";
  x?: string;
  y?: string;
  zIndex?: string;
}

export const Triangle = ({
  width = "120px",
  height = "100px",
  backgroundColor = "#efefef",
  rotation = "0",
  positionMode = "flow",
  x = "0px",
  y = "0px",
  zIndex = "1",
}: ShapeProps) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode((node) => ({ id: node.id }));

  const safeZ = Number.isNaN(Number(zIndex)) ? 1 : Number(zIndex);

  const style: React.CSSProperties = {
    width,
    height,
    backgroundColor,
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
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

export const TriangleSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props }));

  return (
    <div className="p-4 space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Width
        </label>
        <input
          aria-label="Width"
          title="Width"
          placeholder="e.g. 120px"
          className="w-full px-2 py-1 border rounded text-sm"
          value={props.width ?? ""}
          onChange={(e) => setProp((p: any) => (p.width = e.target.value))}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Height
        </label>
        <input
          aria-label="Height"
          title="Height"
          placeholder="e.g. 100px"
          className="w-full px-2 py-1 border rounded text-sm"
          value={props.height ?? ""}
          onChange={(e) => setProp((p: any) => (p.height = e.target.value))}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Fill
        </label>
        <input
          aria-label="Fill color"
          title="Fill color"
          type="color"
          className="w-full h-9 rounded border"
          value={props.backgroundColor ?? "#efefef"}
          onChange={(e) =>
            setProp((p: any) => (p.backgroundColor = e.target.value))
          }
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
    </div>
  );
};

Triangle.craft = {
  displayName: "Triangle",
  props: {
    width: "120px",
    height: "100px",
    backgroundColor: "#efefef",
    rotation: "0",
    positionMode: "flow",
    x: "0px",
    y: "0px",
    zIndex: "1",
  },
  related: {
    toolbar: TriangleSettings,
  },
};
