"use client";

import React from "react";
import { useNode } from "@craftjs/core";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import Button from "../ui/Button";

interface ContactFormProps {
  title?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
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
  positionMode?: "flow" | "absolute";
  x?: string;
  y?: string;
  zIndex?: string;
}

export const ContactForm = ({
  title = "Get in Touch",
  description = "We would love to hear from you. Fill out the form and we will get back to you soon.",
  address = "123 Education Lane, Academic City, State 45678",
  phone = "+91 1234567890",
  email = "info@institution.edu.in",
  backgroundColor = "#ffffff",
  width = "100%",
  minHeight = "auto",
  borderRadius = "0px",
  paddingTop = "64px",
  paddingRight = "24px",
  paddingBottom = "64px",
  paddingLeft = "24px",
  marginTop = "0px",
  marginRight = "0px",
  marginBottom = "0px",
  marginLeft = "0px",
  positionMode = "flow",
  x = "0px",
  y = "0px",
  zIndex = "1",
}: ContactFormProps) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode((node) => ({ id: node.id }));

  const rootClass = `sdui-contact-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const padding = `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
  const margin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;
  const isAbsolute = positionMode === "absolute";
  const parsedZIndex = Number.parseInt(zIndex, 10);

  return (
    <>
      <style>{`
                .${rootClass} {
                    background-color: ${backgroundColor};
                    width: ${width};
                    min-height: ${minHeight};
                    border-radius: ${borderRadius};
                    padding: ${padding};
                    margin: ${margin};
                    position: ${isAbsolute ? "absolute" : "relative"};
                    left: ${isAbsolute ? x : "auto"};
                    top: ${isAbsolute ? y : "auto"};
                    z-index: ${Number.isNaN(parsedZIndex) ? 1 : parsedZIndex};
                    box-sizing: border-box;
                }
            `}</style>
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) connect(drag(ref));
        }}
        className={rootClass}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600 mb-10 leading-relaxed text-lg">
              {description}
            </p>

            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Our Location</h4>
                  <p className="text-gray-500">{address}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Phone Number</h4>
                  <p className="text-gray-500">{phone}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">
                    Email Address
                  </h4>
                  <p className="text-gray-500">{email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl shadow-sm border border-gray-100">
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    title="First name"
                    className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    title="Last name"
                    className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  title="Email address"
                  className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Subject
                </label>
                <select
                  title="Select subject"
                  className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
                >
                  <option>Admission Inquiry</option>
                  <option>Campus Visit</option>
                  <option>Course Information</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  title="Message"
                  className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <Button
                size="lg"
                className="w-full gap-2 rounded-xl h-14 translate-y-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export const ContactFormSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props }));

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
    <div className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="border-b pb-4 space-y-3">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
          Content
        </h4>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            title="Contact form title"
            value={props.title ?? ""}
            onChange={(e) => setProp((p: any) => (p.title = e.target.value))}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            title="Contact form description"
            value={props.description ?? ""}
            onChange={(e) =>
              setProp((p: any) => (p.description = e.target.value))
            }
            className="w-full px-3 py-2 border rounded"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="text"
            title="Contact form email"
            value={props.email ?? ""}
            onChange={(e) => setProp((p: any) => (p.email = e.target.value))}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      <div className="border-b pb-4 space-y-3">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
          Layout
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Width
            </label>
            <select
              title="Contact form width"
              value={props.width ?? "100%"}
              onChange={(e) => setProp((p: any) => (p.width = e.target.value))}
              className="w-full px-2 py-1.5 border rounded text-xs"
            >
              {["auto", "100%", "75%", "50%", "1200px"].map((opt) => (
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
              title="Contact form minimum height"
              value={props.minHeight ?? "auto"}
              onChange={(e) =>
                setProp((p: any) => (p.minHeight = e.target.value))
              }
              className="w-full px-2 py-1.5 border rounded text-xs"
            >
              {["auto", "300px", "400px", "500px", "600px", "800px"].map(
                (opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Background Color
          </label>
          <input
            type="color"
            title="Contact form background color"
            value={props.backgroundColor ?? "#ffffff"}
            onChange={(e) =>
              setProp((p: any) => (p.backgroundColor = e.target.value))
            }
            className="w-full h-10 border rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Border Radius
          </label>
          <select
            title="Contact form border radius"
            value={props.borderRadius ?? "0px"}
            onChange={(e) =>
              setProp((p: any) => (p.borderRadius = e.target.value))
            }
            className="w-full px-2 py-1.5 border rounded text-xs"
          >
            {["0px", "4px", "8px", "12px", "16px", "20px", "24px"].map(
              (opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

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
                title={`Contact form padding ${label.toLowerCase()}`}
                value={
                  (props as any)[key] ??
                  (label === "Top" || label === "Bottom" ? "64px" : "24px")
                }
                onChange={(e) =>
                  setProp((p: any) => ((p as any)[key] = e.target.value))
                }
                className="w-full px-2 py-1.5 border rounded text-xs"
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
                title={`Contact form margin ${label.toLowerCase()}`}
                value={(props as any)[key] ?? "0px"}
                onChange={(e) =>
                  setProp((p: any) => ((p as any)[key] = e.target.value))
                }
                className="w-full px-2 py-1.5 border rounded text-xs"
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

      <div className="border-b pb-4">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Position
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["flow", "absolute"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setProp((p: any) => (p.positionMode = mode))}
                  className={`px-3 py-2 rounded border text-xs font-semibold ${
                    (props.positionMode ?? "flow") === mode
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Z Index
            </label>
            <input
              type="number"
              title="Contact form z-index"
              value={props.zIndex ?? "1"}
              onChange={(e) => setProp((p: any) => (p.zIndex = e.target.value))}
              className="w-full px-3 py-2 border rounded text-sm"
              min={0}
            />
          </div>
        </div>
        {(props.positionMode ?? "flow") === "absolute" && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                X
              </label>
              <input
                type="text"
                title="Contact form position X"
                value={props.x ?? "0px"}
                onChange={(e) => setProp((p: any) => (p.x = e.target.value))}
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Y
              </label>
              <input
                type="text"
                title="Contact form position Y"
                value={props.y ?? "0px"}
                onChange={(e) => setProp((p: any) => (p.y = e.target.value))}
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ContactForm.craft = {
  displayName: "Contact Form",
  props: {
    title: "Get in Touch",
    description:
      "We would love to hear from you. Fill out the form and we will get back to you soon.",
    address: "123 Education Lane, Academic City, State 45678",
    phone: "+91 1234567890",
    email: "info@institution.edu.in",
    backgroundColor: "#ffffff",
    width: "100%",
    minHeight: "auto",
    borderRadius: "0px",
    paddingTop: "64px",
    paddingRight: "24px",
    paddingBottom: "64px",
    paddingLeft: "24px",
    marginTop: "0px",
    marginRight: "0px",
    marginBottom: "0px",
    marginLeft: "0px",
    positionMode: "flow",
    x: "0px",
    y: "0px",
    zIndex: "1",
  },
  related: {
    toolbar: ContactFormSettings,
  },
};
