import React, { useEffect, useState } from "react";

import style from './index.module.css';
import Utils from "../../Util/webCofig";

const pillars = [
	{ key: 'community', title: 'Community', desc: '连接全球创意社群，提供聚会、交流与灵感的空间。' },
	{ key: 'creativity', title: 'Creativity', desc: '支持创意实践，从餐饮、音乐到艺术与文化活动。' },
	{ key: 'sustainability', title: 'Sustainability', desc: '关注可持续发展，在设计与运营中尽量降低环境影响。' },
	{ key: 'wellbeing', title: 'Wellbeing', desc: '关照身心平衡，提供健身、泳池与多元健康体验。' },
];
const bannerId = [13, 14, 15, 16]
const AboutPage = () => {
	const [pageDataInitText, setPageDataInitText] = useState({
		13: null,
		14: null,
		15: null,
		16: null,
	})
	const [pageDataInitFile, setPageDataInitFile] = useState({
		13: null,
		14: null,
		15: null,
		16: null,

	})
	const onGetInitData = () => {
		bannerId.map((item) => {
			Utils.get({
				url: 'api_back/resources_text/',
				params: {
					purpose_obj: item,
					page: 1,
					pagesize: 100
				},
				actionType: 'getAboutInit' + item,
				Success: (data) => {
					let contentDatab = data?.results
					setPageDataInitText(pre => ({ ...pre, [item]: contentDatab }))
				}
			})
			Utils.get({
				url: 'api_back/resources_file/',
				params: {
					purpose_obj: item,
					page: 1,
					pagesize: 100
				},
				actionType: 'getAboutInitF' + item,
				Success: (data) => {
					let contentDatab = data?.results
					setPageDataInitFile(pre => ({ ...pre, [item]: contentDatab }))
				}
			})
		})
	}

	useEffect(() => {
		onGetInitData()
	}, [])
	return (
		<div className={style.AboutPage}>
			<section className={style.hero}>
				<h1 className={style.title}>{pageDataInitText?.[13]?.[0]?.text}</h1>
				<p className={style.subtitle}
					dangerouslySetInnerHTML={{ __html: pageDataInitText?.[13]?.[0]?.sub_text }}
				/>
			</section>

			<section className={style.pillars}>
				{pageDataInitText?.[14]?.map(p => (
					<div key={p.key} className={style.pillarCard}>
						<div className={style.pillarBadge} />
						<h3 className={style.pillarTitle}>{p.text}</h3>
						<p className={style.pillarDesc}>{p.sub_text}</p>
					</div>
				))}
			</section>
			{
				pageDataInitFile?.[15]?.map((item, key) => {
					const isOdd = key % 2 !== 0;
					// 动态设置className：奇数用split，偶数用split+reverse
					const sectionClass = isOdd
						? `${style.split} ${style.reverse}`
						: style.split;
					return (
						<section className={sectionClass}>
							<div className={style.splitMedia}>
								<img src={Utils.returnFileUrl(item.abs_file_obj_display)} alt="House interior" loading="lazy" />
							</div>
							<div className={style.splitContent}>
								<h2>
									{
										pageDataInitText?.[15]?.[key]?.text
									}
								</h2>
								<p
									dangerouslySetInnerHTML={{ __html: pageDataInitText?.[15]?.[key]?.sub_text }}
								/>

							</div>
						</section>
					)
				})
			}




			<section className={style.stats}>
				{
					pageDataInitText?.[16]?.map((item, key) => {
						return (
							<div className={style.statItem}>
								<strong>{item.text}</strong>
								<span>{item.sub_text}</span>
							</div>
						)
					})
				}


			</section>
		</div>
	)
}

export default AboutPage