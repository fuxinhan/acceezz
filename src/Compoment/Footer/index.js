import React, { useState } from "react";
import Style from './index.module.css';
import { Layout, Button, Select, Divider } from 'antd';
import { AppstoreOutlined, DownOutlined } from '@ant-design/icons';

const { Footer } = Layout;

function FooterCompoment() {
    const [language, setLanguage] = useState('English (UK)');

    const footerColumns = [
        {
            title: "Policies",
            links: [
                { text: "Terms and policies", href: "#" },
                { text: "Opt out of sale", href: "#" },
                { text: "Personal data request", href: "#" },
                { text: "Supplier relations", href: "#" }
            ]
        },
        {
            title: "Membership",
            links: [
                { text: "Membership", href: "#" },
                { text: "House Foundations", href: "#" },
                { text: "Careers", href: "#" },
                { text: "Our partners", href: "#" }
            ]
        },
        {
            title: "Contact",
            links: [
                { text: "Contact", href: "#" },
                { text: "Download app", href: "#" },
                { text: "About", href: "#" },
                { text: "Legal Notice - France", href: "#" }
            ]
        },
        {
            title: "Other Services",
            links: [
                { text: "Bedrooms gift cards", href: "#" },
                { text: "@sohohouse", href: "#" },
                { text: "Investor Relations", href: "#" }
            ]
        }
    ];

    return (
        <Footer className={Style.footer}>
            <div className={Style.footerContainer}>
                {/* 上部分：导航列和订阅区域 */}
                <div className={Style.footerUpper}>
                    {/* 导航列 */}
                    <div className={Style.footerColumns}>
                        {footerColumns.map((column, index) => (
                            <div key={index} className={Style.footerColumn}>
                                <h4 className={Style.columnTitle}>{column.title}</h4>
                                <ul className={Style.columnLinks}>
                                    {column.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href={link.href} className={Style.footerLink}>
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* 订阅区域 */}
                    <div className={Style.subscriptionSection}>
                        <h3 className={Style.subscriptionTitle}>Subscribe</h3>
                        <p className={Style.subscriptionDescription}>
                            Sign up to hear about events, news and updates from ACCZZ and our other businesses.
                        </p>
                        <Button className={Style.subscribeButton}>
                            Subscribe
                        </Button>
                    </div>
                </div>

                {/* 分隔线 */}
                <Divider className={Style.footerDivider} />

                {/* 下部分：品牌信息和版权 */}
                <div className={Style.footerLower}>
                    <div className={Style.footerLowerLeft}>
                        <div className={Style.brandInfo}>
                            <AppstoreOutlined className={Style.brandIcon} />
                            <span className={Style.brandName}>ACCZZ</span>
                        </div>
                        <div className={Style.languageSelector}>
                            <Select
                                value={language}
                                onChange={setLanguage}
                                suffixIcon={<DownOutlined className={Style.languageArrow} />}
                                className={Style.languageSelect}
                                options={[
                                    { value: 'English (UK)', label: 'English (UK)' },
                                    { value: 'English (US)', label: 'English (US)' },
                                    { value: '中文', label: '中文' }
                                ]}
                            />
                        </div>
                    </div>
                    <div className={Style.copyright}>
                        2025
                    </div>
                </div>
            </div>
        </Footer>
    );
}

export default FooterCompoment;