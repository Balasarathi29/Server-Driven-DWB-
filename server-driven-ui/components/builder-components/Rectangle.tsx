"use client";

import React from "react";
import { useNode } from "@craftjs/core";

interface ShapeProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  rotation?: string;
  positionMode?: "flow" | "absolute";
  x?: string;
  y?: string;
  zIndex?: string;
}

export const Rectangle = ({
  width = "150px",
  height = "100px",
  backgroundColor = "#efefef",
  borderColor = "#e5e7eb",
  borderWidth = "1px",
  borderRadius = "6px",
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
    borderColor,
    borderStyle:
      borderWidth && Number.parseInt(borderWidth, 10) > 0 ? "solid" : "none",
    borderWidth,
    borderRadius,
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

export const RectangleSettings = () => {
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
          placeholder="e.g. 150px"
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

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Border Width
          </label>
          <input
            aria-label="Border width"
            title="Border width"
            placeholder="e.g. 1px"
            className="w-full px-2 py-1 border rounded text-sm"
            value={props.borderWidth ?? ""}
            onChange={(e) =>
              setProp((p: any) => (p.borderWidth = e.target.value))
            }
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Border Radius
          </label>
          <input
            aria-label="Border radius"
            title="Border radius"
            placeholder="e.g. 6px"
            className="w-full px-2 py-1 border rounded text-sm"
            value={props.borderRadius ?? ""}
            onChange={(e) =>
              setProp((p: any) => (p.borderRadius = e.target.value))
            }
          />
        </div>
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

      <div className="grid grid-cols-2 gap-2">
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
    </div>
  );
};

Rectangle.craft = {
  displayName: "Rectangle",
  props: {
    width: "150px",
    height: "100px",
    backgroundColor: "#efefef",
    borderColor: "#e5e7eb",
    borderWidth: "1px",
    borderRadius: "6px",
    rotation: "0",
    positionMode: "flow",
    x: "0px",
    y: "0px",
    zIndex: "1",
  },
  related: {
    toolbar: RectangleSettings,
  },
};
