module.exports = {
	service: {
		localSchemaFile: "./typeDefs.graphql"
	}
};

module.exports = {
	client: {
		service: {
			name: "localhost",
			localSchemaFile: "./typeDefs.graphql"
		},
		skipSSLValidation: true,
		excludes: ["node_modules/**/*", "./client/node_modules/**/*"],
		includes: ["./client/src/**/*.{ts,gql,tsx,js,jsx,graphql}"]
	}
};
