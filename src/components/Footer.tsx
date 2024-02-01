import style from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.copyright}>
        Copyright &copy; {new Date().getFullYear()} by Egede Solomon ❤️
      </div>
    </footer>
  );
};

export default Footer;
