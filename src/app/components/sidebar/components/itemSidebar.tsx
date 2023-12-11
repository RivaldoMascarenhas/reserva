import { useStore } from "@/zustandStore";
import { ComponentProps } from "react";

type ItemSidebarProps = {
  name: string;
} & ComponentProps<"li">;

export function ItemSidebar({ name, style, ...props }: ItemSidebarProps) {
  const { currentAmbient } = useStore();
  return (
    <li
      style={currentAmbient?.title === name ? { background: "#ccc" } : {}}
      {...props}
    >
      {name}
    </li>
  );
}
