import React from "react";
import { useDispatch } from "react-redux";
import { FaRegStar } from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";
import { addWatchItem, removeWatchItem } from "../../store/slices/WatchSlice";
import { setAlert } from "../../store/slices/AlertSlice";
import { useAppSelector } from "../../store/storeAccess";

const CoinDetail = () => {
	const dispatch = useDispatch();

	// Use the useAppSelector hook from react-redux to access the states from the store
	const { coins, chartList, currencySymbol, WatchList } = useAppSelector();

	// Store the WatchList array in local storage to persist data
	localStorage.setItem("watchlist", JSON.stringify(WatchList));

	let coinDetails;
	// Filter the coins.data array to get the details of the current coin
	if (coins.data[0] !== undefined) {
		coinDetails = coins.data.filter((item) => {
			return item.id === chartList[0];
		})[0];
	}
	
	// Check if the current coin is already present in the WatchList array
	let iconFilled = WatchList.filter((item) => {
		return item === coinDetails.name;
	})[0];

	// Function to add/remove current coin to/from the WatchList array and display an alert message
	const handleClick = () => {
		let found = WatchList.filter((item) => {
			return item === coinDetails.name;
		})[0];
		if (!found) {
			dispatch(addWatchItem(coinDetails.name));
			dispatch(
				setAlert({
					type: "success",
					message: `${coinDetails.name} added to watchlist`,
				})
			);
		} else {
			dispatch(removeWatchItem(coinDetails.name));
			dispatch(
				setAlert({
					type: "success",
					message: `${coinDetails.name} removed from watchlist`,
				})
			);
		}
	};
	// Render the UI for the CoinDetail component based on the isLoading and data properties of the coins object
	return (
		<>
			{coins.isLoading === false && coins.data[0] ? (
				<>
					<div className="flex items-center gap-3">
						<div className="w-8">
							<img src={coinDetails.image} alt="logo" />
						</div>
						<span className=" text-lg">{coinDetails.name}</span>

						{iconFilled ? (
							<span
								className="watchListIcon ml-auto w-5 text-lg"
								onClick={handleClick}>
								<BsFillStarFill />
							</span>
						) : (
							<span
								className="watchListIcon ml-auto w-5 text-lg "
								onClick={handleClick}>
								<FaRegStar />
							</span>
						)}
					</div>
					<div className="flex gap-3">
						<span>Symbol :</span>
						<span>{coinDetails.symbol}</span>
					</div>
					<div className="flex gap-3">
						<span>Current Price :</span>
						<span>
							{currencySymbol} {coinDetails.current_price}
						</span>
					</div>
					<div className="flex gap-3">
						<span>24h High :</span>
						<span>
							{currencySymbol} {coinDetails.high_24h}
						</span>
					</div>
					<div className="flex gap-3">
						<span>24h Low :</span>
						<span>
							{currencySymbol} {coinDetails.low_24h}
						</span>
					</div>
					<div className="flex items-center gap-3 text-base">
						<span>Rank:</span>
						<span>{coinDetails.market_cap_rank}</span>
					</div>
				</>
			) : (
				<div className="w-full h-full flex justify-center items-center">
					<img className="w-28" src="https://i.gifer.com/yy3.gif" alt="" />
				</div>
			)}
		</>
	);
};

export default CoinDetail;
