import { useRouter } from "next/router";

import BeerPage from "~/components/page-components/beer-page/beer-page";
import PlainLoader from "~/components/ui-components/ui-components/loaders/plain-loader";

export default function Beer () {
    const { query: { id } } = useRouter();

    if(!id) return <PlainLoader/>;

    return <BeerPage id={String(id)} />;
};
