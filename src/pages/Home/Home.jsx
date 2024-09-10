import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import Input from "../../components/Form/Input";
import PostDetail from "../../components/PostDetail/PostDetail";

import "./Home.scss";
import NoPost from "../../components/PostDetail/NoPost";
const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { documents: posts } = useFetchDocuments("posts", query);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="home">
      <h2>Veja nossos posts mais recentes</h2>
      <form onSubmit={handleSubmit} className="form">
        <Input
          label="Pesquise posts"
          type="text"
          name="search"
          placeholder="Pesquisar tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Pesquisar</button>
      </form>
      <div className="posts-container">
        {posts && posts.length === 0 && <NoPost />}
        {posts && (
          <div className="posts-container">
            {posts.map((post, index) => (
              <PostDetail key={index} {...post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
