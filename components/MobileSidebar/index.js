import { useCallback, useState } from 'react';
import all from 'lib/categories';
import LeftIcon from 'public/icons/regular/chevron-double-left.svg';
import ActiveLink from 'components/ActiveLink';
import Wrapper from 'components/Wrapper';
import LazyImage from 'components/LazyImage';
import Link from 'next/link';
import s from './style.module.css';
import classnames from 'classnames';
import Hamburger from 'public/icons/regular/bars.svg';
import Logo from 'public/images/logo.svg';

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setVisible((v) => !v);
  });

  return (
    <>
      {visible && (
        <div className={s.overlay} onClick={() => setVisible(false)} />
      )}
      <div className={classnames(s.sidebar)} data-datocms-noindex>
        <Wrapper>
          <div className={s.innerSidebar}>
            <Link href="/">
              <a className={s.logo}>
                <LazyImage src={`/images/logo-small-gradient.png`} />
              </a>
            </Link>
            <div className={s.space} />
            <button className={s.hamburger} onClick={toggleVisibility}>
              <Hamburger />
            </button>
          </div>
        </Wrapper>
        {visible && (
          <>
            <div className={s.pane}>
              <Wrapper>
                <Link href="/">
                  <a className={s.backHome}>
                    <Logo width={18} height={18} />
                    Home
                  </a>
                </Link>
                <Link href="/browse">
                  <a className={s.backHome}>
                    <LeftIcon /> Browse
                  </a>
                </Link>
                {all.map((category) => (
                  <div key={category.slug}>
                    <ActiveLink
                      activeClassName={s.activePage}
                      href={category.slug}
                      as={category.slug}
                    >
                      <a className={s.page}>{category.name}</a>
                    </ActiveLink>
                  </div>
                ))}
                <div style={{ height: '80px' }} />
              </Wrapper>
            </div>
          </>
        )}
      </div>
    </>
  );
}
