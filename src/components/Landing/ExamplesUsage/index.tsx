import { Container, ExamplesContainer, MessageList, StaticMessage } from "./styled";

const ExamplesUsage: React.FC = () => {
  return (
    <Container>
      <ExamplesContainer>
        <StaticMessage>Olá, você pode me ajudar a</StaticMessage>
        <MessageList>
          <li>
            <span>Listar os benefícios do contrato assinado ontem?</span>
          </li>
          <li>
            <span>Responder um email sobre novos projetos?</span>
          </li>
          <li>
            <span>Criar um conteúdo para mídias sociais?</span>
          </li>
          <li>
            <span>Calcular o crescimento do nosso faturamento deste ano?</span>
          </li>
        </MessageList>
      </ExamplesContainer>
    </Container>
  );
};

export { ExamplesUsage };
