import styles from './button.module.css';

const SubmitButton = ({ children, loading,onClick, href, type = "button", className = "", ...props }) => {

    return (
       <button onClick={onClick} type="submit" className={`${styles.cta} w-fit h-fit`}>
  <div className={styles.arrow}>
    <div className={`${styles["single-arrow"]} ${styles.dev}`}></div>
  </div>
  <span className={`${styles.label} font-roboto font-semibold`}>{children}</span>
</button>
    );
};

export default SubmitButton;
