import React from "react";

import style from './index.module.css';

const tiers = [
	{
		key: 'attender',
		title: 'The Attender',
		image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=560&fit=crop',
		perks: ['Access to selected events', 'Monthly newsletter', 'Member-only updates']
	},
	{
		key: 'explorer',
		title: 'The Explorer',
		image: 'https://images.unsplash.com/photo-1529336953121-ad5a95ff9c89?w=800&h=560&fit=crop',
		perks: ['Priority event RSVP', 'Quarterly workshops', 'Community forum access']
	},
	{
		key: 'fundamentalist',
		title: 'The Fundamentalist',
		image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=560&fit=crop',
		perks: ['All-access events', '1:1 curator session', 'Exclusive drops & previews']
	}
];

const MembershipPage =()=>{
	return(
		<div className={style.MembershipPage}>
			<section className={style.hero}>
				<h1 className={style.pageTitle}>Membership</h1>
				<p className={style.intro}>
					Membership at Accezz unlocks a community of people passionate about art through collecting.
					It provides exclusive benefits and events to learn more about art collecting.
				</p>
				<button className={style.applyBtn} type="button">APPLY</button>
				<p className={style.note}>The application will take about 10 minutes to complete.</p>
			</section>

			<section className={style.tiersSection}>
				<div className={style.tiersHeader}>
					<h2 className={style.tiersTitle}>Membership Tiers</h2>
					<div className={style.underline} />
				</div>
				<div className={style.tiersGrid}>
					{tiers.map(tier => (
						<div key={tier.key} className={style.card}>
							<div className={style.cardImageWrap}>
								<img src={tier.image} alt={tier.title} className={style.cardImage} loading="lazy" />
							</div>
							<div className={style.cardBody}>
								<h3 className={style.cardTitle}>{tier.title}</h3>
								<ul className={style.perksList}>
									{tier.perks.map((perk, idx) => (
										<li key={idx}>{perk}</li>
									))}
								</ul>
								<button className={style.cardApplyBtn} type="button">APPLY</button>
							</div>
						</div>
					))}
				</div>
			</section>

			<footer className={style.footer}>
				<div className={style.footerBrand}>ACCEZZ</div>
				<div className={style.footerMeta}>© 2025 ACCEZZ · All rights reserved</div>
				<div className={style.footerLinks}>
					<a href="#" aria-label="Privacy">Privacy</a>
					<span className={style.dot} />
					<a href="#" aria-label="Terms of Service">Terms of Service</a>
				</div>
			</footer>
		</div>
	)
}

export default MembershipPage