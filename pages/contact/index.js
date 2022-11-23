import Layout from 'components/Layout';
import Wrapper from 'components/Wrapper';
import Link from 'next/link';
import s from './style.module.css';
import ContactForm from 'components/ContactForm';
import Highlight from 'components/Highlight';
import Head from 'next/head';

export default function Register() {
  return (
    <Layout noCta={true}>
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
                Let us know what you think about the JAMstack tools project, any
                idea on how we can improve and give a better service :D
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
