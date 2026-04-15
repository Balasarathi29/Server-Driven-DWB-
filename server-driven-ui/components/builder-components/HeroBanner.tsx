"use client";
/* eslint-disable */

import { useNode } from "@craftjs/core";
import { Link } from "lucide-react";

interface HeroBannerProps {
  heading?: string;
  subheading?: string;
  ctaText?: string;
  backgroundColor?: string;
  color?: string;
  backgroundImage?: string;
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
  ctaLink?: string;
  ctaTarget?: "_self" | "_blank";
}

export const HeroBanner = ({
  heading = "Welcome to Our Institution",
  subheading = "Excellence in Education",
  ctaText = "Learn More",
  backgroundColor = "transparent",
  color = "#ffffff",
  backgroundImage = "",
  width = "100%",
  minHeight = "400px",
  borderRadius = "0px",
  paddingTop = "60px",
  paddingRight = "20px",
  paddingBottom = "60px",
  paddingLeft = "20px",
  marginTop = "0px",
  marginRight = "0px",
  marginBottom = "0px",
  marginLeft = "0px",
  ctaLink = "#",
  ctaTarget = "_self",
}: HeroBannerProps) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode((node) => ({ id: node.id }));

  const heroClass = `sdui-hero-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const heroTextClass = `${heroClass}-text`;

  const padding = `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
  const margin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;

  return (
    <>
      <style>{`
        .${heroClass} {
          ${backgroundImage ? `background-image: url('${backgroundImage.replace(/'/g, "\\'")}');` : `background-color: ${backgroundColor};`}
          width: ${width};
          min-height: ${minHeight};
          border-radius: ${borderRadius};
          padding: ${padding};
          margin: ${margin};
        }
        .${heroTextClass} {
          color: ${color};
        }
      `}</style>
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) connect(drag(ref));
        }}
        className={`${heroClass} relative flex items-center justify-center bg-cover bg-center`}
      >
        {backgroundImage && (
          <div className="absolute inset-0 bg-black opacity-40" />
        )}
        <div className={`${heroTextClass} relative z-10 text-center px-4`}>
          <h1 className="text-5xl font-bold mb-4">{heading}</h1>
          <p className="text-xl mb-6">{subheading}</p>
          <a
            href={ctaLink}
            target={ctaTarget}
            rel={ctaTarget === "_blank" ? "noopener noreferrer" : undefined}
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-white"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </>
  );
};

export const HeroBannerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props }));

  const sizeOptions = ["auto", "100%", "50%", "1200px"];
  const minHeightOptions = [
    "200px",
    "300px",
    "400px",
    "500px",
    "600px",
    "800px",
    "100vh",
  ];
  const spacingOptions = [
    "0px",
    "10px",
    "20px",
    "30px",
    "40px",
    "50px",
    "60px",
  ];
  const radiusOptions = ["0px", "4px", "8px", "12px", "16px", "20px", "24px"];

  return (
    <div className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* Content Section */}
      <div className="border-b pb-4">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Content
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Heading
            </label>
            <input
              type="text"
              value={props.heading ?? "Welcome to Our Institution"}
              onChange={(e) =>
                setProp((p: any) => (p.heading = e.target.value))
              }
              className="w-full px-3 py-2 border rounded text-sm"
              title="Enter hero banner heading"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Subheading
            </label>
            <input
              type="text"
              value={props.subheading ?? "Excellence in Education"}
              onChange={(e) =>
                setProp((p: any) => (p.subheading = e.target.value))
              }
              className="w-full px-3 py-2 border rounded text-sm"
              title="Enter hero banner subheading"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              CTA Button Text
            </label>
            <input
              type="text"
              value={props.ctaText ?? "Learn More"}
              onChange={(e) =>
                setProp((p: any) => (p.ctaText = e.target.value))
              }
              className="w-full px-3 py-2 border rounded text-sm"
              title="Enter call-to-action button text"
            />
          </div>
        </div>
      </div>

      {/* Background Section */}
      <div className="border-b pb-4">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Background
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
              Text Color
            </label>
            <input
              type="color"
              value={props.color ?? "#ffffff"}
              onChange={(e) => setProp((p: any) => (p.color = e.target.value))}
              className="w-full h-10 border rounded cursor-pointer"
              title="Choose text color"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Background Image URL
            </label>
            <input
              type="text"
              value={props.backgroundImage ?? ""}
              onChange={(e) =>
                setProp((p: any) => (p.backgroundImage = e.target.value))
              }
              className="w-full px-3 py-2 border rounded text-sm font-mono"
              placeholder="https://..."
              title="Enter background image URL"
            />
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
              title="Set hero banner width"
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
              Min Height
            </label>
            <select
              value={props.minHeight ?? "400px"}
              onChange={(e) =>
                setProp((p: any) => (p.minHeight = e.target.value))
              }
              className="w-full px-2 py-1.5 border rounded text-xs"
              title="Set hero banner minimum height"
            >
              {minHeightOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Border Radius */}
      <div className="border-b pb-4">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Border Radius
        </h4>

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
                value={(props as any)[key] ?? "20px"}
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

      {/* CTA Link Section */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Link className="w-3.5 h-3.5 text-blue-500" />
          CTA Link
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              URL
            </label>
            <input
              type="text"
              value={props.ctaLink ?? "#"}
              onChange={(e) =>
                setProp((p: any) => (p.ctaLink = e.target.value))
              }
              className="w-full px-3 py-2 border rounded text-sm font-mono"
              placeholder="https://... or /page-slug"
              title="Enter CTA link URL"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Open In
            </label>
            <select
              value={props.ctaTarget ?? "_self"}
              onChange={(e) =>
                setProp((p: any) => (p.ctaTarget = e.target.value))
              }
              className="w-full px-3 py-2 border rounded text-sm"
              title="Choose how to open the CTA link"
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

HeroBanner.craft = {
  displayName: "Hero Banner",
  props: {
    heading: "Welcome to Our Institution",
    subheading: "Excellence in Education",
    ctaText: "Learn More",
    backgroundColor: "transparent",
    color: "#ffffff",
    backgroundImage: "",
    width: "100%",
    minHeight: "400px",
    borderRadius: "0px",
    paddingTop: "60px",
    paddingRight: "20px",
    paddingBottom: "60px",
    paddingLeft: "20px",
    marginTop: "0px",
    marginRight: "0px",
    marginBottom: "0px",
    marginLeft: "0px",
    ctaLink: "#",
    ctaTarget: "_self",
  },
  related: {
    toolbar: HeroBannerSettings,
  },
};
