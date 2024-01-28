import { useEffect, useRef, useState } from "react";
import "./Slot.css";
import { Wheel } from "react-custom-roulette";

function Slot({
	spin,
	setSpin,
	data,
	setData,
	winners,
	setActualWinners,
	numberOfWinners,
	winnerIndexes,
}) {
	const [prizeNumber, setPrizeNumber] = useState(-1);
	const [mustSpin, setMustSpin] = useState(false);
	const [ready, setReady] = useState(false);

	// const handleSpinClick = () => {
	// 	console.log(mustSpin, prizeNumber, numberOfWinners);
	// 	if (!mustSpin && prizeNumber < numberOfWinners) {
	// 		mustSpin = true;
	// 		const newPrizeNumber = prizeNumber + 1;
	// 		setPrizeNumber(newPrizeNumber);
	// 	}``
	// };

	useEffect(() => {
		console.log(mustSpin, "prize Number " + prizeNumber, numberOfWinners, winnerIndexes);
		if (spin && !mustSpin) { // make sure the last spin has completed and we are still supposed to be spinning
			if (prizeNumber+1 < numberOfWinners) {
				// spin again if we still have winners left to go through
				const newPrizeNumber = prizeNumber + 1;
				setPrizeNumber(newPrizeNumber);
				setReady(true);
			} else {
				setSpin(false);
				setReady(false);
				setPrizeNumber(-1);
				let tmpData = structuredClone(data)
				for (let i = 0; i < winners.length; i++){
					let rmIndex = tmpData.findIndex((num) => num === winners[i]);
					tmpData.splice(rmIndex, 1); 
				}
				setData(tmpData);
			}
		}
	}, [mustSpin, spin]);

	useEffect(() => {
		// this fires when prizeNumber changes
		if(ready){
			if(prizeNumber < numberOfWinners){
				setMustSpin(true);
			}
			else{
			}
	
		}
	}, [prizeNumber, ready])

	return (
		<>
			<Wheel
				style={{ width: "100rem", resize: "true" }}
				innerRadius={"5"}
				mustStartSpinning={mustSpin}
				prizeNumber={winnerIndexes[prizeNumber]}
				data={data.map((element) => ({
					option: element,
				}))}
				backgroundColors={["#3e3e3e", "#df3428"]}
				textColors={["#ffffff"]}
				startingOptionIndex={0}
				onStopSpinning={() => {
					setTimeout(() => {
						// if (prizeNumber < numberOfWinners){

						// }
						setActualWinners([...winners, data[winnerIndexes[prizeNumber]]])
						// remove the winner from the data list
						setMustSpin(false);
					}, 1000)
				}}
				spinDuration={0.3}
				fontSize={20}
				radiusLineWidth={0}
			/>
		</>
	);
}

export default Slot;
