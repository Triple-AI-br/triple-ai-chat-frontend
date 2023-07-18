/* eslint-disable indent */
import { TextareaAutosize, TextareaAutosizeProps } from "@mui/base";

const TextArea = ({ ...props }: TextareaAutosizeProps) => {
    return (
        <TextareaAutosize
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            autoFocus
            className="text-area-auto-size"
            maxRows={5}
            minRows={2}
            aria-label="Input field"
            placeholder="Type here..."
            style={{
                flex: 1,
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: 1.5,
                padding: "10px 10px 10px 30px",
                resize: "none",
                border: "none",
                boxShadow: "none",
                color: "#24292f",
                background: "#fff",
            }}
            {...props}
        />
    );
};

export { TextArea };
