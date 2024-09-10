import PropTypes from "prop-types";
import "./PostDetail.scss";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const PostDetail = ({ ...post }) => {
  const timestamp = new Timestamp(
    post.createdAt.seconds,
    post.createdAt.nanoseconds
  );

  const date = timestamp.toDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className="post-detail">
      <h3>{post.title}</h3>
      <p>Postado por: {post.authorIdentity}</p>
      <img src={post.image} alt={post.title} />
      <p>{post.body}</p>
      <p>
        Data: {day}/{month}/{year}
      </p>
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
      <Link to={`/posts/${post.id}`}>Ver</Link>
    </div>
  );
};

PostDetail.propTypes = {
  post: PropTypes.object,
};

export default PostDetail;
