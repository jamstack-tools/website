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
        {kicker && <h6 className={styles.kicker}>{kicker}</h6>}
        <div className={styles.lamellae}>
          <div className={styles.bg3} />
          <div className={styles.bg2} />
          <div className={styles.bg1} />
          <div className={styles.bg} />
          <h4 className={styles.title}>{children}</h4>
        </div>
        {subtitle && <h5 className={styles.subtitle}>{subtitle}</h5>}
      </div>
    </Wrapper>
  );
}
