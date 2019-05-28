import { gql } from "apollo-boost";

export const CREATE_HABIT = gql`
	mutation createHabit($title: String!, $description: String!) {
		createHabit(title: $title, description: $description) {
			title
			description
		}
	}
`;
export const DELETE_HABIT = gql`
	mutation deleteHabit($_id: ID!) {
		deleteHabit(_id: $_id) {
			_id
		}
	}
`;

export const GET_CURRENT_USER = gql`
	query getCurrentUser {
		getCurrentUser {
			_id
			username
			email
		}
	}
`;

export const GET_ALL_HABITS = gql`
	query getAllHabits($offset: Int, $limit: Int) {
		getAllHabits(offset: $offset, limit: $limit) {
			habits {
				_id
				title
				description
				countDate
				startDate
				creator {
					_id
					username
					imageUrl
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
			}
		}
	}
`;
export const GET_USER_HABITS = gql`
	query getUserHabits($offset: Int, $limit: Int) {
		getUserHabits(offset: $offset, limit: $limit) {
			habits {
				_id
				title
				description
				countDate
				startDate
				creator {
					_id
					username
					imageUrl
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
			}
		}
	}
`;
export const GET_HABIT = gql`
	query getHabit($_id: ID!) {
		getHabit(_id: $_id) {
			_id
			title
			description
			countDate
			startDate
			creator {
				_id
				username
				imageUrl
			}
		}
	}
`;

export const CREATE_USER = gql`
	mutation createUser($username: String!, $email: String!, $password: String!) {
		createUser(username: $username, email: $email, password: $password) {
			token
		}
	}
`;

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;
