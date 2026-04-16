import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register({ handleRegistration }) {
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
    handleRegistration(data);
  };

  return (
    <div className="sign">
      <h2 className="sign__title">Regístrate</h2>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          className="sign__field"
          type="email"
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
          Regístrate
        </button>
      </form>
      <div className="sign__signup">
        <p>¿Ya eres miembro?</p>
        <Link to="/login" className="sign__link">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}
