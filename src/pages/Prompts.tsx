import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Fab,
  FormControlLabel,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Base } from "../layouts/Base";
import { useEffect, useRef, useState } from "react";
import { IPrompt, IPromptCreate, promptsService } from "../services/prompts";
import { PromptItem } from "../components/Prompts";
import AddIcon from "@mui/icons-material/Add";
import { Formik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../redux/hooks";
import { actionDisplayNotification } from "../redux/notificationSlice";

const PromptsPage = () => {
  const [value, setValue] = useState(0);
  const [prompts, setPrompts] = useState<IPrompt[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const setTouchRef = useRef<
        | ((_: { title: boolean; prompt: boolean; is_public: boolean }) => void)
        | undefined
    >();
  const setValuesRef = useRef<((_: IPromptCreate) => void) | undefined>();
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const removeFromPrompts = (promptId: number) => {
    setPrompts(prev => prev?.filter(prompt => prompt.id !== promptId));
  };

    interface IFormData {
        title: string;
        prompt: string;
        is_public: boolean;
    }

    const FormValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    	title: yup.string().required(),
    	prompt: yup.string().required(),
    	is_public: yup.boolean().required(),
    });

    useEffect(() => {
    	(async () => {
    		setIsLoading(true);
    		let _prompts;
    		if (value === 0) {
    			_prompts = await promptsService.getLatest();
    		} else if (value === 1) {
    			_prompts = await promptsService.getTop();
    		} else if (value === 2) {
    			_prompts = await promptsService.getLiked();
    		} else if (value === 3) {
    			_prompts = await promptsService.getOwn();
    		}
    		setPrompts(_prompts);
    		setIsLoading(false);
    	})();
    }, [value]);

    return (
    	<Base title="Find great prompts">
    		<Box
    			display="flex"
    			flexDirection="column"
    			gap={3}
    			alignItems="center"
    		>
    			<Fab
    				color="primary"
    				aria-label="add"
    				sx={{ position: "absolute", bottom: 20, right: 20 }}
    				onClick={handleOpen}
    			>
    				<AddIcon />
    			</Fab>
    			<Modal open={open} onClose={handleClose} keepMounted>
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
    					<Typography variant="h4" mb={2} color="#555">
                            Create a new prompt
    					</Typography>
    					<Formik
    						initialValues={{
    							title: "",
    							prompt: "",
    							is_public: false,
    						}}
    						validate={async values => {
    							const errors: Record<string, string> = {};
    							try {
    								await FormValidationSchema.validate(
    									values,
    									{
    										abortEarly: false,
    									}
    								);
    							} catch (err) {
    								(err as yup.ValidationError).inner.forEach(
    									item => {
    										if (!item.path) return;
    										errors[item.path] = item.message;
    									}
    								);
    							}
    							return errors;
    						}}
    						onSubmit={async (values, { setSubmitting }) => {
    							try {
    								const _prompt = await promptsService.create(
    									values
    								);
    								setValuesRef.current?.({
    									title: "",
    									prompt: "",
    									is_public: false,
    								});
    								setTouchRef.current?.({
    									title: false,
    									prompt: false,
    									is_public: false,
    								});
    								handleClose();

    								if (value === 3) {
    									setPrompts(prev => [
    										_prompt,
    										...(prev ?? []),
    									]);
    								} else {
    									setValue(3);
    								}
    							} catch (err) {
    								dispatch(
    									actionDisplayNotification({
    										messages: ["Unable to save prompt"],
    									})
    								);
    							}
    							setSubmitting(false);
    						}}
    					>
    						{({
    							values,
    							errors,
    							touched,
    							handleChange,
    							handleBlur,
    							handleSubmit,
    							isSubmitting,
    							setValues,
    							setTouched,
    							/* There are other functionalities available as well */
    						}) => {
    							setTouchRef.current = setTouched;
    							setValuesRef.current = setValues;
    							return (
    								<Box
    									width="100%"
    									display="flex"
    									flexDirection="column"
    									gap={5}
    									alignItems="start"
    								>
    									<Box
    										display="flex"
    										justifyContent="start"
    										alignItems="end"
    									></Box>
    									<TextField
    										id="title"
    										label={
    											errors.title && touched.title
    												? errors.title
    												: "Title"
    										}
    										fullWidth
    										variant="filled"
    										name="title"
    										value={values.title}
    										onChange={handleChange}
    										onBlur={handleBlur}
    										error={Boolean(
    											errors.title && touched.title
    										)}
    									/>
    									<TextField
    										id="prompt"
    										label={
    											errors.prompt && touched.prompt
    												? errors.prompt
    												: "Prompt"
    										}
    										fullWidth
    										variant="filled"
    										name="prompt"
    										value={values.prompt}
    										onChange={handleChange}
    										onBlur={handleBlur}
    										error={Boolean(
    											errors.prompt && touched.prompt
    										)}
    									/>
    									<FormControlLabel
    										control={
    											<Checkbox
    												name="is_public"
    												onChange={handleChange}
    												checked={values.is_public}
    											/>
    										}
    										label="Make it public within my company"
    									/>
    									<Button
    										onClick={() => handleSubmit()}
    										variant="contained"
    										disabled={isSubmitting}
    										sx={{ mx: "auto" }}
    									>
                                            Save
    									</Button>
    								</Box>
    							);
    						}}
    					</Formik>
    				</Box>
    			</Modal>
    			<Box
    				bgcolor="#fff"
    				sx={{
    					borderRadius: 15,
    					boxShadow: "6px 4px 10px 2px rgba(0,0,0,0.12)",
    				}}
    				px={10}
    				pt={1}
    				border="1px solid #aaa"
    			>
    				<Tabs value={value} onChange={handleChange}>
    					<Tab sx={{ mx: 3 }} label="Latest Prompts" />
    					<Tab sx={{ mx: 3 }} label="Top Liked" />
    					<Tab sx={{ mx: 3 }} label="My Likes" />
    					<Tab sx={{ mx: 3 }} label="My Prompts" />
    				</Tabs>
    			</Box>

    			<Box
    				display="flex"
    				flexDirection="column"
    				alignItems="center"
    				gap={4}
    				width="85%"
    			>
    				{prompts === undefined || isLoading ? (
    					<CircularProgress />
    				) : prompts.length === 0 ? (
    					<Typography fontSize={20} color="#777">
                            No prompts here yet 😔
    					</Typography>
    				) : (
    					prompts.map(prompt => (
    						<PromptItem
    							key={prompt.id}
    							prompt={prompt}
    							removeFromPrompts={removeFromPrompts}
    						/>
    					))
    				)}
    			</Box>
    		</Box>
    	</Base>
    );
};
export { PromptsPage };
