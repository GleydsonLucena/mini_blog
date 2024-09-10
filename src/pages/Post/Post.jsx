import { useParams } from "react-router-dom";
import "./Post.scss";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUtils } from "../../context/UtilsContext";
import ShowPost from "../../components/PostDetail/ShowPost";

const Post = () => {
  const { id } = useParams();
  const { laoding, error } = useUtils();
  const { document: post } = useFetchDocument("posts", id);

  return (
    <section className="post">
      {laoding && <h2>Carregando post...</h2>}
      {error && <h2>Erro ao carregar post</h2>}
      {post && <ShowPost {...post} />}
    </section>
  );
};

export default Post;
