import styles from './style.module.css';
import LinkIcon from 'public/icons/regular/link.svg';

export default function Tags({ children, tags = [], url }) {
  return (
    <div className={styles.root}>
      <div className={styles.tags}>
        {url && (
          <a href={url} target="_blank" className={styles.url}>
            <LinkIcon /> {url}
          </a>
        )}
        {tags.map(
          ([key, value]) =>
            value && (
              <div className={styles.tag}>
                <span className={styles.key}>{key}</span>
                <span className={styles.value}>{value}</span>
              </div>
            ),
        )}
      </div>
      {children}
    </div>
  );
}
