import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import AppNav from "../components/PageNav";
import Button from "../components/Button/Button";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [error, setError] = useState("");

  const { Login, isAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please don't leave a field blank, input all field!");
      return;
    }

    Login(email, password);
  };
  useEffect(() => {
    if (isAuth) navigate("/app", { replace: true });
  }, [isAuth, navigate]);
  return (
    <main className={styles.login}>
      <AppNav />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>

        {error && <p> {error}</p>}
      </form>
    </main>
  );
}
