import { OpenInNew, Star } from '@mui/icons-material';
import { Chip, Link, Stack, Typography } from '@mui/material';
import { useGetRepositoryByIdQuery } from '@/api/generated/githubApi';
import { ErrorMessage } from './ErrorMessage';
import { Loader } from './Loader';

/** Repository info component props */
export interface RepositoryInfoProps {
  /** ID of the node to show. Must point to a repository node */
  id: string;
}

/** Component that fetches and displays repository info by node id */
export function RepositoryInfo({ id }: RepositoryInfoProps) {
  const { data, isFetching, isError } = useGetRepositoryByIdQuery({ id });

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (data?.node?.__typename !== 'Repository') {
    return null;
  }

  const { url, name, primaryLanguage, stargazerCount, repositoryTopics, description, licenseInfo } = data.node;

  return (
    <Stack gap={3}>
      <Stack gap={2}>
        <Stack gap={1} direction="row" alignItems="center">
          <Typography variant="h4">{name}</Typography>

          {typeof url === 'string'
            ? (
                <Link href={url} variant="h4" title="Open on GitHub" target="_blank" rel="noopener">
                  <OpenInNew />
                </Link>
              )
            : null}
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {primaryLanguage?.name ? <Chip label={primaryLanguage.name} color="secondary" /> : null}

          <Stack direction="row" gap={1} alignItems="center">
            <Star htmlColor="#FFB400" />

            <Typography variant="body2">{stargazerCount}</Typography>
          </Stack>
        </Stack>

        {repositoryTopics.nodes?.length
          ? (
              <Stack direction="row" gap={1} flexWrap="wrap">
                {repositoryTopics.nodes.map((node) => {
                  return node ? <Chip key={node?.topic.id} label={node?.topic.name} size="small" /> : null;
                })}
              </Stack>
            )
          : null}
      </Stack>

      {description ? <Typography variant="body2">{description}</Typography> : null}

      {licenseInfo?.name ? <Typography variant="body2">{licenseInfo.name}</Typography> : null}
    </Stack>
  );
}
