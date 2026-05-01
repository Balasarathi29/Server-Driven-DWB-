"use client";

import React from "react";
import { useNode } from "@craftjs/core";

interface ContainerProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  width?: string;
  minHeight?: string;
  borderRadius?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
}

export const Container = ({
  children,
  backgroundColor = "#ffffff",
  width = "100%",
  minHeight = "auto",
  borderRadius = "0px",
  paddingTop = "16px",
  paddingRight = "16px",
  paddingBottom = "16px",
  paddingLeft = "16px",
  marginTop = "0px",
  marginRight = "0px",
  marginBottom = "0px",
  marginLeft = "0px",
}: ContainerProps) => {
  const {
    id,
    nodes,
    connectors: { connect, drag },
  } = useNode((node) => ({
    id: node.id,
    nodes: node.data.nodes,
  }));

  const isEmpty = nodes.length === 0;
  const isRoot = id === "ROOT";
  const containerClass = `sdui-container-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const padding = `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
  const margin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;
  const computedMinHeight =
    isEmpty && isRoot ? "500px" : isEmpty ? "100px" : minHeight;

  return (
    <>
      <style>{`
        .${containerClass} {
          background-color: ${backgroundColor};
          width: ${width};
          min-height: ${computedMinHeight};
          border-radius: ${borderRadius};
          padding: ${padding};
          margin: ${margin};
        }
      `}</style>
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) {
            connect(drag(ref));
          }
        }}
        className={`${containerClass} flex flex-col gap-2 transition-all ${
          isEmpty
            ? "outline-2 outline-dashed outline-blue-200 bg-blue-50/10"
            : ""
        }`}
      >
        {isEmpty && (
          <div className="flex-1 flex items-center justify-center text-gray-300 text-xs font-medium uppercase tracking-widest pointer-events-none italic">
            Drop Components Here
          </div>
        )}
        {children}
      </div>
    </>
  );
};

export const ContainerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const sizeOptions = [
    "auto",
    "100%",
    "50%",
    "100px",
    "200px",
    "300px",
    "500px",
    "800px",
    "1200px",
  ];
  const spacingOptions = [
    "0px",
    "4px",
    "8px",
    "12px",
    "16px",
    "20px",
    "24px",
    "32px",
    "48px",
    "64px",
  ];
  const radiusOptions = [
    "0px",
    "4px",
    "8px",
    "12px",
    "16px",
    "20px",
    "24px",
    "32px",
  ];

  return (
    <div className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* Size Section */}
      <div className="border-b pb-4">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Size
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Width
            </label>
            <select
              value={props.width ?? "100%"}
              onChange={(e) => setProp((p: any) => (p.width = e.target.value))}
              className="w-full px-3 py-2 border rounded text-sm"
              title="Container width"
            >
              {sizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Min Height
            </label>
            <select
              value={props.minHeight ?? "auto"}
              onChange={(e) =>
                setProp((p: any) => (p.minHeight = e.target.value))
              }
              className="w-full px-3 py-2 border rounded text-sm"
              title="Container minimum height"
            >
              <option value="auto">Auto</option>
              <option value="100px">100px</option>
              <option value="200px">200px</option>
              <option value="300px">300px</option>
              <option value="500px">500px</option>
              <option value="800px">800px</option>
              <option value="100vh">Full Height</option>
            </select>
          </div>
        </div>
      </div>

      {/* Styling Section */}
      <div className="border-b pb-4">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Styling
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Background Color
            </label>
            <input
              type="color"
              value={props.backgroundColor ?? "#ffffff"}
              onChange={(e) =>
                setProp((p: any) => (p.backgroundColor = e.target.value))
              }
              className="w-full h-10 border rounded cursor-pointer"
              title="Choose background color"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Border Radius
            </label>
            <select
              value={props.borderRadius ?? "0px"}
              onChange={(e) =>
                setProp((p: any) => (p.borderRadius = e.target.value))
              }
              className="w-full px-3 py-2 border rounded text-sm"
              title="Container border radius"
            >
              {radiusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Padding Section */}
      <div className="border-b pb-4">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Padding
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            { key: "paddingTop", label: "Top" },
            { key: "paddingRight", label: "Right" },
            { key: "paddingBottom", label: "Bottom" },
            { key: "paddingLeft", label: "Left" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                {label}
              </label>
              <select
                value={(props as any)[key] ?? "16px"}
                onChange={(e) =>
                  setProp((p: any) => ((p as any)[key] = e.target.value))
                }
                className="w-full px-2 py-1.5 border rounded text-xs"
                title={`Set padding for ${label}`}
              >
                {spacingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Margin Section */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Margin
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            { key: "marginTop", label: "Top" },
            { key: "marginRight", label: "Right" },
            { key: "marginBottom", label: "Bottom" },
            { key: "marginLeft", label: "Left" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                {label}
              </label>
              <select
                value={(props as any)[key] ?? "0px"}
                onChange={(e) =>
                  setProp((p: any) => ((p as any)[key] = e.target.value))
                }
                className="w-full px-2 py-1.5 border rounded text-xs"
                title={`Set margin for ${label}`}
              >
                {spacingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Container.craft = {
  displayName: "Container",
  isCanvas: true,
  props: {
    backgroundColor: "#ffffff",
    width: "100%",
    minHeight: "auto",
    borderRadius: "0px",
    paddingTop: "16px",
    paddingRight: "16px",
    paddingBottom: "16px",
    paddingLeft: "16px",
    marginTop: "0px",
    marginRight: "0px",
    marginBottom: "0px",
    marginLeft: "0px",
  },
  related: {
    toolbar: ContainerSettings,
  },
};
