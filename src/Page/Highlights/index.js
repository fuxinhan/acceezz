import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import Utils from "../../Util/webCofig";
import ActionType from "../../Store/actionType";
const selectOneId = 6;   // HighlightsPage select2的分类ID
const selectOneId2 = 7;   // HighlightsPage select2的分类ID

const HighlightsPage = () => {
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [textInit, setTextInit] = useState(null)
    const [selectTwoText, setSelectTwoText] = useState([])
    const [selectTwo, setSelectTwo] = useState([])

    // 新增：轮播自动切换相关状态
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayRef = useRef(null);
 // 新增：鼠标悬停暂停自动播放
 const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
    }
};

const handleMouseLeave = () => {
    setIsAutoPlaying(true);
};

    const onGetSelectOneData = () => {
        Utils.get({
            url: 'api_back/resources_text/',
            params: {
                purpose_obj: selectOneId,
                page: 1,
                pagesize: 100
            },
            actionType: ActionType().OnGetHighlightsPageSelectOneText,
            Success: (data) => {
                let contentDatab = data?.results?.[0] || ''
                setTextInit(contentDatab)
            }
        })
        Utils.get({
            url: 'api_back/resources_text/',
            params: {
                purpose_obj: selectOneId2,
                page: 1,
                pagesize: 100
            },
            actionType: ActionType().getHighlights,
            Success: (data) => {
                let contentDatab = data?.results || []
                setSelectTwoText(contentDatab)
            }
        })
        Utils.get({
            url: 'api_back/resources_file/',
            params: {
                purpose_obj: selectOneId2,
                page: 1,
                pagesize: 100
            },
            actionType: ActionType().OnGetHighlightsPageSelectOneFile,
            Success: (data) => {
                let contentDatab = data?.results || []
                setSelectTwo(contentDatab)
            }
        })
    }

    useEffect(() => {
        onGetSelectOneData()
        if (isAutoPlaying && selectTwo.length > 0) {
            autoPlayRef.current = setInterval(() => {
                setFirstRowIndex(prev => (prev + 1) % selectTwo.length);
            }, 3000);
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, selectTwo.length])


    return (
        <div className={styles.highlightsContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>{textInit?.text}</h1>
                <p className={styles.subtitle}
                    dangerouslySetInnerHTML={{ __html: textInit?.sub_text }}
                />
            </div>

            <div className={styles.carouselContainer}>

                <div className={styles.carouselContainer}>
                    {/* 轮播组件 */}
                    <div className={styles.carouselWrapper}>
                        <div className={styles.carouselTrack}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        >
                            {selectTwo.map((item, index) => (
                                <div
                                    key={index}
                                    className={`${styles.carouselSlide} ${index === firstRowIndex ? styles.activeSlide : ''}`}
                                    style={{ transform: `translateX(-${firstRowIndex * 100}%)` }}
                                >
                                    <div className={styles.slideContent}>
                                        <div className={styles.slideImage}>
                                            <img
                                                src={Utils.returnFileUrl(item?.abs_file_obj_display)}
                                                alt={item.remark || 'Slide image'}
                                            />
                                        </div>
                                        <div className={styles.slideText}>
                                            <h3 className={styles.slideTitle}>
                                                {selectTwoText?.[index]?.text || '--'}
                                            </h3>
                                            <p className={styles.slideDescription}
                                            dangerouslySetInnerHTML={{ __html: selectTwoText?.[index]?.sub_text || '--------' }}
                                            />
                                           
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 导航圆圈 */}
                        <div className={styles.carouselDots}>
                            {selectTwo.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.dot} ${index === firstRowIndex ? styles.activeDot : ''}`}
                                    onClick={() => setFirstRowIndex(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* 左右导航按钮 */}
                        <button
                            className={`${styles.carouselNav} ${styles.prevNav}`}
                            onClick={() => setFirstRowIndex(firstRowIndex-1)}
                            disabled={firstRowIndex===0}
                            aria-label="Previous slide"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            className={`${styles.carouselNav} ${styles.nextNav}`}
                            onClick={() => setFirstRowIndex(firstRowIndex+1)}
                            aria-label="Next slide"
                            disabled={(selectTwo.length-1)===firstRowIndex}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* 第一行轮播 */}
                {/* <div className={styles.rowContainer}>
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
                </div> */}

                {/* 第二行轮播 - 错位半个图片宽度 */}
                {/* <div className={`${styles.rowContainer} ${styles.secondRowContainer}`}>
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
                </div> */}
            </div>
        </div>
    );
};

export default HighlightsPage;