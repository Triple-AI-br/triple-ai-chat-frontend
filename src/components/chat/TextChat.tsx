import { Box } from "@mui/material";
import { TextArea } from "./TextArea";
import { Forward as SendIcon } from "@mui/icons-material";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/authenticationSlice";
import { useEffect, useState } from "react";
import { ICustomer, customersService } from "../../services";

const DEFAULT_CUSTOMER_ID = 1;

interface ITextChatProps {
    currentMessage: string;
    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
    handleEnterPressed(e: React.KeyboardEvent<Element>): void;
    handleSendMessage(): Promise<void>;
}
const TextChat = ({
    currentMessage,
    handleChange,
    handleEnterPressed,
    handleSendMessage,
}: ITextChatProps) => {
    const userData = useAppSelector(selectUserData);
    const [customerData, setCustomerData] = useState<ICustomer>();

    useEffect(() => {
        (async () => {
            const _customerId = userData?.customer_id ?? DEFAULT_CUSTOMER_ID;
            const data = await customersService.getCustomer(_customerId);
            setCustomerData(data);
        })();
    }, []);

    return (
        <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
            sx={{
                backgroundColor: "white",
                borderTop: "1px solid #ccc",
            }}
        >
            <TextArea
                autoFocus
                value={currentMessage}
                onChange={handleChange}
                onKeyDown={handleEnterPressed}
            />
            <Box
                onClick={handleSendMessage}
                sx={{
                    borderRadius: 1,
                    backgroundColor: customerData?.main_color,
                    cursor: "pointer",
                    p: 1.5,
                    my: 1,
                    mr: 1,
                }}
            >
                <SendIcon
                    sx={{
                        transform: "rotate(-90deg)",
                        color: "#fff",
                    }}
                />
            </Box>
        </Box>
    );
};
export { TextChat };
