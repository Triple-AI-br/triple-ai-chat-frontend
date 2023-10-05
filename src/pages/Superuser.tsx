import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Select,
  Typography,
} from "@mui/material";
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
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { NewCustomerModal } from "../components/SuperUser/NewCustomerModal";

const SuperuserPage = () => {
  const initialCustomer = useAppSelector(selectCustomerData);
  const dispatch = useAppDispatch();

  const [customerId, setCustomerId] = useState(initialCustomer?.id || 0);
  const [customerOptions, setCustomerOptions] = useState<ICustomerData[]>([]);
  const [openCreateCustomerModal, setOpenCreateCustomerModal] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setCustomerId(parseInt(event.target.value));
  };

  const handleSubmit = async () => {
    await dispatch(actionSwitchCustomer(customerId));
    dispatch(
      actionDisplayNotification({
        messages: ["Customer successfully changed"],
        severity: "success",
      }),
    );
  };

  useEffect(() => {
    (async () => {
      if (openCreateCustomerModal) return;
      const _customers = await customerService.getAllCustomers();
      setCustomerOptions(_customers);
    })();
  }, [openCreateCustomerModal]);

  return (
    <Base title="Super User">
      <Box display="flex" flexDirection="column" gap={2}>
        <NewCustomerModal
          open={openCreateCustomerModal}
          cancelCallback={() => setOpenCreateCustomerModal((prev) => !prev)}
          confirmCallback={() => setOpenCreateCustomerModal(false)}
        />
        <Box display="flex" flexDirection="row" gap={2}>
          <Typography component="h2" variant="h5">
            Switch Customers
          </Typography>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenCreateCustomerModal((prev) => !prev)}
          >
            New customer
          </Button>
        </Box>
        <Box
          display="flex"
          gap={3}
          alignItems="center"
          p={3}
          sx={{
            borderRadius: 3,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="select-label">Customer</InputLabel>
            <Select
              labelId="select-label"
              value={String(customerId)}
              label="Customer"
              onChange={handleChange}
              // sx={{ backgroundColor: "white" }}
            >
              {customerOptions.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={handleSubmit}
            type="primary"
            disabled={!initialCustomer || initialCustomer.id === customerId}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Base>
  );
};

export { SuperuserPage };
