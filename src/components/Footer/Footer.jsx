import Container from "../../layout/Container/Container";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Container customClass="center">
        &copy; {new Date().getFullYear()} My Blog
      </Container>
    </footer>
  );
};

export default Footer;
