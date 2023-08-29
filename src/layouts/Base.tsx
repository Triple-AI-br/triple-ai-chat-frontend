/* eslint-disable indent */
import { useLocation, useNavigate } from "react-router-dom";
import { routesManager } from "../routes/routesManager";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
    ICustomerData,
    actionLogout,
    selectCustomerData,
    selectIsAdminOrSuperUser,
    selectIsSuperUser as selectIsSuperuser,
} from "../redux/authenticationSlice";
import { CustomSnackbar } from "../components/shared";

import {
    InboxOutlined,
    SnippetsOutlined,
    TeamOutlined,
    UserOutlined,
    RightOutlined,
    LeftOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
    Breadcrumb,
    Layout,
    Menu,
    theme,
    Button,
    Tooltip,
    Typography,
    Grid,
} from "antd";
import { useEffect, useState } from "react";
import React from "react";

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

interface IBaseProps {
    children: JSX.Element;
    title: string;
}

const Base = ({ children, title }: IBaseProps) => {
    const { useBreakpoint } = Grid;
    const screenSize = useBreakpoint();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isAdminOrSuperUser = useAppSelector(selectIsAdminOrSuperUser);
    const customerData: ICustomerData | undefined =
        useAppSelector(selectCustomerData);
    const isSuperuser = useAppSelector(selectIsSuperuser);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleLogout = () => dispatch(actionLogout());
    const [collapsed, setCollapsed] = useState(screenSize.xs || screenSize.sm);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    let initialTab: string;
    switch (pathname) {
        case routesManager.getProjectsRoute():
            initialTab = "1";
            break;
        case routesManager.getPromptsRoute():
            initialTab = "2";
            break;
        case routesManager.getAdminRoute():
            initialTab = "3";
            break;
        case routesManager.getSuperuserRoute():
            initialTab = "4";
            break;
        default:
            initialTab = "0";
    }

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        path: string,
        icon?: React.ReactNode,
        children?: MenuItem[]
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            onClick: () => {
                navigate(path);
            },
        } as MenuItem;
    }
    const items: MenuItem[] = [
        getItem(
            "Projects",
            "1",
            routesManager.getProjectsRoute(),
            <InboxOutlined />
        ),
        getItem(
            "Prompts",
            "2",
            routesManager.getPromptsRoute(),
            <SnippetsOutlined />
        ),
    ];
    if (isAdminOrSuperUser)
        items.push(
            getItem(
                "Admin",
                "3",
                routesManager.getAdminRoute(),
                <TeamOutlined />
            )
        );

    if (isSuperuser)
        items.push(
            getItem(
                "Super User",
                "4",
                routesManager.getSuperuserRoute(),
                <UserOutlined />
            )
        );

    useEffect(() => {
        screenSize.xs ? setCollapsed(true) : setCollapsed(false);
    }, [screenSize]);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <CustomSnackbar />
            <Sider
                collapsible
                collapsed={collapsed}
                trigger={screenSize.xs ? undefined : null}
                collapsedWidth={screenSize.xs ? "0" : undefined}
                onCollapse={() => {
                    toggleCollapsed();
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 10,
                    }}
                >
                    <Typography.Title level={5} style={{ color: "#fff" }}>
                        {collapsed ? "T. AI" : "Triple AI"}
                    </Typography.Title>
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[initialTab]}
                    mode="inline"
                    items={items}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        danger
                        onClick={handleLogout}
                        style={{
                            position: "absolute",
                            margin: "0 auto",
                            bottom: 15,
                            width: "85%",
                            background: "transparent",
                        }}
                        icon={<LogoutOutlined />}
                    >
                        {collapsed ? null : "Logout"}
                    </Button>
                </div>
                {screenSize.xs ? null : (
                    <Tooltip
                        title={collapsed ? "Expand" : "Collapse"}
                        placement="right"
                    >
                        <Button
                            type="primary"
                            onClick={toggleCollapsed}
                            shape="circle"
                            style={{
                                color: "black",
                                border: "1px solid darkgray",
                                background: "white",
                                position: "absolute",
                                top: 52,
                                right: -12,
                            }}
                            icon={
                                collapsed ? (
                                    <RightOutlined size={1} />
                                ) : (
                                    <LeftOutlined size={1} />
                                )
                            }
                            size="small"
                        />
                    </Tooltip>
                )}
            </Sider>
            <Layout>
                <Header
                    style={{
                        paddingLeft: 20,
                        background: colorBgContainer,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        {`${title} - ${customerData?.name}`}
                    </Typography.Title>
                </Header>
                <Content style={{ margin: "0 32px" }}>
                    <Breadcrumb
                        style={{ margin: "16px 5px" }}
                        items={pathname.split("/").map(i => ({ title: i }))}
                    ></Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Made with ❤️ by Triple AI
                </Footer>
            </Layout>
        </Layout>
    );
};

export { Base };
