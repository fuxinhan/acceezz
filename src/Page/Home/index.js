import React, { useState, useEffect } from "react";
import Style from "./index.module.css"
import { Button } from 'antd';

function HomePage() {
    const [userName, setUserName] = useState("");

    useEffect(()=>{
        try{
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if(userInfo && userInfo.user_info && userInfo.user_info.username){
                setUserName(userInfo.user_info.username);
            } else {
                setUserName('Accezz');
            }
        }catch(e){
            setUserName('Accezz');
        }
    },[])

    return(
        <div className={Style.homeContainer}>
            {/* Hero 顶部大图覆盖内容 */}
            <section className={Style.hero}>
                <img className={Style.heroImage} src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&auto=format&fit=crop&q=70" alt="hero"/>
                <div className={Style.heroOverlay} />
                <div className={Style.heroContent}>
                    <div className={Style.welcomeKicker}>Welcome</div>
                    <h1 className={Style.welcomeName}>{userName}</h1>
                    <p className={Style.welcomeSub}>Explore what’s happening at your favourite Houses</p>
                    <div className={Style.heroActions}>
                        <Button className={Style.bookBtn}>Make a booking</Button>
                        <Button className={Style.inviteBtn}>Invite a guest</Button>
                    </div>
                </div>
            </section>

            {/* 会员申请卡片 */}
            <section className={Style.noticeSection}>
                <div className={Style.noticeCard}>
                    <div className={Style.noticeHeader}>It’s easy to propose a new member</div>
                    <div className={Style.noticeBody}>
                        Membership applications are now open at all of our Houses, including London, New York and Los Angeles. Send your friends a personalised link to support their application.
                    </div>
                    <div className={Style.noticeFooter}>
                        <button className={Style.linkBtn}>Refer now</button>
                    </div>
                    <button className={Style.closeBtn} aria-label="close">×</button>
                </div>
            </section>

            {/* Upcoming 列表 */}
            <section className={Style.upcomingSection}>
                <div className={Style.upcomingHeader}>
                    <h2 className={Style.upcomingTitle}>Upcoming</h2>
                    <button className={Style.linkGhost}>See all</button>
                </div>

                <div className={Style.upcomingList}>
                    <div className={Style.upcomingItem}>
                        <div className={Style.upImgWrap}>
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" alt="Member Mixer"/>
                        </div>
                        <div className={Style.upInfo}>
                            <div className={Style.upTitle}>Member Mixer: cinema</div>
                            <div className={Style.upMeta}>Soho House Hong Kong</div>
                            <div className={Style.upTime}>16 Aug, 6:00 pm</div>
                        </div>
                    </div>

                    <div className={Style.upcomingItem}>
                        <div className={Style.upImgWrap}>
                            <img src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&h=400&fit=crop" alt="Chef’s table"/>
                        </div>
                        <div className={Style.upInfo}>
                            <div className={Style.upTitle}>Chef’s table</div>
                            <div className={Style.upMeta}>Soho House London</div>
                            <div className={Style.upTime}>20 Aug, 7:30 pm</div>
                        </div>
                    </div>

                    <div className={Style.upcomingItem}>
                        <div className={Style.upImgWrap}>
                            <img src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&h=400&fit=crop" alt="Chef’s table"/>
                        </div>
                        <div className={Style.upInfo}>
                            <div className={Style.upTitle}>Chef’s table</div>
                            <div className={Style.upMeta}>Soho House London</div>
                            <div className={Style.upTime}>20 Aug, 7:30 pm</div>
                        </div>
                    </div>
                    <div className={Style.upcomingItem}>
                        <div className={Style.upImgWrap}>
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" alt="Member Mixer"/>
                        </div>
                        <div className={Style.upInfo}>
                            <div className={Style.upTitle}>Member Mixer: cinema</div>
                            <div className={Style.upMeta}>Soho House Hong Kong</div>
                            <div className={Style.upTime}>16 Aug, 6:00 pm</div>
                        </div>
                    </div>

                    
                </div>
            </section>
        </div>
    ) 
}

export default HomePage;