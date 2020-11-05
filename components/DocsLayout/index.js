import BaseLayout from 'components/BaseLayout';
import DocSearch from 'components/DocSearch';
import FullLogo from 'public/images/full_logo.svg';
import Link from 'next/link';
import s from './style.module.css';
import SupportIcon from 'public/icons/regular/headset.svg';
import StatusIcon from 'public/icons/regular/tachometer.svg';
import LanguagePicker from 'components/LanguagePicker';

export default function DocsLayout({
  sidebar,
  children,
  preview,
  languageSwitch,
}) {
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
        <div className={s.sidebar}>
          <Link href="/">
            <a className={s.logo}>
              <FullLogo height={30} />
            </a>
          </Link>
          <div className={s.innerSidebar} data-datocms-noindex>
            {sidebar}
          </div>
        </div>
        <div className={s.contentWrapper}>
          <DocSearch />
          <div className={s.mainHeader}>
            <ul>
              <li>
                <Link href="/support">
                  <a>
                    <SupportIcon />
                    Ask for help!
                  </a>
                </Link>
              </li>
              <li>
                <a href="https://status.datocms.com" target="_blank">
                  <StatusIcon />
                  Status page
                </a>
              </li>
            </ul>
          </div>
          {languageSwitch ? (
            <LanguagePicker>{content}</LanguagePicker>
          ) : (
            content
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
