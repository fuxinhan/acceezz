import React, { useEffect, useState } from "react";

import style from './index.module.css';
import Utils from "../../Util/webCofig";
import { useNavigate } from "react-router-dom";

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

const bannerId = [9, 10]

const MembershipPage = () => {
	// 获取导航函数
	const navigate = useNavigate();
	const [pageDataInit, setPageDataInit] = useState({
		banner1Text: {
			text: 'Membership',
			sub_text: 'Membership at Accezz unlocks a community of people passionate about art through collecting. It provides exclusive benefits and events to learn more about art collecting.'
		},
		banner1File: null,
		banner2Text: [{
			text: 'Membership',
			sub_text: 'Membership at Accezz unlocks a community of people passionate about art through collecting. It provides exclusive benefits and events to learn more about art collecting.'
		}],
		banner2File: null,
	})

	const onGetPageData = () => {
		bannerId.map((item) => {
			Utils.get({
				url: 'api_back/resources_text/',
				params: {
					purpose_obj: item,
					page: 1,
					pagesize: 100
				},
				actionType: 'getMemInit' + item,
				Success: (data) => {

					let contentDatab = data?.results?.[0] || {}
					let initSelect1Text = null
					if (item === 9) {
						initSelect1Text = pageDataInit.banner1Text
						let toData = { ...initSelect1Text, ...contentDatab }
						setPageDataInit(prev => ({
							...prev,
							banner1Text: toData
						}))
					}

					if (item === 10) {
						setPageDataInit(prev => ({
							...prev,
							banner2Text: data?.results
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
				actionType: 'getMemInitF' + item,
				Success: (data) => {
					let contentDatab = data?.results

					if (item === 10) {
						setPageDataInit(prev => ({
							...prev,
							banner2File: contentDatab
						}))
					}

				}
			})
		})
	}

	useEffect(() => {
		onGetPageData()
	}, [])
	const onGetToPlay = (url) => {
		navigate(url);
	}
	return (
		<div className={style.MembershipPage}>
			<section className={style.hero}>
				<h1 className={style.pageTitle}>{pageDataInit?.banner1Text?.text}</h1>
				<p className={style.intro}
					dangerouslySetInnerHTML={{ __html: pageDataInit?.banner1Text?.sub_text }}
				/>

				{
					!Utils.getToken() && <>
						<button onClick={() => onGetToPlay('/Register')} className={style.applyBtn} type="button">APPLY</button>
						<p className={style.note}>The application will take about 10 minutes to complete.</p>
					</>
				}

			</section>

			<section className={style.tiersSection}>
				<div className={style.tiersHeader}>
					<h2 className={style.tiersTitle}>Membership Tiers</h2>
					<div className={style.underline} />
				</div>
				<div className={style.tiersGrid}>
					{
						pageDataInit?.banner2File?.length !== 0 && pageDataInit?.banner2File?.map((item, key) => (
							<div key={key} className={style.card}>
								<div className={style.cardImageWrap}>
									<img src={Utils.returnFileUrl(item?.abs_file_obj_display)} alt={item.purpose_obj_display} className={style.cardImage} loading="lazy" />
								</div>
								<div className={style.cardBody}>
									<h3 className={style.cardTitle}>{pageDataInit?.banner2Text?.[key]?.text}</h3>
									<ul className={style.perksList}>
										{
											pageDataInit?.banner2Text?.[key]?.sub_text.split(',').map((label, keyL) => (
												<li key={keyL}>{label}</li>
											))
										}
										{/* {tier.perks.map((perk, idx) => ( */}
										{/* <li key={idx}>{perk}</li> */}
										{/* ))} */}
									</ul>
									{
										!Utils.getToken() && <button onClick={() => onGetToPlay('/Register')} className={style.cardApplyBtn} type="button">APPLY</button>
									}

								</div>
							</div>
						))
					}
				</div>

				{/* <div className={style.tiersGrid}>
					{tiers.map(tier => (
						
					))}
				</div> */}
			</section>

			{/* <footer className={style.footer}>
				<div className={style.footerBrand}>ACCEZZ</div>
				<div className={style.footerMeta}>© 2025 ACCEZZ · All rights reserved</div>
				<div className={style.footerLinks}>
					<a href="#" aria-label="Privacy">Privacy</a>
					<span className={style.dot} />
					<a href="#" aria-label="Terms of Service">Terms of Service</a>
				</div>
			</footer> */}
		</div>
	)
}

export default MembershipPage