import React, { useState, useEffect } from "react";
import Style from "./index.module.css"
import { Button, Col, Row } from 'antd';
import Utils from "../../Util/webCofig";
// import image1 from './../../static/Resourcces-4-1.png'
// import image2 from './../../static/Resourcces-4-2.png'
// import image3 from './../../static/Resourcces-4-3.png'
const HomeBnnerID = [3, 4, 5, 22];  // 4作废
// const HomeBnnerID2 = 5;
// const HomeBnnerID3 = 6;
function HomePage() {
    const [userName, setUserName] = useState("");
    // const [displayVive, setDisplayVive] = useState(true);
    const [homeInitDataText, setHomeInitDataText] = useState({
        3: [],
        4: [],
        5: [],
        22: [],
    })
    const [homeInitDataFile, setHomeInitDataFile] = useState({
        3: [],
        4: [],
        5: [],
        22: [],
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
                actionType: 'getLogHomeInitText' + item,
                Success: (data) => {
                    let contentDatab = data?.results
                    setHomeInitDataText(prev => ({
                        ...prev,
                        [item]: contentDatab
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
                actionType: 'getLogHomeInitFile' + item,
                Success: (data) => {
                    let contentDatab = data?.results
                    setHomeInitDataFile(prev => ({
                        ...prev,
                        [item]: contentDatab
                    }))
                }
            })
        })

        return;
    }
    useEffect(() => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo && userInfo.user_info && userInfo.user_info.username) {
                setUserName(userInfo.user_info.preferred_name);
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
                <img className={Style.heroImage} src={Utils.returnFileUrl(homeInitDataFile?.[3]?.[0]?.abs_file_obj_display)} alt="hero" />
                <div className={Style.heroOverlay} />
                <div className={Style.heroContent}>
                    <div className={Style.welcomeKicker}>{homeInitDataText?.[3]?.[0]?.text}</div>
                    <h1 className={Style.welcomeName}>{userName}</h1>
                    <p className={Style.welcomeSub}>{homeInitDataText?.[3]?.[0]?.sub_text}</p>
                    <div className={Style.heroActions}>
                        <a target='_blank' href={homeInitDataFile?.[3]?.[0]?.text || '/'} rel="noreferrer">
                            <Button className={Style.bookBtn}>Refer a friend</Button>
                        </a>

                        {/* <Button className={Style.inviteBtn}>Invite a guest</Button> */}
                    </div>
                </div>
            </section>
            {/* 会员申请卡片 */}
            {/* {
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
            } */}


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
                    homeInitDataFile?.[5]?.map((item, key) => {
                        const isOdd = key % 2 !== 0;
                        // 动态设置className：奇数用split，偶数用split+reverse
                        const sectionClass = isOdd
                            ? `${Style.split} ${Style.reverse}`
                            : Style.split;
                        return (
                            <section className={sectionClass}>
                                <div className={Style.splitMedia}>
                                    <img src={Utils.returnFileUrl(item.abs_file_obj_display)} alt="House interior" loading="lazy" />
                                    {
                                        item.text && <div className={Style.ALinkBtnA} >
                                            <a href={item.text}   >RSVP</a>
                                        </div>
                                    }
                                </div>
                                <div className={Style.splitContent}>
                                    <h2>
                                        {homeInitDataText?.[5]?.[key]?.text || '--'}
                                    </h2>
                                    {/* {
                                        homeInitData?.select3Text?.[key]?.sub_text?.split('Location').map((label, keyL) => (
                                            <p className={keyL === 1 && Style.fontWidth600}
                                                dangerouslySetInnerHTML={{ __html: keyL === 1 ? 'Location' + label : label }}
                                            />
                                        ))
                                    } */}
                                    <p
                                        dangerouslySetInnerHTML={{ __html: homeInitDataText?.[5]?.[key]?.sub_text || '----------' }}
                                    />

                                </div>
                            </section>
                        )
                    })
                }


            </section>

            <section className={Style.GallerySection}>
                <div className={Style.GallerySectionCard}>
                    <h1 style={{ textAlign: 'center', lineHeight: '5rem', fontSize: '2rem' }} >Other Gallery and Auction Previews</h1>
                    <Row gutter={[16, 16]}>
                        {
                            homeInitDataFile?.[22]?.map((item, key) => (
                                <Col xs={24} sm={24} md={12} lg={8} xl={8} key={key} >
                                    <div>
                                        <div className={Style.GallerySectionHeader}>
                                            <img className={Style.GallerySectionImg} src={Utils.returnFileUrl(item?.abs_file_obj_display)} />
                                        </div>
                                        <div className={Style.GallerySectionBody}>
                                            <div className={Style.GallerySectionTitle}>{homeInitDataText?.[22]?.[key]?.text}</div>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: homeInitDataText?.[22]?.[key]?.sub_text || '----------' }}
                                            />

                                        </div>
                                    </div>
                                </Col>
                            ))
                        }

                    </Row>
                </div>
            </section>
        </div>
    )
}

export default HomePage;