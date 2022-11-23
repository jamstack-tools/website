import Wrapper from 'components/Wrapper';
import LazyImage from 'components/LazyImage';
import Link from 'next/link';
import s from './style.module.css';
import classnames from 'classnames';
import { useCallback, useState } from 'react';
import Hamburger from 'public/icons/regular/bars.svg';
import cn from 'classnames';
import allCategories from 'lib/categories';

const Group = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={s.group}>
      <button
        className={cn(s.groupTitle, s.groupTitleHandle, {
          [s.handleOpen]: open,
        })}
        onClick={() => setOpen((x) => !x)}
      >
        {title}
      </button>
      {open && <div className={s.groupContent}>{children}</div>}
    </div>
  );
};

const BigLink = ({ children, href }) => {
  return (
    <div className={s.group}>
      <Link legacyBehavior href={href}>
        <a className={s.groupTitle}>{children}</a>
      </Link>
    </div>
  );
};

const LearnResource = ({ href, as, title, target, description }) => {
  const content = (
    <>
      <div className={s.learnResourceTitle}>{title}</div>
      <div className={s.learnResourceDesc}>{description}</div>
    </>
  );

  return target ? (
    <a className={s.learnResource} href={href} target={target}>
      {content}
    </a>
  ) : (
    <Link legacyBehavior href={href} as={as}>
      <a className={s.learnResource}>{content}</a>
    </Link>
  );
};

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
      <div className={classnames(s.root)} data-datocms-noindex>
        <Wrapper>
          <div className={s.innerRoot}>
            <Link legacyBehavior href="/">
              <a className={s.logo}>
                <LazyImage
                  title="JAMstack"
                  alt="Logo JAMstack tools"
                  src={`/images/logo-small-gradient.png`}
                />
              </a>
            </Link>
            <div className={s.space} />
            <button className={s.hamburger} onClick={toggleVisibility}>
              <Hamburger width={18} height={18} />
            </button>
          </div>
        </Wrapper>
        {visible && (
          <>
            <div className={s.pane}>
              <Wrapper>
                <Group title="Browse">
                  <div className={s.twocols}>
                    <LearnResource
                      title="All"
                      description="All our tools"
                      href="/browse"
                    />
                    {allCategories.map((category) => (
                      <LearnResource
                        href={category.slug}
                        title={category.name}
                        description={category.description}
                      />
                    ))}
                  </div>
                </Group>

                <BigLink href="/what-is-jamstack">What is JAMstack?</BigLink>
                <BigLink href="/register">Register your tool</BigLink>
                <BigLink href="/contact">Contact</BigLink>
              </Wrapper>
            </div>
          </>
        )}
      </div>
    </>
  );
}
