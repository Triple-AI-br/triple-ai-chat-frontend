import UploadFileIcon from "@mui/icons-material/UploadFile";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

export const possibleWorks: Array<{icon: JSX.Element, description: string }> = [
	{
		icon: <UploadFileIcon />,
		description: "Faça upload de arquivos e pergunte qualquer coisa da sua empresa."
	}, 
	{
		icon: <ConnectWithoutContactIcon />,
		description: "Crie diversos conteúdos instantaneamente para redes sociais.",
	},
	{
		icon: <DesignServicesIcon />,
		description: "Otimize seus processos criando projetos inteiros com só um comando."
	}
];

export const securityAndPrivacy: Array<{imageUrl: string, title: string }> = [
	{
		imageUrl: "/securityIcons/criptografia.png",
		title: "Dados são mantidos criptografados",
	},
	{
		imageUrl: "/securityIcons/LGPD.jpeg",
		title: "Conformidade com LGPD",
	},
	{
		imageUrl: "/securityIcons/setorizado.svg",
		title: "Segmente dados por setores da sua empresa",
	},
	{
		imageUrl: "/securityIcons/privacy.svg",
		title: "Alto padrão de privacidade e segurança",
	}
];

export const fileIcons = ["/fileIcons/envio.png","/fileIcons/fecho-eclair.png", "/fileIcons/imagem.png", "/fileIcons/palavra.png", "/fileIcons/pdf.png", "/fileIcons/power-point.png", "/fileIcons/xls.png"];