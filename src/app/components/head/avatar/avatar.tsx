import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Row, Space, Spin } from "antd";
import { signOut, useSession } from "next-auth/react";
import "./style.css";

export function AvatarHead() {
  const { data, status } = useSession();
  const [first = "", last = ""] = data?.user?.name.split(" ") ?? [];
  const loading = status === "loading";
  const img = data?.user?.image;
  const firstName = first[0]
    ?.toLocaleUpperCase()
    .concat(first.slice(1).toLowerCase());
  const lastName = last[0]
    ?.toLocaleUpperCase()
    .concat(last.slice(1).toLowerCase());

  const items: MenuProps["items"] = [
    {
      onClick: () => {
        signOut({ callbackUrl: "/" });
      },
      label: "Sair",
      key: "1",
      icon: <LogoutOutlined />,
    },
  ];
  const menuProps = {
    items,
  };
  return (
    <Row>
      <Space>
        <p className="name">{loading ? "" : firstName + " " + lastName} </p>
        <Spin size="small" spinning={loading}>
          <Avatar
            className="avatar"
            src={img}
            size={40}
            icon={img === null && <UserOutlined />}
          />
        </Spin>
      </Space>
      <Dropdown disabled={loading} trigger={["click"]} menu={menuProps}>
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
    </Row>
  );
}
