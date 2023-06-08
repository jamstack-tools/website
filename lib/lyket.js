import gql from 'graphql-tag';
import tiny from 'tiny-json-http';

export async function rankLikeButtonsByNamespace({ namespace }) {
  const url = namespace
    ? `https://api.lyket.dev/v1/rank/like-buttons/${namespace}?limit=500`
    : 'https://api.lyket.dev/v1/rank/like-buttons?limit=500';

  const { body } = await tiny.get({
    url,
    headers: {
      authorization: 'Bearer 61c4a1dcda3a15f0cbda981fc44e3c',
    },
  });

  if (body.errors) {
    throw body.errors;
  }

  return body;
}
