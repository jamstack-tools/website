import all from 'lib/categories';
import LeftIcon from 'public/icons/regular/chevron-double-left.svg';
import Link from 'next/link';
import ActiveLink from 'components/ActiveLink';
import Logo from 'public/images/logo.svg';
import s from './style.module.css';

const DeskSidebar = () => {
  return (
    <div className={s.sidebar}>
      <Link legacyBehavior href="/">
        <a className={s.logo}>
          <span> JAMTools </span>
        </a>
      </Link>
      <div className={s.innerSidebar} data-datocms-noindex>
        <Link legacyBehavior href="/">
          <a className={s.backHome}>
            <Logo width={18} height={18} />
            Home
          </a>
        </Link>
        <Link legacyBehavior href="/browse">
          <a className={s.backHome}>
            <LeftIcon width={18} height={18} /> Browse
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
      </div>
    </div>
  );
};

export default DeskSidebar;
