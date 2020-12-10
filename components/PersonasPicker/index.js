import s from './style.module.css';
import Wrapper from 'components/Wrapper';
import Link from 'next/link';
import ArrowIcon from 'public/images/arrow-usecase.svg';
import LazyImage from 'components/LazyImage';
import Highlight from 'components/Highlight';

export default function PersonasPicker() {
  return (
    <Wrapper>
      <div className={s.root}>
        <div className={s.intro}>
          <div className={s.introSub}>The essence of JamStack</div>
          <h2 className={s.introTitle}>
            The right tool for you is{' '}
            <Highlight style="pinkorange">out there</Highlight>
          </h2>
          <div className={s.introBody}>
            If you are wondering: "Will there be a tool that does THAT?" Well,
            the answer is most probably <strong>yes!</strong>
          </div>
          <div className={s.personasLink}>
            Start browsing
            <ArrowIcon />
          </div>
        </div>
        <div className={s.picker}>
          <Link href="/browse/generators">
            <a className={s.personas}>
              <div className={s.square} />

              <div className={s.personasContainer}>
                <h6 className={s.personasTitle}>A generator?</h6>
                <div className={s.personasBody}>
                  Are you just starting a JAMstack project? Choose the perfect
                  static site generator for you!
                </div>
                <div className={s.personasLink}>
                  Learn more <ArrowIcon />
                </div>
              </div>
            </a>
          </Link>

          <Link href="/browse/headless-cms">
            <a className={s.personas}>
              <div className={s.square} />

              <div className={s.personasContainer}>
                <h6 className={s.personasTitle}>A headless CMS?</h6>
                <div className={s.personasBody}>
                  Do you want to keep all your content in one place? You need a
                  headless CMS!
                </div>
                <div className={s.personasLink}>
                  Learn more <ArrowIcon />
                </div>
              </div>
            </a>
          </Link>

          <Link href="/browse">
            <a className={s.personas}>
              <div className={s.square} />
              <div className={s.personasContainer}>
                <h6 className={s.personasTitle}>Tools tools tools</h6>
                <div className={s.personasBody}>
                  Forms, feedback systems, e-commerce tools... All in one place!
                </div>
                <div className={s.personasLink}>
                  Learn more <ArrowIcon />
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}
