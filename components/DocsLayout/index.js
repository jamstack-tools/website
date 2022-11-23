import BaseLayout from 'components/BaseLayout';
import DocSearch from 'components/DocSearch';
import Link from 'next/link';
import s from './style.module.css';
import PenIcon from 'public/icons/regular/pen.svg';
import RegisterIcon from 'public/icons/regular/pi.svg';

export default function DocsLayout({ sidebar, children, preview }) {
  const content = (
    <div className={s.container}>
      {children}
      <div className={s.footer} data-datocms-noindex>
        <div className={s.footerTitle}>Cant't find a tool?</div>
        <div className={s.footerBody}>
          <Link legacyBehavior href="/contact">
            <a>Write to us</a>
          </Link>
          , or{' '}
          <Link legacyBehavior href="/register">
            <a>register it!</a>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <BaseLayout preview={preview}>
      <div className={s.root}>
        {sidebar}
        <div className={s.contentWrapper}>
          <DocSearch />
          <div className={s.mainHeader}>
            <ul>
              <li>
                <Link legacyBehavior href="/support">
                  <a>
                    <PenIcon width={18} height={18} />
                    Write to us
                  </a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/register">
                  <a>
                    <RegisterIcon width={18} height={18} />
                    Register a tool
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          {content}
        </div>
      </div>
    </BaseLayout>
  );
}
