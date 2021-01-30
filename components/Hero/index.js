import Wrapper from 'components/Wrapper';
import styles from './style.module.css';

export default function Hero({ kicker, title, subtitle, children }) {
  return (
    <Wrapper>
      <div className={styles.root}>
        {kicker && <h3 className={styles.kicker}>{kicker}</h3>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
        {children && <div className={styles.children}>{children}</div>}
      </div>
    </Wrapper>
  );
}
