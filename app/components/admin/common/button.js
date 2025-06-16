import Link from "next/link";
import { Fragment } from "react";
import styles from './button.module.css';

const Button = ({ children, loading, href, type, className, ...props }) => {
  const Wrapper = href ? ({ children }) => <Link href={href}>{children}</Link> : Fragment;

  return (
    <Wrapper>
      <button
        type={type}
        disabled={loading}
        {...props}
        className={`${styles.btn} ${className}`}
      >
        <span className={styles.text}>{loading ? 'Loading...' : children}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66669 11.3334L11.3334 4.66669"
            stroke="white"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.66669 4.66669H11.3334V11.3334"
            stroke="white"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </Wrapper>
  );
};

export default Button;
