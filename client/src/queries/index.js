import { gql } from "apollo-boost";

export const CREATE_HABIT = gql`
	mutation createHabit($title: String!, $description: String!) {
		createHabit(title: $title, description: $description) {
			title
			description
		}
	}
`;

export const GET_CURRENT_USER = gql`
	query getCurrentUser {
		getCurrentUser {
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
