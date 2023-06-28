import { Button, ButtonProps } from "@mui/material";

interface IOutlinedButtonProps extends ButtonProps {
    text: string;
    borderColor?: string;
}

function OutlinedButton({ text, borderColor, ...props }: IOutlinedButtonProps) {
    return (
        <Button
            {...props}
            variant="outlined"
            sx={{
                px: 6,
                py: 3,
                borderRadius: 10,
                borderColor,
                whiteSpace: "nowrap",
            }}
        >
            {text}
        </Button>
    );
}

export { OutlinedButton };
