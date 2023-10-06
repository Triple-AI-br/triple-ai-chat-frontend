import { Button, Checkbox, ColorPicker, Form, FormInstance, Input, InputNumber, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { CreateCustomerParams as FormType, customerService } from "../../../services";
import { useAppDispatch } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import axios from "axios";
import { ICustomerData } from "../../../redux/authenticationSlice";

type CustomerModalProps = {
  open: boolean;
  editCustomer?: ICustomerData;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
};

const CustomerModal: React.FC<CustomerModalProps> = ({
  open,
  editCustomer,
  confirmCallback,
  cancelCallback,
}) => {
  const formRef = useRef<FormInstance>(null);
  const dispatch = useAppDispatch();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [color, setColor] = useState<string>(editCustomer?.main_color || "#1890FF");

  const isEditing = !!editCustomer;
  const today = new Date().getDate();
  const defaultInitialValues = {
    limit_queries_per_month: 100,
    limit_number_of_projects: 10,
    limit_size_in_gb: 5,
    limit_number_of_users: 10,
    renewal_day: today > 28 ? 28 : today,
    is_active: true,
    ...(editCustomer || {}),
  };

  const postNewCustomer = async (payload: FormType) => {
    payload.main_color = color;
    const createdCustomer = await customerService.createCustomer(payload);
    return createdCustomer;
  };

  const updateCustomer = async (payload: FormType) => {
    if (!editCustomer) return;
    payload.main_color = color;
    await customerService.updateCustomer(payload, editCustomer.id);
  };

  useEffect(() => {
    if (editCustomer) {
      setColor(editCustomer.main_color);
    }
  }, [editCustomer]);

  const handleConfirm = async (e: FormType) => {
    try {
      setIsSubmiting(true);
      if (isEditing) {
        await updateCustomer(e);
        dispatch(
          actionDisplayNotification({
            messages: ["Customer has been successfully updated!"],
            severity: "success",
          }),
        );
      } else {
        await postNewCustomer(e);
        dispatch(
          actionDisplayNotification({
            messages: ["Customer has been successfully created!"],
            severity: "success",
          }),
        );
      }
      if (confirmCallback) {
        confirmCallback();
      }
      formRef.current?.resetFields();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err?.response?.data.detail[0].msg) {
          dispatch(
            actionDisplayNotification({
              messages: [err?.response?.data.detail[0].msg],
              severity: "error",
            }),
          );
          return;
        }
      }
      dispatch(
        actionDisplayNotification({
          messages: ["An unexpected error occurred!"],
          severity: "error",
        }),
      );
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleClose = () => {
    formRef.current?.resetFields();
    if (cancelCallback) {
      cancelCallback();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      onOk={confirmCallback}
      destroyOnClose={true}
      title={isEditing ? "Edit Customer" : "Create new customer"}
      footer={[
        <Button loading={isSubmiting} key="back" onClick={handleClose}>
          Cancel
        </Button>,
        <Button
          loading={isSubmiting}
          key="submit"
          form="customer-form"
          htmlType="submit"
          type="primary"
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        id="customer-form"
        name="basic"
        preserve={false}
        ref={formRef}
        onFinish={handleConfirm}
        initialValues={defaultInitialValues}
        autoComplete="off"
        layout="vertical"
        requiredMark="optional"
        style={{ marginTop: "20px" }}
      >
        <Form.Item<FormType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormType>
          label="Logo url"
          name="logo_url"
          rules={[{ required: true, message: "Please enter the logo URL" }]}
        >
          <Input
            maxLength={10_000}
            placeholder="https://media.licdn.com/dms/image/C4E0BAQGlvQpq2iT-MQ/company-logo"
          />
        </Form.Item>
        <Form.Item noStyle>
          <Form.Item<FormType>
            name="main_color"
            label="Main color"
            initialValue={color}
            style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            rules={[{ required: true, message: "Please select a main color" }]}
          >
            <ColorPicker
              onChangeComplete={(color) => setColor(color.toHexString())}
              value={color}
              disabledAlpha
              size="small"
              showText
            />
          </Form.Item>
          <Form.Item<FormType>
            name="is_active"
            style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            valuePropName="checked"
          >
            <Checkbox defaultChecked={true}>Active?</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item noStyle>
          <Form.Item<FormType>
            name="limit_queries_per_month"
            label="Limit queries per month"
            style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            rules={[{ required: true, message: "Please enter a limit queries" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item<FormType>
            name="limit_number_of_projects"
            label="Limit number of projects"
            style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            rules={[{ required: true, message: "Please enter a limit number of projects" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form.Item>
        <Form.Item noStyle>
          <Form.Item<FormType>
            name="limit_size_in_gb"
            label="Limit size in Gb"
            style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            rules={[{ required: true, message: "Please enter a limit size in Gb" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item<FormType>
            name="limit_number_of_users"
            label="Limit number of users"
            style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            rules={[{ required: true, message: "Please enter a limit of users" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form.Item>
        <Form.Item<FormType>
          label="Renewal day"
          name="renewal_day"
          rules={[{ required: true, message: "Please enter a renewal day" }]}
        >
          <InputNumber min={1} max={28} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { CustomerModal };
