import { List, PartnersListContainer } from "./styled";

const LandingPartners: React.FC = () => {
  return (
    <PartnersListContainer>
      <h2>Nossos parceiros</h2>
      <List>
        <li>
          <img src="/partners/microsoft.png" alt="Microsoft Logo" />
        </li>
        <li>
          <img src="/partners/aws.png" alt="AWS Logo" />
        </li>
        <li>
          <img src="/partners/google.png" alt="Google Logo" />
        </li>
      </List>
    </PartnersListContainer>
  );
};

export { LandingPartners };
