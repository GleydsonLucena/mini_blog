import PropTypes from "prop-types";
import "../../pages/Post/Post.scss";

const ShowPost = ({ ...post }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>Postado por: {post.authorIdentity}</p>
      <img src={post.image} alt={post.title} />
      <p>{post.body}</p>
      <h3>Este post trata sobre:</h3>
      <p>
        Tags:{" "}
        {post.tagsArray.map((tag, index) =>
          tag[0] === "#" ? (
            <span key={index}>{tag}</span>
          ) : (
            <span key={index}>{`#${tag}`}</span>
          )
        )}
      </p>
    </div>
  );
};

ShowPost.propTypes = {
  post: PropTypes.object,
};

export default ShowPost;
