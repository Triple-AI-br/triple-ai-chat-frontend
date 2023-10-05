import { Button, Checkbox, ColorPicker, Form, FormInstance, Input, InputNumber, Modal } from "antd";
import { useRef, useState } from "react";
import { CreateCustomerParams as FormType, customerService } from "../../../services";
import { useAppDispatch } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import axios from "axios";

type NewCustomerModalProps = {
  open: boolean;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
};

const defaultInitialValues = {
  limit_queries_per_month: 50,
  limit_number_of_projects: 3,
  limit_size_in_gb: 5,
  limit_number_of_users: 10,
};

const NewCustomerModal: React.FC<NewCustomerModalProps> = ({
  open,
  confirmCallback,
  cancelCallback,
}) => {
  const formRef = useRef<FormInstance>(null);
  const dispatch = useAppDispatch();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [color, setColor] = useState<string>("#ffffff");

  const postNewCustomer = async (payload: FormType) => {
    try {
      payload.main_color = color;
      const createdCustomer = await customerService.createCustomer(payload);
      return createdCustomer;
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
    }
  };

  const handleConfirm = async (e: FormType) => {
    try {
      setIsSubmiting(true);
      await postNewCustomer(e);
      if (confirmCallback) {
        confirmCallback();
      }
      formRef.current?.resetFields();
      dispatch(
        actionDisplayNotification({
          messages: ["Customer has been successfully created!"],
          severity: "success",
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
      title="Create new customer"
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
            maxLength={2083}
            placeholder="https://media.licdn.com/dms/image/C4E0BAQGlvQpq2iT-MQ/company-logo"
          />
        </Form.Item>
        <Form.Item noStyle>
          <Form.Item<FormType>
            name="main_color"
            label="Main color"
            style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            rules={[{ required: true, message: "Please select a main color" }]}
          >
            <ColorPicker
              onChangeComplete={(color) => setColor(color.toHexString())}
              value={color}
              disabledAlpha
              defaultValue="#fff"
              size="small"
              showText
            />
          </Form.Item>
          <Form.Item<FormType>
            name="active"
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

export { NewCustomerModal };
