import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import highlighter from 'keyword-highlighter';
import cn from 'classnames';
import parse from 'html-react-parser';
import wretch from 'wretch';
import { buildClient } from '@datocms/cma-client-browser';
import s from './style.module.css';

const search = async (query) => {
  const { data } = await client.searchResults.rawList(query);
  return data;
};

export default function DocSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  let client;

  useEffect(() => {
    client = buildClient({ apiToken: 'c84d1aee3930503d15d76e70cf91e0' });
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);

      search({
        filter: {
          fuzzy: 'true',
          query: debouncedSearchTerm,
          build_trigger_id: '11100',
        },
        page: {
          limit: 20,
          offset: 0,
        },
      }).then((results) => {
        setIsSearching(false);
        setResults(results.map((r) => r.attributes));
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div
        className={cn(s.overlay, { [s.visible]: !!searchTerm })}
        onClick={() => setSearchTerm('')}
      />
      <div className={cn(s.searchResults, { [s.visible]: !!searchTerm })}>
        {isSearching && (
          <div className={s.spinning}>
            <div />
            <div />
          </div>
        )}
        <ul className={s.results}>
          {results.map((result) => (
            <li key={result.url} className={s.result}>
              <a href={result.url}>
                <div className={s.resultTitle}>
                  {parse((result.title || '').replace(/ - DatoCMS$/, ''))}{' '}
                </div>
                {result.body && (
                  <div
                    className={s.resultBody}
                    dangerouslySetInnerHTML={{ __html: result.body }}
                  />
                )}
                <div
                  className={s.resultUrl}
                  dangerouslySetInnerHTML={{
                    __html: highlighter(searchTerm || '', result.url),
                  }}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <form className={s.formSearch}>
        <input
          name="query"
          type="search"
          placeholder="Search in the docs and community..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </>
  );
}
