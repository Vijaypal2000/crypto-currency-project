import React from "react";
import { useDispatch } from "react-redux";

import { setBuyCoin, setBuyDropName } from "../../store/slices/DropSlice";
import { useAppSelector } from "../../store/storeAccess";

const BuyListItem = (props) => {
	const dispatch = useDispatch(); 
	const { name } = props; // extract the name from props
	const {theme} =useAppSelector() // select the theme from the store

	const handleClick = () => {
		dispatch(setBuyCoin(name)); // set the selected coin to buy in the store
		dispatch(setBuyDropName(name)); // set the name of the selected coin in the buy dropdown
	};
	
	return (
		// display the name of the coin in a div with a hover effect
		<div
			className={`p-2 ${
				theme === "dark"
					? "hover:bg-dropdownListItemDark"
					: "hover:bg-dropdownListItemLight"
			} `}
			onClick={handleClick}>
			{name}
		</div>
	);
};

export default BuyListItem;
