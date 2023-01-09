import React from "react"
import classNames from "classnames"

import './CategoryList.less'
import {ICategoryItem, useAsktugSite} from "../../../../datasource/asktug";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  //items: ICategoryItem[]
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

const CategoryList: React.FC<IProps> = (props) => {
//function CategoryList(props: IProps) {
  const {children, className, ...rest} = props
  const {data, error, isValidating} = useAsktugSite();
  console.log({data, error, isValidating})
  const categories: ICategoryItem[] = data?.categories ?? []
  return (
    <div className={classNames(className, 'asktug-category-list')} {...rest}>
      {categories.filter((value) => value.has_children === true).map((value, index) => (
        <div key={value.name} className={'asktug-category-list-item-wrap'} style={{background: colors[index % colors.length].borderColor}}>
          <div className={'asktug-category-list-item'} style={{background: colors[index % colors.length].backgroundColor}}>
            <div className={'asktug-category-list-item-header'}>
              <div className={'asktug-category-list-item-header-name'}>{value.name}</div>
            </div>
            <div className={'asktug-category-list-item-body'}>
              <div className={'asktug-category-list-item-body-description'} dangerouslySetInnerHTML={{__html: value.description}} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoryList
