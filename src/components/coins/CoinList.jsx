import React from "react";

import { useAppSelector } from "../../store/storeAccess";
import CoinItem from './CoinItem'


const CoinList = () => {

	// Use the useAppSelector hook to extract the searchList and coins state
	const {searchList,coins}=useAppSelector()
	return (
		// Render a div that displays the searchList of coins or a loading spinner
		<div className="coinlist pb-4 h-5/6 overflow-scroll">
			{coins.isLoading === false ? (
				searchList.map((item, index) => {
					return (
						// Render the CoinItem component and pass in props
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
				<div className="w-full h-full flex justify-center items-center">
					<img className="w-28" src="https://i.gifer.com/yy3.gif" alt="" />
				</div>
			)}
		</div>
	);
};

export default CoinList;
