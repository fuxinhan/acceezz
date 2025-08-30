import React, { useState, useRef, useEffect } from "react";
import Style from "./index.module.css"
import Utils from "../../Util/webCofig";
import ActionType from "../../Store/actionType";
import { useNavigate } from 'react-router-dom';
import logos from './../../static/logos.png'
import ting from './../../static/ting.png'
const homeSelect1ObgId = 1;   // 首页select1的分类ID
const homeSelect2ObgId = 2;   // 首页select2的分类ID
function AccezzPage() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [homeInitData, setHomeInitData] = useState({
        select1Text: {
            media_type: 'text',
            media_type_display: '文字',
            text: 'Welcome to ACCEZZ',
            sub_text: "This is a place full of creativity and possibilities,  ",
        },
        select1FileVideo: {
            media_type: 'image',
            abs_file_obj_display: null,
        },
        select2Text: {
            media_type: 'text',
            media_type_display: '文字',
            text: 'Gamify Access   ',
            sub_text: "Carving out a new space for people who want to engage with art through collecting. ",
        },
        select2File: []
    })
    const videoRef = useRef(null);

    useEffect(() => {
        onGetHomeSelect1Content()
        onGetHomeSelect2Content()
    }, [])
    // select1
    const onGetHomeSelect1Content = () => {
        Utils.get({
            url: 'api_back/resources_text/',
            params: {
                purpose_obj: homeSelect1ObgId,
                page: 1,
                pagesize: 100
            },
            actionType: ActionType().OnGetHomePageSelect1Text,
            Success: (data) => {
                let contentDatab = data?.results?.[0] || {}
                let initSelect1Text = homeInitData.select1Text
                let toData = { ...initSelect1Text, ...contentDatab }
                setHomeInitData(prev => ({
                    ...prev,
                    select1Text: toData
                }))
            }
        })
        Utils.get({
            url: 'api_back/resources_file/',
            params: {
                purpose_obj: homeSelect1ObgId,
                page: 1,
                pagesize: 100
            },
            actionType: ActionType().OnGetHomePageSelect1File,
            Success: (data) => {
                let contentDatab = data?.results?.[0] || {}
                let initSelect1Text = homeInitData.select1FileVideo
                let toData = { ...initSelect1Text, ...contentDatab }
                setHomeInitData(prev => ({
                    ...prev,
                    select1FileVideo: toData
                }))
            }
        })
    }
    // select2
    const onGetHomeSelect2Content = () => {
        Utils.get({
            url: 'api_back/resources_text/',
            params: {
                purpose_obj: homeSelect2ObgId,
                page: 1,
                pagesize: 100
            },
            actionType: ActionType().OnGetHomePageSelect2Text,
            Success: (data) => {
                let contentDatab = data?.results?.[0] || {}
                let initSelect1Text = homeInitData.select2Text
                let toData = { ...initSelect1Text, ...contentDatab }
                setHomeInitData(prev => ({
                    ...prev,
                    select2Text: toData
                }))
            }
        })
        Utils.get({
            url: 'api_back/resources_file/',
            params: {
                purpose_obj: homeSelect2ObgId,
                page: 1,
                pagesize: 100
            },
            actionType: ActionType().OnGetHomePageSelect2File,
            Success: (data) => {
                let contentDatab = data?.results
                setHomeInitData(prev => ({
                    ...prev,
                    select2File: contentDatab
                }))
            }
        })
    }

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
    const nevigate = useNavigate()
    return (
        <div>
            <div className={Style.AccezzPage}>

                {/* 背景媒体容器 */}
                <div className={Style.backgroundMediaContainer}>
                    {homeInitData?.select1FileVideo?.media_type === 'video' ? (
                        <video
                            ref={videoRef}
                            className={Style.backgroundVideo}
                            muted
                            loop
                            onEnded={handleVideoEnded}
                        >
                            <source src={Utils.returnFileUrl(homeInitData?.select1FileVideo?.abs_file_obj_display)} type="video/mp4" />
                            您的浏览器不支持视频标签。
                        </video>
                    ) : (
                        <img
                            src={Utils.returnFileUrl(homeInitData?.select1FileVideo?.abs_file_obj_display)}
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
                        <h1 className={Style.mainTitle}>{homeInitData?.select1Text?.text}</h1>
                        <p className={Style.mainDescription}>
                            {homeInitData?.select1Text?.sub_text}
                        </p>

                        {/* 操作按钮 */}
                        <div className={Style.actionButtons}>
                            {/* <button className={Style.primaryButton}>
                            开始探索
                        </button> */}
                            <button className={Style.secondaryButton} onClick={() => nevigate('/Register')}>
                                Gain Accezz
                            </button>
                        </div>
                        {/* 播放按钮 - 仅在视频时显示 */}
                        {homeInitData?.select1FileVideo?.media_type === 'video' && (
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
                    {/* <div className={Style.currentPage}>
                        <div className={Style.pageIndicator}>Current page / Landing page</div>
                        <div className={Style.pageLabel}>PT</div>
                    </div> */}


                    <div className={Style.dictionaryEntry}>
                        <img src={logos} className={Style.LogosImage}/>
                        <div className={Style.heroLeftSub}>
                            <img src={ting} style={{ width: '40px' }} />
                            <span>
                                /ˈaksɛs/ ac·​cess
                            </span>
                        </div>
                        <div className={Style.dictionarySection}>
                            <h3 className={Style.dictionaryHeading}>Noun</h3>
                            <div className={Style.dictionaryDefinition}>
                                <span className={Style.definitionNumber}>1.</span>
                                <span className={Style.definitionText}>
                                    A community of the future generation of art collectors
                                </span>
                            </div>
                            <div className={Style.dictionaryExample}>
                                <em>"You've gained Accezz."</em>
                            </div>
                        </div>

                        <div className={Style.dictionarySection}>
                            <h3 className={Style.dictionaryHeading}>Verb</h3>
                            <div className={Style.dictionaryDefinition}>
                                <span className={Style.definitionNumber}>1.</span>
                                <span className={Style.definitionText}>
                                    To make contact with or gain access to; be able to reach, approach, with right, or permission
                                </span>
                            </div>
                            <div className={Style.dictionaryExample}>
                                <em>"Members can accezz the next event by logging in."</em>
                            </div>
                        </div>
                    </div>
                    {/* <h1 className={Style.mainHeading}
                        dangerouslySetInnerHTML={{ __html: homeInitData?.select2Text?.text || 'Gamify Access for the <span>future generation</span> of collectors across all pockets of the art world' }}
                    />


                    <p className={Style.subHeading}>
                        {homeInitData?.select2Text?.sub_text || 'Carving out a new space for people who want to engage with art through collecting. ACCEZZ is a community where emerging collectors find exceptional artists and artwork.'}
                    </p> */}

                    {/* <div className={Style.ctaButtons}>
                        <button className={Style.primaryBtn}>
                            JOIN COMMUNITY <i className={Style.faArrowRight}></i>
                        </button>
                        <button className={Style.secondaryBtn}>
                            EXPLORE WORKS
                        </button>
                    </div> */}
                </div>

                <div className={Style.heroRight}>
                    <div className={Style.imageGrid}>
                        {
                            homeInitData?.select2File.map((item, key) => {
                                return (
                                    <div className={Style.imageCard}>
                                        <div className={Style.placeholder}>
                                            <img src={Utils.returnFileUrl(item.abs_file_obj_display)} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AccezzPage;