import React, {useEffect, useRef} from "react"
import classNames from "classnames"
// Import Swiper React components
import {FreeMode, Mousewheel, Scrollbar} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import './CategoryList.less'
import {ICategoryItem, useAsktugSite} from "../../../../datasource/asktug";
import {Site, SiteLink} from "../../../../../index";

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

  const statusLineRef = useRef(null);
  //useEffect(() => {
  //  const on = function(
  //    element: { addEventListener: (arg0: any, arg1: any, arg2: boolean) => void },
  //    event: any,
  //    handler: any
  //  ) {
  //    if (element && event && handler) {
  //      element.addEventListener(event, handler, false);
  //    }
  //  };
  //
  //  const off = function(
  //    element: { removeEventListener: (arg0: any, arg1: any, arg2: boolean) => void },
  //    event: any,
  //    handler: any
  //  ) {
  //    if (element && event) {
  //      element.removeEventListener(event, handler, false);
  //    }
  //  };
  //
  //  let targetDrag = {
  //    isDown: false,
  //    coord: {
  //      x: 0,
  //      y: 0,
  //    },
  //  };
  //
  //  const scrollMousedown = (event: { pageX: number; pageY: number }) => {
  //    targetDrag.isDown = true;
  //    targetDrag.coord.x = event.pageX;
  //    targetDrag.coord.y = event.pageY;
  //  };
  //  const scrollMouseup = () => {
  //    targetDrag.isDown = false;
  //    targetDrag.coord.x = 0;
  //    targetDrag.coord.y = 0;
  //  };
  //
  //  let el = statusLineRef.current as any;
  //
  //  const scrollMousemove = (event: { pageX: number }) => {
  //    let movX = targetDrag.coord.x - event.pageX;
  //    targetDrag.coord.x = event.pageX;
  //    if (targetDrag.isDown) {
  //      el.scrollLeft = el.scrollLeft + movX;
  //    }
  //  };
  //
  //  if (el) {
  //    on(el, 'mousedown', scrollMousedown);
  //    on(document, 'mouseup', scrollMouseup);
  //    on(el, 'mousemove', scrollMousemove);
  //  }
  //  return () => {
  //    if (el) {
  //      off(el, 'mousedown', scrollMousedown);
  //      off(document, 'mouseup', scrollMouseup);
  //      off(el, 'mousemove', scrollMousemove);
  //    }
  //  };
  //}, [data]);

  console.log({data, error, isValidating})
  const categories: ICategoryItem[] = data?.categories ?? []
  return (
    <div className={classNames(className, 'asktug-category-list')} ref={statusLineRef} {...rest}>
      <Swiper
        direction={"horizontal"}
        slidesPerView={"auto"}
        freeMode={true}
        scrollbar={true}
        mousewheel={true}
        spaceBetween={12}
        modules={[FreeMode, Scrollbar, Mousewheel]}
      >
        {categories.filter((value) => value.has_children === true).map((value, index) => (
          <SwiperSlide key={value.id} style={{width: 'auto', paddingBottom: 16}}>
            {/*<div className={'asktug-category-list-item-wrap-box'}>*/}
              <div key={value.name} className={'asktug-category-list-item-wrap'} style={{background: colors[index % colors.length].borderColor}}>
                <div className={'asktug-category-list-item'} style={{background: colors[index % colors.length].backgroundColor}}>
                  <SiteLink site={Site.asktug} url={`/c/${value.id}`} newWindow={false}>
                    <div className={'asktug-category-list-item-header'}>
                      <div className={'asktug-category-list-item-header-name'}>{value.name}</div>
                    </div>
                  </SiteLink>
                  <div className={'asktug-category-list-item-body'}>
                    <div className={'asktug-category-list-item-body-description'} dangerouslySetInnerHTML={{__html: value.description}} />
                  </div>
                </div>
              </div>
            {/*</div>*/}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CategoryList
