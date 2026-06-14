"use client";

import dynamic from "next/dynamic";

const WebGLField = dynamic(
  () => import("./WebGLField").then((m) => m.WebGLField),
  { ssr: false }
);

/**
 * Site-wide interactive backdrop. Fixed behind all content; the field tracks the
 * cursor and scroll globally. A faint scrim keeps text legible over busy areas.
 */
export function FieldBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <WebGLField />
      <div className="absolute inset-0 bg-void/22" />
    </div>
  );
}
