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

const HabitDescription = ({ match }) => {
	const { _id } = match.params;
	return (
		<Query query={GET_HABIT} variables={{ _id }}>
			{({ data, loading, error }) => {
				if (loading) return <Loader />;
				const { getHabit } = data;
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
										<div>{getHabit.startDate}</div>
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
