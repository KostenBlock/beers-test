import axios from "axios";

import { useState, useEffect } from "react";

import classes from "./beer-page.module.scss";
import PlainLoader from "~/components/ui-components/ui-components/loaders/plain-loader";

import { BeerDefault } from "./constants";
import { BeerI } from "~/helpers/interfaces/beer.interface";

interface Props {
    id: string;
}

export default function BeerPage({ id }: Props) {
    const [isPending, setIsPending] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const [beerData, setBeerData] = useState<BeerI>(BeerDefault);

    useEffect(() => {
        (async () => {
           await getBeer();
        })();
    }, []);

    const getBeer = async () => {
        try {
            setIsPending(true);
            const { data } = await axios.get<BeerI[]>(`${process.env.NEXT_PUBLIC_BEERS_API}/${id}`);
            if(!Array.isArray(data)) return;
            setBeerData(data[0]);
        } catch (error) {
            setIsError(true);
            console.error(error);
        }
        finally {
            setIsPending(false);
        }
    };

    if(isError) return <h1 className={`block__header-1`}>Произошла ошибка</h1>;

    if(isPending) return <PlainLoader />;

    return (
        <div className={`${classes.wrapper}`}>
            <div className={`${classes.content}`}>
                <div className={`${classes.beer__container} column gap-30`}>
                    <div className={`${classes.beer__image}`}>
                        <img
                            src={beerData.image_url}
                            alt={beerData.name}
                            className={`contain-image`}
                        />
                    </div>
                    <div className={`row gap-20`}>
                        <h1 className={`block__header-1`}>{beerData.name}</h1>
                        <div className={`row`}>
                            <span className={`block__regular-text font-medium`}>Описание:</span>
                            <p className={`block__regular-text`}>{beerData.description}</p>
                        </div>
                        <div className={`row`}>
                            <span className={`block__regular-text font-medium`}>Cлоган:</span>
                            <p className={`block__regular-text`}>{beerData.tagline}</p>
                        </div>
                        <div className={`row`}>
                            <span className={`block__regular-text font-medium`}>Ценв:</span>
                            <p className={`block__regular-text`}>{beerData.abv} $</p>
                        </div>
                        <div className={`row`}>
                            <span className={`block__regular-text font-medium`}>Cочетаемость с едой:</span>
                            {beerData.food_pairing.map(food => <p key={food} className={`block__regular-text`}>{food}</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
