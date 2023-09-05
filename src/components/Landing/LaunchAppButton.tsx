import { routesManager } from "../../routes/routesManager";
import { useNavigate } from "react-router-dom";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Button } from "@mui/material";

function LaunchAppButton() {
	const navigate = useNavigate();
	return (
		<Button
			variant="outlined"
			endIcon={<LoginOutlinedIcon />}
			onClick={() => navigate(routesManager.getProjectsRoute())}
			sx={{
				px: 6,
				py: 3,
				borderRadius: 10,
				borderColor: "#EF8019",
				color: "#EF8019",
				":hover": {
					borderColor: "#EF8019",
					backgroundColor: "#EF801919",
				},
			}}
		>
            Entrar
		</Button>
	);
}

export { LaunchAppButton };
