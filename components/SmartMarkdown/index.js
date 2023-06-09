import parse, { domToReact } from 'html-react-parser';
import Prism from 'components/Prism';
import ImageFigure from 'components/ImageFigure';
import Heading from 'components/Heading';
import { useMemo } from 'react';
import slugify from 'utils/slugify';
import getInnerText from 'utils/getInnerText';
import emojify from 'utils/emojify';

export default function SmartMarkdown({ children, imageClassName }) {
  const parseOptions = useMemo(
    () => ({
      replace: ({ type, name, data, attribs, children }) => {
        if (type === 'text') {
          return <>{emojify(data)}</>;
        }

        if (type === 'tag' && name.match(/^h[1-6]$/)) {
          const innerText = getInnerText(children);

          // posts cannot have more than 1 h1
          const newTag = name.match(/^h1$/) ? 'h2' : name;

          return (
            <a href={`#${innerText}`}>
              <Heading
                {...attribs}
                id={innerText}
                anchor={slugify(innerText)}
                as={newTag}
                data-with-anchor
              >
                {domToReact(children, parseOptions)}
              </Heading>
            </a>
          );
        }

        if (name === 'pre' && children[0].name === 'code') {
          const code = children[0];

          return (
            <Prism
              code={code.children[0].data.replace(/\n$/, '')}
              language={code.attribs.class || 'unknown'}
            />
          );
        }

        if (name === 'img') {
          const { src } = attribs;
          return (
            <ImageFigure
              imageClassName={imageClassName}
              data={{
                alt: attribs.alt,
                title: attribs.title,
                url: src,
                format: src.split('.').pop().split(/\#|\?/g)[0],
              }}
            />
          );
        }
      },
    }),
    [imageClassName],
  );

  return parse(children, parseOptions);
}
