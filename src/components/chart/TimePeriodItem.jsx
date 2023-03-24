import React from "react";
import { useDispatch} from "react-redux";

import { setRange, setTimePeriod } from "../../store/slices/DropSlice";
import { useAppSelector } from "../../store/storeAccess";

const TimePeriodItem = (props) => {
	const { timePeriod } = props;
	// Destructure the props and get necessary values from the store using the useAppSelector hook
	const {theme,chartRange}=useAppSelector()

    // Create a dispatch variable using the useDispatch hook
	const dispatch = useDispatch();
	const handleClick = (e) => {
		
		// Set the time period based on the timePeriod prop passed to the component
		let time;
		switch (timePeriod) {
			case "1D":
				time = 1;
				break;
			case "1W":
				time = 7;
				break;
			case "1M":
				time = 31;
				break;
			case "6M":
				time = 182;
				break;
			case "1Y":
				time = 365;
				break;
			default:
				time = 1;
				break;
		}

		// Dispatch an action to set the time period and chart range in the store
		dispatch(setTimePeriod(time));
		dispatch(setRange(timePeriod));
	};
	return (
		<div
			className={`timePeriodItem flex justify-center items-center ${
				timePeriod === chartRange
					? theme === "dark"
						? "bg-activeTimePeriodDark"
						: "bg-activeTimePeriodLight"
					: theme === "dark"
					? " bg-timePeriodDark"
					: " bg-timePeriodLight"
			} rounded w-11 h-9 cursor-pointer`}
			onClick={handleClick}>
			{timePeriod}
		</div>
	);
};

export default TimePeriodItem;
