import React from "react";

import style from './index.module.css';

const artForms = [
    { label: 'Exhibitions', img: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?w=600&h=400&fit=crop' },
    { label: 'Design & Architecture', img: 'https://images.unsplash.com/photo-1529429612778-8de0aa2e0b0b?w=600&h=400&fit=crop' },
    { label: 'Visual Art', img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600&h=400&fit=crop' },
    { label: 'Films / Moving Image', img: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963f?w=600&h=400&fit=crop' },
    { label: 'Music', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop' },
    { label: 'Dance', img: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop' },
    { label: 'Theatre / Drama', img: 'https://images.unsplash.com/photo-1485561922213-d26446de9a38?w=600&h=400&fit=crop' },
    { label: 'Xiqu', img: 'https://images.unsplash.com/photo-1558369981-f9ca78462e61?w=600&h=400&fit=crop' },
    { label: 'Festivals', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop' },
    { label: 'Literature', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop' },
    { label: 'Chinese Art / Culture', img: 'https://images.unsplash.com/photo-1558980394-0c5b2a3f4f36?w=600&h=400&fit=crop' },
];

const interests = [
    { label: 'Guided Tours', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&h=400&fit=crop' },
    { label: 'Workshops', img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop' },
    { label: 'Talks / Seminars', img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop' },
    { label: 'Free Events', img: 'https://images.unsplash.com/photo-1508606572321-4a6b5a1a10a7?w=600&h=400&fit=crop' },
    { label: 'Family Events', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop' },
    { label: 'Pet-friendly Activities', img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&h=400&fit=crop' },
    { label: 'Shopping', img: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600&h=400&fit=crop' },
    { label: 'Dining', img: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=600&h=400&fit=crop' },
    { label: "I'm a Tourist", img: 'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=600&h=400&fit=crop' },
    { label: 'Volunteer / Docent Opportunities', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop' },
    { label: 'Supporting WestK', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop' },
];

const themes = [
    { label: 'Art Park', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&h=300&fit=crop' },
    { label: 'Freespace', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&h=300&fit=crop' },
    { label: 'Xiqu Centre', img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&h=300&fit=crop' },
];

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
                    <img src={it.img} alt={it.label} />
                </div>
                <div className={style.tileLabel}>{it.label}</div>
            </div>
        ))}
    </div>
);

const BannerList = ({ items }) => (
    <div className={style.bannerList}>
        {items.map((it) => (
            <div key={it.label} className={style.bannerItem}>
                <img src={it.img} alt={it.label} />
                <div className={style.bannerLabel}>{it.label}</div>
            </div>
        ))}
    </div>
);

const ResourcesPage =()=>{
    return(
        <div className={style.ResourcesPage}>
            {/* My Interests */}
            <div className={style.twoColSection}>
                <SectionIntro
                    title="My Interests"
                    desc="Share with us your preferred art forms and interests."
                />
                <div className={style.sectionBody}>
                    <div className={style.subTitle}>I'm interested in</div>
                    <div className={style.subDesc}>Please select your preferred art forms (you can select more than one item)</div>
                    <Grid items={artForms} />

                    <div className={style.subTitle} style={{ marginTop: '24px' }}>I'm interested in</div>
                    <div className={style.subDesc}>Please select your preferred interests (you can select more than one item)</div>
                    <Grid items={interests} />
                </div>
            </div>

            {/* My Theme */}
            <div className={style.twoColSection}>
                <SectionIntro
                    title="My Theme"
                    desc="Select your preferred theme for your account."
                />
                <div className={style.sectionBody}>
                    <div className={style.subTitle}>I like</div>
                    <div className={style.subDesc}>Please select your preferred theme to decorate your page (you can select one only)</div>
                    <BannerList items={themes} />
                </div>
            </div>
        </div>
    )
}

export default ResourcesPage