import React, {useEffect, useState} from "react"
import classNames from "classnames"

import './CategoryList.less'
import axios from "axios";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  //items: ICategoryItem[]
}

export interface ICategoryItem {
  id: number // 30022,
  name: string // "🪐 TiDB",
  color: string // "25AAE2",
  description: string // TiDB、TiKV、TiFlash、PD 等核心组件和监控组件如 Dashboard、Grafana、Prometheus、Alert Manager 等问题
}

export interface ICategoryItemColor {
  backgroundColor: string
  borderColor: string
}

const colors: ICategoryItemColor[] = [
  {backgroundColor: '#FFFBFB', borderColor: 'linear-gradient(96.8deg, rgba(255, 107, 0, 0.5) -0.96%, rgba(199, 2, 2, 0.5) 101.3%)'},
  {backgroundColor: '#FFFBF9', borderColor: 'linear-gradient(96.8deg, rgba(255, 184, 0, 0.5) -0.96%, rgba(255, 141, 141, 0.5) 101.3%)'},
  {backgroundColor: '#FFFFF5', borderColor: 'linear-gradient(96.8deg, rgba(189, 255, 0, 0.5) -0.96%, rgba(199, 191, 2, 0.5) 101.3%)'},
  {backgroundColor: '#F9F8FF', borderColor: 'linear-gradient(96.8deg, rgba(144, 0, 168, 0.5) -0.96%, rgba(0, 89, 222, 0.5) 101.3%)'},
  {backgroundColor: '#FBF6FF', borderColor: 'linear-gradient(96.8deg, rgba(5, 0, 255, 0.5) -0.96%, rgba(255, 92, 0, 0.5) 101.3%)'},
]

const getCategories = async (): Promise<ICategoryItem[]> => {
  const url = 'https://asktug.com/site.json'
  const response = await axios.get(url)
  const categories = response.data.categories
  return categories
}

const CategoryList: React.FC<IProps> = (props) => {
//function CategoryList(props: IProps) {
  const {children, className, ...rest} = props
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  useEffect(() => {
    getCategories().then(setCategories)
  }, [])
  return (
    <div className={classNames(className, 'asktug-category-list')} {...rest}>
      {categories.map((value, index) => (
        <div key={value.name} className={'asktug-category-list-item'} style={{...colors[index % colors.length]}}>
          <div className={'asktug-category-list-item-header'}>
            <div className={'asktug-category-list-item-header-name'}>{value.name}</div>
          </div>
          <div className={'asktug-category-list-item-body'}>
            <div className={'asktug-category-list-item-header-description'}>{value.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoryList
