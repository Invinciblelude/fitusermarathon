"use client";

export function PrintButton({ label = "Print flyer" }: { label?: string }) {
  return (
    <button type="button" className="fu-btn-sm fu-no-print" onClick={() => window.print()}>
      {label}
    </button>
  );
}
