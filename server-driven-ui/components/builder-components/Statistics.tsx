"use client";

import React from "react";
import { useNode } from "@craftjs/core";
import { Users, GraduationCap, Building2, Trophy } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  icon: string;
}

interface StatisticsProps {
  stats?: StatItem[];
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
}

export const Statistics = ({
  stats = [
    { label: "Students", value: "5000+", icon: "Users" },
    { label: "Courses", value: "40+", icon: "GraduationCap" },
    { label: "Campuses", value: "3", icon: "Building2" },
    { label: "Awards", value: "15+", icon: "Trophy" },
  ],
  backgroundColor = "#f8fafc",
  textColor = "#1e293b",
  paddingTop = "64px",
  paddingRight = "16px",
  paddingBottom = "64px",
  paddingLeft = "16px",
  marginTop = "0px",
  marginRight = "0px",
  marginBottom = "0px",
  marginLeft = "0px",
}: StatisticsProps) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode((node) => ({ id: node.id }));

  const padding = `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
  const margin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;
  const sectionClass = `sdui-stats-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const itemClass = `${sectionClass}-item`;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="w-8 h-8" />;
      case "GraduationCap":
        return <GraduationCap className="w-8 h-8" />;
      case "Building2":
        return <Building2 className="w-8 h-8" />;
      case "Trophy":
        return <Trophy className="w-8 h-8" />;
      default:
        return <Users className="w-8 h-8" />;
    }
  };

  return (
    <>
      <style>{`
                .${sectionClass} {
                    background-color: ${backgroundColor};
                    padding: ${padding};
                    margin: ${margin};
                }
                .${itemClass} {
                    color: ${textColor};
                }
            `}</style>
      <div
        ref={(ref: HTMLDivElement | null) => {
          if (ref) connect(drag(ref));
        }}
        className={sectionClass}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center group ${itemClass}`}>
              <div className="mb-4 inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm text-blue-600 group-hover:scale-110 transition-transform duration-300">
                {getIcon(stat.icon)}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const StatisticsSettings = () => {
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
          title="Statistics background color"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Text Color</label>
        <input
          type="color"
          value={props.textColor}
          onChange={(e) => setProp((p: any) => (p.textColor = e.target.value))}
          className="w-full h-10 rounded"
          title="Statistics text color"
        />
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
                    : "16px")
                }
                onChange={(e) =>
                  setProp((p: any) => ((p as any)[key] = e.target.value))
                }
                className="w-full px-2 py-1.5 border rounded text-xs"
                title={`Statistics padding ${label.toLowerCase()}`}
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
                title={`Statistics margin ${label.toLowerCase()}`}
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

Statistics.craft = {
  displayName: "Statistics",
  props: {
    stats: [
      { label: "Students", value: "5000+", icon: "Users" },
      { label: "Courses", value: "40+", icon: "GraduationCap" },
      { label: "Campuses", value: "3", icon: "Building2" },
      { label: "Awards", value: "15+", icon: "Trophy" },
    ],
    backgroundColor: "#f8fafc",
    textColor: "#1e293b",
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
    toolbar: StatisticsSettings,
  },
};
