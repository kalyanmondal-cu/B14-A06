"use client";

import { useEffect } from "react";

export default function Toast({
  message,
  onClose,
}: {
  message: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const id = window.setTimeout(onClose, 2400);
    return () => window.clearTimeout(id);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className="toast toast-end toast-bottom z-100 p-4">
      <div className="alert border-[#ccff00]/30 bg-[#151813] text-zinc-100 shadow-2xl">
        <span className="h-2 w-2 rounded-full bg-[#ccff00]" />
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
}
