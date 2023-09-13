import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { ActionButton } from "./Footer/styled";

const PrivacyTerms = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "80%",
    overflowY: "scroll",
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <ActionButton type="primary" actiontype="secondary" onClick={handleOpen}>
        Política de Privacidade
      </ActionButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h4" component="h2">
            Nossa Política de Privacidade
          </Typography>
          <Typography sx={{ mt: 3 }}>Última atualização: 31 de julho de 2023</Typography>
          <Typography sx={{ mt: 1 }}>
            Na Triple AI, proteger os dados dos nossos clientes e usuários é essencial para a nossa
            missão. Nossa plataforma mantém altos padrões de segurança e privacidade de dados,
            garantindo a confidencialidade e integridade das informações fornecidas. A conformidade
            com a LGPD (Lei Geral de Proteção de Dados) e outras legislações aplicáveis sempre foi
            uma prioridade para nossa empresa desde o seu início, sendo nosso produtos e serviços
            orientados pelo princípio de &quot;privacy by design&quot;.
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              Coleta de Dados Pessoais
            </Typography>
            <ol>
              <li>
                Informações Fornecidas pelos Clientes: Coletamos informações pessoais fornecidas
                voluntariamente ao utilizar nossos serviços e interagir com a plataforma. Esses
                dados podem incluir nome, endereço de e-mail, cargo, empresa, número de telefone e
                outros detalhes relevantes.
              </li>
              <li>
                Dados de Utilização e Interatividade: Quando você utiliza nossa plataforma,
                coletamos dados de utilização, como informações de acesso, atividades realizadas,
                consultas de pesquisa e outras interações com nossos serviços.
              </li>
              <li>
                Cookies e Tecnologias Similares: Utilizamos cookies e tecnologias similares para
                aprimorar a experiência do usuário, personalizar conteúdos e coletar informações
                estatísticas, como tipo de dispositivo, navegador e endereço IP.
              </li>
            </ol>
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              Compromisso da Triple AI
            </Typography>
            <ol>
              <li>
                Não Utilização de Dados para Treinamento: As informações compartilhadas com a OpenAI
                via API, principalmente informações pessoais, não são utilizadas para treinar os
                modelos deles, garantindo a privacidade dos dados dos nossos clientes. Isso é algo
                explicitamente descrito nos termos &quot;API Data Privacy&quot;, que constam no site
                da OpenAI. (https://openai.com/api-data-privacy).
              </li>
              <li>
                Transparência: Comprometemo-nos a ser transparentes sobre nossas práticas de
                tratamento de dados e a política de privacidade da Triple AI. Estamos empenhados em
                fornecer informações claras e detalhadas sobre como utilizamos e protegemos as
                informações pessoais, que poderão sempre ser obtidas prontamente por meio de contato
                direto com o nosso DPO (encarregado de proteção de dados).{" "}
              </li>
              <li>
                Segurança de Dados: Implementamos medidas de segurança técnicas e organizacionais
                para proteger os dados dos clientes contra acesso não autorizado, uso indevido e
                divulgação não autorizada.
              </li>
            </ol>
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              Uso e Finalidade dos Dados
            </Typography>
            <ol>
              <li>
                Personalização e Aprimoramento de Serviços: As informações coletadas são utilizadas
                para personalizar a experiência do usuário na plataforma e aprimorar nossos
                serviços, oferecendo conteúdos e recursos relevantes.
              </li>

              <li>
                Comunicação e Suporte: Utilizamos os dados pessoais para responder a solicitações,
                fornecer suporte técnico e compartilhar informações importantes sobre nossos
                serviços.
              </li>

              <li>
                Melhorias e Análises: Realizamos análises estatísticas para aprimorar nossos
                recursos, identificar tendências e otimizar a usabilidade da plataforma.
              </li>
            </ol>
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              Compartilhamento de Dados
            </Typography>
            <ol>
              <li>
                Terceiros Prestadores de Serviço: Em determinadas circunstâncias, podemos
                compartilhar informações pessoais com prestadores de serviço que nos auxiliam na
                operação da plataforma e na prestação dos serviços, como por exemplo, OpenAI e
                Pinecone. Conhecemos muito bem as políticas de privacidade de cada um desses
                prestadores de serviço, que estão tecnicamente e eticamente alinhados no sentido de
                garantir a proteção e privacidade de dados de dados compartilhados pela Triple AI.
              </li>
              <li>
                Consentimento do Cliente: Não compartilharemos informações pessoais com terceiros
                sem o consentimento prévio dos clientes, a menos que seja necessário cumprir
                obrigações legais ou permitido por lei.
              </li>
            </ol>
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              Alterações na Política de Privacidade
            </Typography>
            Reservamo-nos o direito de atualizar ou modificar esta Política de Privacidade conforme
            necessário. As alterações serão comunicadas aos clientes por meio de nossa plataforma ou
            por outros meios apropriados.
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              Contato e DPO (Data Protection Officer)
            </Typography>
            Se tiver dúvidas, solicitações ou preocupações sobre nossa Política de Privacidade,
            entre em contato conosco através dos canais disponibilizados na plataforma. Nosso DPO
            (Data Protection Officer) pode ser contactado por meio do email
            fundadores@tripleai.com.br. Agradecemos por confiar na Triple AI. Estamos empenhados em
            proteger a privacidade e a segurança dos dados dos nossos clientes e usuários.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export { PrivacyTerms };
