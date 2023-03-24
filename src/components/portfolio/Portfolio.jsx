import React from 'react'

import PieChart from './PieChart';

const Portfolio = React.memo(({ currencySymbol, PieItem, coins }) => {

	let tv = 0;

	// If coins array is not empty, loop through PieItem array
	coins.data[0] &&
		PieItem.map((item) => {
			// Find the corresponding coin data from the coins array

			let found = coins.data.find(function (element) {
				return element.name === item;
			});
			// Add the current price of the coin to the total value
			tv = tv + found.current_price;
			return 0;
		});
	return (
		<>
			<div className="flex justify-between items-center row-span-1 ">
				<div className="ml-4 text-lg font-bold">Portfolio</div>
				<div>
					Total Value : {currencySymbol} {Math.floor(tv)}
				</div>
			</div>
			<div className=" row-span-5 md:mr-12 lg:mr-0">
				{coins.data[0] && <PieChart />}
			</div>
		</>
	);
});

export default Portfolio