import React from "react"
import classNames from "classnames"

import styles from './CategoryList.module.less'

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ICategoryItem[]
}

export interface ICategoryItem {
  name: string
  description: string
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
  const {children, className, items, ...rest} = props
  return (
    <div className={classNames(className, styles.container)} {...rest}>
      {items.map((value, index) => (
        <div key={value.name} className={styles.item} style={{...colors[index % colors.length]}}>
          <div className={styles.item_header}>
            <div className={styles.item_header_name}>{value.name}</div>
          </div>
          <div className={styles.item_body}>
            <div className={styles.item_body_description}>{value.description}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryList
