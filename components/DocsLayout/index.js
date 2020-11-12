import BaseLayout from 'components/BaseLayout';
import DocSearch from 'components/DocSearch';
import Logo from 'public/images/logo.svg';
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
          <Link href="/contact">
            <a>Write to us</a>
          </Link>
          , or{' '}
          <Link href="/register">
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
                <Link href="/support">
                  <a>
                    <PenIcon />
                    Write to us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <a>
                    <RegisterIcon />
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
