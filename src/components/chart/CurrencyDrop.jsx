import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";

import CurrencyItem from "./CurrencyItem";
import { currencies } from "../../assets"; // Importing the list of currencies
import {
	setCurrencyDropdownName,
	setCurrencyList,
} from "../../store/slices/DropSlice"; // Importing Redux actions
import { useAppSelector } from "../../store/storeAccess";

const CurrencyDrop = (props) => {
	const { theme } = props;

	const dispatch = useDispatch();
	const { currencyList, currencyDropName } = useAppSelector(); // Extracting state from Redux store using the custom hook

	useEffect(() => {
		dispatch(setCurrencyList(currencies)); // Initializing the list of currencies in the Redux store
		// eslint-disable-next-line
	}, []);

	// below are the function for crypto dropdown
	const hideList = () => {
		document.getElementById("currencyDroplist").style.display = "none"; // Hiding the currency dropdown list
	};
	const showList = () => {
		document.getElementById("currencyDroplist").style.display = "flex"; // Showing the currency dropdown list
	};

	const handleClick = () => {
		const dropListState =
			document.getElementById("currencyDroplist").style.display;
		dropListState === "none" ? showList() : hideList(); // Toggling the visibility of the currency dropdown list
	};

	const handleChange = (e) => {
		dispatch(setCurrencyDropdownName(e.target.value)); // Updating the dropdown name in the Redux store
		let dummyList = currencies.filter((element) => {
			return element.currency
				.toLowerCase()
				.includes(e.target.value.toLowerCase()); // Filtering the list of currencies based on user input
		});
		!dummyList[0] || e.target.value === ""
			? dispatch(setCurrencyList(currencies)) // If no matching currencies found or input is empty, reset the currency list in Redux store
			: dispatch(setCurrencyList(dummyList)); // Else, update the currency list in the Redux store with the filtered list
	};

	const handleFocus = (e) => {
		showList(); // Showing the currency dropdown list on input focus
		dispatch(setCurrencyDropdownName(e.target.value)); // Updating the dropdown name in the Redux store
	};

	return (
		<div
			className={`dropdown flex col-span-2 justify-between  md:p-2 lg:p-2 sm:p-1 h-auto lg:rounded md:rounded sm:rounded ${
				theme === "dark" ? " bg-dropdownBoxDark" : " bg-dropdownBoxLight"
			} ${theme === "dark" ? " text-textLight" : "text-textDark"}`}>
			<input
				type="text"
				className="drop-input sm:px-1  lg:w-24 sm:w-16 md:w-24 bg-transparent focus:outline-none "
				value={currencyDropName}
				onChange={handleChange}
				onFocus={handleFocus}
			/>
			<span
				className="sm:w-5 flex justify-center items-center text-2xl cursor-pointer"
				onClick={handleClick}>
				<IoMdArrowDropdown />
			</span>
			<div
				id="currencyDroplist"
				className={`droplist absolute -translate-x-1 translate-y-12 ${
					theme === "dark" ? "bg-dropdownBoxDark" : "bg-dropdownBoxLight"
				}  w-28 h-48 flex-col rounded overflow-scroll`}
				style={{ display: "none" }}
				onMouseLeave={hideList}
				onClick={handleClick}>
				{currencyList
					? currencyList.map((item) => {
							return (
								<CurrencyItem
									key={item.currency}
									currency={item.currency}
									symbol={item.symbol}
								/>
							);
					  })
					: "loading..."}
			</div>
		</div>
	);
};

export default CurrencyDrop;
