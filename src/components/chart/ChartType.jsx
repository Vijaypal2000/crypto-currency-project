import React from 'react'
import { useDispatch } from 'react-redux';
import { setChartType } from '../../store/slices/DropSlice';
import { useAppSelector } from '../../store/storeAccess';

const ChartType = (props) => {
	const dispatch=useDispatch()
	// Destructure the itemname prop from the props object
    const {itemname}=props

	// Use the useAppSelector hook from react-redux to access the theme state from the store
     const {theme} = useAppSelector()

	 // Define a handleClick function that will dispatch the setChartType action with the itemname argument
	const handleClick=(e)=>{
		dispatch(setChartType(itemname))
	}
	// Render a div element that will display the itemname prop value and respond to clicks by calling the handleClick function
  return (
		<div
			className={`p-2 ${
				theme === "dark"
					? "hover:bg-dropdownListItemDark"
					: "hover:bg-dropdownListItemLight"
			} cursor-pointer`}
			onClick={handleClick}>
			{itemname}
		</div>
	);
}
export default ChartType