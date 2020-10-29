import Wrapper from 'components/Wrapper';
import FinalCta from 'components/FinalCta';
import cn from 'classnames';
import Link from 'next/link';
import s from './style.module.css';

export default function Footer({ noCta }) {
  return (
    <div
      className={cn(s.footerBg, { [s.noCta]: noCta, [s.cta]: !noCta })}
      data-datocms-noindex
    >
      {!noCta && <FinalCta />}
      <div className={s.footerRoot}>
        <Wrapper>
          <div className={s.footerInnerRoot}>
            <div className={s.cols}>
              <div className={s.col}>
                <div className={s.group}>
                  <div className={s.groupTitle}>Basic</div>
                  <div className={s.groupLinks}>
                    <div className={s.groupLink}>
                      <Link href="/headless-cms">
                        <a>Headless CMSs</a>
                      </Link>
                    </div>
                    <div className={s.groupLink}>
                      <Link href="/generators">
                        <a>Generators</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.col}>
                <div className={s.group}>
                  <div className={s.groupTitle}>By category</div>
                  <div className={s.groupLinks}>
                    <div className={s.groupLink}>
                      <Link href="/tools/feedback">
                        <a>User feedback</a>
                      </Link>
                    </div>
                    <div className={s.groupLink}>
                      <Link href="/tools/payment">
                        <a>Payment</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.col}>
                <div className={s.group}>
                  <div className={s.groupTitle}>Contact</div>
                  <div className={s.groupLinks}>
                    <div className={s.groupLink}>
                      <Link href="/contact">
                        <a>Contact us</a>
                      </Link>
                    </div>
                    <div className={s.groupLink}>
                      <Link href="/register">
                        <a>Register your tool</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
        <div className={s.finalFooter}>
          <Wrapper>
            <div className={s.finalLinks}>
              <Link href="/legal/privacy-policy">
                <a className={s.finalLink}>Privacy policy</a>
              </Link>
              <Link href="/legal/cookie-policy">
                <a className={s.finalLink}>Cookie policy</a>
              </Link>
              <Link href="/legal/gdpr">
                <a className={s.finalLink}>GDPR Compliance</a>
              </Link>
              <Link href="/legal/terms">
                <a className={s.finalLink}>Terms of Service</a>
              </Link>
            </div>
            <div className={s.finalLine}>
              <a href="mailto:write@jamstacktools.org">
                write@jamstacktools.org
              </a>{' '}
              <span>
                ©{new Date().getUTCFullYear()} JAMstack Tools, all rights
                reserved
              </span>{' '}
            </div>
          </Wrapper>
        </div>
      </div>
    </div>
  );
}
