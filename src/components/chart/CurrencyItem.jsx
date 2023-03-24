import React from "react";
import { useDispatch } from "react-redux";

import {
	setCurrency,
	setCurrencyDropdownName,
	setSymbol,
} from "../../store/slices/DropSlice";
import { useAppSelector } from "../../store/storeAccess";

const CurrencyItem = (props) => {
	const { theme } = useAppSelector(); // select the theme from the store

	const dispatch = useDispatch(); // create a dispatch function to update the store
	const { currency, symbol } = props; // extract currency and symbol from props
	const handleClick = (e) => {
		dispatch(setSymbol(symbol)); // set the symbol in the store
		dispatch(setCurrency(currency)); // set the currency in the store
		dispatch(setCurrencyDropdownName(e.target.innerHTML)); // set the currency dropdown name in the store
	};
	return (
		// display the currency and symbol in a div
		<div
			className={`p-2 w-full cursor-pointer ${
				theme === "dark"
					? "hover:bg-dropdownListItemDark"
					: "hover:bg-dropdownListItemLight"
			} `}
			onClick={handleClick}>
			{currency.charAt(0).toUpperCase().concat(currency.slice(1))}{" "}
			{`(${symbol})`}
		</div>
	);
};

export default CurrencyItem;
