import { Link } from "react-router-dom";
import "./About.scss";

const About = () => {
  return (
    <section className="about">
      <h2>
        Sobre o Mini <span>BLOG</span>
      </h2>
      <p>
        Esse projeto foi criado usando React no front end, junto com algumas
        bibliotecas, e FireBase no back end.
      </p>
      <Link to="/posts/create">Criar post</Link>
    </section>
  );
};

export default About;
