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
	@media(min-width: 600px) {

}
	/* background-color: red; */	
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
	}
`;

export const ActionButton = styled(Button)`
		display: none;
	@media(min-width: 600px) {
		display: inline-block;
		border-radius: 50px;
		border: none;
		background: linear-gradient(180deg, rgba(56, 93, 255, 0.80) 0%, rgba(134, 156, 252, 0.80) 100%);
	}
`;