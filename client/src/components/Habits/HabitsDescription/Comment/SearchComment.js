import React, { useContext, useState } from "react";
import { Form, Radio, Grid, Segment, Search } from "semantic-ui-react";
import { UserContext } from "./../../../../index";
import _ from "lodash";

const SearchComment = ({
	descending,
	setDescending,
	user,
	setUser,
	searchTerm,
	setSearchTerm
}) => {
	const currentUser = useContext(UserContext);
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
							onSearchChange={_.debounce(handleSearchChange, 3000, {
								leading: true
							})}
							value={searchTerm}
						/>
					</Grid.Column>
					<Grid.Column width={8}>
						<Segment>
							<Form.Field>
								<Radio
									label="古い順"
									name="descending"
									value="1"
									checked={descending === "1"}
									onChange={(e, { value }) => setDescending(value)}
								/>
							</Form.Field>
							<Form.Field>
								<Radio
									label="新しい順"
									name="descending"
									value="-1"
									defaultChecked
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
									label="全て"
									name="user"
									value="all"
									defaultChecked
									checked={user === "all"}
									onChange={(e, { value }) => setUser(value)}
								/>
							</Form.Field>
							<Form.Field>
								<Radio
									label="自分だけ"
									name="user"
									value="user"
									disabled={!currentUser}
									checked={user === "user"}
									onChange={(e, { value }) => setUser(value)}
								/>
							</Form.Field>
							<Form.Field>
								<Radio
									label="他人だけ"
									name="user"
									value="other"
									disabled={!currentUser}
									checked={user === "other"}
									onChange={(e, { value }) => setUser(value)}
								/>
							</Form.Field>
						</Segment>
					</Grid.Column>
				</Grid>
			</Segment>
		</Form>
	);
};

export default SearchComment;
