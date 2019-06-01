import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_HABIT } from "../../queries";
import { Segment, Comment, Dropdown } from "semantic-ui-react";
import Loader from "./../shered/Loader";
import HighchartsTheme from "./Highcharts/HighchartsTheme";
import options from "./Highcharts/options";
import moment from "moment";

Highcharts.setOptions(HighchartsTheme);

const Options = [
	{
		key: "days",
		text: "days",
		value: "days"
	},
	{
		key: "weeks",
		text: "weeks",
		value: "weeks"
	},
	{
		key: "months",
		text: "months",
		value: "months"
	}
];

const fromDateObjectToMoment = value => {
	return moment(value).format("YYYY-MM-DD");
};

// const createData =(data)=> {
// const {title,}
// 	title: "pikumin",
// 	subtitle: "pikumin",
// 	series: [
// 		{
// 			name: "John",
// 			data: [5, 3, 4, 7, 2]
// 		},
// 		{
// 			name: "Jane",
// 			data: [2, 2, 3, 2, 1]
// 		},
// 		{
// 			name: "Joe",
// 			data: [3, 4, 4, 2, 5]
// 		}
// 	]
// };

const HabitDescription = ({ match }) => {
	const { _id } = match.params;
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
							placeholder="Select Friend"
							fluid
							selection
							options={Options}
						/>
						<HighchartsReact highcharts={Highcharts} options={options} />
					</React.Fragment>
					//TODO:userCommentsの実装
				);
			}}
		</Query>
	);
};

export default withRouter(HabitDescription);
