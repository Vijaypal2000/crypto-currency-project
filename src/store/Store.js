import { configureStore } from "@reduxjs/toolkit";

import { ChartSlice, CoinSlice, DropSlice, ThemeSlice,PieItemSlice, AlertSlice, RecentSlice, WatchSlice, PhoneSlice } from "./slices";

const store = configureStore({
	reducer: {
		coins: CoinSlice,
		chart: ChartSlice,
		theme: ThemeSlice,
		alert:AlertSlice,
		drop: DropSlice,
		pieItem: PieItemSlice,
		recent:RecentSlice,
		watch:WatchSlice,
		phone:PhoneSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
