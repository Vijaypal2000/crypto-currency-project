import { createSlice } from "@reduxjs/toolkit";

// Importing icon from react-icons
import { AiFillHome } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaCoins } from "react-icons/fa";
import { RiPieChart2Fill } from "react-icons/ri";

const DropSlice = createSlice({
	name: "drop",
	initialState: {
		currency: {
			dropName: "Inr (₹)",
			currency: "inr",
			symbol: "₹",
			dropList: [],
		},
		timePeriod: {
			time: 1,
			range: "1D",
			timePeriodList: [
				{ timePeriod: "1D" },
				{ timePeriod: "1W" },
				{ timePeriod: "1M" },
				{ timePeriod: "6M" },
				{ timePeriod: "1Y" },
			],
		},
		phoneMenu: {
			path:"Home",
			phoneMenuList: [
				{ itemName: "Home", path:"/", icon: (<AiFillHome />) }, // object for Home menu item
				{ itemName: "Markets", path:"/market", icon: (<BsFillBarChartFill />) }, // object for Markets menu item
				{ itemName: "Exchange", path:"/exchange", icon: (<FaCoins />) }, // object for Exchange menu item
				{ itemName: "Portfolio", path:"/portfolio", icon: (<RiPieChart2Fill />) }, // object for Portfolio menu item
			],
		},
		crypto: {
			dropName: "Bitcoin",
			currentCoin: "bitcoin",
			dropList: [],
		},
		chartType: {
			dropName: "Line",
			currentChartType: "Line",
			chartTypeList:[
			{ itemname: "Line" },
			{ itemname: "Bar" },
			{ itemname: "Hor..Bar" },
			]
		},
		sell: {
			dropName: "Bitcoin",
			coin: "Bitcoin",
			dropList: [],
		},
		buy: {
			dropName: "Ethereum",
			coin: "Ethereum",
			dropList: [],
		},
		coinSearch: {
			dropName: "",
			dropList: [],
		},
	},
	reducers: {
		// currency drop
		setSymbol(state, action) {
			state.currency.symbol = action.payload;
		},
		setCurrency(state, action) {
			state.currency.currency = action.payload;
		},
		setCurrencyDropdownName(state, action) {
			state.currency.dropName = action.payload;
		},

		setCurrencyList(state, action) {
			state.currency.dropList = action.payload;
		},

		// crypto drop
		setCurrentCoin(state, action) {
			state.crypto.currentCoin = action.payload.toLowerCase();
		},
		setCryptoDropName(state, action) {
			state.crypto.dropName = action.payload
				.charAt(0)
				.toUpperCase()
				.concat(action.payload.slice(1));
			action.payload.toLowerCase();
		},
		setCryptoList(state, action) {
			state.crypto.dropList = action.payload;
		},
		// chart drop
		setChartType(state, action) {
			state.chartType.dropName = action.payload;
			state.chartType.currentChartType=action.payload
		},
		// phone menu 
		setPhoneMenuPath(state,action){
			state.phoneMenu.path=action.payload
		},
		// sell drop
		setSellDropName(state, action) {
			state.sell.dropName = action.payload;
		},
		setSellList(state, action) {
			state.sell.dropList = action.payload;
		},
		setSellCoin(state, action) {
			state.sell.coin = action.payload;
		},
		// buy drop
		setBuyDropName(state, action) {
			state.buy.dropName = action.payload;
		},
		setBuyList(state, action) {
			state.buy.dropList = action.payload;
		},
		setBuyCoin(state, action) {
			state.buy.coin = action.payload;
		},

		// time period
		setTimePeriod(state, action) {
			state.timePeriod.time = action.payload;
		},
		setRange(state, action) {
			state.timePeriod.range = action.payload;
		},

		// coin search
		setCoinSearchName(state, action) {
			state.coinSearch.dropName = action.payload;
		},
		setSearchList(state, action) {
			state.coinSearch.dropList = action.payload;
		},
	},
});

export default DropSlice.reducer;
export const {
	setCurrency,
	setSymbol,
	setCurrencyDropdownName,
	setCurrentCoin,
	setCryptoDropName,
	setTimePeriod,
	setCoinSearchName,
	setSearchList,
	setSellDropName,
	setSellList,
	setBuyDropName,
	setBuyList,
	setSellCoin,
	setBuyCoin,
	setRange,
	setCurrencyList,
	setCryptoList,
	setChartType,
	setPhoneMenuPath,
} = DropSlice.actions;
