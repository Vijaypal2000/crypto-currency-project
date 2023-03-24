import React from "react";
import { useDispatch } from "react-redux";
import { BsCheck2Square } from "react-icons/bs";
import { BiSquareRounded } from "react-icons/bi";

import {
	setCryptoDropName
} from "../../store/slices/DropSlice";
import { interchangeChartItems, removeSecondItemChartList, setSecondItemChartList } from "../../store/slices/ChartSlice";
import { useAppSelector } from "../../store/storeAccess";
import { setAlert } from "../../store/slices/AlertSlice";


const CryptoItem = (props) => {
	const { name,id } = props; // Destructuring the 'name' and 'id' props passed from parent component

	const dispatch = useDispatch(); 
	const {theme,chartList,coins}=useAppSelector() // Accessing the 'theme', 'chartList', and 'coins' state values from Redux store using custom hook 'useAppSelector'
    
	let cryptofirstname=[]
    let cryptosecondname=[]
    
         coins.data.map((coin)=>{
            if(coin.id===chartList[0]) // If the 'id' of the coin in the 'coins' array matches the first element in 'chartList' array, add the coin to the 'cryptofirstname' array
            cryptofirstname.push(coin)
            return 0
        })

	// this function works on click and it changes the state of chartSlice 
	const handleClick = () => {
		// second item clicked        if second item already exist     then remove it 
		if(chartList[1]===id)
		{dispatch(removeSecondItemChartList())
			cryptosecondname[0]=undefined;
		}

		// first item clicked          add second item to first      then remove first 
		else if(chartList[0]===id && chartList[1]!==undefined){ 
			dispatch(interchangeChartItems())
			coins.data.map((coin) => {
				if (coin.id === chartList[1]) cryptofirstname[0]=coin;
				return 0;
			});
			dispatch(setCryptoDropName(cryptofirstname[0].name))
		}

		// second item does not exist   any item clicked          add second item    
		else if (chartList[1] === undefined && chartList[0]!==id) {
			dispatch(setSecondItemChartList(id));
			coins.data.map((coin) => {
				if (coin.id === id) {
					cryptosecondname.push(coin);
				}
				return 0;
			});
			dispatch(
				setCryptoDropName(
					`${cryptofirstname[0].name} ${
						cryptosecondname[0] ? `,${cryptosecondname[0].name}` : ""
					}`
				)
			);
		}

		else if (chartList[1] !== undefined && chartList[0] !== id) {
			dispatch(setSecondItemChartList(id));
			coins.data.map((coin) => {
				if (coin.id === id) {
					cryptosecondname.push(coin);
				}
				return 0;
			});
			dispatch(
				setCryptoDropName(
					`${cryptofirstname[0].name} ${
						cryptosecondname[0] ? `,${cryptosecondname[0].name}` : ""
					}`
				)
			); 

		} else {
			dispatch(
				setAlert({ type: "success", message: "Choose atleast one coin" })
			);
		}
		dispatch(
			setCryptoDropName(
				`${cryptofirstname[0].name} ${
					cryptosecondname[0] ? `,${cryptosecondname[0].name}` : ""
				}`
			)
		); 
	};
	
    
	

	return (
		<div
			className={`p-2 flex items-center gap-2 ${
				theme === "dark"
					? "hover:bg-dropdownListItemDark"
					: "hover:bg-dropdownListItemLight"
			} cursor-pointer`}
			onClick={handleClick}>
			{chartList.includes(id) ? <BsCheck2Square /> : <BiSquareRounded />}
			{name.charAt(0).toUpperCase().concat(name.slice(1))}
		</div>
	);
};

export default CryptoItem; 
