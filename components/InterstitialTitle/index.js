import Wrapper from 'components/Wrapper';
import styles from './style.module.css';

export default function InterstitialTitle({
  style = 'one',
  children,
  kicker,
  subtitle,
}) {
  return (
    <Wrapper>
      <div className={styles.root}>
        {kicker && <div className={styles.kicker}>{kicker}</div>}
        <div className={styles.lamellae}>
          <div className={styles.bg3} />
          <div className={styles.bg2} />
          <div className={styles.bg1} />
          <div className={styles.bg} />
          <h2 className={styles.title}>{children}</h2>
        </div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
    </Wrapper>
  );
}
