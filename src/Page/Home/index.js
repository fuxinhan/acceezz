import React, { useState, useRef } from "react";
import Style from "./index.module.css"

function HomePage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    // 模拟背景媒体数据 - 可以是图片或视频
    const backgroundMedia = {
        type: 'video', // 或 'image'
        src: 'https://www.w3school.com.cn/example/html5/mov_bbb.mp4', // 视频URL
        poster: 'https://example.com/background-image.jpg', // 视频封面图片
        imageSrc: 'https://example.com/background-image.jpg' // 图片URL
    };

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
    };

    return (
        <div>
<div className={Style.homepage}>

            {/* 背景媒体容器 */}
            <div className={Style.backgroundMediaContainer}>
                {backgroundMedia.type === 'video' ? (
                    <video
                        ref={videoRef}
                        className={Style.backgroundVideo}
                        poster={backgroundMedia.poster}
                        muted
                        loop
                        onEnded={handleVideoEnded}
                    >
                        <source src={backgroundMedia.src} type="video/mp4" />
                        您的浏览器不支持视频标签。
                    </video>
                ) : (
                    <img
                        src={backgroundMedia.imageSrc}
                        alt="背景图片"
                        className={Style.backgroundImage}
                    />
                )}
                {/* 背景遮罩 */}
                <div className={Style.backgroundOverlay}></div>
            </div>

            {/* 页面内容 */}
            <div className={Style.pageContent}>
                <div className={Style.contentContainer}>
                    <h1 className={Style.mainTitle}>Welcome to ACCEZZ</h1>
                    <p className={Style.mainDescription}>
                    This is a place full of creativity and possibilities, and we are committed to providing you with the highest quality service and experience.
                    </p>
                    
                    {/* 操作按钮 */}
                    <div className={Style.actionButtons}>
                        <button className={Style.primaryButton}>
                            开始探索
                        </button>
                        <button className={Style.secondaryButton}>
                            了解更多
                        </button>
                    </div>
                    {/* 播放按钮 - 仅在视频时显示 */}
                {backgroundMedia.type === 'video' && (
                    <div className={Style.playButtonContainer}>
                        <button
                            className={`${Style.playButton} ${isPlaying ? Style.pauseButton : ''}`}
                            onClick={handlePlayPause}
                            aria-label={isPlaying ? '暂停' : '播放'}
                        >
                            {isPlaying ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" className={Style.playIcon}>
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor" className={Style.playIcon}>
                                    <polygon points="5,3 19,12 5,21" />
                                </svg>
                            )}
                        </button>
                    </div>
                )}

                    {/* 特色内容 */}
                    {/* <div className={Style.features}>
                        <div className={Style.featureItem}>
                            <div className={Style.featureIcon}>🏠</div>
                            <h3>优质住宅</h3>
                            <p>为您提供舒适宜居的生活空间</p>
                        </div>
                        <div className={Style.featureItem}>
                            <div className={Style.featureIcon}>🌟</div>
                            <h3>卓越服务</h3>
                            <p>24/7全天候专业服务支持</p>
                        </div>
                        <div className={Style.featureItem}>
                            <div className={Style.featureIcon}>🎯</div>
                            <h3>精准定位</h3>
                            <p>满足您的个性化需求</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        <div className={Style.heroContent}>
        <div className={Style.heroLeft}>
          <div className={Style.currentPage}>
            <div className={Style.pageIndicator}>Current page / Landing page</div>
            <div className={Style.pageLabel}>PT</div>
          </div>
          
          <h1 className={Style.mainHeading}>
            Gamify Access for the <span>future generation</span> of collectors across all pockets of the art world
          </h1>
          
          <p className={Style.subHeading}>
            Carving out a new space for people who want to engage with art through collecting. 
            ACCEZZ is a community where emerging collectors find exceptional artists and artwork.
          </p>
          
          <div className={Style.ctaButtons}>
            <button className={Style.primaryBtn}>
              JOIN COMMUNITY <i className={Style.faArrowRight}></i>
            </button>
            <button className={Style.secondaryBtn}>
              EXPLORE WORKS
            </button>
          </div>
        </div>
        
        <div className={Style.heroRight}>
          <div className={Style.imageGrid}>
            <div className={Style.imageCard}>
              <div className={Style.placeholder}>ARTWORK SHOWCASE</div>
            </div>
            <div className={Style.imageCard}>
              <div className={Style.placeholder}>COLLECTOR STORY</div>
            </div>
          </div>
        </div>
      </div>
        </div>
        
    );
}

export default HomePage;