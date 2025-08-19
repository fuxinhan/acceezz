import React, { useState, useRef } from "react";
import styles from "./index.module.css";

const HighlightsPage = () => {
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [secondRowIndex, setSecondRowIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartScroll, setDragStartScroll] = useState(0);
    const [activeRow, setActiveRow] = useState(null);
    
    const firstRowRef = useRef(null);
    const secondRowRef = useRef(null);

    // Soho House 品牌数据 - 完全按照图片上的顺序
    const properties = [
        {
            id: 1,
            name: "Soho House Holloway",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
            description: "伦敦北部屋顶露台与户外用餐"
        },
        {
            id: 2,
            name: "Shoreditch House",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
            description: "东伦敦工业风餐厅与酒吧"
        },
        {
            id: 3,
            name: "Soho House São Paulo",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
            description: "圣保罗地中海风格庭院"
        },
        {
            id: 4,
            name: "Soho Farmhouse Ibiza",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
            description: "伊比沙岛地中海农庄风格"
        },
        {
            id: 5,
            name: "Soho House Portland",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
            description: "波特兰温暖休息室"
        },
        {
            id: 6,
            name: "Little Beach House Barcelona",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
            description: "巴塞罗那海滨休息室"
        },
        {
            id: 7,
            name: "White City House",
            image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
            description: "伦敦白城屋顶泳池与休闲区"
        },
        {
            id: 8,
            name: "Soho House Istanbul",
            image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
            description: "伊斯坦布尔复古豪华餐厅"
        },
        {
            id: 9,
            name: "Soho Beach House",
            image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
            description: "热带海滩度假村泳池"
        },
        {
            id: 10,
            name: "Soho House Austin",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
            description: "奥斯汀时尚休息室与酒吧"
        },
        {
            id: 11,
            name: "Soho House Austin",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
            description: "奥斯汀时尚休息室与酒吧"
        },
        {
            id: 12,
            name: "Soho House Austin",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
            description: "奥斯汀时尚休息室与酒吧"
        },
        {
            id: 13,
            name: "Soho House Austin",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
            description: "奥斯汀时尚休息室与酒吧"
        },
        {
            id: 14,
            name: "Soho House Austin",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
            description: "奥斯汀时尚休息室与酒吧"
        }
    ];

    // 创建无限循环数组
    const createInfiniteArray = () => {
        return [...properties, ...properties, ...properties];
    };

    const infiniteProperties = createInfiniteArray();

    // 鼠标拖拽事件处理
    const handleMouseDown = (e, rowType) => {
        console.log(e,rowType)
        setIsDragging(true);
        setActiveRow(rowType);
        const currentRowRef = rowType === 'first' ? firstRowRef.current : secondRowRef.current;
        setDragStartX(e.pageX);
        setDragStartScroll(currentRowRef?.scrollLeft || 0);
    };

    const handleMouseMove = (e) => {
        console.log(e)
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
            
            return newIndex >= properties.length ? 0 : newIndex;
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
            
            return newIndex < 0 ? properties.length - 1 : newIndex;
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
            
            return newIndex >= properties.length ? 0 : newIndex;
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
            
            return newIndex < 0 ? properties.length - 1 : newIndex;
        });
    };

    return (
        <div className={styles.highlightsContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Soho House</h1>
                <p className={styles.subtitle}>全球奢华会员制俱乐部精选</p>
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
                                        src={property.image} 
                                        alt={property.name}
                                        className={styles.propertyImage}
                                        loading="lazy"
                                        draggable={false}
                                    />
                                    <div className={styles.propertyName}>
                                        {property.name}
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
                        {infiniteProperties.map((property, index) => (
                            <div key={`second-${property.id}-${index}`} className={`${styles.propertyCard}  ${styles.imageContainerTran}`}>
                                <div className={`${styles.imageContainer}`}>
                                    <img 
                                        src={property.image} 
                                        alt={property.name}
                                        className={styles.propertyImage}
                                        loading="lazy"
                                        draggable={false}
                                    />
                                    <div className={styles.propertyName}>
                                        {property.name}
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