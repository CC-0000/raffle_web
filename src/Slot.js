import { useEffect, useRef, useState } from "react";
import "./Slot.css";
import { Wheel } from "react-custom-roulette";

function Slot({
	spin,
	setSpin,
	data,
	winners,
	numberOfWinners,
	winnerIndexes,
}) {
	const [prizeNumber, setPrizeNumber] = useState(-1);
	const pNum = useRef(-1);
	const [mustSpin, setMustSpin] = useState(false);

	const handleSpinClick = () => {
		console.log(mustSpin, prizeNumber, numberOfWinners);
		if (!mustSpin && prizeNumber < numberOfWinners) {
			mustSpin = true;
			const newPrizeNumber = prizeNumber + 1;
			setPrizeNumber(newPrizeNumber);
		}
	};

	useEffect(() => {
		console.log(mustSpin, "prize Number " + prizeNumber, numberOfWinners);
		if (spin && !mustSpin) {
			if (prizeNumber + 1 < numberOfWinners) {
				// spin again if we still have winners left to go through
				const newPrizeNumber = prizeNumber + 1;
				setPrizeNumber(newPrizeNumber);

				setTimeout(() => {
					setMustSpin(true);
				}, 1000);
			} else {
				setSpin(false);
				setTimeout(() => {
					setPrizeNumber(0);
				}, 1000);
			}
		}
	}, [mustSpin, spin]);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<>
			<Wheel
				style={{ width: "100rem", resize: "true" }}
				innerRadius={"5"}
				mustStartSpinning={mustSpin}
				prizeNumber={2}
				data={data.map((element) => ({
					option: element,
				}))}
				backgroundColors={["#3e3e3e", "#df3428"]}
				textColors={["#ffffff"]}
				startingOptionIndex={0}
				onStopSpinning={() => {
					setMustSpin(false);
				}}
				spinDuration={0.1}
			/>
		</>
	);
}

export default Slot;
