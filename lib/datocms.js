import gql from 'graphql-tag';
import tiny from 'tiny-json-http';

export async function request({ query, variables, preview }) {
  const { body } = await tiny.post({
    url: `https://graphql.datocms.com${preview ? '/preview' : '/'}`,
    headers: {
      authorization: 'Bearer d9b1b26eca0d85626f24c1ac2f8cff',
    },
    data: {
      query: query.loc && query.loc.source.body,
      variables,
    },
  });

  if (body.errors) {
    throw body.errors;
  }

  return body;
}

export function gqlStaticPaths(query, paramName, dataToParams) {
  return async () => {
    const { data } = await request({ query });

    const s = {
      fallback: false,
      paths: dataToParams(data).map((param) => ({
        params: {
          [paramName]: Array.isArray(param) ? param : param.toString(),
        },
      })),
    };

    return s;
  };
}

export function gqlStaticProps(query, paramsToVars, dataToProps) {
  return async ({ params, preview }) => {
    const variables =
      typeof paramsToVars === 'function' ? await paramsToVars(params) : params;

    const { data } = await request({
      query,
      variables,
      preview,
    });

    const returnValue = {
      props:
        typeof dataToProps === 'function'
          ? {
              ...dataToProps(data, { params, variables }),
              preview: preview ? true : false,
            }
          : { ...data, preview: preview ? true : false },
    };

    return returnValue;
  };
}

export const imageFields = gql`
  fragment imageFields on ResponsiveImage {
    aspectRatio
    base64
    height
    sizes
    src
    srcSet
    webpSrcSet
    width
    alt
    title
  }
`;

export const seoMetaTagsFields = gql`
  fragment seoMetaTagsFields on Tag {
    attributes
    content
    tag
  }
`;

export const reviewFields = gql`
  fragment reviewFields on ReviewRecord {
    name
    role
    quote(markdown: true)
    image {
      responsiveImage(imgixParams: { w: 150, h: 150, fit: crop, crop: faces }) {
        ...imageFields
      }
    }
  }
`;
