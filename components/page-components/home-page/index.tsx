import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { getBeers, selectBeers, setState } from "~/store/reducers/beers.slice";

import classes from "./home-page.module.scss";
import BeerCard from "./beer-card";
import TextInput from "~/components/ui-components/ui-components/inputs/text-input";
import PlainLoader from "~/components/ui-components/ui-components/loaders/plain-loader";
import PlainButton from "~/components/ui-components/ui-components/buttons/plain-button";

export default function HomePage() {
    const dispatch = useAppDispatch();
    const { beers, isPending, isError, search, pageCounter, activePage } = useAppSelector(selectBeers);

    useEffect(() => {
        dispatch(getBeers(search));
    }, [search]);

    const pagesList = () => {
        if(beers.length === 0 || pageCounter === null) return null;
        const pages = Array.from({ length: pageCounter }, (v, i) =>  i + 1);
        return (
            <div className={`${classes.pages} column`}>
                {pages.map(page => {
                    return (
                        <div
                            key={page}
                            onClick={() => dispatch(setState({ activePage: page }))}
                            className={`${classes.page} ${activePage === page ? classes.active : ''}`}
                        >
                            <span className={`block__regular-text`}>
                                {page}
                            </span>
                        </div>
                    )
                })}
            </div>
        );
    };

    if(isError) return <h1 className={`block__header-1 text-red`}>Произошла ошибка</h1>

    return (
        <div className={`${classes.wrapper}`}>
            <div className={`${classes.content} row gap-30`}>
                <TextInput
                    label={'Посик пива по названию'}
                    holder={'Введите название пива для поиска...'}
                    textValue={search}
                    changeEvent={(value: string) => {
                        dispatch(setState({ activePage: 1, search: value }));
                    }}
                />
                <PlainButton
                    clickEvent={() => dispatch(setState({ search: '' }))}
                    className={`${classes.button__clear}`}
                >
                    Очистить поиск
                </PlainButton>
                {!isPending
                    ? <div className={`row gap-30`}>
                        <h1 className={`block__header-1`}>Пиво</h1>
                        <div className={`${classes.beers__container} row gap-30`}>
                            {beers.length > 0 && beers[activePage -1].map(beer => {
                                return (
                                    <BeerCard key={`${beer.id}-${beer.name}`} {...beer} />
                                )
                            })}
                        </div>
                        {pagesList()}
                    </div>
                    : <PlainLoader />
                }
            </div>
        </div>
    );
};
