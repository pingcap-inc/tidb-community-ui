import React, { useState } from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const Search = ({ style }: { style?: React.CSSProperties }): JSX.Element => {

  const [q, setQ] = useState('')

  const href = `https://search.asktug.com/blog?q=${encodeURIComponent(q)}`

  return (
    <Input.Group style={style} className='ti-site-search' compact>
      <Input
        className='ti-site-search__input'
        placeholder='全站搜索...'
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <a className="ant-btn ant-btn-primary ant-btn-sm" href={href}>
        <SearchOutlined />
      </a>
    </Input.Group>

  )
}

export default Search
