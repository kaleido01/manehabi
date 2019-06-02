import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_HABIT, GET_HABIT_RECORDS } from "../../queries";
import { Segment, Comment, Dropdown, Button } from "semantic-ui-react";
import Loader from "./../shered/Loader";
import HighchartsTheme from "./Highcharts/HighchartsTheme";
import options from "./Highcharts/options";
import moment from "moment";

Highcharts.setOptions(HighchartsTheme);

const Options = [
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

const fromDateObjectToMoment = value => {
	return moment(value).format("MM月DD日");
};

const createGraphData = (habitRecords, maxDays) => {
	const data = {};

	data.categories = habitRecords.map(record => {
		return fromDateObjectToMoment(+record.date);
	});

	data.firstData = habitRecords.map(record => {
		return record.today;
	});
	data.secondData = habitRecords.map(record => {
		return record.total - record.today;
	});

	return data;
};

const HabitDescription = ({ match }) => {
	const { _id } = match.params;
	const [days, setDays] = useState(7);

	console.log(days);

	return (
		<Query query={GET_HABIT} variables={{ _id }}>
			{({ data, loading, error }) => {
				if (loading) return <Loader />;
				const { getHabit } = data;
				// createDate(getHabit);
				return (
					<React.Fragment>
						<Segment>
							<Comment className="">
								<Comment.Avatar src={getHabit.creator.imageUrl} />
								<Comment.Content>
									<Comment.Author as="a">
										{getHabit.creator.username}
									</Comment.Author>
									<Comment.Metadata>
										<div>
											習慣スタートの日
											{moment(+getHabit.startDate).format(
												"YYYY-MM-DD,HH時mm分ss秒"
											)}
										</div>
										<div>
											この習慣を作った日
											{console.log(
												typeof +getHabit.startDate,
												typeof Date.now()
											)}
										</div>
										<div>
											更新リミットの日
											{moment(Date.now()).toString()}
										</div>
									</Comment.Metadata>
									<Comment.Text>{getHabit.title}</Comment.Text>
								</Comment.Content>
							</Comment>
						</Segment>
						<Dropdown
							selection
							onChange={(event, { value }) => setDays(value)}
							options={Options}
							value={days}
						/>
						<Query query={GET_HABIT_RECORDS} variables={{ _id, limit: days }}>
							{({ data, loading }) => {
								if (loading) return <div>loading</div>;
								const { getHabitRecords } = data;
								const optionData = createGraphData(getHabitRecords, days);
								console.log(optionData);
								return (
									<HighchartsReact
										highcharts={Highcharts}
										options={options(optionData)}
									/>
								);
							}}
						</Query>
					</React.Fragment>
					//TODO:userCommentsの実装
				);
			}}
		</Query>
	);
};

export default withRouter(HabitDescription);
