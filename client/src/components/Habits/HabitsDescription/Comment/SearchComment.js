import React, { useContext } from "react";
import { Form, Radio, Grid, Segment } from "semantic-ui-react";
import { UserContext } from "./../../../../index";

const SearchComment = ({ descending, setDescending, user, setUser }) => {
	const currentUser = useContext(UserContext);
	return (
		<Form>
			<Segment>
				<Form.Field>検索条件の設定</Form.Field>
				<Grid>
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
