import DownArrow from "./icons/arrow-circle-down.svg";
import { Button, Textarea } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import structuredClone from "@ungap/structured-clone";
import SlotCounter from "react-slot-counter";
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";
import "./App.css";
import React, { useEffect } from "react";
import Slot from "./Slot";

function App() {
	let [rawTextValue, setRawTextValue] = React.useState("");
	let [listOfNames, setListOfNames] = React.useState([""]);
	let [actualWinners, setActualWinners] = React.useState([]);
	let [winnerIndexes, setWinnerIndexes] = React.useState([]);
	const [numberOfWinners, setNumberOfWinners] = React.useState(1);

	const [spin, setSpin] = React.useState(false);

	let handleInputChange = (e) => {
		let inputValue = e.target.value;
		setRawTextValue(inputValue);
		let tmpArray = inputValue.split("\n");
		tmpArray = tmpArray.filter((item) => item != "");
		if (tmpArray.length > 0) {
			setListOfNames(tmpArray);
		}
	};

	function shuffle(inArray) {
		let array = structuredClone(inArray);

		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex > 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	}

	function startSpin() {
		if (listOfNames.length < numberOfWinners) {
			return;
		}

		setActualWinners([]);

		let indexer = [...Array(listOfNames.length).keys()];
		indexer = shuffle(indexer);

		let tmpWinners = [];
		for (let i = 0; i < numberOfWinners; i++) {
			tmpWinners.push(indexer[i]);
		}
		setWinnerIndexes(tmpWinners);
		setSpin(true);
	}

	function scrollToMid() {
		let e = document.getElementById("section2");
		e.scrollIntoView({
			block: "start",
			behavior: "smooth",
			inline: "start",
		});
	}

	function scrollToBottom() {
		let e = document.getElementById("section3");
		e.scrollIntoView({
			block: "start",
			behavior: "smooth",
			inline: "start",
		});
	}

	useEffect(() => {
		console.log(listOfNames);
	}, [listOfNames]);

	return (
		<>
			<div class="mainBodyWrapper">
				<div class="titleArea">
					<h1 class="title barlow">Raffle Web</h1>
					<p class="subtitle">
						An simplistic prize selection website with multi-winner support
					</p>
				</div>
				<div onClick={scrollToMid}>
					<img src={DownArrow} alt="down arrow" />
				</div>
				<div class="inputSection" id="section2">
					<div class="names">
						<Textarea
							value={rawTextValue}
							onChange={handleInputChange}
							placeholder="Enter names (1 per row)"
							resize={"None"}
							fontSize={"1.5rem"}
							width={"75%"}
							outline={"None"}
							borderColor={"#E6C200"}
							borderWidth={"0.2rem"}
							borderRadius={"1.5%"}
						></Textarea>
					</div>
					<div class="settings"></div>
				</div>
				<div onClick={scrollToBottom}>
					<img src={DownArrow} alt="down arrow" />
				</div>
				<div class="spacer"></div>
				<div class="wheelSection" id="section3">
					<div class="buttonSection">
						<ChakraProvider>
							<Button
								fontFamily={"Barlow"}
								fontSize={"2rem"}
								margin={"100%"}
								borderRadius={"10rem"}
								height={"8rem"}
								width={"8rem"}
								colorScheme="yellow"
								variant="solid"
								onClick={() => {
									startSpin();
								}}
								isLoading={spin}
							>
								Spin
							</Button>
						</ChakraProvider>
					</div>

					<Slot
						spin={spin}
						setSpin={setSpin}
						data={listOfNames}
						winners={actualWinners}
						setActualWinners={setActualWinners}
						winnerIndexes={winnerIndexes}
						numberOfWinners={numberOfWinners}
						setData={setListOfNames}
					/>
					<div class="winners">
						<h2 class="winnerText barlowfont">Number of Winners: </h2>
						<div class="selector">
							<NumberInput
								onChange={(value) => setNumberOfWinners(value)}
								value={numberOfWinners}
								height={"2rem"}
								defaultValue={1}
								min={1}
								max={20}
								size="lg"
							>
								<NumberInputField
									height={"2.4rem"}
									borderWidth={"0.2rem"}
									borderColor={"#E6C200"}
									borderRadius={"1.5%"}
									fontSize={"1.5rem"}
								/>
								<NumberInputStepper marginTop={"6px"}>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</div>
					</div>

					<div class="winnerList">
						{actualWinners.map((oneWinner) => (
							<SlotCounter value={oneWinner} />
						))}
					</div>
				</div>
				<div class="footer">
					<div style={{ height: "1.4rem" }}></div>
					<div class="footerInside">
						<p class="footerContent">© 2024</p>
						<p class="footerContent">a 小杜 creation</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
