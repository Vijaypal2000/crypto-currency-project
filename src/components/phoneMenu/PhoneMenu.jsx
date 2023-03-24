import React from "react";
import PhoneMenuItem from "./PhoneMenuItem";
import { useAppSelector } from "../../store/storeAccess";

const PhoneMenu = () => {
	//getting access of states from store 
	const {theme,phoneMenuItems}=useAppSelector()
	return (
		<div
			className={` shadow-phoneMenu flex h-14 w-screen justify-evenly ${
				theme === "dark" ? "bg-phoneMenuDark" : "bg-phoneMenuLight"
			} ${theme === "dark" ? " text-textLight" : "text-textDark"}`} style={{zIndex:'500'}}>
			{phoneMenuItems.map((item) => {
				return (
					<PhoneMenuItem
						key={item.itemName} 
						name={item.itemName} 
						icon={item.icon} 
					/>
				);
			})}
		</div>
	);
};

export default PhoneMenu;
