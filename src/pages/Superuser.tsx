import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    SelectChangeEvent,
    Select,
    Typography,
    Button,
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

const SuperuserPage = () => {
    const initialCustomer = useAppSelector(selectCustomerData);
    const [customerId, setCustomerId] = useState(initialCustomer?.id || 0);
    const [customerOptions, setCustomerOptions] = useState<ICustomerData[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            const _customers = await customerService.getAllCustomers();
            setCustomerOptions(_customers);
        })();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setCustomerId(parseInt(event.target.value));
    };

    const handleSubmit = async () => {
        const res = await dispatch(actionSwitchCustomer(customerId));
        dispatch(
            actionDisplayNotification({
                messages: ["Customer successfully changed"],
                severity: "success",
            })
        );
    };

    return (
        <Base title="Super User">
            <Box display="flex" flexDirection="column" gap={2}>
                <Typography component="h2" variant="h5">
                    Switch Customers
                </Typography>
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
                            {customerOptions.map(item => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={
                            !initialCustomer ||
                            initialCustomer.id === customerId
                        }
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Base>
    );
};

export { SuperuserPage };
