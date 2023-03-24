
import { useSelector } from "react-redux";

// This custom hook is named useAppSelector and it uses the useSelector hook from the react-redux library to select and return parts of the state.
export const useAppSelector = () => {
	// Here, the state is destructured to obtain the necessary parts.
	// The state object has a property called 'drop', which has nested objects and arrays.
	// These nested objects and arrays contain properties that are needed by the component that uses this hook.
	const {
		drop: {
			currency: {
				currency,
				symbol: currencySymbol,
				dropList: currencyList,
				dropName: currencyDropName,
			},
			crypto: { dropName: cryptoDropName, dropList: cryptoList, currentCoin },
			chartType: { dropName: chartType, currentChartType ,chartTypeList},
			timePeriod: { time: timePeriod, range: chartRange, timePeriodList },
			sell: { dropName: sellDropName, dropList: sellList, coin: sellCoin },
			buy: { dropName: buyDropName, dropList: buyList, coin: buyCoin },
			coinSearch: { dropName: coinSearchName, dropList: searchList },
			phoneMenu: { phoneMenuList: phoneMenuItems, path: phoneMenuPath },
		},
		alert,
		theme,
		chart: { chartList,reload:chartReload },
		coins,
		phone: { chartDisplay },
		watch: { list: WatchList },
		recent: recentList,
		pieItem: PieItem,
	} = useSelector((state) => state);

	// Another way of selecting a specific property from the state is by calling useSelector and passing in a function that returns the desired property. 
	// Here, the chart object is selected from the state.
    const chart= useSelector(state=>state.chart)
    
	// These variables are assigned values from the first two items in the chartList array.

		// The parts of the state that are needed by the component that uses this hook are returned as an object.
	return {
		currency,
		alert,
		theme,
		currentChartType,
		cryptoDropName,
		cryptoList,
		chartType,
		chartDisplay,
		timePeriod,
		currentCoin,
		timePeriodList,
		chart,
		coins,
		chartTypeList,
		currencySymbol,
		WatchList,
		currencyList,
		currencyDropName,
		chartRange,
		recentList,
		chartList,
		searchList,
		coinSearchName,
		sellDropName,
		sellList,
		sellCoin,
		buyDropName,
		buyList,
		buyCoin,
		phoneMenuItems,
		phoneMenuPath,
		PieItem,
		chartReload,
	};
};
