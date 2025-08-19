import React from "react";

import style from './index.module.css';

const pillars = [
	{ key: 'community', title: 'Community', desc: '连接全球创意社群，提供聚会、交流与灵感的空间。' },
	{ key: 'creativity', title: 'Creativity', desc: '支持创意实践，从餐饮、音乐到艺术与文化活动。' },
	{ key: 'sustainability', title: 'Sustainability', desc: '关注可持续发展，在设计与运营中尽量降低环境影响。' },
	{ key: 'wellbeing', title: 'Wellbeing', desc: '关照身心平衡，提供健身、泳池与多元健康体验。' },
];

const AboutPage =()=>{
	return(
		<div className={style.AboutPage}>
			<section className={style.hero}>
				<h1 className={style.title}>About</h1>
				<p className={style.subtitle}>
                Soho House is a club for creatives. We exist to provide a home for our members to come together and belong, wherever they are in the world.
        <br />
        <br />
It all began in 1995, when founder Nick Jones opened the first Soho House on London’s Greek Street above his restaurant, Cafe Boheme. Soho House was so named, because it was situated in a Georgian house in Soho. The logo reflects the layout of that first space – three floors across three interconnecting houses. 
<br />
<br />
Today, we have Houses across the world, and each one is designed to be comfortable and characterful, offering our members a unique yet familiar experience every time they visit. The Houses have spaces for drinking, dining, relaxing, working and exercising. Our screening rooms show a selection of new and classic films, and our rooftops – both with pools and without – are loved by members. Our art collection consists of more than 8,000 curated works, which play a prominent role in the design of every House.
				</p>
			</section>

			<section className={style.pillars}>
				{pillars.map(p => (
					<div key={p.key} className={style.pillarCard}>
						<div className={style.pillarBadge} />
						<h3 className={style.pillarTitle}>{p.title}</h3>
						<p className={style.pillarDesc}>{p.desc}</p>
					</div>
				))}
			</section>

			<section className={style.split}>
				<div className={style.splitMedia}>
					<img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=900&fit=crop" alt="House interior" loading="lazy" />
				</div>
				<div className={style.splitContent}>
					<h2>Our story</h2>
					<p>
						自创立以来，我们在世界各地打造不同城市的“House”。每一家都由本地团队策划，
						结合餐饮、音乐、艺术展览与放映，为会员提供熟悉又独特的体验。
					</p>
					<p>
						我们尊重在地文化，注重可持续材料与长久设计，
						让每一次停留都成为灵感与美学的延伸。
					</p>
				</div>
			</section>

			<section className={`${style.split} ${style.reverse}`}>
				<div className={style.splitMedia}>
					<img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=900&fit=crop" alt="Rooftop pool" loading="lazy" />
				</div>
				<div className={style.splitContent}>
					<h2>What we do</h2>
					<p>
						从餐厅、屋顶与泳池到放映厅与活动空间，我们围绕城市节奏组织节目单：
						晚餐、展览、放映、对谈与派对，连接同频的人。
					</p>
					<p>
						我们也通过驻留与合作项目扶持年轻创意者，
						让社群不断壮大并彼此启发。
					</p>
				</div>
			</section>

			<section className={style.stats}>
				<div className={style.statItem}>
					<strong>40+ </strong>
					<span>Houses & spaces</span>
				</div>
				<div className={style.statItem}>
					<strong>1995</strong>
					<span>Founded</span>
				</div>
				<div className={style.statItem}>
					<strong>Global</strong>
					<span>Europe · Americas · Asia</span>
				</div>
			</section>

			<section className={style.cta}>
				<h3>加入我们，发现离你最近的 House</h3>
				<button type="button" className={style.ctaBtn}>Explore</button>
			</section>
		</div>
	)
}

export default AboutPage