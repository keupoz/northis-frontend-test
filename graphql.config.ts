import type { IGraphQLConfig } from 'graphql-config';
import { configDotenv } from 'dotenv';
import { env } from 'node:process';

configDotenv();

const config: IGraphQLConfig = {
  schema: {
    'https://api.github.com/graphql': {
      headers: {
        'User-Agent': 'GraphQL-LSP',
        'Authorization': `Token ${env.VITE_GITHUB_TOKEN}`,
      },
    },
  },
  documents: 'src/api/documents/**/*.graphql',
};

export default config;
