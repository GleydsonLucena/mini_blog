import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <section className="not-found">
      <h1>Erro 404</h1>
      <h2>
        Página não encontrada! <span>404</span>
      </h2>
      <p>
        A página que você tentou acessar não existe ou foi movida. Por favor,
        tente novamente.
      </p>
      <p>
        Esse projeto foi criado usando React no front end, junto com algumas
        bibliotecas, e FireBase no back end.
      </p>
      <Link to="/">Voltar para o início</Link>
    </section>
  );
};

export default NotFound;
