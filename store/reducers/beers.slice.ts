import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BeerI } from "~/helpers/interfaces/beer.interface";

import EventHelperUtils from "~/utils/event-helper.utills";
const eventHelperUtils = new EventHelperUtils();

interface BeersI {
    beers: BeerI[][];
    pageCounter: number | null;
    activePage: number;
    search: string;
    isPending: boolean;
    isError: boolean;
    [propName: string]: any;
}

const initialState: BeersI = {
    beers: [],
    pageCounter: null,
    activePage: 1,
    search: '',
    isPending: false,
    isError: false,
};

export const beersSlice = createSlice({
    name: "beers",
    initialState,
    reducers: {
        setState: (state: BeersI, action: PayloadAction<Partial<BeersI>>) => {
            try {
                const valueArg = action.payload;
                for (const key in valueArg) {
                    if (Object.hasOwnProperty.call(valueArg, key) && Object.hasOwnProperty.call(state, key)) {
                        state[key] = valueArg[key];
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
    }
});

export const getBeers = (name: string) => async (dispatch: Function) => {
    const validName = name ? `&beer_name=${name}` : '';
    dispatch(setState({ isPending: true }));
    eventHelperUtils.debounce(async () => {
        try {
            const { data: beers } = await axios.get<BeerI[]>(`${process.env.NEXT_PUBLIC_BEERS_API}/?page=1&per_page=49${validName}`);
            dispatch(setState({ ...splitter(beers, 8) }));
        } catch (error) {
            dispatch(setState({ isError: true }));
        } finally {
            dispatch(setState({ isPending: false }));
        }
    }, 500);
};

export const { setState } = beersSlice.actions;
export const selectBeers = (state: { beers: BeersI }) => state.beers;
export default beersSlice.reducer;

const splitter = (arr: BeerI[], chunkSize: number) => {
    let tempArray: BeerI[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        tempArray = [...tempArray, chunk];
    }
    return { beers: tempArray, pageCounter: tempArray.length };
};


