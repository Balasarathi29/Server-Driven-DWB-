"use client";

import React from "react";
import { useNode } from "@craftjs/core";

interface ShapeProps {
  diameter?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  rotation?: string;
  positionMode?: "flow" | "absolute";
  x?: string;
  y?: string;
  zIndex?: string;
}

export const Circle = ({
  diameter = "100px",
  backgroundColor = "#efefef",
  borderColor = "#e5e7eb",
  borderWidth = "1px",
  rotation = "0",
  positionMode = "flow",
  x = "0px",
  y = "0px",
  zIndex = "1",
}: ShapeProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const safeZ = Number.isNaN(Number(zIndex)) ? 1 : Number(zIndex);

  const style: React.CSSProperties = {
    width: diameter,
    height: diameter,
    backgroundColor,
    borderColor,
    borderStyle:
      borderWidth && Number.parseInt(borderWidth, 10) > 0 ? "solid" : "none",
    borderWidth,
    borderRadius: "9999px",
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

export const CircleSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props }));

  return (
    <div className="p-4 space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Diameter
        </label>
        <input
          aria-label="Diameter"
          title="Diameter"
          placeholder="e.g. 100px"
          className="w-full px-2 py-1 border rounded text-sm"
          value={props.diameter ?? ""}
          onChange={(e) => setProp((p: any) => (p.diameter = e.target.value))}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
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
            Border
          </label>
          <input
            aria-label="Border color"
            title="Border color"
            type="color"
            className="w-full h-9 rounded border"
            value={props.borderColor ?? "#e5e7eb"}
            onChange={(e) =>
              setProp((p: any) => (p.borderColor = e.target.value))
            }
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
          Border Width
        </label>
        <input
          aria-label="Border width"
          title="Border width"
          placeholder="e.g. 2px"
          className="w-full px-2 py-1 border rounded text-sm"
          value={props.borderWidth}
          onChange={(e) =>
            setProp((p: any) => (p.borderWidth = e.target.value))
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

Circle.displayName = "Circle";

Circle.craft = {
  displayName: "Circle",
  props: {
    diameter: "100px",
    backgroundColor: "#efefef",
    borderColor: "#e5e7eb",
    borderWidth: "1px",
    rotation: "0",
    positionMode: "flow",
    x: "0px",
    y: "0px",
    zIndex: "1",
  },
  related: {
    toolbar: CircleSettings,
  },
};
