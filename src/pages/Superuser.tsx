import { Box } from "@mui/material";
import { Base } from "../layouts/Base";
import { useEffect, useState } from "react";
import { customerService } from "../services";
import {
  ICustomerData,
  actionSwitchCustomer,
  selectCustomerData,
} from "../redux/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { actionDisplayNotification } from "../redux/notificationSlice";
import { Avatar, Button, ColorPicker, List, Modal, Skeleton, Typography } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { CustomerModal } from "../components/SuperUser/CustomerModal";
import { useWindowSize } from "../utils/useWindowSize";

const DESKTOP_WIDTH = 800;

const SuperuserPage = () => {
  const initialCustomer = useAppSelector(selectCustomerData);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const [modal, contextHolder] = Modal.useModal();

  const [customerOptions, setCustomerOptions] = useState<ICustomerData[]>([]);
  const [editCustomer, setEditCustomer] = useState<ICustomerData>();
  const [openCustomerModal, setOpenCustomerModal] = useState<boolean>(false);
  const [loadingCustomer, setLoadingCustomer] = useState<boolean>(false);

  const isDesktop = width >= DESKTOP_WIDTH;
  const listCustomer = customerOptions.map((customer) => ({
    picture: customer.logo_url,
    id: customer.id,
    name: customer.name,
    color: customer.main_color,
    is_active: customer.is_active,
  }));

  const handleSubmit = async (customerId: number) => {
    await dispatch(actionSwitchCustomer(customerId));
    dispatch(
      actionDisplayNotification({
        messages: ["Customer successfully changed"],
        severity: "success",
      }),
      }),
    );
  };

  const setCustomerToState = async () => {
    setLoadingCustomer(true);
    const _customers = await customerService.getAllCustomers();
    setCustomerOptions(_customers);
    setLoadingCustomer(false);
  };

  const confirmRemoveCustomerModal = (name: string, id: number) => {
    modal.confirm({
      title: `Delete customer ${name}?`,
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete customer ${name}?`,
      okText: "Delete",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await customerService.deleteCustomer(id);
          setCustomerToState();
          dispatch(
            actionDisplayNotification({
              messages: ["Customer successfully deleted"],
              severity: "success",
            }),
          );
        } catch (err) {
          dispatch(
            actionDisplayNotification({
              messages: ["Error while deleting customer"],
              severity: "error",
            }),
          );
        }
      },
    });
  };

  useEffect(() => {
    (async () => {
      await setCustomerToState();
    })();
  }, []);

  useEffect(() => {
    if (editCustomer) {
      setOpenCustomerModal(true);
    }
  }, [editCustomer]);

  return (
    <Base title="Super User">
      <Box display="flex" flexDirection="column" gap={2}>
        <CustomerModal
          open={openCustomerModal}
          cancelCallback={() => {
            setOpenCustomerModal((prev) => !prev);
            setEditCustomer(undefined);
          }}
          confirmCallback={async () => {
            await setCustomerToState();
            setOpenCustomerModal(false);
            setEditCustomer(undefined);
          }}
          editCustomer={editCustomer}
        />
        {contextHolder}
        <Box display="flex" flexDirection="row" gap={2}>
          <Typography.Title level={2}>Switch Customers</Typography.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenCustomerModal((prev) => !prev)}
          >
            New customer
          </Button>
        </Box>
        <List
          className="demo-loadmore-list"
          loading={loadingCustomer}
          itemLayout={isDesktop ? "horizontal" : "vertical"}
          dataSource={listCustomer}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  key="list-loadmore-edit"
                  onClick={() =>
                    setEditCustomer(customerOptions.find((customer) => customer.id === item.id))
                  }
                >
                  edit
                </a>,
                <a
                  key="list-loadmore-delete"
                  onClick={() => {
                    if (initialCustomer?.id === item.id) return;
                    confirmRemoveCustomerModal(item.name, item.id);
                  }}
                  style={{
                    color: initialCustomer?.id === item.id ? "gray" : "red",
                    cursor: initialCustomer?.id === item.id ? "not-allowed" : "pointer",
                  }}
                >
                  delete
                </a>,
                <a
                  key="list-loadmore-use"
                  onClick={() => {
                    if (initialCustomer?.id === item.id || !item.is_active) return;
                    handleSubmit(item.id);
                  }}
                  style={{
                    color: initialCustomer?.id === item.id || !item.is_active ? "gray" : undefined,
                    cursor:
                      initialCustomer?.id === item.id || !item.is_active
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  use
                </a>,
              ]}
            >
              <Skeleton avatar title={false} loading={loadingCustomer} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture} />}
                  title={item.name}
                  description={<ColorPicker value={item.color} showText disabled />}
                />
                <Typography.Text>ID: {String(item.id).padStart(2, "0")}</Typography.Text>
                {!item.is_active ? (
                  <Typography.Text type="warning">Inactive customer</Typography.Text>
                ) : null}
              </Skeleton>
            </List.Item>
          )}
        />
      </Box>
    </Base>
  );
};

export { SuperuserPage };
