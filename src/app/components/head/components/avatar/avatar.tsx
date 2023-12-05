import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Space, Spin } from "antd";
import { signOut, useSession } from "next-auth/react";
import "./style.css";

export function AvatarHead() {
  const { data, status } = useSession();

  const [first = "", last = ""] = data?.user?.name.split(" ") ?? [];
  const firstName =
    first && first[0].toLocaleUpperCase().concat(first.slice(1).toLowerCase());
  const lastName =
    last && last[0].toLocaleUpperCase().concat(last.slice(1).toLowerCase());

  const items: MenuProps["items"] = [
    {
      onClick: () => signOut({ callbackUrl: "/" }),
      label: "Sair",
      key: "1",
      icon: <LogoutOutlined />,
    },
  ];
  const menuProps = {
    items,
  };
  return (
    <Spin spinning={status === "loading"}>
      <Space>
        <span className="name">{firstName + " " + lastName} </span>
        <Avatar className="avatar" src={data?.user?.image} size={40} />
      </Space>
      <Dropdown trigger={["click"]} menu={menuProps}>
        <Button
          style={{
            border: "none",
            height: "50%",
            boxShadow: "none",
          }}
        >
          <DownOutlined />
        </Button>
      </Dropdown>
    </Spin>
  );
}