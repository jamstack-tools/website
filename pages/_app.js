import '../components/BaseLayout/global.css';
import '../components/NProgress/style.css';
import { Provider } from '@lyket/react';

function App({ Component, pageProps }) {
  return (
    <Provider apiKey="61c4a1dcda3a15f0cbda981fc44e3c">
      <Component {...pageProps} />;
    </Provider>
  );
}

export default App;
