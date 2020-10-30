import Wrapper from 'components/Wrapper';
import FullLogo from 'public/images/full_logo.svg';
import Link from 'next/link';
import s from './style.module.css';
import classnames from 'classnames';
import Button from 'components/Button';

const TitleDesc = ({ href, as, title, description, target }) =>
  target ? (
    <a className={s.titleDesc} href={href} target={target}>
      <div className={s.titleDescBody}>
        <div className={s.titleDescTitle}>{title}</div>
        <div className={s.titleDescDescription}>{description}</div>
      </div>
    </a>
  ) : (
    <Link href={href} as={as}>
      <a className={s.titleDesc}>
        <div className={s.titleDescBody}>
          <div className={s.titleDescTitle}>{title}</div>
          <div className={s.titleDescDescription}>{description}</div>
        </div>
      </a>
    </Link>
  );

const Pane = ({ children }) => (
  <div className={s.pane}>
    <div className={s.paneInner}>{children}</div>
  </div>
);

export default function Navbar() {
  return (
    <>
      <div className={s.placeholder} />
      <div className={classnames(s.root)} data-datocms-noindex>
        <Wrapper>
          <div className={s.innerRoot}>
            <Link href="/">
              <a className={s.logo}>
                <FullLogo />
              </a>
            </Link>
            <div className={s.entries}>
              <div className={s.group}>
                <div className={s.groupTitle}>
                  <span>Browse</span>
                </div>
                <Pane>
                  <div className={s.cols}>
                    <div className={s.section}>
                      <div className={s.grid1}>
                        <TitleDesc
                          title="All"
                          description="Get a first look"
                          href="/browse"
                        />
                        <TitleDesc
                          title="Headless CMS"
                          description="Browse headless CMSs"
                          href="/browse/headless-cms"
                        />
                        <TitleDesc
                          title="Generators"
                          description="Browse generators"
                          href="/browse/generators"
                        />
                      </div>
                    </div>
                    <div className={s.section}>
                      <div className={s.grid1}>
                        <TitleDesc
                          title="Feedback"
                          description="Feedback tools"
                          href="/browse/tools/feedback"
                        />
                        <TitleDesc
                          title="Form"
                          description="Form tools"
                          href="/browse/tools/feedback"
                        />
                        <TitleDesc
                          title="Payment"
                          description="Payment tools"
                          href="/browse/tools/feedback"
                        />
                      </div>
                    </div>
                  </div>
                </Pane>
              </div>

              <Link href="/register">
                <a className={s.entry}>
                  <span>Register your tool</span>
                </a>
              </Link>

              <Link href="/contact">
                <a className={s.entry}>
                  <span>Contact us</span>
                </a>
              </Link>
            </div>

            <div className={s.actions}>
              <Link href="/register">
                <Button as="a" p="small" href="/register">
                  Register your tool
                </Button>
              </Link>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}