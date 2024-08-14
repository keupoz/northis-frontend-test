import type { CodegenConfig } from '@graphql-codegen/cli';
import graphqlConfig from './graphql.config';

const config: CodegenConfig = {
  ...graphqlConfig,
  generates: {
    './src/api/generated/githubApi.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-rtk-query',
      ],
      config: {
        importBaseApiFrom: '../baseGithubApi',
        importBaseApiAlternateName: 'baseGithubApi',
        exportHooks: true,
      },
    },
  },
};

export default config;
