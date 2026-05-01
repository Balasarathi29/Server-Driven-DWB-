"use client";

import { useNode } from "@craftjs/core";
import { Link } from "lucide-react";

interface TextBlockProps {
  content?: string;
  fontSize?: string;
  color?: string;
  textAlign?: "left" | "center" | "right";
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderRadius?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  positionMode?: "flow" | "absolute";
  x?: string;
  y?: string;
  zIndex?: string;
  href?: string;
  target?: "_self" | "_blank";
}

export const TextBlock = ({
  content = "Enter your text here...",
  fontSize = "16px",
  color = "#000000",
  textAlign = "left",
  width = "100%",
  height = "auto",
  backgroundColor = "transparent",
  borderRadius = "0px",
  paddingTop = "0px",
  paddingRight = "0px",
  paddingBottom = "0px",
  paddingLeft = "0px",
  marginTop = "0px",
  marginRight = "0px",
  marginBottom = "0px",
  marginLeft = "0px",
  positionMode = "flow",
  x = "0px",
  y = "0px",
  zIndex = "1",
  href = "",
  target = "_self",
}: TextBlockProps) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode((node) => ({ id: node.id }));

  const textBlockClass = `sdui-text-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const padding = `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
  const margin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;

  const inner = (
    <>
      <style>{`
        .${textBlockClass} {
          font-size: ${fontSize};
          color: ${color};
          text-align: ${textAlign};
          width: ${width};
          height: ${height};
          background-color: ${backgroundColor};
          border-radius: ${borderRadius};
          padding: ${padding};
          margin: ${margin};
          position: ${positionMode === "absolute" ? "absolute" : "relative"};
          left: ${positionMode === "absolute" ? x : "auto"};
          top: ${positionMode === "absolute" ? y : "auto"};
          z-index: ${parseInt(zIndex) || 1};
        }
      `}</style>
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) connect(drag(ref));
        }}
        className={textBlockClass}
      >
        {content}
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="block no-underline text-inherit"
      >
        {inner}
      </a>
    );
  }

  return inner;
};

export const TextBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props }));

  const sizeOptions = [
    "auto",
    "100%",
    "50%",
    "100px",
    "200px",
    "300px",
    "500px",
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
  ];
  const radiusOptions = ["0px", "4px", "8px", "12px", "16px", "20px", "24px"];
  const fontSizes = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
    "36px",
    "48px",
  ];
  const zIndexNumber = Number.parseInt(String(props.zIndex ?? "1"), 10);
  const safeZIndexValue = Number.isNaN(zIndexNumber)
    ? ""
    : String(zIndexNumber);

  return (
    <div className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* Content Section */}
      <div className="border-b pb-4">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Content
        </h4>
        <textarea
          value={props.content ?? ""}
          onChange={(e) => setProp((p: any) => (p.content = e.target.value))}
          className="w-full px-3 py-2 border rounded text-sm"
          rows={4}
          title="Enter text content"
        />
      </div>

      {/* Typography Section */}
      <div className="border-b pb-4">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Typography
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Font Size
            </label>
            <select
              value={props.fontSize ?? "16px"}
              onChange={(e) =>
                setProp((p: any) => (p.fontSize = e.target.value))
              }
              className="w-full px-3 py-2 border rounded text-sm"
              title="Select font size"
            >
              {fontSizes.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Text Color
            </label>
            <input
              type="color"
              value={props.color ?? "#000000"}
              onChange={(e) => setProp((p: any) => (p.color = e.target.value))}
              className="w-full h-10 border rounded cursor-pointer"
              title="Choose text color"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Text Align
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["left", "center", "right"].map((align) => (
                <button
                  key={align}
                  onClick={() => setProp((p: any) => (p.textAlign = align))}
                  className={`px-3 py-2 rounded border text-xs font-semibold ${
                    props.textAlign === align
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Size Section */}
      <div className="border-b pb-4">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Size
        </h4>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Width
            </label>
            <select
              value={props.width ?? "100%"}
              onChange={(e) => setProp((p: any) => (p.width = e.target.value))}
              className="w-full px-2 py-1.5 border rounded text-xs"
              title="Set text block width"
            >
              {sizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Height
            </label>
            <select
              value={props.height ?? "auto"}
              onChange={(e) => setProp((p: any) => (p.height = e.target.value))}
              className="w-full px-2 py-1.5 border rounded text-xs"
              title="Set text block height"
            >
              <option value="auto">Auto</option>
              {sizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
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
              value={props.backgroundColor ?? "transparent"}
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
              title="Set border radius"
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
                value={(props as any)[key] ?? "0px"}
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
      <div className="border-b pb-4">
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

      {/* Position Section */}
      <div className="border-b pb-4">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Position
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["flow", "absolute"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setProp((p: any) => (p.positionMode = mode))}
                  className={`px-3 py-2 rounded border text-xs font-semibold ${
                    props.positionMode === mode ||
                    (!props.positionMode && mode === "flow")
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {props.positionMode === "absolute" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  X Position
                </label>
                <input
                  type="text"
                  value={props.x ?? "0px"}
                  onChange={(e) => setProp((p: any) => (p.x = e.target.value))}
                  className="w-full px-3 py-2 border rounded text-sm"
                  placeholder="0px"
                  title="X position coordinate"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Y Position
                </label>
                <input
                  type="text"
                  value={props.y ?? "0px"}
                  onChange={(e) => setProp((p: any) => (p.y = e.target.value))}
                  className="w-full px-3 py-2 border rounded text-sm"
                  placeholder="0px"
                  title="Y position coordinate"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Z-Index
                </label>
                <input
                  type="number"
                  value={safeZIndexValue}
                  onChange={(e) =>
                    setProp((p: any) => (p.zIndex = e.target.value))
                  }
                  className="w-full px-3 py-2 border rounded text-sm"
                  min="0"
                  title="Set z-index for layering"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Link Section */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Link className="w-3.5 h-3.5 text-blue-500" />
          Link
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              URL
            </label>
            <input
              type="text"
              value={props.href ?? ""}
              onChange={(e) => setProp((p: any) => (p.href = e.target.value))}
              placeholder="https://... or /page-slug"
              className="w-full px-3 py-2 border rounded text-sm font-mono"
              title="Enter link URL"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Open In
            </label>
            <select
              value={props.target ?? "_self"}
              onChange={(e) => setProp((p: any) => (p.target = e.target.value))}
              className="w-full px-3 py-2 border rounded text-sm"
              title="Choose how to open the link"
            >
              <option value="_self">Same Tab</option>
              <option value="_blank">New Tab</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

TextBlock.craft = {
  displayName: "Text Block",
  props: {
    content: "Enter your text here...",
    fontSize: "16px",
    color: "#000000",
    textAlign: "left",
    width: "100%",
    height: "auto",
    backgroundColor: "transparent",
    borderRadius: "0px",
    paddingTop: "0px",
    paddingRight: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    marginTop: "0px",
    marginRight: "0px",
    marginBottom: "0px",
    marginLeft: "0px",
    positionMode: "flow",
    x: "0px",
    y: "0px",
    zIndex: "1",
    href: "",
    target: "_self",
  },
  related: {
    toolbar: TextBlockSettings,
  },
};
