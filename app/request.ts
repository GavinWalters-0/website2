import { GraphQLClient } from 'graphql-request';

const host = `${process.env.NEXT_PUBLIC_STRAPI_HOSTNAME}:${process.env.NEXT_PUBLIC_STRAPI_PORT}`;

const endpoint = `${process.env['NODE_ENV'] === 'production' ? 'https' : 'http'}://${host}/graphql`;
const client = new GraphQLClient(endpoint, {
	headers: {
		Authorization: process.env.STRAPI_TOKEN
			? `Bearer ${process.env.STRAPI_TOKEN}`
			: '',
	},
});

export default client;
