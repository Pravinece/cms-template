import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useNavigate } from "react-router-dom";
import instance from "../../components/utils/service";
import { setSecureToken, setSecureUser } from "../../components/lib/cookieAuth";
import s from "./Login.module.css";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className={s.btn} type="submit" disabled={pending}>
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

function sanitize(str) {
  return str.replace(/[<>"'&]/g, "");
}

async function loginAction(prevState, formData) {
  const username = sanitize(formData.get("username")?.trim());
  const password = sanitize(formData.get("password")?.trim());

  if (!username) return { code: "U_EMPTY" };
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) return { code: "U_INVALID", username, password };
  if (!password) return { code: "P_EMPTY" };
  // if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password))
    // return { code: "P_INVALID", username, password };

  let payload = {
    captchaInput: "",
    clientId: "119017",
    password: "cc",
    platform: "web",
    username: "sadmin",
  };
  try {
    const res = await instance.post(
      `${import.meta.env.VITE_API_URL}/api/loginadmin`,
      payload
      // { username, password },
    );
    setSecureUser(res?.data);
    setSecureToken(res?.data?.Token);
    return { success: true };
  } catch (error) {
    return {
      code: "API_ERR",
      message: error?.response?.message,
      username,
      password,
    };
  }
}

export default function Login() {
  const navigate = useNavigate();
  const [state, formAction] = useActionState(async (prevState, formData) => {
    const result = await loginAction(prevState, formData);
    if (result.success) navigate("/", { replace: true });
    return result;
  }, null);

  const ERROR_MAP = {
    U_EMPTY: { field: "username", msg: "Username is required" },
    U_INVALID: {
      field: "username",
      msg: "3-20 chars, letters, numbers, underscore only",
    },
    P_EMPTY: { field: "password", msg: "Password is required" },
    P_INVALID: { field: "password", msg: "Min 8 chars, 1 uppercase, 1 number" },
    API_ERR: { field: "api" },
  };

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!state?.code) return;
    setShowError(true);
    const timer = setTimeout(() => setShowError(false), 3000);
    return () => clearTimeout(timer);
  }, [state]);

  const err = showError ? ERROR_MAP[state?.code] : null;

  return (
    <div className={s.wrapper}>
      <form className={s.card} action={formAction}>
        <h2 className={s.title}>Login</h2>

        {err?.field === "api" && <p className={s.apiError}>{state.message}</p>}

        <div className={s.field}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            key={state?.username}
            defaultValue={state?.username}
            name="username"
            type="text"
          />
          {err?.field === "username" && (
            <p className={s.fieldError}>{err.msg}</p>
          )}
        </div>

        <div className={s.field}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          {err?.field === "password" && (
            <p className={s.fieldError}>{err.msg}</p>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
