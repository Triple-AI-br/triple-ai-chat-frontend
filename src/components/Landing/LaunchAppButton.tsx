/* eslint-disable @typescript-eslint/no-empty-function */
import { OpenInNewOutlined } from "@mui/icons-material";
import { OutlinedButton } from "./OutlinedButton";
import { routesManager } from "../../routes/routesManager";

function LaunchAppButton() {
    return (
        <OutlinedButton
            text="Case Timenow"
            endIcon={<OpenInNewOutlined />}
            onClick={() => {
                window.open(
                    routesManager.getChatRoute(),
                    "_blank",
                    "noreferrer"
                );
            }}
        />
    );
}

export { LaunchAppButton };
