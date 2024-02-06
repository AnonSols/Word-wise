import React from "react";
import styles from "./Button.module.css";

type Prop = {
  onclick?: (e: React.FormEvent) => void;
  type: string;
  children: React.ReactNode;
};
const Button = ({ onclick, type, children }: Prop) => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onclick}>
      {children}
    </button>
  );
};

export default Button;
