import React, { useEffect, useState } from "react";

import style from './index.module.css';
import Utils from "../../Util/webCofig";
import image51 from './../../static/Resourcces-5-1.png'
import image52 from './../../static/Resourcces-5-2.png'
import image53 from './../../static/Resourcces-5-3.png'
import image54 from './../../static/Resourcces-5-4.png'
import { Popover } from "antd";

// const artForms = [
//     { label: 'Exhibitions', img: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?w=600&h=400&fit=crop' },
//     { label: 'Design & Architecture', img: 'https://images.unsplash.com/photo-1529429612778-8de0aa2e0b0b?w=600&h=400&fit=crop' },
//     { label: 'Visual Art', img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600&h=400&fit=crop' },
//     { label: 'Films / Moving Image', img: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963f?w=600&h=400&fit=crop' },
//     { label: 'Music', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop' },
//     { label: 'Dance', img: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop' },
//     { label: 'Theatre / Drama', img: 'https://images.unsplash.com/photo-1485561922213-d26446de9a38?w=600&h=400&fit=crop' },
//     { label: 'Xiqu', img: 'https://images.unsplash.com/photo-1558369981-f9ca78462e61?w=600&h=400&fit=crop' },
//     { label: 'Festivals', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop' },
//     { label: 'Literature', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop' },
//     { label: 'Chinese Art / Culture', img: 'https://images.unsplash.com/photo-1558980394-0c5b2a3f4f36?w=600&h=400&fit=crop' },
// ];

// const interests = [
//     { label: 'Guided Tours', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&h=400&fit=crop' },
//     { label: 'Workshops', img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop' },
//     { label: 'Talks / Seminars', img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop' },
//     { label: 'Free Events', img: 'https://images.unsplash.com/photo-1508606572321-4a6b5a1a10a7?w=600&h=400&fit=crop' },
//     { label: 'Family Events', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop' },
//     { label: 'Pet-friendly Activities', img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&h=400&fit=crop' },
//     { label: 'Shopping', img: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600&h=400&fit=crop' },
//     { label: 'Dining', img: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=600&h=400&fit=crop' },
//     { label: "I'm a Tourist", img: 'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=600&h=400&fit=crop' },
//     { label: 'Volunteer / Docent Opportunities', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop' },
//     { label: 'Supporting WestK', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop' },
// ];

// const themes = [
//     { label: 'Art Park', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&h=300&fit=crop' },
//     { label: 'Freespace', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&h=300&fit=crop' },
//     { label: 'Xiqu Centre', img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&h=300&fit=crop' },
// ];

const SectionIntro = ({ title, desc }) => (
    <div className={style.sectionIntro}>
        <div className={style.sectionTitle}>{title}</div>
        <div className={style.sectionDesc}>{desc}</div>
    </div>
);

const Grid = ({ items }) => (
    <div className={style.tilesGrid}>
        {items.map((it) => (
            <div key={it.label} className={style.tile}>
                <div className={style.tileImage}>
                    {
                        it?.text && <a href={it?.text?.startsWith('http') ? it.text : `https://${it.text}`} target="_blank" rel="noreferrer" >
                            <img src={Utils.returnFileUrl(it.abs_file_obj_display)} alt={it.label} />
                        </a>

                    }
                    {
                        !it?.text && <img src={Utils.returnFileUrl(it.abs_file_obj_display)} alt={it.label} />
                    }
                </div>
                <div className={style.tileLabel}>{it.remark}</div>
            </div>
        ))}
    </div>
);

// const BannerList = ({ items }) => (
//     <div className={style.bannerList}>
//         {items.map((it) => (
//             <div key={it.label} className={style.bannerItem}>
//                 {
//                     it?.text && <a href={it?.text?.startsWith('http') ? it.text : `https://${it.text}`} target="_blank">
//                         <img src={Utils.returnFileUrl(it.abs_file_obj_display)} alt={it.label} />
//                     </a>
//                 }
//                 {
//                     !it?.text && <img src={Utils.returnFileUrl(it.abs_file_obj_display)} alt={it.label} />
//                 }


//                 <div className={style.bannerLabel}>{it.remark}</div>
//             </div>
//         ))}
//     </div>
// );

const bannerId = [10, 11, 12, 23]
const ResourcesPage = () => {
    const [pageDataInitText, setPageDataInitText] = useState({
        10: {
            text: "I'm interested in",
            sub_text: 'Please select your preferred art forms (you can select more than one item)'
        },
        11: {
            text: "I'm interested in",
            sub_text: 'Please select your preferred art forms (you can select more than one item)'
        },
        12: [],
        23: []
    })
    const [pageDataInitFile, setPageDataInitFile] = useState({
        10: [],
        11: [],
        12: []
    })
    const BannerList = ({ items }) => (

        items.map((item, key) => (
            <div key={key} className={style.card}>
                <div className={style.cardImageWrap}>
                    {
                        item?.text && <a href={item?.text?.startsWith('http') ? item.text : `https://${item.text}`} target="_blank" rel="noreferrer">
                            <img src={Utils.returnFileUrl(item?.abs_file_obj_display)} alt={item.purpose_obj_display} className={style.cardImage} loading="lazy" />
                        </a>
                    }
                    {
                        !item?.text && <img src={Utils.returnFileUrl(item?.abs_file_obj_display)} alt={item.purpose_obj_display} className={style.cardImage} loading="lazy" />
                    }

                </div>
                <div className={style.cardBody}>
                    <h3 className={style.cardTitle}>{pageDataInitText?.[12]?.[key]?.text}</h3>
                    <ul className={style.perksList}>
                        {
                            pageDataInitText?.[12]?.[key]?.sub_text?.split('|').map((label, keyL) => (
                                <li key={keyL}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />
                            ))
                        }

                    </ul>
                </div>
            </div>
        ))


    );
    const onGetResData = () => {
        bannerId.map((item) => {
            Utils.get({
                url: 'api_back/resources_text/',
                params: {
                    purpose_obj: item,
                    page: 1,
                    pagesize: 100
                },
                actionType: 'getResInit' + item,
                Success: (data) => {
                    let contentDatab = data?.results?.[0] || {}
                    if (item === 12) contentDatab = data?.results
                    let initSelect1Text = pageDataInitText[item]
                    let toData = { ...initSelect1Text, ...contentDatab }
                    setPageDataInitText(prev => ({
                        ...prev,
                        [item]: toData
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
                actionType: 'getResInitF' + item,
                Success: (data) => {
                    let contentDatab = data?.results

                    setPageDataInitFile(prev => ({
                        ...prev,
                        [item]: contentDatab
                    }))

                }
            })
        })
    }

    useEffect(() => {
        onGetResData()
    }, [])
    // 目标邮箱地址
    const targetEmail = 'advisory@theaccezz.com';

    // 可以预填邮件主题和内容
    const subject = '-';
    const body = '-';

    // 构建完整的mailto链接
    const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return (
        <div className={style.ResourcesPage}>
            {console.log(pageDataInitText)}
            {/* My Interests */}
            <div className={style.twoColSection}>
                <SectionIntro
                    title="Podcasts And News"
                    desc=""
                />
                <div className={style.sectionBody}>
                    <div className={style.subTitle}>
                        {pageDataInitText?.[10]?.text}
                    </div>
                    {/* <div className={style.subDesc}>
                        {pageDataInitText?.[10]?.sub_text}
                    </div> */}
                    <Grid items={pageDataInitFile?.[10]} />

                    <div className={style.subTitle} style={{ marginTop: '24px' }}>{pageDataInitText?.[11]?.text}</div>
                    {/* <div className={style.subDesc}>{pageDataInitText?.[11]?.sub_text}</div> */}
                    <Grid items={pageDataInitFile?.[11]} />
                </div>
            </div>

            {/* My Theme */}
            <div className={style.twoColSection}>
                <SectionIntro
                    title="Exhibits"
                    desc="Select your preferred theme for your account."
                />
                <div className={style.sectionBody}>
                    <div className={style.subTitle}>Must see exhibits this Fall</div>
                    <div className={style.subDesc}></div>
                    <div className={style.tiersGrid}>
                        <BannerList items={pageDataInitFile?.[12]} />
                    </div>

                </div>
            </div>
            <div className={style.twoColSection}>
                <SectionIntro
                    title="Partnerships"
                    desc="Shipping companies and installers"
                />
                <div className={style.sectionBody}>
                    <div className={style.subTitle}>Learn more?</div>
                    <div className={style.subDesc}>Please move the mouse over the image</div>
                    <div className={style.tiersGrid}>
                        {
                            pageDataInitFile?.[23]?.map((item, key) => (<div className={style.card}>
                                <div className={style.cardImageWrap}>
                                    {
                                        item?.text && <a href={item?.text?.startsWith('http') ? item.text : `https://${item.text}`} target="_blank" rel="noreferrer">
                                            <img src={Utils.returnFileUrl(item?.abs_file_obj_display)} alt={item.purpose_obj_display} className={style.cardImage} loading="lazy" />
                                        </a>
                                    }
                                    {
                                        !item?.text && <img src={Utils.returnFileUrl(item?.abs_file_obj_display)} alt={item.purpose_obj_display} className={style.cardImage} loading="lazy" />
                                    }
                                    {/* <img src={Utils.returnFileUrl(item?.abs_file_obj_display)} className={style.cardImage} loading="lazy" /> */}
                                </div>
                            </div>))

                        }

                        <div className={style.card}>
                            <div className={style.cardImageWrap}>
                                <Popover
                                    title={null}
                                    arrow={false}
                                    content={() => (
                                        <div className={style.cradPopover}>
                                            <h2>
                                                Frieze Connect membership discount
                                            </h2>
                                            <p style={{ fontStyle: 'italic' }}>
                                                20% off for Accezz members with code ‘YPO20’ and expedited application approval
                                            </p>
                                            <p>
                                                FRIEZECONNECT offers access to the global art scene. Members enjoy premier entry to Frieze fairs in London, New York, LA, and Seoul, as well as EXPO CHICAGO & The Armory Show. It also includes a complimentary subscription to frieze magazine & digital archive.

                                            </p>
                                        </div>
                                    )}
                                >
                                    <img src={image51} className={style.cardImage} loading="lazy" />
                                </Popover>

                            </div>
                        </div>

                        <div className={style.card}>
                            <div className={style.cardImageWrap}>
                                <Popover
                                    title={null}
                                    arrow={false}
                                    content={() => (
                                        <div className={style.cradPopover}>
                                            <h2>
                                                Arco Fine Art Framing
                                            </h2>
                                            <p style={{ fontStyle: 'italic' }}>
                                                Expedited service
                                            </p>
                                            <p>
                                                Recommended by Art Basel Hong Kong, myriad commercial galleries and many of the best-known artists in the city, this inconspicuous shop on Queen's Road East is run by the elderly Yeung Bing-sum — or Mr Yeung, as he is known — and offers top-notch framing services at reasonable prices.
                                            </p>
                                        </div>
                                    )}
                                >
                                    <img src={image52} className={style.cardImage} loading="lazy" />

                                </Popover>

                            </div>
                        </div>

                        <div className={style.card}>
                            <div className={style.cardImageWrap}>
                                <img src={image53} className={style.cardImage} loading="lazy" />
                            </div>
                        </div>

                        <div className={style.card}>
                            <div className={style.cardImageWrap}>
                                <img src={image54} className={style.cardImage} loading="lazy" />
                            </div>
                        </div>
                        {/* <div className={style.card}>
                            <div className={style.cardButtonLink}>
                                <h2>In house art advisory</h2>
                                <a href="https://calendly.com/theaccezz/30min" target='_blank'>
                                    <button>
                                        Book now
                                    </button>
                                </a>

                            </div>
                        </div>
                        <div className={style.card}>
                            <div className={style.cardButtonLink}>
                                <h2>Find trusted art advisors </h2>
                                <a href={'https://forms.gle/QyKkRgfZ9caK9Fpr8'} target='_blank' >
                                    <button>
                                        Inquire
                                    </button>
                                </a>

                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResourcesPage