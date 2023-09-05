import styled from "styled-components";
import { Button } from "antd";


export const HeaderContainer = styled.section<{ bottomScroll?: boolean }>`
	max-width: 1280px;
	opacity: ${props => props.bottomScroll ? 0.4 : 1};
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid rgba(0, 0, 0, 0.10);
	padding: 10px 24px;
	margin: 0 auto;
	z-index: 20;
	@media(min-width: 600px) {
		position: sticky;
		top: 0;
		background: rgba(248, 252, 255, 0.5);
		border-radius: 0 0 16px 16px;
		backdrop-filter: blur(6.5px);
		-webkit-backdrop-filter: blur(6.5px);
		border: 1px solid rgba(248, 252, 255, 0.3);
	}
`;

export const LogoImg = styled.img`
	height: 45px;
	@media(min-width: 600px) {

	}
`;

export const NavElements = styled.ul`
	display: none;
	@media(min-width: 600px) {
		display: flex;
		align-items: center;
		gap: 20px;
		list-style: none;
		>li {
			cursor: pointer;
			>a {
				color: #3e4352;
				text-decoration: none;
			}
		}
	}
`;

export const ActionButton = styled(Button)`
		display: none;
	@media(min-width: 600px) {
		display: inline-block;
		font-weight: 600;
		font-size: 16px;
    line-height: 100%;
		border-radius: 50px;
		border: none;
		background: linear-gradient(180deg, rgba(56, 93, 255, 0.80) 0%, rgba(134, 156, 252, 0.80) 100%);
	}
`;