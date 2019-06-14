import React, { useContext, useState } from "react";
import { Form, Radio, Grid, Segment, Search } from "semantic-ui-react";
import _ from "lodash";

const SearchHabits = ({
	descending,
	setDescending,
	option,
	setOption,
	searchTerm,
	setSearchTerm
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleSearchChange = (e, { value }) => {
		setIsLoading(true);

		setSearchTerm(value);
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	};
	return (
		<Form>
			<Segment>
				<Form.Field>検索条件の設定</Form.Field>
				<Grid>
					<Grid.Column width={16}>
						<Search
							loading={isLoading}
							showNoResults={false}
							onSearchChange={_.debounce(handleSearchChange, 10000, {
								trailing: true,
								leading: true
							})}
							value={searchTerm}
						/>
					</Grid.Column>
					<Grid.Column width={8}>
						<Segment>
							<Form.Field>
								<Radio
									label="昇順"
									name="descending"
									value="1"
									checked={descending === "1"}
									onChange={(e, { value }) => setDescending(value)}
								/>
							</Form.Field>
							<Form.Field>
								<Radio
									label="降順"
									name="descending"
									value="-1"
									checked={descending === "-1"}
									onChange={(e, { value }) => setDescending(value)}
								/>
							</Form.Field>
						</Segment>
					</Grid.Column>
					<Grid.Column width={8}>
						<Segment>
							<Form.Field>
								<Radio
									label="スター数"
									name="option"
									value="starUser"
									checked={option === "starUser"}
									onChange={(e, { value }) => setOption(value)}
								/>
							</Form.Field>

							<Form.Field>
								<Radio
									label="作成した日付"
									name="option"
									value="createdAt"
									checked={option === "createdAt"}
									onChange={(e, { value }) => setOption(value)}
								/>
							</Form.Field>

							<Form.Field>
								<Radio
									label="挫折回数"
									name="option"
									value="numberOfFailure"
									checked={option === "numberOfFailure"}
									onChange={(e, { value }) => setOption(value)}
								/>
							</Form.Field>

							<Form.Field>
								<Radio
									label="継続日数"
									name="option"
									value="countDate"
									checked={option === "countDate"}
									onChange={(e, { value }) => setOption(value)}
								/>
							</Form.Field>

							<Form.Field>
								<Radio
									label="更新日"
									name="option"
									value="updateDate"
									checked={option === "updateDate"}
									onChange={(e, { value }) => setOption(value)}
								/>
							</Form.Field>
						</Segment>
					</Grid.Column>
				</Grid>
			</Segment>
		</Form>
	);
};

export default SearchHabits;
