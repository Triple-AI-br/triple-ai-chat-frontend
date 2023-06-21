import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import "react-chat-elements/dist/main.css";

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
