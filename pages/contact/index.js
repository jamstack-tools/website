import Layout from 'components/Layout';
import Wrapper from 'components/Wrapper';
import Link from 'next/link';
import s from './style.module.css';
import ContactForm from 'components/ContactForm';
import Highlight from 'components/Highlight';
import Head from 'next/head';

export default function Register() {
  return (
    <Layout noCta>
      <Head>
        <title>Contact us</title>
      </Head>
      <div className={s.root}>
        <Wrapper>
          <div className={s.intro}>
            <div className={s.introKicker}>Get in touch</div>
            <div className={s.introTitle}>
              <Highlight>Contact us</Highlight>
            </div>
            <div className={s.introBody}>
              <p>
                Whether you just launched on Product Hunt or you have a
                multi-million company let's let the world know whu you are. Join
                the jam!
              </p>
              <p>
                Let us know what you think about the project, any idea on how we
                can improve and give a better service
              </p>
            </div>
          </div>
          <div className={s.picker}>
            <ContactForm />
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
}
