import React, { useState } from "react";
import { DoubleLeftOutlined, DoubleRightOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Space, Typography } from "antd";
import navigation from "common/navigation";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    const { target } = navigation.find((item) => item.key === key) || {};
    if (target) {
      navigate(target);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Space
          style={{ width: "100%", padding: "0.8rem 0.2rem" }}
          align="center"
          direction="vertical">
          <Avatar size={50} icon={<UserOutlined />} />
          <Title style={{ color: "white" }} level={5}>
            {collapsed ? "DEVO" : "DEVOTION"}
          </Title>
        </Space>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[navigation[0].key]}
          items={navigation}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
