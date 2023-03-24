import React, { useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch} from "react-redux";

import { getChartData } from "../../api";
import { setCryptoDropName, setCryptoList } from "../../store/slices/DropSlice";
import { setChartReload } from "../../store/slices/ChartSlice";

import ChartType from "./ChartType";
import CoinDetail from "./CoinDetail";
import CryptoItem from "./CryptoItem";
import CurrencyDrop from "./CurrencyDrop";
import LineChart from "./LineChart";
import TimePeriodItem from "./TimePeriodItem";
import HorizontalBarChart from "./HorizontalBarChart";
import VerticalBarChart from "./VerticalBarChart";
import { useAppSelector } from "../../store/storeAccess";

const Chart = React.memo(
	({
		theme,
		coins,
		currentChartType,
		cryptoDropName,
		cryptoList,
		chartType,
		chartDisplay,
		chartList,
		timePeriod,
		currency,
		timePeriodList,
		chart,
		chartReload,
	}) => {

		const {chartTypeList}=useAppSelector();
		const dispatch = useDispatch();

		useEffect(() => {
			dispatch(setCryptoList(coins.data));
		}, [dispatch, coins.data]);

		// all crypto dropdown functions 
		const showCryptoList = () => {
			document.getElementById("cryptoDroplist").style.display = "flex";
		};
		const hideCryptoList = () => {
			document.getElementById("cryptoDroplist").style.display = "none";
		};

		const handleCryptoClick = () => {
			const dropListState =
				document.getElementById("cryptoDroplist").style.display;
			dropListState === "none" ? showCryptoList() : hideCryptoList();
		};
		const handleCryptoFocus = () => {
			showCryptoList();
		};
		const handleCryptoChange = (e) => {
			handleCryptoFocus();
			dispatch(setCryptoDropName(e.target.value));
			let dummyList = coins.data.filter((element) => {
				return element.name
					.toLowerCase()
					.includes(e.target.value.toLowerCase());
			});
			!dummyList[0] || e.target.value === ""
				? dispatch(setCryptoList(coins.data))
				: dispatch(setCryptoList(dummyList));
		};

		//  all chartType dropdown functions
		const showChartList = () => {
			document.getElementById("chartTypeDroplist").style.display = "flex";
		};
		const hideChartList = () => {
			document.getElementById("chartTypeDroplist").style.display = "none";
		};
		const handleChartClick = () => {
			const dropListState =
				document.getElementById("chartTypeDroplist").style.display;
			dropListState === "none" ? showChartList() : hideChartList();
		};

		// fetching chartdata from coingecko api
		useEffect(() => {
			if (chartReload === true)
				dispatch(getChartData({ chartList, timePeriod, currency }));
			else dispatch(setChartReload(true));
			// eslint-disable-next-line
		}, [dispatch, chartList, timePeriod, currency]);

		return (
			<>
				{/* Currency Dropdown  */}
				<div className=" col-span-2 flex justify-start items-center gap-2">
					<CurrencyDrop theme={theme} />
				</div>
				{/* Currency Dropdown  */}

				{/* timePeriod  */}
				<div className="lg:flex md:hidden sm:hidden min-w-fit col-span-3 justify-end items-center gap-3">
					{timePeriodList.map((item, index) => {
						return <TimePeriodItem key={index} timePeriod={item.timePeriod} />;
					})}
				</div>
				<div className="lg:hidden md:flex sm:hidden col-span-1 col-start-9 row-start-2 flex-col row-span-5  justify-center items-center gap-3">
					{timePeriodList.map((item, index) => {
						return <TimePeriodItem key={index} timePeriod={item.timePeriod} />;
					})}
				</div>
				<div className="lg:hidden md:hidden sm:flex h-auto col-span-9 col-start-1 row-start-6 justify-center items-center gap-4">
					{timePeriodList.map((item, index) => {
						return <TimePeriodItem key={index} timePeriod={item.timePeriod} />;
					})}
				</div>
				{/* timePeriod  */}

				<div className=" lg:col-span-4 md:col-span-7 sm:col-span-6 sm:col-start-4 flex items-center justify-end gap-4 lg:w-4/5 justify-self-end md:w-auto sm:gap-1 lg:gap-4">
					{/* crypto dropdown */}
					<div
						className={`dropdown flex items-center justify-between  lg:w-44 md:w-44 lg:p-2 md:p-2 sm:p-1 sm:w-28 ${
							theme === "dark" ? " bg-dropdownBoxDark" : " bg-dropdownBoxLight"
						} ${
							theme === "dark" ? " text-textLight" : "text-textDark"
						}  lg:rounded md:rounded sm:rounded`}>
						<input
							type="text"
							className="drop-input w-4/5 lg:px-1 md:px-1 sm:px-1 bg-transparent focus:outline-none "
							value={cryptoDropName}
							onChange={handleCryptoChange}
							onFocus={handleCryptoFocus}
						/>
						<span
							className="w-1/5 sm:w-5 flex justify-center items-center text-2xl cursor-pointer"
							onClick={handleCryptoClick}>
							<IoMdArrowDropdown />
						</span>

						<div
							id="cryptoDroplist"
							className={`droplist absolute ${
								theme === "dark"
									? " bg-dropdownBoxDark"
									: " bg-dropdownBoxLight"
							}  -translate-x-1 translate-y-32 w-40 h-48 flex-col rounded overflow-scroll overflow-x-hidden`}
							style={{ display: "none" }}
							onMouseLeave={hideCryptoList}
							onClick={handleCryptoClick}>
							{cryptoList.map((item) => {
								return (
									<CryptoItem key={item.name} id={item.id} name={item.name} />
								);
							})}
						</div>
					</div>
					{/* crypto dropdown */}

					{/* chartType dropdown  */}
					<div
						className={` dropdown flex items-center justify-between  lg:w-24 md:w-24 sm:w-20 lg:p-2 md:p-2 sm:p-1 ${
							theme === "dark" ? " bg-dropdownBoxDark" : " bg-dropdownBoxLight"
						}  lg:rounded md:rounded sm:rounded`}>
						<div
							className={`drop-input w-3/5 sm:px-1 bg-transparent focus:outline-none`}>
							{chartType}
						</div>
						<span
							className="lg:w-5 sm:w-5 flex justify-center items-center text-2xl cursor-pointer"
							onClick={showChartList}>
							<IoMdArrowDropdown />
						</span>

						<div
							id="chartTypeDroplist"
							className={`droplist absolute ${
								theme === "dark"
									? " bg-dropdownBoxDark"
									: " bg-dropdownBoxLight"
							} -translate-x-1 translate-y-20 w-20 h-24 flex-col rounded overflow-scroll`}
							style={{ display: "none" }}
							onMouseLeave={hideChartList}
							onClick={handleChartClick}>
							{chartTypeList.map((item) => {
								return (
									<ChartType key={item.itemname} itemname={item.itemname} />
								);
							})}
						</div>
					</div>
					{/* chartType dropdown  */}
				</div>

				{/* chart  */}
				<div className=" flex w-full justify-between gap-4 col-span-9 md:col-span-8 sm:row-start-2 sm:col-start-1 sm:row-span-4 lg:col-span-9 md:row-span-5 ">
					<div
						className={`coinDetails lg:min-w-250 md:min-w-250 sm:w-full lg:w-auto md:w-auto flex-col gap-2 p-4 h-full ${
							theme !== "dark"
								? "bg-coinDetailsLight text-textDark"
								: "bg-coinDetailsDark text-textLight"
						} rounded-md text-sm shadow-coinDetails lg:flex md:flex sm:${
							chartDisplay === "flex" ? "hidden" : "flex"
						}`}>
						{<CoinDetail />}
					</div>
					{chart.all.isLoading === false ? (
						coins.data[0] && (
							<div
								className={`LineChart h-full lg:w-3/4 md:w-3/4 lg:min-w-20 md:min-w-20 sm:w-full sm:${chartDisplay}`}>
								{/* <LineChart /> */}
								{/* <VerticalBarChart /> */}
								{currentChartType === "Line" && <LineChart />}
								{currentChartType === "Bar" && <VerticalBarChart />}
								{currentChartType === "Hor..Bar" && <HorizontalBarChart />}
							</div>
						)
					) : (
						<div
							className={`w-full h-full ${chartDisplay} justify-center items-center`}>
							<img className="w-28" src="https://i.gifer.com/yy3.gif" alt="" />
						</div>
					)}
				</div>
				{/* chart  */}
			</>
		);
	}
);

export default Chart;
