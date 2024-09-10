import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUtils } from "../../context/UtilsContext";
import { useAuthContext } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import Input from "../../components/Form/Input";
import "./Form.scss";

const FormEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();
  const { document: post } = useFetchDocument("posts", id);
  const { updateDocument, response } = useUpdateDocument("posts");

  const { error, setError } = useUtils();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setTags(post.tagsArray.join(", "));
      setBody(post.body);
    }
  }, [post]);

  const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    try {
      new URL(image);
    } catch (error) {
      setError("URL inválida para a imagem!");
      console.log(error.message);
      return;
    }

    // TODO:
    if (!title || !image || !tags || !body) {
      setError("Preencha todos os campos!");
      return;
    }

    // Inserir o documento no Firestore
    const data = {
      title,
      image,
      tagsArray,
      body,
      authorId: user.uid,
      authorIdentity: user.displayName,
    };
    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className="create-post">
      <h2>Editar o post</h2>
      <p>Edite o post que deseja e compartilhe o seu conhecimento!</p>

      <form onSubmit={handleSubmit} className="form">
        <Input
          label="Título"
          type="text"
          name="title"
          placeholder="Pense em um bom título"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Input
          label="URL da imagem"
          type="text"
          name="image"
          placeholder="Insira uma imagem que represente seu post"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
        <div className="previw-img">
          <p>Previw da imagem:</p>
          <img src={image} alt="imagem" />
        </div>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            placeholder="Escreva seu conteúdo do post..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>
        <Input
          label="Tags"
          type="text"
          name="tags"
          placeholder="Insira as  tags separadas por vírgula"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
        />
        {!response.loading && <button>Editar</button>}
        {response.loading && <button disabled>Aguarde...</button>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default FormEdit;
