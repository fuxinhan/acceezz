import React, { useState, useEffect } from "react";
import Style from "./index.module.css"
import { Button, Col, Row } from 'antd';
import Utils from "../../Util/webCofig";
import image1 from './../../static/Resourcces-4-1.png'
import image2 from './../../static/Resourcces-4-2.png'
import image3 from './../../static/Resourcces-4-3.png'
const HomeBnnerID = [3, 4, 5];
// const HomeBnnerID2 = 5;
// const HomeBnnerID3 = 6;
function HomePage() {
    const [userName, setUserName] = useState("");
    const [displayVive, setDisplayVive] = useState(true);
    const [homeInitData, setHomeInitData] = useState({
        select1Text: {
            media_type: 'text',
            media_type_display: '文字',
            text: 'Welcome',
            sub_text: "This is a place full of creativity and possibilities, and we are committed to providing you with the highest quality service and experience.",
        },
        select1File: [{
            media_type: 'image',
            abs_file_obj_display: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&auto=format&fit=crop&q=70'
        }],
        select2Text: {
            media_type: 'text',
            media_type_display: '文字',
            text: 'It’s easy to propose a new member',
            sub_text: "Membership applications are now open at all of our Houses, including London, New York and Los Angeles. Send your friends a personalised link to support their application.",
        },
        select3File: [],
        select3Text: [{
            text: 'A',
            sub_text: "A"
        }],
    })

    const onGetHomeInitData = () => {
        HomeBnnerID.map((item) => {
            Utils.get({
                url: 'api_back/resources_text/',
                params: {
                    purpose_obj: item,
                    page: 1,
                    pagesize: 100
                },
                actionType: 'getLogHomeInit' + item,
                Success: (data) => {

                    let contentDatab = data?.results?.[0] || {}
                    let initSelect1Text = null
                    if (item === 3) {
                        initSelect1Text = homeInitData.select1Text
                        let toData = { ...initSelect1Text, ...contentDatab }
                        setHomeInitData(prev => ({
                            ...prev,
                            select1Text: toData
                        }))
                    }
                    if (item === 4) {
                        initSelect1Text = homeInitData.select2Text
                        let toData = { ...initSelect1Text, ...contentDatab }
                        setHomeInitData(prev => ({
                            ...prev,
                            select2Text: toData
                        }))
                    }
                    if (item === 5) {
                        setHomeInitData(prev => ({
                            ...prev,
                            select3Text: data?.results
                        }))
                    }
                }
            })
            Utils.get({
                url: 'api_back/resources_file/',
                params: {
                    purpose_obj: item,
                    page: 1,
                    pagesize: 100
                },
                actionType: 'getLogHomeInitF' + item,
                Success: (data) => {
                    let contentDatab = data?.results
                    if (item === 3) {
                        setHomeInitData(prev => ({
                            ...prev,
                            select1File: contentDatab
                        }))
                    }
                    if (item === 4) {
                        setHomeInitData(prev => ({
                            ...prev,
                            select2File: contentDatab
                        }))
                    }
                    if (item === 5) {
                        setHomeInitData(prev => ({
                            ...prev,
                            select3File: contentDatab
                        }))
                    }

                }
            })
        })
    }
    useEffect(() => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo && userInfo.user_info && userInfo.user_info.username) {
                setUserName(userInfo.user_info.username);
            } else {
                setUserName('Accezz');
            }
        } catch (e) {
            setUserName('Accezz');
        }
        onGetHomeInitData()
    }, [])

    return (
        <div className={Style.homeContainer}>
            {/* Hero 顶部大图覆盖内容 */}
            <section className={Style.hero}>
                <img className={Style.heroImage} src={Utils.returnFileUrl(homeInitData?.select1File?.[0]?.abs_file_obj_display)} alt="hero" />
                <div className={Style.heroOverlay} />
                <div className={Style.heroContent}>
                    <div className={Style.welcomeKicker}>{homeInitData?.select1Text?.text}</div>
                    <h1 className={Style.welcomeName}>{userName}</h1>
                    <p className={Style.welcomeSub}>{homeInitData?.select1Text?.sub_text}</p>
                    <div className={Style.heroActions}>
                        <a target='_blank' href={homeInitData?.select1File?.[0]?.text || '/'}>
                            <Button className={Style.bookBtn}>Refer a friend</Button>
                        </a>

                        {/* <Button className={Style.inviteBtn}>Invite a guest</Button> */}
                    </div>
                </div>
            </section>
            {/* 会员申请卡片 */}
            {
                displayVive && <section className={Style.noticeSection}>
                    <div className={Style.noticeCard}>
                        <div className={Style.noticeHeader}>{homeInitData?.select2Text?.text}</div>
                        <div className={Style.noticeBody}>
                            {homeInitData?.select2Text.sub_text}
                        </div>
                        <div className={Style.noticeFooter}>
                            <button className={Style.linkBtn}>Refer now</button>
                        </div>
                        <button className={Style.closeBtn} aria-label="close" onClick={() => setDisplayVive(false)} >×</button>
                    </div>
                </section>
            }


            {/* Upcoming 列表 */}
            <section className={Style.upcomingSection}>
                <div className={Style.upcomingHeader}>
                    <h2 className={Style.upcomingTitle}>Upcoming</h2>
                    {/* <button className={Style.linkGhost}>See all</button> */}
                </div>

                {/* {
                    homeInitData && homeInitData.select3File && <div className={Style.upcomingList}>
                        {
                            homeInitData?.select3File?.length !== 0 && homeInitData?.select3File?.map((item, key) => {
                                return (
                                    <div className={Style.upcomingItem} key={key}>
                                        <div className={Style.upImgWrap}>
                                            <img src={Utils.returnFileUrl(item.abs_file_obj_display)} alt="Member Mixer" />
                                        </div>
                                        <div className={Style.upInfo}>
                                            <div className={Style.upTitle}>
                                                {homeInitData?.select3Text?.[key]?.text || '--'}
                                            </div>
                                            <div className={Style.upMeta}
                                                dangerouslySetInnerHTML={{ __html: homeInitData?.select3Text?.[key]?.sub_text || '----------' }}
                                            />

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                } */}

                {
                    homeInitData?.select3File?.map((item, key) => {
                        const isOdd = key % 2 !== 0;
                        // 动态设置className：奇数用split，偶数用split+reverse
                        const sectionClass = isOdd
                            ? `${Style.split} ${Style.reverse}`
                            : Style.split;
                        return (
                            <section className={sectionClass}>
                                <div className={Style.splitMedia}>
                                    <img src={Utils.returnFileUrl(item.abs_file_obj_display)} alt="House interior" loading="lazy" />
                                </div>
                                <div className={Style.splitContent}>
                                    <h2>
                                        {homeInitData?.select3Text?.[key]?.text || '--'}
                                    </h2>
                                    <p
                                        dangerouslySetInnerHTML={{ __html: homeInitData?.select3Text?.[key]?.sub_text || '----------' }}
                                    />

                                </div>
                            </section>
                        )
                    })
                }


            </section>
            <section className={Style.GallerySection}>
                <div className={Style.GallerySectionCard}>
                    <h1>Other Gallery and Auction Previews</h1>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8} >
                            <div>
                                <div className={Style.GallerySectionHeader}>
                                    <img className={Style.GallerySectionImg} src={image1} />
                                </div>
                                <div className={Style.GallerySectionBody}>
                                    <div className={Style.GallerySectionTitle}>ACA Gallery</div>
                                    <div>
                                        <span>Exhibit: </span>The Strange Beauty of Impermanence
                                    </div>
                                    <div>
                                        <span>Location: </span>173 Tenth Avenue, New York
                                        Opening Reception: Friday September 5, 7-9pm
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8} >
                            <div>
                                <div className={Style.GallerySectionHeader}>
                                    <img className={Style.GallerySectionImg} src={image2} />
                                </div>
                                <div className={Style.GallerySectionBody}>
                                    <div className={Style.GallerySectionTitle}>Phillips Auction House</div>
                                    <div>
                                        <span>Exhibit:  </span> MODERN & CONTEMPORARY ART EVENING SALE
                                    </div>
                                    <div>
                                        <span>Location: </span>G/F, WKCDA Tower, West Kowloon Cultural District, No. 8 Austin Road West, Kowloon, Hong Kong
                                        Preview: September 26, 2025
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8} >
                            <div>
                                <div className={Style.GallerySectionHeader}>
                                    <img className={Style.GallerySectionImg} src={image3} />
                                </div>
                                <div className={Style.GallerySectionBody}>
                                    <div className={Style.GallerySectionTitle}>Flowers Gallery</div>
                                    <div>
                                        <span>Exhibit: </span>Bianca Raffaella: She Cannot Fade
                                    </div>
                                    <div>
                                        <span>Location: </span>Cork St, London
                                        Opening Reception: September 5, 2025
                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>
            </section>
        </div>
    )
}

export default HomePage;