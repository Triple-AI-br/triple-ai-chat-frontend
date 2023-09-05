import UploadFileIcon from "@mui/icons-material/UploadFile";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

export const possibleWorks: Array<{icon: JSX.Element, description: string }> = [
	{
		icon: <UploadFileIcon />,
		description: "Faça upload de arquivos e pergunta qualquer coisa da sua empresa."
	}, 
	{
		icon: <ConnectWithoutContactIcon />,
		description: "Crie diversos conteúdos instantaneamente para redes sociais.",
	},
	{
		icon: <DesignServicesIcon />,
		description: "Otimize seus processos cirando projetos inteiros com só um comando."
	}
];

export const securityAndPrivacy: Array<{imageUrl: string, title: string }> = [
	{
		imageUrl: "/triple-ai.png",
		title: "Dados são mantidos criptografados",
	},
	{
		imageUrl: "/triple-ai.png",
		title: "Conformidade com LGPD",
	},
	{
		imageUrl: "/triple-ai.png",
		title: "Segmente dados por setores da sua empresa",
	},
	{
		imageUrl: "/triple-ai.png",
		title: "Alto padrão de privacidade e segurança",
	}
];

export const fileIcons = ["/fileIcons/envio.png","/fileIcons/fecho-eclair.png", "/fileIcons/imagem.png", "/fileIcons/palavra.png", "/fileIcons/pdf.png", "/fileIcons/power-point.png", "/fileIcons/xls.png"];