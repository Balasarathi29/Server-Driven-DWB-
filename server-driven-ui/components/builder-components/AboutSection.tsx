"use client";

import { useNode } from "@craftjs/core";
import { Link } from "lucide-react";

interface AboutSectionProps {
  title?: string;
  content?: string;
  imageUrl?: string;
  imageLink?: string;
  imageLinkTarget?: "_self" | "_blank";
  ctaText?: string;
  ctaLink?: string;
  ctaTarget?: "_self" | "_blank";
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

export const AboutSection = ({
  title = "About Us",
  content = "Our institution has been a beacon of excellence...",
  imageUrl = "",
  imageLink = "",
  imageLinkTarget = "_self",
  ctaText = "",
  ctaLink = "",
  ctaTarget = "_self",
  backgroundColor = "#f9fafb",
  width = "100%",
  minHeight = "auto",
  borderRadius = "0px",
  paddingTop = "64px",
  paddingRight = "16px",
  paddingBottom = "64px",
  paddingLeft = "16px",
  marginTop = "0px",
  marginRight = "0px",
  marginBottom = "0px",
  marginLeft = "0px",
}: AboutSectionProps) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode((node) => ({ id: node.id }));

  const aboutClass = `sdui-about-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const padding = `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
  const margin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;

  const imageEl = imageUrl ? (
    <div className="rounded-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-auto" />
    </div>
  ) : null;

  return (
    <>
      <style>{`
        .${aboutClass} {
          background-color: ${backgroundColor};
          width: ${width};
          min-height: ${minHeight};
          border-radius: ${borderRadius};
          padding: ${padding};
          margin: ${margin};
        }
      `}</style>
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) connect(drag(ref));
        }}
        className={aboutClass}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">{title}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {content}
            </p>
            {ctaText && ctaLink && (
              <a
                href={ctaLink}
                target={ctaTarget}
                rel={ctaTarget === "_blank" ? "noopener noreferrer" : undefined}
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
              >
                {ctaText}
              </a>
            )}
          </div>
          {imageEl &&
            (imageLink ? (
              <a
                href={imageLink}
                target={imageLinkTarget}
                rel={
                  imageLinkTarget === "_blank"
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {imageEl}
              </a>
            ) : (
              imageEl
            ))}
        </div>
      </div>
    </>
  );
};

export const AboutSectionSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props }));

  const sizeOptions = ["auto", "100%", "75%", "50%", "1200px"];
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
  const radiusOptions = ["0px", "4px", "8px", "12px", "16px", "20px", "24px"];

  return (
    <div className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Title
        </label>
        <input
          type="text"
          value={props.title ?? ""}
          onChange={(e) => setProp((p: any) => (p.title = e.target.value))}
          className="w-full px-3 py-2 border rounded text-sm"
          title="About section title"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Content
        </label>
        <textarea
          value={props.content ?? ""}
          onChange={(e) => setProp((p: any) => (p.content = e.target.value))}
          className="w-full px-3 py-2 border rounded text-sm"
          rows={5}
          title="About section content"
        />
      </div>

      <div className="border-t pt-4 space-y-3">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
          Layout
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
              title="About section width"
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
              value={props.minHeight ?? "auto"}
              onChange={(e) =>
                setProp((p: any) => (p.minHeight = e.target.value))
              }
              className="w-full px-2 py-1.5 border rounded text-xs"
              title="About section min height"
            >
              <option value="auto">auto</option>
              <option value="200px">200px</option>
              <option value="300px">300px</option>
              <option value="400px">400px</option>
              <option value="500px">500px</option>
              <option value="100vh">100vh</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Background Color
          </label>
          <input
            type="color"
            value={props.backgroundColor ?? "#f9fafb"}
            onChange={(e) =>
              setProp((p: any) => (p.backgroundColor = e.target.value))
            }
            className="w-full h-9 rounded cursor-pointer border"
            title="About section background color"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Border Radius
          </label>
          <select
            value={props.borderRadius ?? "0px"}
            onChange={(e) =>
              setProp((p: any) => (p.borderRadius = e.target.value))
            }
            className="w-full px-2 py-1.5 border rounded text-xs"
            title="About section border radius"
          >
            {radiusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
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
                  (props as any)[key] ??
                  (key.includes("Top") || key.includes("Bottom")
                    ? "64px"
                    : "16px")
                }
                onChange={(e) =>
                  setProp((p: any) => ((p as any)[key] = e.target.value))
                }
                className="w-full px-2 py-1.5 border rounded text-xs"
                title={`About section padding ${label.toLowerCase()}`}
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
                value={(props as any)[key] ?? "0px"}
                onChange={(e) =>
                  setProp((p: any) => ((p as any)[key] = e.target.value))
                }
                className="w-full px-2 py-1.5 border rounded text-xs"
                title={`About section margin ${label.toLowerCase()}`}
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

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Image URL
        </label>
        <input
          type="text"
          value={props.imageUrl ?? ""}
          onChange={(e) => setProp((p: any) => (p.imageUrl = e.target.value))}
          className="w-full px-3 py-2 border rounded text-sm font-mono"
          placeholder="https://..."
          title="About section image URL"
        />
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Link className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Image Link
          </span>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Image Link URL
          </label>
          <input
            type="text"
            value={props.imageLink ?? ""}
            onChange={(e) =>
              setProp((p: any) => (p.imageLink = e.target.value))
            }
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="https://... or /page-slug"
            title="Image link URL"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Open In
          </label>
          <select
            value={props.imageLinkTarget ?? "_self"}
            onChange={(e) =>
              setProp((p: any) => (p.imageLinkTarget = e.target.value))
            }
            className="w-full px-3 py-2 border rounded text-sm"
            title="Image link target"
          >
            <option value="_self">Same Tab</option>
            <option value="_blank">New Tab</option>
          </select>
        </div>
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Link className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            CTA Button
          </span>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Button Text
          </label>
          <input
            type="text"
            value={props.ctaText ?? ""}
            onChange={(e) => setProp((p: any) => (p.ctaText = e.target.value))}
            className="w-full px-3 py-2 border rounded text-sm"
            placeholder="e.g. Learn More (leave empty to hide)"
            title="CTA button text"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Button Link URL
          </label>
          <input
            type="text"
            value={props.ctaLink ?? ""}
            onChange={(e) => setProp((p: any) => (p.ctaLink = e.target.value))}
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="https://... or /page-slug"
            title="CTA link URL"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Open In
          </label>
          <select
            value={props.ctaTarget ?? "_self"}
            onChange={(e) =>
              setProp((p: any) => (p.ctaTarget = e.target.value))
            }
            className="w-full px-3 py-2 border rounded text-sm"
            title="CTA link target"
          >
            <option value="_self">Same Tab</option>
            <option value="_blank">New Tab</option>
          </select>
        </div>
      </div>
    </div>
  );
};

AboutSection.craft = {
  displayName: "About Section",
  props: {
    title: "About Us",
    content: "Our institution has been a beacon of excellence...",
    imageUrl: "",
    imageLink: "",
    imageLinkTarget: "_self",
    ctaText: "",
    ctaLink: "",
    ctaTarget: "_self",
    backgroundColor: "#f9fafb",
    width: "100%",
    minHeight: "auto",
    borderRadius: "0px",
    paddingTop: "64px",
    paddingRight: "16px",
    paddingBottom: "64px",
    paddingLeft: "16px",
    marginTop: "0px",
    marginRight: "0px",
    marginBottom: "0px",
    marginLeft: "0px",
  },
  related: {
    toolbar: AboutSectionSettings,
  },
};
