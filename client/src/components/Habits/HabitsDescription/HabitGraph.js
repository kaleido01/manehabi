import React, { Fragment } from "react";

import { Dropdown } from "semantic-ui-react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsTheme from "./Highcharts/HighchartsTheme";
import options from "./Highcharts/options";

import moment from "moment";
import NoData from "./NoData";

Highcharts.setOptions(HighchartsTheme);

const dayOptions = [
	{
		key: 1,
		text: "過去7日間",
		value: 7
	},
	{
		key: 2,
		text: "過去28日間",
		value: 28
	},
	{
		key: 3,
		text: "過去3か月間",
		value: 90
	}
];

const createGraphData = (habitRecords, maxDays, unit = "分") => {
	const data = {};
	if (habitRecords.length === 0) {
		return data;
	}
	const categories = [];
	const firstData = [];
	const secondData = [];

	data.yTitle = unit;

	let count = 0;

	for (let j = 0; j < maxDays; j++) {
		let recordDay;
		let today;
		let total;
		if (count === habitRecords.length) {
			const lastIndex = habitRecords.length - 1;
			recordDay = moment(+habitRecords[lastIndex].date).format("YYYY-MM-DD");
			today = habitRecords[lastIndex].today;
			total = habitRecords[lastIndex].total + today;
		} else {
			recordDay = moment(+habitRecords[count].date).format("YYYY-MM-DD");
			today = habitRecords[count].today;
			total = habitRecords[count].total;
		}

		const day = moment()
			.add(-maxDays + j + 1, "days")
			.format("YYYY-MM-DD");
		categories.push(day);
		if (String(recordDay) === String(day)) {
			firstData.push(today);
			secondData.push(total - today);
			count++;
		} else {
			firstData.push(0);
			secondData.push(total - today);
		}
	}

	data.categories = categories;
	data.firstData = firstData;
	data.secondData = secondData;

	return data;
};

const HabitGraph = ({ days, setDays, records, habit }) => {
	const optionData = createGraphData(records, days);
	if (optionData) {
		optionData.title = habit.title;
	}
	return records.length === 0 ? (
		<NoData />
	) : (
		<Fragment>
			<Dropdown
				selection
				onChange={({ value }) => setDays(value)}
				options={dayOptions}
				value={days}
				style={{ margin: "1em 0" }}
			/>

			<HighchartsReact highcharts={Highcharts} options={options(optionData)} />
		</Fragment>
	);
};

export default HabitGraph;
