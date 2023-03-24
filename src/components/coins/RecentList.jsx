import React from "react";
import { useAppSelector } from "../../store/storeAccess";
import CoinItem from "./CoinItem";

// This component displays a list of recently viewed coins
const RecentList = () => {
	// Retrieve the recentList and coins objects from the store
	const {recentList,coins}=useAppSelector()
	
	return (
		<div className="coinlist pb-4 h-5/6 overflow-scroll">
			{/* Check if coins are loaded */}
			{coins.isLoading === false ? (
				// Check if there are coins in the recentList
				recentList[0] ? (
					// If there are, map over the recentList array and render a CoinItem component for each coin
					recentList.map((item, index) => {
						return (
							<CoinItem
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
					// If there are no coins in the recentList, display a message to the user
					<div className="w-full h-full flex items-center justify-center">
						<span className=" px-10">you have not seen any coin recently</span>
					</div>
				)
			) : (
				// If coins are still loading, display a loading spinner
				<div className="w-full h-full flex justify-center items-center">
					<img className="w-28" src="https://i.gifer.com/yy3.gif" alt="" />
				</div>
			)}
		</div>
	);
};

export default RecentList;
