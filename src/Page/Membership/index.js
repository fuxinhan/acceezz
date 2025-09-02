import React, { useEffect, useState } from "react";

import style from './index.module.css';
import Utils from "../../Util/webCofig";
import { Link, useNavigate } from "react-router-dom";
import image1 from './../../static/Membership1.png'
import image2 from './../../static/Membership2.png'
import image3 from './../../static/Membership3.png'

const tiers = [
	{
		key: 'attender',
		title: 'The Patron',
		subTitle: 'USD 60/month , USD 40 application fee , USD 760 USD/year',
		image: image1,
		perks: [
			"Unlimited Accezz events globally, including private dinner parties at collector's homes, gallery walks, artist studio visits, auctions and more",
			"Unlimited invite-only previews and events hosted by galleries, auction houses and others",
			"VIP passes to selected art fairs globally",
			"Limited edition artist drops only available to Accezz members",
			"3 advisory sessions",
			"Member-only trips and custom itinerary for group OR individuals",
			"5%-20% discounts on selected programming",
			"Unlimited access to virtual events",
			"Connect with all other members anytime",
			"A resource package and directory for the art world, including must-see exhibitions, podcasts, news publications and others",
			"		Discounts at selected framers and book shops",
			"	Monthly newsletter to events recap",
		]
	},
	{
		key: 'attender',
		title: 'The Explorer		',
		subTitle: 'USD 30/month , USD 40 application fee , USD 400 USD/year',
		image: image2,
		perks: [
			"12 Accezz events globally, including private dinner parties at collector's homes, gallery walks, artist studio visits, auctions and more ",
			"10 invite-only previews and events hosted by galleries, auction houses and others",
			"Limited edition artist drops only available to Accezz members",
			"2 advisory sessions",
			"Member-only trips and custom itinerary for group OR individuals",
			"5%-20% discounts on selected programming",
			"Unlimited access to virtual events",
			"Connect with all other members anytime",
			"A resource package and directory for the art world, including must-see exhibitions, podcasts, news publications and others",
			"	Discounts at selected framers and book shops",
			"	Monthly newsletter to events recap",
		]
	},
	{
		key: 'attender',
		title: 'The Introduction		',
		subTitle: 'USD 5/month , USD 40 application fee , USD 100 USD/year',
		image: image3,
		perks: [
			"1 Accezz event globally, including private dinner parties at collector's homes, gallery walks, artist studio visits, auctions and more",
			"4 invite-only previews and events hosted by galleries, auction houses and others",
			"Limited edition artist drops only available to Accezz members",
			"1 advisory sessions",
			"Member-only trips ",
			"Unlimited access to virtual events",
			"A resource package and directory for the art world, including must-see exhibitions, podcasts, news publications and others",
			"	Monthly newsletter to events recap",
		]
	}
];

const bannerId = [8, 9]

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
					if (item === 8) {
						initSelect1Text = pageDataInit.banner1Text
						let toData = { ...initSelect1Text, ...contentDatab }
						setPageDataInit(prev => ({
							...prev,
							banner1Text: toData
						}))
					}

					if (item === 9) {
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

					if (item === 9) {
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
	const SectionIntro = ({ title, desc }) => (
		<div className={style.sectionIntro}>
			<div className={style.sectionTitle}>{title}</div>
			<div className={style.sectionDesc}>{desc}</div>
		</div>
	);
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
				{/* <div className={style.tiersHeader}>
					<h2 className={style.tiersTitle}>Membership </h2>
					<div className={style.underline} />
				</div> */}
				<div className={style.tiersGrid}>
					{
						pageDataInit?.banner2File?.length !== 0 && pageDataInit?.banner2File?.map((item, key) => (
							<div key={key} className={style.card}>
								<div className={style.cardImageWrap}>
									<img src={Utils.returnFileUrl(item?.abs_file_obj_display)} alt={item.purpose_obj_display} className={style.cardImage} loading="lazy" />
								</div>
								<div className={style.cardBody}>
									<h3 className={style.cardTitle}>{pageDataInit?.banner2Text?.[key]?.text}</h3>
									{/* <ul className={style.perksList}>
										{
											pageDataInit?.banner2Text?.[key]?.sub_text?.split(',').map((label, keyL) => (
												<li key={keyL}>{label}</li>
											))
										}
									</ul> */}
									{/* {
										!Utils.getToken() && <button onClick={() => onGetToPlay('/Register')} className={style.cardApplyBtn} type="button">APPLY</button>
									} */}

								</div>
							</div>
						))
					}
				</div>
			</section>
			<section className={style.tiersSection}>
				<div className={style.tiersHeader}>
					<div className={style.underline} />
					<h2 className={style.tiersTitle}>Membership Tiers </h2>
					<div className={style.underline} />
				</div>
				{
					tiers.map((item, key) => (
						<div key={key} className={style.twoColSection}>
							<div className={style.sectionIntro}>
								<div className={style.sectionTitle}>{item.title}	</div>
								<img src={Utils.logoPng()} style={{ width: '100px' }} />
								<div className={style.sectionDesc}>{item.subTitle}</div>
								<div>
									<Link className={style.applyLinkButton} to={'/Register'}>
										Apply
									</Link>
								</div>
							</div>
							<div className={style.split}>
								<div className={style.splitMedia}>
									<img src={item.image} alt="House interior" loading="lazy" />
								</div>
								<div className={style.splitContent}>
									<ul className={style.splitContentUl}>
										{
											item?.perks?.map((it, kt) => <li key={kt} >
												{it}
											</li>)
										}

									</ul>

								</div>
							</div>
						</div>
					))
				}


			</section>
			<section className={style.tiersSection}>
				<div className={style.tiersThings}>
					<h1>
						Important things to note regarding your membership:
					</h1>
					<ul className={style.splitContentUl}>
						<li>
							<span>Flexibility:</span>You can cancel anytime and receive a refund for the remaining months. Please note the activation fee is a one-time fee that is non-refundable.
						</li>
						<li>
							<span>Tier:  </span>Switch between membership tiers as needed, but please note that you can only make one switch per year.
						</li>
						<li>
							<span>Non-Ticketed Events: </span>Many events are included in your membership at no additional cost. For instance, the Chelsea Gallery Walk and Artist Studio events are already part of your membership benefits.

						</li>
						<li>
							<span>Ticketed Events:  </span>Please be aware that ticketed events are not included in the membership fee and will be priced individually. This typically includes exclusive speakers, online courses led by industry professionals, private dinner events, and more.
						</li>
						<li>
							<span>Terms and condition:  </span>After you receive payment is not received within 30 days, you may be required to reapply. If you choose to cancel your membership, you may be required to reapply if you want to reinstate it in the future.
						</li>
						<li>
							<span>Privacy:  </span>When you apply for our membership, we are committed to safeguarding your personal information. By joining, you consent to being photographed at events, which may be shared publicly unless you specify otherwise. Rest assured, we will never sell your data to third parties.

						</li>
					</ul>
				</div>

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