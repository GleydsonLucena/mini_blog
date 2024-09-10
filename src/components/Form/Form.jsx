import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNewUser } from "../../hooks/useNewUser";
import { useUtils } from "../../context/UtilsContext";

import Input from "./Input";
import "../../pages/Register/Register.scss";
import { useAutentication } from "../../hooks/useAutentication";
import { useSingIn } from "../../hooks/useSingIn";

const Form = ({ option }) => {
  const { user } = useNewUser();
  const { LogIn } = useSingIn();
  const { error, setError, loading } = useUtils();
  // eslint-disable-next-line no-unused-vars
  const { auth, createUser, authError } = useAutentication();

  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = useContext(UserContext);

  const isRegister = option === "register";
  const isLogin = option === "login";

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError, setError]);

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Preencha todos os campos!");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }
    await createUser(user);

    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos!");
      return;
    }
    await LogIn();

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={isLogin ? handleSubmitLogin : handleSubmitRegister}
      className="form"
    >
      {isRegister && (
        <Input
          type="text"
          name="name"
          label="Nome"
          placeholder="Digite seu nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      )}

      {(isLogin || isRegister) && (
        <Input
          type="email"
          name="email"
          label="E-mail"
          placeholder="Digite seu E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      )}

      {(isLogin || isRegister) && (
        <Input
          type="password"
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      )}

      {isRegister && (
        <Input
          type="password"
          name="confirmPassword"
          label="Confirmação de senha"
          placeholder="Confirme sua senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      )}

      {!loading && (
        <button type="submit">{isRegister ? "Cadastrar" : "Entrar"}</button>
      )}
      {loading && (
        <button disabled type="submit">
          Aguarde...
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

Form.propTypes = {
  option: PropTypes.string.isRequired,
};

export default Form;
