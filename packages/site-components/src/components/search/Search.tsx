import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import useDebounce from '../../utils/hooks';
import { Dropdown } from 'antd';

const CANDIDATES_END_POINT = 'https://search.asktug.com/api/search/keyword-suggestions';
const href = (q_: string) => `https://search.asktug.com/?q=${encodeURIComponent(q_)}`;
const handle = (href_: string) => window.open(href_ ?? href, '_blank');

const Search = ({ style }: { style?: React.CSSProperties }): JSX.Element => {

  const [q, setQ] = useState('');


  const candidateQ = useDebounce(q, 500);
  const [candidates, setCandidates] = useState<string[]>([]);
  useEffect(() => {
    if (candidateQ)
      fetch(`${CANDIDATES_END_POINT}?q=${encodeURIComponent(candidateQ)}`)
        .then(data => data.json())
        .then(data => setCandidates(data.data));
    else setCandidates([]);
  }, [candidateQ]);

  useEffect(() => {
  }, [candidates]);


  return (
    <div id='ti-site-search-wrapper'>
      <Dropdown
        getPopupContainer={(_) => document.getElementById('ti-site-search-wrapper')!}
        overlayStyle={{ width: 370, zIndex: 99999 }} overlay={
        (candidates && candidates.length > 0) ?
          <ul className='ti-site-search-candidate-list'>
            {
              candidates.map(candidate => <li
                className='ti-site-search-candidate-item' key={candidate}
                onClick={(e) => {
                  e.preventDefault();
                  handle(href(candidate));
                }}>{candidate}</li>)
            }
          </ul> : <div />
      }

      >
        <div className='ti-site-search'>
          <input
            onBlur={() => {
              setTimeout(() => {
                setCandidates([]);
              }, 500);
            }}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder='找文档/帖子/文章'
            onKeyPress={e => e.key === 'Enter' && handle(href(q))}
          />
          <a href={href(q)} target='_blank' rel='noreferrer'
             className='ti-site-search-icon'>
            <SearchOutlined />
          </a></div>
      </Dropdown></div>);
};

Search.displayName = 'TiSiteSearch';

export default Search;
