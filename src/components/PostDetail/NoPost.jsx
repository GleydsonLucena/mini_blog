import { Link } from "react-router-dom";
import "./PostDetail.scss";

const NoPost = () => {
  return (
    <div className="no-posts">
      <p>Nenhum post encontrado</p>
      <Link to="/">Voltar</Link>
    </div>
  );
};

export default NoPost;
