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
          <h4 className={s.introTitle}>
            The right <strong>JAMstack</strong> tool for you is{' '}
            <Highlight style="pinkorange">out there</Highlight>
          </h4>
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
          <Link legacyBehavior href="/browse/static-site-generators">
            <a className={s.personas}>
              <div className={s.square} />

              <div className={s.personasContainer}>
                <h6 className={s.personasTitle}>Static site generators</h6>
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

          <Link legacyBehavior href="/browse/headless-cms">
            <a className={s.personas}>
              <div className={s.square} />

              <div className={s.personasContainer}>
                <h6 className={s.personasTitle}>Headless CMS</h6>
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

          <Link legacyBehavior href="/browse">
            <a className={s.personas}>
              <div className={s.square} />
              <div className={s.personasContainer}>
                <h6 className={s.personasTitle}>JAMstack showcase</h6>
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
