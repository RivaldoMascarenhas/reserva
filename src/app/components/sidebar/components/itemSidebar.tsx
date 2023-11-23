import { ComponentProps } from "react";

type ItemSidebarProps = {
  name: string;
} & ComponentProps<"li">;

export function ItemSidebar({ name, ...props }: ItemSidebarProps) {
  return <li {...props}>{name}</li>;
}
