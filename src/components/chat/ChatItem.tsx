/* eslint-disable indent */
import { Avatar, Box, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { Clear as DeleteIcon } from "@mui/icons-material";

interface IChatItemProps {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    isSelected: boolean;
    onClick({ sessionId }: { sessionId: string }): void;
    onDelete({ sessionId }: { sessionId: string }): void;
}

const ChatItem = ({
    id,
    title,
    subtitle,
    date,
    isSelected,
    onClick: handleClick,
    onDelete: handleDelete,
}: IChatItemProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const timeAgo = moment(date).fromNow();
    let backgroundColor: string;

    if (isSelected) backgroundColor = "#eee";
    else if (isHovered) backgroundColor = "#f6f6f6";
    else backgroundColor = "#fff";

    //"#e0e0e0"
    return (
        <Box
            display="flex"
            px={3.5}
            py={2}
            gap={2}
            borderBottom="1px solid #e5e5e5"
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={() => handleClick({ sessionId: id })}
            sx={{ backgroundColor, cursor: "pointer" }}
        >
            <Avatar
                src="https://timenow.com.br/wp-content/uploads/2023/03/timenow-destaque-1.png"
                alt="Timenow logo"
                sx={{ width: 45, height: 45 }}
            />
            <Box display="flex" flexDirection="column" gap={0} width="100%">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    gap={10}
                >
                    <Typography color="#555">{title}</Typography>
                    <Typography fontSize={12} color="#999">
                        {timeAgo}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography fontSize={14} color="#888">
                        {subtitle}
                    </Typography>
                    <DeleteIcon
                        onClick={
                            isHovered
                                ? e => {
                                      e.stopPropagation();
                                      handleDelete({ sessionId: id });
                                  }
                                : undefined
                        }
                        sx={{
                            // display: isHovered ? undefined : "none",
                            cursor: isHovered ? "pointer" : undefined,
                            color: isHovered ? "#f88" : backgroundColor,
                            width: 20,
                            ml: 3,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export { ChatItem };
