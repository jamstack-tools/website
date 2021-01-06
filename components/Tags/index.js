import styles from './style.module.css';
import LinkIcon from 'public/icons/regular/link.svg';

export default function Tags({ children, tags = [], url }) {
  return (
    <div className={styles.root}>
      {url && (
        <a
          href={`${url}/?ref=jamstacktools`}
          target="_blank"
          className={styles.url}
        >
          <LinkIcon /> <span>{url}</span>
        </a>
      )}
      <div className={styles.tags}>
        {false &&
          tags.map(
            ([key, value]) =>
              value && (
                <div className={styles.tag} key={key}>
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
