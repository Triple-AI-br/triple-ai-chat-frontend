import { ArrowLeftOutlined } from "@ant-design/icons";
import { ICustomerData } from "../../../redux/authenticationSlice";
import { LeftTopBarContainer } from "./styled";
import { Avatar, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { getHexContrastColor } from "../../../utils/getContrastColor";

// Will this trigger vercel deployment?
interface ILeftTopBarProps {
  customerData?: ICustomerData | null;
}
const LeftTopBar = ({ customerData }: ILeftTopBarProps) => {
  const navigate = useNavigate();
  const backgroundColor = customerData?.main_color;
  const textColor = backgroundColor ? getHexContrastColor(backgroundColor) : "#FFF";

  return (
    <LeftTopBarContainer $customerColor={backgroundColor}>
      <ArrowLeftOutlined
        onClick={() => navigate(-1)}
        style={{ color: textColor, cursor: "pointer", fontSize: "20px" }}
      />
      <div className="customer_container">
        <Avatar src={customerData?.logo_url} size={40} style={{ border: "1px solid #fff" }} />
        <Typography.Title level={4} style={{ color: textColor, marginBottom: "0" }}>
          {customerData?.name}
        </Typography.Title>
      </div>
    </LeftTopBarContainer>
  );
};

export { LeftTopBar };
