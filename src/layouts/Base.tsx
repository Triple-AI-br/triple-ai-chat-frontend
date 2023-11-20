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

import {
  InboxOutlined,
  SnippetsOutlined,
  TeamOutlined,
  UserOutlined,
  RightOutlined,
  LeftOutlined,
  LogoutOutlined,
  HomeOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Image,
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Tooltip,
  Typography,
  Grid,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import React from "react";
import { languagesSupport } from "../i18n";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { setLanguageToStorage } from "../utils/setLanguageToStorage";

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

interface IBaseProps {
  children: React.ReactNode;
  title: string;
}

const Base = ({ children, title }: IBaseProps) => {
  const { t } = useTranslation();
  const { useBreakpoint } = Grid;
  const screenSize = useBreakpoint();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAdminOrSuperUser = useAppSelector(selectIsAdminOrSuperUser);
  const customerData: ICustomerData | undefined | null = useAppSelector(selectCustomerData);
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
    case routesManager.getContractsRoute():
      initialTab = "5";
      break;
    default:
      initialTab = "0";
  }

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    path: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
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
    getItem(t("pages.projects.tab"), "1", routesManager.getProjectsRoute(), <InboxOutlined />),
    getItem(t("pages.prompts.tab"), "2", routesManager.getPromptsRoute(), <SnippetsOutlined />),
    getItem("Contracts", "5", routesManager.getContractsRoute(), <FileProtectOutlined />),
  ];
  if (isAdminOrSuperUser)
    items.push(getItem("Admin", "3", routesManager.getAdminRoute(), <TeamOutlined />));

  if (isSuperuser) {
    items.push(getItem("Super User", "4", routesManager.getSuperuserRoute(), <UserOutlined />));
  }

  useEffect(() => {
    screenSize.xs ? setCollapsed(true) : setCollapsed(false);
  }, [screenSize]);

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={screenSize.xs ? undefined : null}
        collapsedWidth={screenSize.xs ? "0" : undefined}
        onCollapse={() => {
          toggleCollapsed();
        }}
        style={{
          height: "100svh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginTop: 10,
            }}
          >
            <Image
              preview={false}
              width={40}
              src={`${process.env.REACT_APP_BASE_FRONT_URL}/white-logo.png`}
            />
            <Typography.Title level={5} style={{ color: "#fff", margin: 0 }}>
              {collapsed ? "" : "Triple AI"}
            </Typography.Title>
          </div>
        </div>
        <Menu theme="dark" defaultSelectedKeys={[initialTab]} mode="inline" items={items} />
        {!(screenSize.xs && collapsed) && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title={collapsed ? t("global.logout") : ""} placement="right">
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
                {collapsed ? null : t("global.logout")}
              </Button>
            </Tooltip>
          </div>
        )}
        {screenSize.xs ? null : (
          <Tooltip title={collapsed ? t("global.expand") : t("global.collapse")} placement="right">
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
              icon={collapsed ? <RightOutlined size={1} /> : <LeftOutlined size={1} />}
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
            justifyContent: "space-between",
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            {`${title} - ${customerData?.name}`}
          </Typography.Title>
          <Select
            value={i18next.language}
            style={{ width: "200px", maxWidth: "40%" }}
            onChange={(key) => {
              setLanguageToStorage(key as "en" | "pt" | "es");
              i18next.changeLanguage(key);
            }}
            options={languagesSupport}
          />
        </Header>
        <Content style={{ margin: "0 32px" }}>
          <Breadcrumb
            style={{ margin: "16px 5px" }}
            items={[
              {
                href: "/projects",
                title: <HomeOutlined />,
              },
              ...pathname
                .split("/")
                .slice(1)
                .map((i) => ({
                  title: i,
                })),
            ]}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>{t("global.madeWithLove")}</Footer>
      </Layout>
    </Layout>
  );
};

export { Base };
