import React, { useState } from "react";
import {
    DoubleLeftOutlined,
    DoubleRightOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Space, Typography } from "antd";
import { navigation } from "../configs";

const { Title } = Typography;
const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Space
                    style={{ width: "100%", padding: "0.8rem 0.2rem" }}
                    align="center"
                    direction="vertical"
                >
                    <Avatar size={50} icon={<UserOutlined />} />
                    <Title style={{ color: "white" }} level={5}>
                        {collapsed ? "DEVO" : "DEVOTION"}
                    </Title>
                </Space>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={navigation}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <DoubleRightOutlined />
                            ) : (
                                <DoubleLeftOutlined />
                            )
                        }
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
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
