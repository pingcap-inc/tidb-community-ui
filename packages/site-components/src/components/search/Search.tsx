import React, {useState} from 'react'
import {SearchOutlined} from '@ant-design/icons'

const Search = ({style}: { style?: React.CSSProperties }): JSX.Element => {

  const [q, setQ] = useState('')

  const href = `https://search.asktug.com/?q=${encodeURIComponent(q)}`

  const handle = () => {
    window.open(href, '_blank')
  }

  return (
    <div className='ti-site-search'>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder='找文档/帖子/文章'
        onKeyPress={e => e.key === 'Enter' && handle()}
      />
      <a href={href} target='_blank' rel='noreferrer' className='ti-site-search-icon'>
        <SearchOutlined />
      </a>
    </div>
  )
}

Search.displayName = 'TiSiteSearch'

export default Search
