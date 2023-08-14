import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Modal,
    Typography,
} from "@mui/material";
import { IPrompt, promptsService } from "../../services/prompts";
import moment from "moment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/authenticationSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { actionDisplayNotification } from "../../redux/notificationSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface IPromptItemProps {
    prompt: IPrompt;
    removeFromPrompts(promptId: number): void;
}

const PromptItem = ({ prompt, removeFromPrompts }: IPromptItemProps) => {
    const [isLiked, setIsLiked] = useState(prompt.user_has_liked);
    const [likeCount, setLikeCount] = useState(prompt.like_count);
    const [isDeleting, setIsDeleting] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const userData = useAppSelector(selectUserData);
    const userEmail = userData?.email;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you'd like to delete this prompt?")) return;
        setIsDeleting(true);
        try {
            await promptsService.remove(prompt.id);
            handleClose();
            removeFromPrompts(prompt.id);
        } catch (error) {
            dispatch(
                actionDisplayNotification({
                    messages: ["Failed to delete prompt."],
                })
            );
        }
        setIsDeleting(false);
    };

    const handleLike = async () => {
        if (isLiked) return;
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
        try {
            await promptsService.like(prompt.id);
        } catch (error) {
            setIsLiked(false);
            setLikeCount(prev => prev - 1);
        }
    };

    const handleUnlike = async () => {
        if (!isLiked) return;
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
        try {
            await promptsService.unlike(prompt.id);
        } catch (error) {
            setIsLiked(true);
            setLikeCount(prev => prev + 1);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            p={3}
            bgcolor="#fff"
            sx={{
                borderRadius: 4,
                boxShadow: "6px 4px 10px 2px rgba(0,0,0,0.12)",
            }}
            width="100%"
        >
            <Modal open={open} onClose={handleClose}>
                <Box
                    width="60%"
                    position="absolute"
                    top="50%"
                    left="50%"
                    bgcolor="background.paper"
                    p={4}
                    borderRadius={3}
                    boxShadow={24}
                    sx={{
                        overflowY: "scroll",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <CloseIcon
                        color="disabled"
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            cursor: "pointer",
                        }}
                        onClick={handleClose}
                    />
                    <Box display="flex" justifyContent="space-between">
                        <Typography
                            component="h1"
                            variant="h4"
                            color="#555"
                            mb={3}
                        >
                            {prompt.title}
                        </Typography>
                        <Typography color="#999">
                            {moment(prompt.created_at).fromNow()}
                        </Typography>
                    </Box>

                    <Typography color="#555">{prompt.prompt}</Typography>
                    <Box width="100%" my={3}>
                        <Divider />
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="end"
                        alignItems="center"
                        gap={2}
                    >
                        {prompt.user.email === userEmail && (
                            <Button
                                onClick={handleDelete}
                                variant="outlined"
                                startIcon={
                                    isDeleting ? (
                                        <CircularProgress
                                            size={16}
                                            color="error"
                                        />
                                    ) : (
                                        <DeleteIcon />
                                    )
                                }
                                color="error"
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            startIcon={<ContentCopyIcon />}
                            variant="outlined"
                            onClick={() => {
                                navigator.clipboard.writeText(prompt.prompt);
                            }}
                        >
                            Copy prompt
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Box display="flex" justifyContent="space-between">
                <Typography
                    variant="h5"
                    component="h2"
                    color="#555"
                    onClick={handleOpen}
                    sx={{ cursor: "pointer" }}
                >
                    {prompt.title}
                </Typography>
                <Typography color="#999">
                    {moment(prompt.created_at).fromNow()}
                </Typography>
            </Box>
            <Typography
                color="#555"
                sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {prompt.prompt}
            </Typography>
            <Box display="flex" justifyContent="scpace-between" gap={2}>
                <Typography color="#999">{prompt.user.email}</Typography>
                <Box display="flex" gap={1} justifyContent="end" ml="auto">
                    {prompt.is_public ? (
                        <>
                            {isLiked ? (
                                <FavoriteIcon
                                    onClick={handleUnlike}
                                    sx={{ cursor: "pointer", color: "#f00" }}
                                />
                            ) : (
                                <FavoriteBorderIcon
                                    onClick={handleLike}
                                    sx={{ cursor: "pointer", color: "#555" }}
                                />
                            )}
                            <Typography color="#555">
                                {likeCount} like
                                {likeCount !== 1 && "s"}
                            </Typography>
                        </>
                    ) : (
                        <Box display="flex" gap={1}>
                            <LockOutlinedIcon color="error" />
                            <Typography color="error">Private</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export { PromptItem };
