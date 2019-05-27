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
	query getAllHabits {
		getAllHabits {
			_id
			title
			description
			countDate
			startDate
			creator {
				username
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
