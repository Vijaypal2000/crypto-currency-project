import React from "react";

import { useAppSelector } from "../../store/storeAccess";
import CoinItem from "./CoinItem";

const WatchList = () => {
	const { WatchList, coins } = useAppSelector(); // Destructuring WatchList and coins data from the store using the custom hook

	let watchlistData = []; // Initialize an empty array to store watchlisted coin data

	// Loop through each item in the watchlist
	WatchList.map((item) => {
		for (const element of coins.data) {
			if (element.name === item) watchlistData.push(element); // If the coin matches the watchlist item, add it to the watchlistData array
		}
		return 0;
	});

	return (
		<div className="coinlist pb-4 h-5/6 overflow-scroll">
			{coins.isLoading === false ? (
				WatchList[0] ? ( // Check if the watchlist is not empty
					watchlistData.map((item, index) => {
						// Map through each coin in the watchlistData array
						return (
							<CoinItem // Render the CoinItem child component and pass in the coin data as props
								key={index}
								id={item.id}
								name={item.name}
								current_price={item.current_price}
								market_cap_change_percentage_24h={
									item.market_cap_change_percentage_24h
								}
								image={item.image}
								symbol={item.symbol}
							/>
						);
					})
				) : (
					// If the watchlist is empty, display a message
					<div className="w-full h-full flex items-center justify-center">
						<span className=" px-10">there is no coin in your watchlist</span>
					</div>
				)
			) : (
				// If the coins data is still loading, display a loading animation
				<div className="w-full h-full flex justify-center items-center">
					<img className="w-28" src="https://i.gifer.com/yy3.gif" alt="" />
				</div>
			)}
		</div>
	);
};

export default WatchList;
