"use client";

import React from "react";
import { useNode } from "@craftjs/core";

interface DynamicSectionProps {
  title?: string;
  subtitle?: string;
  content?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  alignment?: "left" | "center" | "right";
  className?: string;
}

export const DynamicSection = ({
  title = "",
  subtitle = "",
  content = "",
  backgroundColor = "#ffffff",
  textColor = "#1e293b",
  paddingTop = "64px",
  paddingRight = "24px",
  paddingBottom = "64px",
  paddingLeft = "24px",
  marginTop = "0px",
  marginRight = "0px",
  marginBottom = "0px",
  marginLeft = "0px",
  alignment = "center",
  className = "",
}: DynamicSectionProps) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode((node) => ({ id: node.id }));

  const padding = `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
  const margin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;
  const sectionClass = `sdui-dynamic-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <>
      <style>{`
                .${sectionClass} {
                    background-color: ${backgroundColor};
                    color: ${textColor};
                    padding: ${padding};
                    margin: ${margin};
                }
            `}</style>
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) connect(drag(ref));
        }}
        className={`w-full ${sectionClass} ${className}`}
      >
        <div
          className={`max-w-7xl mx-auto flex flex-col items-${alignment === "left" ? "start" : alignment === "right" ? "end" : "center"} text-${alignment}`}
        >
          {title && <h2 className="text-4xl font-bold mb-4">{title}</h2>}
          {subtitle && (
            <p className="text-xl opacity-80 mb-6 max-w-2xl">{subtitle}</p>
          )}
          {content && (
            <div className="text-lg leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const DynamicSectionSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const spacingOptions = [
    "0px",
    "4px",
    "8px",
    "12px",
    "16px",
    "24px",
    "32px",
    "48px",
    "64px",
  ];

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={props.title}
          onChange={(e) => setProp((p: any) => (p.title = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          title="Dynamic section title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Subtitle</label>
        <input
          type="text"
          value={props.subtitle}
          onChange={(e) => setProp((p: any) => (p.subtitle = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          title="Dynamic section subtitle"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          value={props.content}
          onChange={(e) => setProp((p: any) => (p.content = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          rows={5}
          title="Dynamic section content"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Background Color
        </label>
        <input
          type="color"
          value={props.backgroundColor}
          onChange={(e) =>
            setProp((p: any) => (p.backgroundColor = e.target.value))
          }
          className="w-full h-10 rounded"
          title="Dynamic section background color"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Text Color</label>
        <input
          type="color"
          value={props.textColor}
          onChange={(e) => setProp((p: any) => (p.textColor = e.target.value))}
          className="w-full h-10 rounded"
          title="Dynamic section text color"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Alignment</label>
        <select
          value={props.alignment}
          onChange={(e) => setProp((p: any) => (p.alignment = e.target.value))}
          className="w-full px-3 py-2 border rounded"
          title="Dynamic section alignment"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div className="border-t pt-4">
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
                value={
                  props[key] ??
                  (key === "paddingTop" || key === "paddingBottom"
                    ? "64px"
                    : "24px")
                }
                onChange={(e) =>
                  setProp((p: any) => ((p as any)[key] = e.target.value))
                }
                className="w-full px-2 py-1.5 border rounded text-xs"
                title={`Dynamic section padding ${label.toLowerCase()}`}
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
      <div className="border-t pt-4">
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
                value={props[key] ?? "0px"}
                onChange={(e) =>
                  setProp((p: any) => ((p as any)[key] = e.target.value))
                }
                className="w-full px-2 py-1.5 border rounded text-xs"
                title={`Dynamic section margin ${label.toLowerCase()}`}
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

DynamicSection.craft = {
  displayName: "Dynamic Section",
  props: {
    title: "Your Title Here",
    subtitle: "Your Subtitle Here",
    content: "Add your custom content here...",
    backgroundColor: "#ffffff",
    textColor: "#1e293b",
    paddingTop: "64px",
    paddingRight: "24px",
    paddingBottom: "64px",
    paddingLeft: "24px",
    marginTop: "0px",
    marginRight: "0px",
    marginBottom: "0px",
    marginLeft: "0px",
    alignment: "center",
  },
  related: {
    toolbar: DynamicSectionSettings,
  },
};
