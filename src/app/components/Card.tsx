import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`
        bg-[var(--bg-med)]
        rounded-xl
        shadow-[0_5px_10px_rgba(0,0,0,0.08)]
        relative
        before:absolute
        before:inset-0
        before:rounded-xl
        before:shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]
        before:pointer-events-none
        ${className}
      `}
    >
      {children}
    </div>
  );
}
