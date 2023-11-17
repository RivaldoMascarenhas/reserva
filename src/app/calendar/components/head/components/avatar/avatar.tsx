import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import { signOut, useSession } from "next-auth/react";
import "./style.css";

export function AvatarHead() {
  const {} = useSession();
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

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
        <span className="name">Rivaldo Mascarenhas</span>
        <Avatar className="avatar" size={40}>
          RM
        </Avatar>
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
