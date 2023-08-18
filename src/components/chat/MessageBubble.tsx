import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import moment from "moment";
interface IMessageBubbleProps {
    markdownText: string;
    backgroundColor: string;
    float?: "left" | "right";
    borderBottomRightRadius?: number;
    borderBottomLeftRadius?: number;
    references?: string[];
    date_time?: string;
}

const MessageBubble = ({
    references,
    float,
    markdownText,
    backgroundColor,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    date_time,
}: IMessageBubbleProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [showReferences, setShowReferences] = useState(false);

    const maxSteps = references?.length || 0;
    const isLeftDisabled = activeStep === 0;
    const isRightDisabled = activeStep === maxSteps - 1;

    const handleClickLeft = () => {
        setActiveStep(prevActiveStep => {
            if (prevActiveStep === 0) return prevActiveStep;
            return prevActiveStep - 1;
        });
    };

    const handleClickRight = () => {
        setActiveStep(prevActiveStep => {
            if (prevActiveStep === maxSteps - 1) return prevActiveStep;
            return prevActiveStep + 1;
        });
    };

    return (
        <Box
            ml={float === "right" ? "auto" : 2}
            mr={float === "left" ? "auto" : 2}
            width={float === "left" ? "50%" : undefined}
            maxWidth={float === "left" ? undefined : "50%"}
            borderRadius={5}
            my={1}
            sx={{
                backgroundColor,
                borderBottomRightRadius,
                borderBottomLeftRadius,
            }}
            border="1px solid #ccc"
            display={markdownText ? undefined : "none"}
        >
            <Box px={3} pt={0.5} pb={date_time ? 0 : 0.5}>
                <ReactMarkdown>{markdownText}</ReactMarkdown>
            </Box>
            {date_time && (
                <Box display="flex" justifyContent="end" pl={4} pr={2} pb={1}>
                    <Typography color="#aaa" fontSize={12}>
                        {moment(date_time).fromNow()}
                    </Typography>
                </Box>
            )}
            {references && references.length ? (
                <Box
                    bgcolor="#f0f0f0"
                    px={3}
                    py={1}
                    display="flex"
                    flexDirection="column"
                    gap={0.5}
                    sx={{
                        borderBottomRightRadius: float === "left" ? 20 : 0,
                        borderBottomLeftRadius: float === "left" ? 0 : 20,
                    }}
                >
                    <Box
                        onClick={() => setShowReferences(prev => !prev)}
                        sx={{ cursor: "pointer" }}
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Typography color="#606060" variant="caption">
                            {showReferences ? "Hide Sources" : "View Sources"}{" "}
                            {showReferences
                                ? `(${activeStep + 1}/${maxSteps})`
                                : null}
                        </Typography>
                        <InfoOutlinedIcon
                            fontSize="small"
                            sx={{ color: "#999" }}
                        />
                    </Box>

                    {references && references.length && showReferences ? (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            gap={2}
                            alignItems="center"
                        >
                            <IconButton
                                onClick={handleClickLeft}
                                disabled={isLeftDisabled}
                            >
                                <KeyboardArrowLeft
                                    sx={{
                                        color: isLeftDisabled ? "#ccc" : "#888",
                                        cursor: "pointer",
                                    }}
                                />
                            </IconButton>
                            <Typography
                                fontWeight={600}
                                color="#888"
                                variant="body2"
                                noWrap
                            >
                                {references?.[activeStep]}
                            </Typography>
                            <IconButton
                                onClick={handleClickRight}
                                disabled={isRightDisabled}
                            >
                                <KeyboardArrowRight
                                    sx={{
                                        color: isRightDisabled
                                            ? "#ccc"
                                            : "#888",
                                        cursor: "pointer",
                                    }}
                                />
                            </IconButton>
                        </Box>
                    ) : null}
                </Box>
            ) : null}
        </Box>
    );
};

export { MessageBubble };
