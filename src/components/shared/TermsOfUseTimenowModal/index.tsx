import { DownloadOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { actionLogout, selectCustomerData } from "../../../redux/authenticationSlice";
import { useEffect, useState } from "react";

export const TIMENOW_TERM_VERSION = "1.1";

const TermsOfUseTimenowModal: React.FC = () => {
  const customerData = useAppSelector(selectCustomerData);
  const disptach = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    disptach(actionLogout());
    setOpen(false);
  };

  const handleAgree = () => {
    localStorage.setItem("terms_accepted_by_timenow" + "_v" + TIMENOW_TERM_VERSION, "true");
    setOpen(false);
  };

  const handleDownloadFile = () => {
    fetch("./terms_of_use_timenow.docx").then((response) => {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "termos_de_uso_timenow.docx";
        a.click();
      });
    });
  };

  useEffect(() => {
    if (customerData?.name.toLowerCase() === "timenow") {
      if (!localStorage.getItem("terms_accepted_by_timenow" + "_v" + TIMENOW_TERM_VERSION)) {
        setOpen(true);
      }
    }
  }, [customerData]);

  return (
    <Modal
      open={open}
      width="1100px"
      closable={false}
      footer={[
        <Button key="disagree" onClick={handleClose}>
          Sair
        </Button>,
        <Button key="agree" type="primary" onClick={handleAgree}>
          Concordar e fechar
        </Button>,
        <Tooltip key="download" title="Fazer download do documento">
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownloadFile}></Button>
        </Tooltip>,
      ]}
      title={
        <Typography.Title level={3}>
          Termo de Uso e Responsabilidades para o Uso de Inteligência Artificial
        </Typography.Title>
      }
    >
      <Typography.Text>
        {`Este Termo de Uso e Responsabilidades ("Termo") estabelece as diretrizes, obrigações e
        responsabilidades relacionadas ao uso de sistemas de inteligência artificial (IA) e seus
        derivativos técnicos, doravante denominados "IA", criados e/ou homologados para uso nas
        atividades operacionais de rotina da Timenow Engenharia S/A e suas subsidiárias, aqui
        doravante denominada "provedora de IA". Ao utilizar nossos serviços de IA, você concorda com
        os termos e condições estabelecidos neste documento. Certifique-se de lê-los com atenção.`}
      </Typography.Text>
      <Typography.Title level={4}>Da Aceitação dos Termos</Typography.Title>
      <Typography.Text>
        Ao utilizar nossos serviços de IA, você concorda com todos os termos e condições deste
        Termo. Se você não concordar com qualquer parte deste Termo, não poderá utilizar nossos
        serviços de IA. O uso de IA está sujeito às leis, regulamentos aplicáveis e políticas
        internas da Timenow Engenharia S/A.
      </Typography.Text>
      <Typography.Title level={4}>Do Uso Permitido</Typography.Title>
      <Typography.Text>
        2.1. Uso Profissional: Os serviços de IA disponibilizados pela Timenow Engenharia S/A e suas
        subsidiárias, na forma de sistemas homologados e/ou desenvolvidos internamente são
        destinados ao uso profissional. Você pode utilizá-los para fins educacionais, de pesquisa,
        entretenimento e outras finalidades pessoais, desde que obedeça às Políticas de Segurança e
        Proteção de Dados vigentes da companhia e ao que dispõe a legislação vigente.
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        2.2. Respeito às Leis e Direitos Autorais: Você concorda em usar a IA de maneira que
        respeite todas as leis de direitos autorais e de propriedade intelectual aplicáveis. Você é
        responsável por qualquer conteúdo gerado pela IA que viole direitos autorais ou outras leis.
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        2.3. Uso Ético: Você concorda em utilizar a IA de maneira ética e responsável, evitando
        qualquer atividade que possa prejudicar, difamar, assediar ou ameaçar outras pessoas, bem
        como zelar pela boa imagem e reputação da companhia.
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        2.4. Transparência: Você compreende que a IA pode não ser 100% precisa e que as respostas
        geradas podem conter erros ou imprecisões. Você concorda em não utilizar as respostas da IA
        como informações definitivas sem uma verificação adicional, especialmente quando houver
        informações de caráter técnico de algum campo de conhecimento.
      </Typography.Text>
      <Typography.Title level={4}>Do Uso Proibido</Typography.Title>
      <Typography.Text>
        3.1. Atividades Ilegais: É estritamente proibido usar a IA para realizar atividades ilegais,
        como hacking, phishing, distribuição de malware ou qualquer outra atividade cibercriminosa.
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        3.2. Discriminação e Ódio: O uso da IA para promover discriminação, ódio, racismo, sexismo
        ou qualquer forma de preconceito é terminantemente proibido.
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        3.3. Falsa Representação: Você não deve usar a IA para se passar por outra pessoa, entidade
        ou organização.
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        3.4. Assédio e Abuso: O uso da IA para assediar, intimidar ou abusar de outras pessoas é
        inaceitável e terminantemente proibido.
      </Typography.Text>
      <Typography.Title level={4}>Das Responsabilidades</Typography.Title>
      <Typography.Text>
        4.1. Conteúdo Gerado pela IA: Você é o único responsável pelo conteúdo gerado pela IA
        enquanto a utiliza. A Timenow Engenharia S/A, na qualidade de provedora de IA conforme
        descreve este termo, não assume quaisquer responsabilidades pelo uso indevido ou incorreto
        das respostas geradas.
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        4.2. Privacidade: A Timenow Engenharia S/A, na qualidade de provedora de IA, respeita a sua
        privacidade. No entanto, a IA desenvolvida pela companhia pode coletar informações pessoais
        para melhorar a precisão das respostas, quando necessário. Com relação ao compartilhamento
        de dados pessoais em sistemas homologados externos para uso de IA, orientamos que jamais
        compartilhe seus dados ou de terceiros sem autorização prévia. Certifique-se de consultar
        sempre a Política de Privacidade da companhia para entender como dados e informações são
        coletados, processados e utilizados.
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        4.3. Atualizações e Interrupções de Serviço: A Timenow Engenharia S/A, na qualidade de
        provedora de IA, se reserva o direito de realizar atualizações, modificações ou interrupções
        nos serviços de IA a qualquer momento, sem aviso prévio, seja aqueles desenvolvidos por ela
        ou sistemas de terceiros homologados para uso em suas operações.
      </Typography.Text>
      <Typography.Title level={4}>Da Proteção de Dados Pessoais e Privacidade</Typography.Title>
      <Typography.Text>
        5.1. O tratamento de dados pessoais é regulamentado no Brasil pela lei 13.709/2018,
        conhecida como Lei Geral de Proteção de Dados Pessoais – LGPD, e possui como objetivo
        proteger o uso e coleta de dados pessoais da pessoa natural (física).
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        5.2. Um dos princípios norteadores da lei é o princípio da transparência, o qual determina
        que as informações sejam claras, precisas e objetivas ao titular de dados, de modo que o
        dono dos dados tenha ciência de como seus dados estão sendo tratados.
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        5.3. Dessa forma, para seguir as diretivas da lei, o uso dos dados pessoais pela plataforma
        de IA tem como objetivo divulgar dados de contato, como nomes e seus respectivos cargos e
        e-mails corporativos de seus colaboradores, para fins de identificação e meio de comunicação
        acertada dentro da Timenow. Assim, a finalidade dos dados pessoais é para uso interno e
        profissional da Timenow.
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        5.4. Portanto, o tratamento de dados pessoais deve seguir as diretrizes deste termo de uso,
        devendo ser estritamente voltado às finalidades às quais a coleta de dados se destina,
        respeitando os critérios de compartilhamento e de segurança das informações.
      </Typography.Text>
      <br></br>
      <br></br>
      <Typography.Text>
        5.5. Por fim, a lei prevê pelo sigilo das informações e dos dados que trata, sejam pessoais
        ou não, além de se manter alinhado com as boas práticas de segurança e trato tecnológico, a
        fim de garantir um tratamento em conformidade com a lei.
      </Typography.Text>
      <Typography.Title level={4}>Da Rescisão</Typography.Title>
      <Typography.Text>
        A Timenow Engenharia S/A, na qualidade de provedora de IA, se reserva o direito de rescindir
        ou suspender o acesso aos serviços de IA a qualquer momento, sem aviso prévio, se quaisquer
        violações deste Termo, das Políticas Internas ou das legislações vigentes forem
        identificadas, além de comunicar às autoridades competentes. Cabe ressaltar também que
        violar estes termos ou quaisquer políticas e diretrizes organizacionais deixa o
        colaborador(a) sujeito a penalidades administrativas cabíveis.
      </Typography.Text>
      <Typography.Title level={4}>Das Disposições Gerais</Typography.Title>
      <Typography.Text>
        Este Termo representa o acordo completo entre você e a Timenow Engenharia S/A, na qualidade
        de provedora de IA, no que diz respeito ao uso da IA e substitui quaisquer acordos
        anteriores ou contemporâneos. Qualquer renúncia ou modificação a este Termo deve ser feita
        por escrito e assinada por ambas as partes.
      </Typography.Text>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Typography.Text>
        Ao utilizar nossos serviços de IA,{" "}
        <Typography.Text underline>
          você concorda em cumprir este Termo de Uso, bem como seguir inexoravelmente todas as
          políticas internas e diretrizes operacionais da companhia. Se você não concordar com estes
          termos, automaticamente o uso de serviços diretos ou correlacionados a IA estão vetados.
        </Typography.Text>{" "}
        A Timenow Engenharia S/A e suas subsidiárias, na qualidade de provedora de IA, se reserva o
        direito de modificar este Termo a qualquer momento, sem aviso prévio e as alterações serão
        publicadas oportunamente. Portanto, recomendamos que você revise periodicamente este Termo
        para garantir que esteja ciente e a par de quaisquer atualizações.
      </Typography.Text>
      <br></br>
      <br></br>
    </Modal>
  );
};

export { TermsOfUseTimenowModal };
