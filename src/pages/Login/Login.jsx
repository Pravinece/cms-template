import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../components/utils/service";
import { setSecureToken, setSecureUser } from "../../components/lib/cookieAuth";
import s from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ enable: false, msg: "", state: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username.trim(),
      password: password.trim(),
    };
    setLoading(true);
    instance
      .post(`${import.meta.env.VITE_API_URL}/api/loginadmin`, data)
      .then((res) => {
        const { userdetails, token } = res?.data?.data || {};
        setSecureUser(res?.data);
        setSecureToken(res?.data?.Token);
        setMessage({ enable: true, msg: "Login successful!", state: true });
        setLoading(false);
        navigate(`/`, { replace: true });
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.detail || "Something went wrong";
        setMessage({ enable: true, msg: errorMsg, state: false });
        setLoading(false);
      });
  };

  return (
    <div className={s.wrapper}>
      <form className={s.card} onSubmit={handleSubmit}>
        <h2 className={s.title}>Login</h2>

        <div className={s.field}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className={s.field}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className={s.btn} type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {message.enable && (
          <p className={message.state ? s.success : s.error}>{message.msg}</p>
        )}
      </form>
    </div>
  );
}
