import React, { useContext, useEffect, useState } from 'react';
import {SearchOutlined} from '@ant-design/icons'
import useDebounce from '../../utils/hooks';
import { Dropdown, Menu } from 'antd';
const CANDIDATES_END_POINT = 'https://search.asktug.com/api/search/keyword-suggestions'

const Search = ({style}: { style?: React.CSSProperties }): JSX.Element => {

  const [q, setQ] = useState('')

  const href = `https://search.asktug.com/?q=${encodeURIComponent(q)}`

  const candidateQ  = useDebounce(q, 500)
  const [candidates, setCandidates] = useState<string[]>([])
  useEffect(() => {
    if (candidateQ)
         fetch(`${CANDIDATES_END_POINT}?q=${encodeURIComponent(candidateQ)}`)
           .then(data => data.json())
           .then(data => setCandidates(data.data))
    else setCandidates([])
  }, [candidateQ])

  useEffect(() => {
  }, [candidates])

  const handle = () => window.open(href, '_blank')

  return (
    <Dropdown overlayStyle={{width: 370}} overlay={
      (candidates && candidates.length > 0 ) ? <Menu>
        {
          candidates.map(candidate => <Menu.Item key={candidate} onClick={() => {setQ(candidate); handle()}}>{candidate}</Menu.Item>)
        }
      </Menu> : <div/>
    }
    >
      <div className='ti-site-search'>
      <input
        onBlur={() => setCandidates([])}
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder='找文档/帖子/文章'
        onKeyPress={e => e.key === 'Enter' && handle()}
      />
      <a href={href} target='_blank' rel='noreferrer' className='ti-site-search-icon'>
        <SearchOutlined />
      </a></div>
    </Dropdown>)
}

Search.displayName = 'TiSiteSearch'

export default Search
