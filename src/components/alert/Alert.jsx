import React, { useEffect } from "react";
import { useAppSelector } from "../../store/storeAccess";

const Alert = () => {
	// Using useAppSelector custom hook to extract alert and theme state variables from the redux store
	const {alert,theme} = useAppSelector()

	// useEffect hook to add and remove a class to display/hide the alert box
	useEffect(() => {
		if (alert.message !== "") {
			setTimeout(() => {
				document
					.getElementsByClassName("alert")[0]
					.classList.add("-translate-x-72");
			}, 4500);
			document
				.getElementsByClassName("alert")[0]
				.classList.remove("-translate-x-72");
		}
	},[alert]);

	return (
		<div
			className={`alert fixed w-60 h-auto p-4 bottom-8 left-4 -translate-x-72 rounded z-20 transition-all ${
				alert.type === "warning"
					? theme === "dark"
						? "bg-alertWarningDark"
						: "bg-alertWarningLight"
					: theme === "dark"
					? "bg-alertSuccessDark"
					: "bg-alertSuccessLight"
			}  ${theme === "dark" ? "text-textLight" : "text-textDark"}`}>
			{alert.message}
		</div>
	);
};

export default Alert;
