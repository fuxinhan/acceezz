import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import Utils from "../../Util/webCofig";
import ActionType from "../../Store/actionType";
const selectOneId = 7;   // HighlightsPage select2的分类ID
const selectOneId2 = 8;   // HighlightsPage select2的分类ID

const HighlightsPage = () => {
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [secondRowIndex, setSecondRowIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartScroll, setDragStartScroll] = useState(0);
    const [activeRow, setActiveRow] = useState(null);
    const [selectOne,setSelectOnea] = useState([
            {
                id: 1,
                remark: "Soho House Holloway",
                abs_file_obj_display: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
                description: "伦敦北部屋顶露台与户外用餐"
            },
        ] 
         
    )
    const [selectTwo,setSelectTwo] = useState([{
        id: 1,
        remark: "Soho House Holloway",
        abs_file_obj_display: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
        description: "伦敦北部屋顶露台与户外用餐"
    },])
    
    const firstRowRef = useRef(null);
    const secondRowRef = useRef(null);

    const onGetSelectOneData = ()=>{
        Utils.get({
            url:'api_back/resources_file/',
            params:{
                purpose_obj:selectOneId,
                page:1,
                pagesize:100
            },
            actionType:ActionType().OnGetHighlightsPageSelectOneFile,
            Success:(data)=>{
                let contentDatab = data?.results||[]
                setSelectOnea(contentDatab)
            }
        })
        Utils.get({
            url:'api_back/resources_file/',
            params:{
                purpose_obj:selectOneId2,
                page:1,
                pagesize:100
            },
            actionType:ActionType().OnGetHighlightsPageSelectOneFile,
            Success:(data)=>{
                let contentDatab = data?.results||[]
                setSelectTwo(contentDatab)
            }
        })
    }

    useEffect(()=>{
        onGetSelectOneData()
    },[])
   

    // 创建无限循环数组
    const createInfiniteArray = () => {
        return [...selectOne, ...selectOne, ...selectOne];
    };

    const infiniteProperties = createInfiniteArray();

     // 创建无限循环数组
     const createInfiniteArray1 = () => {
        return [...selectTwo, ...selectTwo, ...selectTwo];
    };

    const infiniteProperties1 = createInfiniteArray1();

    // 鼠标拖拽事件处理
    const handleMouseDown = (e, rowType) => {
        setIsDragging(true);
        setActiveRow(rowType);
        const currentRowRef = rowType === 'first' ? firstRowRef.current : secondRowRef.current;
        setDragStartX(e.pageX);
        setDragStartScroll(currentRowRef?.scrollLeft || 0);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !activeRow) return;
        e.preventDefault();
        
        const currentRowRef = activeRow === 'first' ? firstRowRef.current : secondRowRef.current;
        if (!currentRowRef) return;
        
        // 计算鼠标移动的距离
        const deltaX = e.pageX - dragStartX;
        
        // 实时更新滚动位置，实现图片跟随鼠标移动
        currentRowRef.scrollLeft = dragStartScroll - deltaX;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setActiveRow(null);
    };

    // 触摸事件处理（移动端）
    const handleTouchStart = (e, rowType) => {
        setIsDragging(true);
        setActiveRow(rowType);
        const currentRowRef = rowType === 'first' ? firstRowRef.current : secondRowRef.current;
        setDragStartX(e.touches[0].pageX);
        setDragStartScroll(currentRowRef?.scrollLeft || 0);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !activeRow) return;
        
        const currentRowRef = activeRow === 'first' ? firstRowRef.current : secondRowRef.current;
        if (!currentRowRef) return;
        
        // 计算触摸移动的距离
        const deltaX = e.touches[0].pageX - dragStartX;
        
        // 实时更新滚动位置，实现图片跟随触摸移动
        currentRowRef.scrollLeft = dragStartScroll - deltaX;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setActiveRow(null);
    };

    // 第一行切换按钮 - 单个图片切换
    const nextSlideFirst = () => {
        setFirstRowIndex(prev => {
            const newIndex = prev + 1;
            const targetScroll = newIndex * (300 + 20); // 图片宽度 + 间距
            
            if (firstRowRef.current) {
                firstRowRef.current.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            }
            
            return newIndex >= selectOne.length ? 0 : newIndex;
        });
    };

    const prevSlideFirst = () => {
        setFirstRowIndex(prev => {
            const newIndex = prev - 1;
            const targetScroll = newIndex * (300 + 20);
            
            if (firstRowRef.current) {
                firstRowRef.current.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            }
            
            return newIndex < 0 ? selectOne.length - 1 : newIndex;
        });
    };

    // 第二行切换按钮 - 单个图片切换
    const nextSlideSecond = () => {
        setSecondRowIndex(prev => {
            const newIndex = prev + 1;
            const targetScroll = newIndex * (300 + 20);
            
            if (secondRowRef.current) {
                secondRowRef.current.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            }
            
            return newIndex >= selectOne.length ? 0 : newIndex;
        });
    };

    const prevSlideSecond = () => {
        setSecondRowIndex(prev => {
            const newIndex = prev - 1;
            const targetScroll = newIndex * (300 + 20);
            
            if (secondRowRef.current) {
                secondRowRef.current.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            }
            
            return newIndex < 0 ? selectOne.length - 1 : newIndex;
        });
    };

    return (
        <div className={styles.highlightsContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Accezz House</h1>
                <p className={styles.subtitle}>Selected Global Luxury Membership Clubs</p>
            </div>

            <div className={styles.carouselContainer}>
                {/* 第一行轮播 */}
                <div className={styles.rowContainer}>
                    <button 
                        className={`${styles.navigationButton} ${styles.prevButton}`}
                        onClick={prevSlideFirst}
                        aria-label="第一行上一页"
                    >
                        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div 
                        ref={firstRowRef}
                        className={styles.carouselRow}
                        onMouseDown={(e) => handleMouseDown(e, 'first')}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={(e) => handleTouchStart(e, 'first')}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{ cursor: isDragging && activeRow === 'first' ? 'grabbing' : 'grab' }}
                    >
                        {infiniteProperties.map((property, index) => (
                            <div key={`first-${property.id}-${index}`} className={`${styles.propertyCard} ${styles.propertyCardWidthOne}`}>
                                <div className={styles.imageContainer}>
                                    <img 
                                        src={Utils.returnFileUrl(property?.abs_file_obj_display)} 
                                        alt={property.remark}
                                        className={styles.propertyImage}
                                        loading="lazy"
                                        draggable={false}
                                    />
                                    <div className={styles.propertyName}>
                                        {property.remark}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button 
                        className={`${styles.navigationButton} ${styles.nextButton}`}
                        onClick={nextSlideFirst}
                        aria-label="第一行下一页"
                    >
                        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                {/* 第二行轮播 - 错位半个图片宽度 */}
                <div className={`${styles.rowContainer} ${styles.secondRowContainer}`}>
                    <button 
                        className={`${styles.navigationButton} ${styles.prevButton}`}
                        onClick={prevSlideSecond}
                        aria-label="第二行上一页"
                    >
                        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div 
                        ref={secondRowRef}
                        className={`${styles.carouselRow}`}
                        onMouseDown={(e) => handleMouseDown(e, 'second')}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={(e) => handleTouchStart(e, 'second')}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{ cursor: isDragging && activeRow === 'second' ? 'grabbing' : 'grab' }}
                    >
                        {infiniteProperties1.map((property, index) => (
                            <div key={`second-${property.id}-${index}`} className={`${styles.propertyCard}  ${styles.imageContainerTran}`}>
                                <div className={`${styles.imageContainer}`}>
                                    <img 
                                        src={Utils.returnFileUrl(property?.abs_file_obj_display)} 
                                        alt={property.remark}
                                        className={styles.propertyImage}
                                        loading="lazy"
                                        draggable={false}
                                    />
                                    <div className={styles.propertyName}>
                                        {property.remark}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button 
                        className={`${styles.navigationButton} ${styles.nextButton}`}
                        onClick={nextSlideSecond}
                        aria-label="第二行下一页"
                    >
                        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HighlightsPage;