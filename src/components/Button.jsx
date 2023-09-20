import styles from "./Button.module.css";

function Button({ navigate, children, type }) {
  return (
    <>
      <button onClick={navigate} className={`${styles.btn} ${styles[type]}`}>
        {children}
      </button>
    </>
  );
}

export default Button;
