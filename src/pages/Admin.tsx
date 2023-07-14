import { Base } from "../layouts/Base";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import { useState } from "react";
import { Alert, Box, Button } from "@mui/material";
import { authService } from "../services";

const AdminPage = () => {
    const [emails, setEmails] = useState<string[]>([]);
    const [result, setResult] = useState<{
        failed: Record<string, string>;
        invited: string[];
    }>();

    const handleClick = async () => {
        const res = await authService.inviteUsers(emails);
        setEmails([]);
        setResult(res);
    };

    return (
        <Base title="Invite your coworkers">
            <Box display="flex" flexDirection="column" gap={2}>
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
                                    <div
                                        data-tag-item
                                        style={{ fontSize: "15px" }}
                                    >
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
                    <Button
                        variant="outlined"
                        sx={{ borderRadius: "15px" }}
                        onClick={handleClick}
                    >
                        Invite
                    </Button>
                </Box>

                {result &&
                    Object.entries(result.failed).map(([email, reason]) => (
                        <Alert
                            key={email}
                            severity="error"
                            variant="standard"
                            sx={{ border: "1px solid red", width: "74%" }}
                            onClose={() => {
                                delete result.failed[email];
                                setResult({ ...result });
                            }}
                        >
                            Failed to invite {email}: {reason}
                        </Alert>
                    ))}

                {result &&
                    result.invited.map(email => (
                        <Alert
                            key={email}
                            severity="success"
                            variant="standard"
                            sx={{ border: "1px solid green", width: "74%" }}
                            onClose={() => {
                                setResult({
                                    ...result,
                                    invited: result.invited.filter(
                                        item => item !== email
                                    ),
                                });
                            }}
                        >
                            Successfully invited {email}
                        </Alert>
                    ))}
            </Box>
        </Base>
    );
};

export { AdminPage };
