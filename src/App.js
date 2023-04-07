import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCoins } from "./api";
import { Chart, Coins, Exchange, Portfolio } from "./components";
import { BrowserRouter } from "react-router-dom";
import Alert from "./components/alert/Alert";
import PhoneMenu from "./components/phoneMenu/PhoneMenu";
import { setWatchList } from "./store/slices/WatchSlice";
import { useAppSelector } from "./store/storeAccess";

const App = () => {
	const {
		currency,
		currencySymbol,
		PieItem,
		theme,
		coins,
		sellDropName,
		sellList,
		sellCoin,
		buyDropName,
		buyList,
		buyCoin,
		coinSearchName,
		currentChartType,
		cryptoDropName,
		cryptoList,
		chartType,
		chartDisplay,
		firstchartitem,
		secondchartitem,
		timePeriod,
		timePeriodList,
		chart,
		chartReload,
	} = useAppSelector();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCoins(currency));
	}, [dispatch, currency]);

	useEffect(() => {
		let watchlist = JSON.parse(localStorage.getItem("watchlist"));
		if (watchlist) dispatch(setWatchList(watchlist));
	}, [dispatch]);

	return (
		<>
			<BrowserRouter>
				{/*lg for pc*/}
				{/* md for tablet */}
				{/* sm for phone */}
				<div
					className="lg:dashboard grid lg:grid-rows-dashPc lg:grid-cols-dashPc lg:p-4 lg:content-center lg:justify-center lg:w-auto lg:h-screen lg:overflow-hidden lg:gap-1 lg:grid-flow-col lg:bg-dashboard
			 md:dashboard  md:grid-rows-dashTab md:grid-cols-dashTab md:p-0 md:w-full md:h-auto md:gap-1 md:grid-flow-col md:bg-dropdownBoxDark md:overflow-x-hidden  
			 sm:dashboard   sm:grid-rows-dashMob sm:grid-cols-dashMob sm:p-0 sm:w-full sm:h-98vh sm:overflow-scroll sm:gap-0 sm:grid-flow-col sm:text-sm lg:text-base md:text-base sm:bg-sky-300">
					{/* menu for phone size  */}
					<div className="sm:flex lg:hidden md:hidden fixed bottom-0">
						<PhoneMenu />
					</div>
					<Alert />
					{/* this is the chart component  */}
					<div
						id="chart"
						className={` z-0 grid row-span-1 lg:col-span-2 lg:min-w-600 lg:rounded-lg lg:grid-rows-6 lg:grid-cols-9 lg:grid-flow-row lg:gap-2  lg:pt-2 lg:p-5 
					md:col-span-2 md:grid-rows-6 md:grid-cols-9 md:grid-flow-row md:gap-2 md:pt-2 md:p-5   
					sm:col-start-1 sm:row-start-1 sm:col-span-1 sm:grid-rows-6 sm:grid-cols-9 sm:grid-flow-row sm:gap-1 sm:pt-2 sm:p-3 
					${theme === "dark" ? "bg-boxDark" : "bg-boxLight"} 
					${theme === "dark" ? " text-textLight" : " text-textDark"}`}>
						<Chart
							theme={theme}
							coins={coins}
							currentChartType={currentChartType}
							cryptoDropName={cryptoDropName}
							cryptoList={cryptoList}
							chartType={chartType}
							chartDisplay={chartDisplay}
							firstchartitem={firstchartitem}
							secondchartitem={secondchartitem}
							timePeriod={timePeriod}
							currency={currency}
							timePeriodList={timePeriodList}
							chart={chart}
							chartReload={chartReload}
						/>
					</div>
					{/* this is the portfolio component  */}
					<div
						id="portfolio"
						className={` lg:row-span-1 lg:col-span-1 lg:p-4 lg:min-w-fit lg:rounded-lg lg:grid lg:grid-rows-6 lg:grid-cols-1 lg:gap-1  
					md:row-span-1 md:col-span-1 md:p-4 md:grid md:grid-rows-6 md:grid-cols-1 md:gap-1  
					sm:col-start-1 sm:row-start-1 sm:p-4 sm:w-full sm:grid sm:grid-rows-6 sm:grid-cols-1 sm:gap-1 
					${theme === "dark" ? "bg-boxDark" : "bg-boxLight"} 
					${theme === "dark" ? " text-textLight" : " text-textDark"}`}>
						<Portfolio
							currencySymbol={currencySymbol}
							PieItem={PieItem}
							coins={coins}
						/>
					</div>
					{/* this is the exchange component  */}
					<div
						id="exchange-coins"
						className={`w-full justify-between p-4 pb-9 lg:row-span-1  lg:flex lg:flex-col lg:col-span-1 lg:min-w-fit lg:rounded-lg
					md:row-span-1  md:flex md:flex-col  md:col-span-1 md:min-w-fit 
					sm:col-start-1 sm:row-start-1  sm:flex sm:flex-col  sm:col-span-1   
					${theme === "dark" ? "bg-boxDark" : "bg-boxLight"}
					${theme === "dark" ? " text-textLight" : " text-textDark"}`}>
						<Exchange
							theme={theme}
							coins={coins}
							sellDropName={sellDropName}
							sellList={sellList}
							sellCoin={sellCoin}
							buyDropName={buyDropName}
							buyList={buyList}
							buyCoin={buyCoin}
						/>
					</div>
					{/* this is the coins component  */}
					<div
						id="coins"
						className={` lg:col-span-1 lg:row-span-2 lg:min-w-300 lg:w-full lg:rounded-lg 
					md:row-span-2 md:col-span-1 
					sm:row-span-1 sm:col-span-1 sm:border-t-2 sm:border-y-coinsBorder
					${theme === "dark" ? "bg-boxDark" : "bg-boxLight"} 
					${theme === "dark" ? " text-textLight" : " text-textDark"}`}>
						<Coins coinSearchName={coinSearchName} coins={coins} />
					</div>
				</div>
			</BrowserRouter>
		</>
	);
};

export default App;
