import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import DatoCmsSearch from 'datocms-search/dist/datocms-search.base';
import highlighter from 'keyword-highlighter';
import cn from 'classnames';
import parse from 'html-react-parser';

import s from './style.module.css';

const client = new DatoCmsSearch('c84d1aee3930503d15d76e70cf91e0');

const search = async (query) => {
  const [{ results: docs }] = await Promise.all([client.search(query)]);

  return docs;
};

export default function DocSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);

      search(debouncedSearchTerm).then((results) => {
        setIsSearching(false);
        setResults(results);
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
          placeholder="Search in the registry..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </>
  );
}
