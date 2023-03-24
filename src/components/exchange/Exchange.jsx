import React, { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useDispatch } from "react-redux";

import { setBuyDropName, setBuyList, setSellDropName, setSellList } from "../../store/slices/DropSlice";
import BuyListItem from "./BuyListItem";
import SellListItem from "./SellListItem";

const Exchange = React.memo(
	({
		theme,
		coins,
		sellDropName,
		sellList,
		sellCoin,
		buyDropName,
		buyList,
		buyCoin,
	}) => {

		const dispatch = useDispatch();

		// sell drop
		const showSellList = () => {
			document.getElementById("sellDropList").style.display = "flex";
		};
		const hideSellList = () => {
			document.getElementById("sellDropList").style.display = "none";
		};

		const handleSellClick = () => {
			const dropListState =
				document.getElementById("sellDropList").style.display;
			dropListState === "none" ? showSellList() : hideSellList();
		};
		const handleSellChange = (e) => {
			showSellList();
			dispatch(setSellDropName(e.target.value));
			let dummyList = coins.data.filter((element) => {
				return element.name
					.toLowerCase()
					.includes(e.target.value.toLowerCase());
			});
			// If no items match the user's search or the search field is empty, display all items in the dropdown
			!dummyList[0] || e.target.value === ""
				? dispatch(setSellList(coins.data))
				: dispatch(setSellList(dummyList));
		};

		// Update sell dropdown and buy dropdown items when the component first renders or when the list of coins in the store changes
		useEffect(() => {
			dispatch(setSellList(coins.data));
			dispatch(setBuyList(coins.data));
		}, [dispatch, coins.data]);

		// buy drop
		const showBuyList = () => {
			document.getElementById("buyDropList").style.display = "flex";
		};
		const hideBuyList = () => {
			document.getElementById("buyDropList").style.display = "none";
		};

		const handleBuyClick = () => {
			const dropListState =
				document.getElementById("buyDropList").style.display;
			dropListState === "none" ? showBuyList() : hideBuyList();
		};
		const handleBuyChange = (e) => {
			showBuyList();
			dispatch(setBuyDropName(e.target.value));
			let dummyList = coins.data.filter((element) => {
				return element.name
					.toLowerCase()
					.includes(e.target.value.toLowerCase());
			});
			!dummyList[0] || e.target.value === ""
				? dispatch(setBuyList(coins.data))
				: dispatch(setBuyList(dummyList));
		};

		// enter value
		const [buyValue, setBuyValue] = useState(0);
		const [sellValue, setSellValue] = useState(0);
		const handleExchangeClick = () => {
			let sell = coins.data.filter((item) => {
				return item.name === sellCoin;
			});

			let buy = coins.data.filter((item) => {
				return item.name === buyCoin;
			});

			setBuyValue((sell[0].current_price * sellValue) / buy[0].current_price);
			console.log(buyValue);
		};
		const handleSellValueChange = (e) => {
			setSellValue(e.target.value);
		};
		return (
			<>
				{/* Title  */}
				<div className=" w-full h-1/6 flex items-center">
					<div className="ml-4 text-lg font-bold mb-1">
						{" "}
						Exchange coins
					</div>
				</div>
				{/* Title  */}

				{/* dropdowns  */}
				<div className=" flex justify-evenly">
					{/* Sell */}
					<div className="flex flex-col gap-2 w-2/6 min-w-ex">
						<h1 className=" text-red-600">Sell</h1>
						<div
							className={`dropdown ${
								theme === "dark"
									? " bg-dropdownBoxDark"
									: " bg-dropdownBoxLight"
							} ${
								theme === "dark" ? " text-textLight" : "text-textDark"
							} p-1 items-center flex rounded-lg`}>
							<input
								className=" w-4/5 pl-1 bg-transparent outline-none  "
								type="text"
								value={sellDropName}
								onFocus={showSellList}
								onChange={handleSellChange}
							/>
							<span
								className=" h-8 flex items-center justify-center"
								onClick={handleSellClick}>
								<MdArrowDropDown size={30} />
							</span>
							<div
								id="sellDropList"
								className={`sellDroplist overflow-x-hidden droplist absolute ${
									theme === "dark"
										? " bg-dropdownBoxDark"
										: " bg-dropdownBoxLight"
								} translate-y-24 w-32 h-28 flex-col rounded overflow-scroll`}
								style={{ display: "none" }}
								onMouseLeave={hideSellList}
								onClick={handleSellClick}>
								{sellList.map((item) => {
									return <SellListItem key={item.name} name={item.name} />;
								})}
							</div>
						</div>
					</div>

					{/* Buy */}
					<div className="flex flex-col gap-2 w-2/6 min-w-ex">
						<h1 className=" text-green-500">Buy</h1>
						<div
							className={`${
								theme === "dark"
									? "dropdown bg-dropdownBoxDark"
									: " bg-dropdownBoxLight"
							} ${
								theme === "dark" ? " text-textLight" : "text-textDark"
							} p-1 items-center flex rounded-lg`}>
							<input
								className=" w-4/5 pl-1 bg-transparent outline-none  "
								type="text"
								value={buyDropName}
								onFocus={showBuyList}
								onChange={handleBuyChange}
							/>
							<span
								className=" h-8 flex items-center justify-center"
								onClick={handleBuyClick}>
								<MdArrowDropDown size={30} />
							</span>
							<div
								id="buyDropList"
								className={`buyDroplist droplist overflow-x-hidden absolute ${
									theme === "dark"
										? " bg-dropdownBoxDark"
										: " bg-dropdownBoxLight"
								} translate-y-24 w-32 h-28 flex-col rounded overflow-scroll`}
								style={{ display: "none" }}
								onMouseLeave={hideBuyList}
								onClick={handleBuyClick}>
								{buyList.map((item) => {
									return <BuyListItem key={item.name} name={item.name} />;
								})}
							</div>
						</div>
					</div>
				</div>
				{/* dropdowns  */}

				{/* showing values */}
				<div className="flex justify-evenly w-full ">
					{/* Enter value  */}
					<div className="flex flex-col gap-2 w-2/6 min-w-ex">
						<span className="  text-xs">Enter Value</span>
						<input
							className="outline-none bg-transparent"
							type="text"
							placeholder="Avl:0"
							value={sellValue}
							onChange={handleSellValueChange}
						/>
					</div>
					{/* Buy vaule  */}
					<div className="flex flex-col gap-2 w-2/6 min-w-ex">
						<span className=" w-full text-xs">Buy</span>
						<span>
							{buyValue.toFixed(3)} {buyCoin}s
						</span>
					</div>
				</div>
				{/* showing values */}

				{/* Exchange Button  */}
				<div className="w-full flex items-center justify-center">
					<button
						className={`exchangeBtn ${
							theme === "dark" ? "bg-exchBtnDark" : "bg-exchBtnLight"
						}  p-3 py-2 rounded-md `}
						onClick={handleExchangeClick}>
						Exchange
					</button>
				</div>
				{/* Exchange Button  */}
			</>
		);
	}
);

export default Exchange;
