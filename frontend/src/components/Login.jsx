import { useState } from "react";
import { Link } from "react-router-dom";


export default function Login({ handleLogin, setIsInfoTooltipOpen }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsInfoTooltipOpen(true);
    handleLogin(data);
  }

  return (
    <div className="sign">
      <h2 className="sign__title">Inicia sesión</h2>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="sign__field"
          id="email"
          name="email"
          value={data.email}
          placeholder="Correo electrónico"
          onChange={handleChange}
        />
        <input
          className="sign__field"
          type="password"
          id="password"
          name="password"
          value={data.password}
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <button className="sign__button" type="submit">
          Inicia sesión
        </button>
      </form>
      <div className="sign__signup">
        <p>¿Aún no eres miembro?</p>
        <Link to="/register" className="sign__link">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );

}