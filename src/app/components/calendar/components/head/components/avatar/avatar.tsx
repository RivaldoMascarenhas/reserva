import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import { signOut, useSession } from "next-auth/react";
import "./style.css";

export function AvatarHead() {
  const { data } = useSession();
  const handleMenuClick: MenuProps["onClick"] = (e) => {};

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
    onClick: handleMenuClick,
  };
  return (
    <div>
      <Space>
        <span className="name">{data?.user?.name?.toUpperCase()}</span>
        <Avatar
          className="avatar"
          src={`${data?.user?.image}`}
          size={40}
        ></Avatar>
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
    </div>
  );
}
