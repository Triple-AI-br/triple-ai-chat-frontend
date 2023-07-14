import { Base } from "../layouts/Base";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import { useState } from "react";
import { Box, Button } from "@mui/material";

const AdminPage = () => {
    const [emails, setEmails] = useState<string[]>([]);

    return (
        <Base title="Invite your coworkers">
            <Box display="flex" gap={2}>
                <ReactMultiEmail
                    placeholder={
                        <span
                            style={{
                                display: "flex",
                                fontSize: "18px",
                                paddingLeft: "5px",
                                marginTop: "5px",
                                color: "#aaa",
                            }}
                        >
                            Input emails
                        </span>
                    }
                    style={{
                        border: "1px solid #bbb",
                        minHeight: "50px",
                        maxWidth: "800px",
                        width: "70%",
                        borderRadius: "15px",
                        padding: "15px",
                    }}
                    emails={emails}
                    onChange={(_emails: string[]) => {
                        setEmails(_emails);
                    }}
                    autoFocus={true}
                    getLabel={(email, index, removeEmail) => {
                        return (
                            <div data-tag key={index}>
                                <div data-tag-item style={{ fontSize: "15px" }}>
                                    {email}
                                </div>
                                <span
                                    data-tag-handle
                                    onClick={() => removeEmail(index)}
                                >
                                    ×
                                </span>
                            </div>
                        );
                    }}
                />
                <Button variant="outlined" sx={{ borderRadius: "15px" }}>
                    Invite
                </Button>
            </Box>
        </Base>
    );
};

export { AdminPage };
