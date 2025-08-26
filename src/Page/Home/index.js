import React, { useState, useEffect } from "react";
import Style from "./index.module.css"
import { Button } from 'antd';
import Utils from "../../Util/webCofig";
const HomeBnnerID = [11,12,15];
// const HomeBnnerID2 = 12;
// const HomeBnnerID3 = 15;
function HomePage() {
    const [userName, setUserName] = useState("");
    const [displayVive, setDisplayVive] = useState(true);
    const [homeInitData,setHomeInitData]=useState({
        select1Text:{
            media_type:'text',
            media_type_display:'文字',
            text:'Welcome',
            sub_text :  "This is a place full of creativity and possibilities, and we are committed to providing you with the highest quality service and experience.",
        },
        select1File:[{
            media_type:'image',
            abs_file_obj_display:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&auto=format&fit=crop&q=70'
        }],
        select2Text:{
            media_type:'text',
            media_type_display:'文字',
            text:'It’s easy to propose a new member',
            sub_text :  "Membership applications are now open at all of our Houses, including London, New York and Los Angeles. Send your friends a personalised link to support their application.",
        },
        select3File:[],
        select3Text:[{
            text:'A',
            sub_text:"A"
        }],
    })

    const onGetHomeInitData =()=>{
        HomeBnnerID.map((item)=>{
            Utils.get({
                url:'api_back/resources_text/',
                params:{
                    purpose_obj:item,
                    page:1,
                    pagesize:100
                },
                actionType:'getLogHomeInit'+item,
                Success:(data)=>{

                    let contentDatab = data?.results?.[0]||{}
                    let initSelect1Text = null
                    if(item===11) {
                        initSelect1Text = homeInitData.select1Text
                        let toData = {...initSelect1Text,...contentDatab}
                        setHomeInitData(prev=>({
                         ...prev,
                        select1Text:toData
                        }))
                    }
                    if(item===12) {
                        initSelect1Text = homeInitData.select2Text
                        let toData = {...initSelect1Text,...contentDatab}
                        setHomeInitData(prev=>({
                         ...prev,
                         select2Text:toData
                        }))
                    }
                    if(item===15){
                        setHomeInitData(prev=>({
                        ...prev,
                        select3Text:data?.results
                     }))
                    }
                }
            })
            Utils.get({
                url:'api_back/resources_file/',
                params:{
                    purpose_obj:item,
                    page:1,
                    pagesize:100
                },
                actionType:'getLogHomeInitF'+item,
                Success:(data)=>{
                    let contentDatab = data?.results
                    if(item===11){
                        setHomeInitData(prev=>({
                        ...prev,
                        select1File:contentDatab
                     }))
                    }
                    if(item===12){
                        setHomeInitData(prev=>({
                        ...prev,
                        select2File:contentDatab
                     }))
                    }
                    if(item===15){
                        setHomeInitData(prev=>({
                        ...prev,
                        select3File:contentDatab
                     }))
                    }
                    
                }
            })
        })
    }
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
        onGetHomeInitData()
    },[])

    return(
        <div className={Style.homeContainer}>
            {/* Hero 顶部大图覆盖内容 */}
            <section className={Style.hero}>
                <img className={Style.heroImage} src={Utils.returnFileUrl(homeInitData?.select1File?.[0]?.abs_file_obj_display)} alt="hero"/>
                <div className={Style.heroOverlay} />
                <div className={Style.heroContent}>
                    <div className={Style.welcomeKicker}>{homeInitData?.select1Text?.text}</div>
                    <h1 className={Style.welcomeName}>{userName}</h1>
                    <p className={Style.welcomeSub}>{homeInitData?.select1Text?.sub_text}</p>
                    <div className={Style.heroActions}>
                        <Button className={Style.bookBtn}>Make a booking</Button>
                        <Button className={Style.inviteBtn}>Invite a guest</Button>
                    </div>
                </div>
            </section>
            {/* 会员申请卡片 */}
            {
                displayVive&&<section className={Style.noticeSection}>
                <div className={Style.noticeCard}>
                    <div className={Style.noticeHeader}>{homeInitData?.select2Text?.text}</div>
                    <div className={Style.noticeBody}>
                        {homeInitData?.select2Text.sub_text}
                    </div>
                    <div className={Style.noticeFooter}>
                        <button className={Style.linkBtn}>Refer now</button>
                    </div>
                    <button className={Style.closeBtn} aria-label="close" onClick={()=>setDisplayVive(false)} >×</button>
                </div>
            </section>
            }
            

            {/* Upcoming 列表 */}
            <section className={Style.upcomingSection}>
                <div className={Style.upcomingHeader}>
                    <h2 className={Style.upcomingTitle}>Upcoming</h2>
                    {/* <button className={Style.linkGhost}>See all</button> */}
                </div>

                {
                    homeInitData&&homeInitData.select3File&&<div className={Style.upcomingList}>
                        {
                            homeInitData?.select3File?.length!==0&&homeInitData?.select3File?.map((item,key)=>{
                                return(
                                    <div className={Style.upcomingItem} key={key}>
                                        <div className={Style.upImgWrap}>
                                            <img src={Utils.returnFileUrl(item.abs_file_obj_display) } alt="Member Mixer"/>
                                        </div>
                                        <div className={Style.upInfo}>
                                            <div className={Style.upTitle}>
                                                {homeInitData?.select3Text?.[key]?.text||'--'}
                                            </div>
                                            <div className={Style.upMeta} 
                                                dangerouslySetInnerHTML={{ __html: homeInitData?.select3Text?.[key]?.sub_text||'----------'}}
                                            />
                                            
                                        </div>
                                    </div>
                                )
                            })
                        }
                </div>
                }

                
            </section>
        </div>
    ) 
}

export default HomePage;