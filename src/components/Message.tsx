import styles from "./Message.module.css";
type prop = {
  message: string;
};
function Message({ message }: prop) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
