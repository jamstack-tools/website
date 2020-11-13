import SmartMarkdown from 'components/SmartMarkdown';
import defaultStyles from './style.module.css';
import { Copy, Image as FakeImage } from 'components/FakeContent';

export default function PostContent({ isFallback, content, style, children }) {
  const s = style || defaultStyles;

  return (
    <div className={s.body}>
      {isFallback ? (
        <>
          <div className={s.text}>
            <Copy lines={4} />
          </div>
          <figure>
            <FakeImage />
          </figure>
          <div className={s.text}>
            <Copy lines={3} />
          </div>
        </>
      ) : (
        <>
          <div className={s.text}>
            <SmartMarkdown>{content.text || ''}</SmartMarkdown>
            {children}
          </div>
        </>
      )}
    </div>
  );
}
