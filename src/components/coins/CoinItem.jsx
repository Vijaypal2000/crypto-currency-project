import React from "react"; // import React and necessary components
import { useDispatch } from "react-redux";

import { setFirstItemChartList } from "../../store/slices/ChartSlice";
import { addPieItem } from "../../store/slices/PieItemSlice";
import {
	setCryptoDropName
} from "../../store/slices/DropSlice";
import {
	addRecentCoin,
	removeRecentCoin,
} from "../../store/slices/RecentSlice";
import { useAppSelector } from "../../store/storeAccess";

const CoinItem = (props) => { 
	const dispatch = useDispatch();
	const {currencySymbol,coins,recentList,chartList}=useAppSelector(); // retrieve the state variables from the Redux store
	const {
		name,
		current_price,
		market_cap_change_percentage_24h,
		image,
		symbol,
		id,
	} = props;  // retrieve data from the props object passed to the component

	const market_cap_change_percentage_24h_toString = `${market_cap_change_percentage_24h}`;

	let cryptofirstname = []; 
	let cryptosecondname = [];

	// this function adds the pie chart data and sets chartlist 
	const aboutItem = (e) => { 
		dispatch(addPieItem(name)); // dispatch an action to add a pie item with the given name
		coins.data.map((coin) => { // loop through the coins data to find the first crypto name
			if (coin.id === id) cryptofirstname.push(coin);
			else if (coin.id === chartList[1]) {
				cryptosecondname.push(coin);
			}
			return 0;
		});
		dispatch(
			setCryptoDropName(
				`${cryptofirstname[0].name} ${cryptosecondname[0]?`,${cryptosecondname[0].name}`:""}`
			)
		);// dispatch an action to set the crypto drop name with the names of the two cryptocurrencies
		dispatch(setFirstItemChartList(id));

		// recent item 
		let recentItem = coins.data.filter((item) => {
			return item.name === name;
		});
		let coinIndex = recentList.indexOf(recentItem[0]); // get the index of the most recent item in the recent list
		if (coinIndex === -1) dispatch(addRecentCoin(recentItem[0])); // if the item is not in the list, add it
		else {
			dispatch(removeRecentCoin(recentItem[0])); // if the item is in the list, remove it first
			dispatch(addRecentCoin(recentItem[0])); // then add it back to the beginning of the list
		}
	};

	return (
		<>
			<div
				className="coinItem  cursor-pointer w-full h-auto py-4 px-6 flex justify-between"
				data-tracker={name}
				onClick={aboutItem}>
				{/* coin details  */}
				<div className="flex items-center gap-4">
					{/* coin image  */}
					<div className=" h-8 w-8 ">
						<img className="object-contain" src={image} alt="coinimg " />
					</div>
					{/* coin name and symbol  */}
					<div>
						<div className=" coinName text-md">{name}</div>
						<div className="flex items-center gap-1 text-phoneSpan">
							<span>{symbol}</span>
						</div>
					</div>
				</div>
				{/* coin details  */}

				{/* coin value and changes  */}
				<div className={`flex flex-col items-end`}>
					{/* coin value  */}
					<div>{`${currencySymbol} ${current_price}`}</div>
					{/* changes  */}
					<div
						className={
							market_cap_change_percentage_24h_toString.slice(0, 1) === "-"
								? ` text-red-500`
								: ` text-green-500`
						}>
						{market_cap_change_percentage_24h_toString.slice(0, 1) === "-"
							? ` ${market_cap_change_percentage_24h_toString} %`
							: `${"+".concat(market_cap_change_percentage_24h_toString)} %`}
					</div>
				</div>
				{/* coin value and changes  */}
			</div>
		</>
	);
};

export default CoinItem;
