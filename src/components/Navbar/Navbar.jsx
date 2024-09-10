import { Link, NavLink } from "react-router-dom";

import Container from "../../layout/Container/Container";
import { useAuthContext } from "../../context/AuthContext";

import "./Navbar.scss";
import { useSignOut } from "../../hooks/useSignOut";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logOut } = useSignOut();
  return (
    <nav className="navbar">
      <Container>
        <h1>
          <Link to="/">
            Mini <span>Blog</span>
          </Link>
        </h1>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink to="/Login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Cadastrar</NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <NavLink to="/posts/create">Novo post</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">dashboard</NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink to="/about">Sobre</NavLink>
          </li>

          {user && (
            <li>
              <Link onClick={logOut}>Sair</Link>
            </li>
          )}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
