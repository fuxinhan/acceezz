import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import Utils from "../../Util/webCofig";

const selectIds = [6, 7, 17, 18]
const HighlightsPage = () => {
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [pageText, setPageText] = useState({
        6: [],
        7: [],
        17: [],
        18: [],
    })
    const [pageFile, setPageFile] = useState({
        6: [],
        7: [],
        17: [],
        18: [],
    })


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
        selectIds.map((item) => {
            Utils.get({
                url: 'api_back/resources_text/',
                params: {
                    purpose_obj: item,
                    page: 1,
                    pagesize: 100
                },
                actionType: 'getPageText' + item,
                Success: (data) => {
                    setPageText(pre => ({
                        ...pre,
                        [item]: data?.results
                    }))

                }
            })
            Utils.get({
                url: 'api_back/resources_file/',
                params: {
                    purpose_obj: item,
                    page: 1,
                    pagesize: 100
                },
                actionType: 'getPageFile' + item,
                Success: (data) => {
                    let contentDatab = data?.results
                    setPageFile(pre => ({
                        ...pre,
                        [item]: contentDatab
                    }))
                }
            })
        })

    }

    useEffect(() => {
        onGetSelectOneData()
        if (isAutoPlaying && pageFile?.[7]?.length > 0) {
            autoPlayRef.current = setInterval(() => {
                setFirstRowIndex(prev => (prev + 1) % pageFile?.[7]?.length);
            }, 3000);
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [])


    return (
        <div className={styles.highlightsContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    {
                        pageText?.[6]?.[0]?.text
                    }
                </h1>
                <p className={styles.subtitle}
                    dangerouslySetInnerHTML={{ __html: pageText?.[6]?.[0]?.sub_text }}
                />
            </div>


            <div className={styles.carouselContainer}>
                <div className={styles.caroutseHeader}>
                    <h2>
                        Past events
                    </h2>
                    <div />
                </div>

                {/* 轮播组件 */}
                <div className={styles.carouselWrapper}>
                    <div className={styles.carouselTrack}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {pageFile?.[7]?.map((item, index) => (
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
                                            {pageText?.[7]?.[index]?.text || '--'}
                                        </h3>
                                        <p className={styles.slideDescription}
                                            dangerouslySetInnerHTML={{ __html: pageText?.[7]?.[index]?.sub_text || '--------' }}
                                        />

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 导航圆圈 */}
                    <div className={styles.carouselDots}>
                        {pageFile?.[7]?.map((_, index) => (
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
                        onClick={() => setFirstRowIndex(firstRowIndex - 1)}
                        disabled={firstRowIndex === 0}
                        aria-label="Previous slide"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        className={`${styles.carouselNav} ${styles.nextNav}`}
                        onClick={() => setFirstRowIndex(firstRowIndex + 1)}
                        aria-label="Next slide"
                        disabled={(pageFile?.[7]?.length - 1) === firstRowIndex}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 赞助 */}

            <div className={styles.collaboratorsBosy}>
                <div className={styles.collaboratorsSection}>
                    <div className={styles.collaboratorsHeader}>
                        <h2 className={styles.collaboratorsTitle}>
                            Our collaborators bring their expertise from:
                        </h2>
                    </div>

                    <div className={styles.logosGrid}>
                        {/* 第一行 */}
                        <div className={styles.logoRow}>
                            {
                                pageFile?.[17]?.map((item, key) => (
                                    <div className={styles.logoItem} key={key}>
                                        <img
                                            src={Utils.returnFileUrl(item.abs_file_obj_display)}
                                            alt="PHILLIPS"
                                            className={styles.logoImage}
                                        />
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>

                {/* 赞助商展示组件 */}
                <div className={styles.sponsorsSection}>
                    <div className={styles.sponsorsHeader}>
                        <h2 className={styles.sponsorsTitle}>
                            Our sponsors:
                        </h2>
                    </div>

                    <div className={styles.logosGrid}>
                        <div className={styles.logoRow}>
                            <div className={styles.logoRow}>
                                {
                                    pageFile?.[18]?.map((item, key) => (
                                        <div className={styles.logoItem} key={key}>
                                            <img
                                                src={Utils.returnFileUrl(item.abs_file_obj_display)}
                                                alt="PHILLIPS"
                                                className={styles.logoImage}
                                            />
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HighlightsPage;