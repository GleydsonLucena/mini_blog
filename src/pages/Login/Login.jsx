import Form from "../../components/Form/Form";
import "../Register/Register.scss";

const Login = () => {
  return (
    <div className="registerAndLogin">
      <h1>Entrar</h1>
      <p>Faça Login para utilizar.</p>
      <Form option="login" />
    </div>
  );
};

export default Login;
