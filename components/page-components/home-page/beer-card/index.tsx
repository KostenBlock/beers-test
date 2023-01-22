import Link from "next/link";

import classes from "./beer-card.module.scss";

import { BeerI } from "~/helpers/interfaces/beer.interface";

import TextHelperUtils from "~/utils/text-helper.utils";
const textHelperUtils = new TextHelperUtils();

export default function BeerCard({ id, name, description, image_url }: BeerI) {

    return (
        <Link
            href={`/beer/${id}`}
            className={`${classes.beer__card} row gap-10`}
        >
            <div className={`${classes.beer__picture}`}>
                <img
                    src={image_url}
                    alt={name}
                    className={`contain-image`}
                />
            </div>
            <span className={`block__header-3`}>{name}</span>
            <p className={`block__regular-text`}>{textHelperUtils.shortedText(description, 140)}</p>
        </Link>
    );
};
