import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "~/store";

import "~/styles/global/template.scss";
import "~/styles/global/colors.scss";
import "~/styles/global/sizes.scss";
import "~/styles/global/reset.scss";
import "~/styles/global/reset.scss";
import "~/styles/global/text.scss";
import "~/styles/global/gaps.scss";

import MainLayout from "~/components/layout-components/main-layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
  );
};
