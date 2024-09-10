import PostDetail from "../../components/PostDetail/PostDetail";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import NoPost from "../../components/PostDetail/NoPost";
import "./Search.scss";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <section className="search">
      {posts && posts.length === 0 && <NoPost />}
      {posts &&
        posts.map((post, index) => <PostDetail key={index} {...post} />)}
    </section>
  );
};

export default Search;
