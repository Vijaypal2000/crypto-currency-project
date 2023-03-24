import React from "react";
import { useDispatch } from "react-redux";
import { setPhoneMenuPath } from "../../store/slices/DropSlice";
import { setChartDisplay } from "../../store/slices/PhoneSlice";
import { useAppSelector } from "../../store/storeAccess";

const PhoneMenuItem = (props) => {
	// Destructure props to get name and icon
	const { name, icon } = props;
	// Get theme and phoneMenuPath from Redux store using useAppSelector hook
	const {theme,phoneMenuPath}=useAppSelector()
	// Get dispatch function from Redux store using useDispatch hook
	const dispatch = useDispatch();

    // Function to handle click event on phone menu item
	const item_show = (e) => {
		// Dispatch action to update phoneMenuPath in Redux store
		dispatch(setPhoneMenuPath(name));

        // Conditionally update z-index and display of elements based on name of phone menu item clicked
		if (name === "Markets") {
			document.querySelector("#exchange-coins").style.zIndex = "-10";
			document.querySelector("#portfolio").style.zIndex = "-10";
			document
				.querySelector(".coinDetails")
				.classList.replace("sm:hidden", "sm:flex");
			document
				.querySelector(".LineChart")
				.classList.replace("sm:flex", "sm:hidden");
			dispatch(setChartDisplay('hidden'))
		} else if (name === "Home") {
			document.querySelector("#exchange-coins").style.zIndex = "-10";
			document.querySelector("#portfolio").style.zIndex = "-10";
			document
			.querySelector(".coinDetails")
			.classList.replace("sm:flex", "sm:hidden");
			document
			.querySelector(".LineChart")
			.classList.replace("sm:hidden", "sm:flex");
			dispatch(setChartDisplay('flex'))
		} else if (name === "Exchange") {
			document.querySelector("#exchange-coins").style.zIndex = "90";
			document.querySelector("#portfolio").style.zIndex = "-10";
		} else {
			document.querySelector("#exchange-coins").style.zIndex = "-10";
			document.querySelector("#portfolio").style.zIndex = "90";
		}
	};
	// Render the phone menu item
	return (
		<div
			className={`phoneMenu__item flex flex-col items-center justify-center ${
				// Conditionally add class based on whether this item is currently selected or not
				name === phoneMenuPath
					? theme === "dark"
						? "text-textActivePhoneMenuLight"
						: "text-textActivePhoneMenuDark"
					: theme === "dark"
					? " text-textLight"
					: " text-textDark"
			}`}
			onClick={item_show}>
			<div className="text-xl phoneMenu__item__icon-home">{icon}</div>
			<span className=" text-phoneSpan">{name}</span>
		</div>
	);
};
// Export the PhoneMenuItem component as the default export
export default PhoneMenuItem;
