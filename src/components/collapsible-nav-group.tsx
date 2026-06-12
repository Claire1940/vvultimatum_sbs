"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleNavGroupProps {
  title: string;
  icon: React.ReactNode;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CollapsibleNavGroup({ title, icon, count, defaultOpen = false, children }: CollapsibleNavGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="mb-2 flex w-full items-center gap-2 text-sm font-semibold text-foreground"
      >
        {icon}
        <span>{title}</span>
        {count !== undefined && <span className="ml-1 text-xs text-muted-foreground">({count})</span>}
        <ChevronDown className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && children}
    </div>
  );
}
