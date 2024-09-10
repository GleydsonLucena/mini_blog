import Form from "../../components/Form/Form";
import "./Register.scss";

const Register = () => {
  return (
    <section className="registerAndLogin">
      <h1>
        Cadastre-se para <span>postar.</span>
      </h1>
      <p>Crie seu usuário e compartilhe suas histórias.</p>
      {/* Passe um parametro via props  para o fomulário 'register' ou 'login' */}
      <Form option="register" />
    </section>
  );
};

export default Register;
