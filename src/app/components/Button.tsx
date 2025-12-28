import { ReactNode } from "react";
import clsx from "clsx";

const COLOR_VARIANTS = {
  blue: {
    base: "bg-blue-400 text-white",
    hover: "hover:bg-blue-600 hover:shadow-[0_5px_10px_rgba(0,0,0,0.25)]",
    active: "active:shadow-[0_6px_12px_rgba(0,0,0,0.2)]",
  },
  rose: {
    base: "bg-rose-400 text-white",
    hover: "hover:bg-rose-500 hover:shadow-[0_5px_10px_rgba(0,0,0,0.25)]",
    active: "active:shadow-[0_6px_12px_rgba(0,0,0,0.2)]",
  },
  gray: {
    base: "bg-gray-200 text-gray-900",
    hover: "hover:bg-gray-300 hover:shadow-[0_5px_10px_rgba(0,0,0,0.25)]",
    active: "active:shadow-[0_6px_12px_rgba(0,0,0,0.15)]",
  },
} as const;

type ButtonVariant = keyof typeof COLOR_VARIANTS;

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type AnchorProps = {
  href: string;
};

type NativeButtonProps = {
  href?: never;
  type?: "button" | "submit";
  onClick?: () => void;
};

type ButtonProps = BaseProps & (AnchorProps | NativeButtonProps);

export function Button({
  children,
  variant = "blue",
  className,
  ...props
}: ButtonProps) {
  const styles = COLOR_VARIANTS[variant];

  const classes = clsx(
    `
      relative
      rounded-lg
      p-3
      font-bold
      cursor-pointer

      transition-all
      duration-200
      ease-in-out

      active:translate-y-[1px]
      hover:-translate-y-1
    `,
    styles.base,
    styles.hover,
    styles.active,
    className
  );

  if ("href" in props) {
    return (
      <a href={props.href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
