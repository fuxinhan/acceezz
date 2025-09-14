import React, { useState, useEffect } from "react";
import Style from "./index.module.css"
import { Layout, Button, Drawer, Popover } from 'antd';
import { MenuOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
// import IsLogin from "../../Util/isLogin";
import Utils from "../../Util/webCofig";
import ActionType from "../../Store/actionType";

const { Header } = Layout

function HeaderCompoment() {
    // 在组件内获取当前路径
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [menuItemsState, setMenuItemsState] = useState('/')
    const [userName, setUserName] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const menuItems = Utils.getToken() ? [
        // { key: 'Highlights', label: 'HIGHLIGHTS', hasArrow: true },
        // { key: 'Membership', label: 'MEMBERSHIP', hasArrow: true },
        { key: 'Resources', label: 'RESOURCES', hasArrow: true },
        // { key: 'About', label: 'ABOUT', hasArrow: true },
    ] : [
        { key: 'Highlights', label: 'HIGHLIGHTS', hasArrow: true },
        { key: 'Membership', label: 'MEMBERSHIP', hasArrow: true },
        // { key: 'Resources', label: 'RESOURCES', hasArrow: true },
        { key: 'About', label: 'ABOUT', hasArrow: true },
    ]
    const onGetUserInfo = () => {
        Utils.get({
            url: 'api_v1/user/-1/',
            actionType: ActionType().GetUserInfo,
            Success: (data) => {
                let raw = localStorage.getItem('userInfo');
                let prev = raw ? JSON.parse(raw) : {};
                prev.user_info = {
                    ...prev?.user_info,
                    ...data,
                }
                localStorage.setItem('userInfo', JSON.stringify(prev))
                setUserInfo(prev)
                //
                console.log('data', prev);
                // localStorage.setItem('userInfo', JSON.stringify({ ...prev, ...data }))
            }
        })
    }
    useEffect(() => {
        // setProfile(toInitialProfile());

    }, []);
    // 根据路径设置激活状态（示例）
    useEffect(() => {
        if (Utils.getToken()) {
            onGetUserInfo()
        }
        const pathKey = location.pathname.replace('/', '');
        if (menuItems.some(item => item.key === pathKey)) {
            setMenuItemsState(pathKey);
        }
        const loadUserInfo = () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (userInfo && userInfo.user_info && userInfo.user_info.username) {
                    setUserName(userInfo.user_info.username);
                    setUserInfo(userInfo)
                } else {
                    setUserName('Accezz');
                }
            } catch (e) {
                setUserName('Accezz');
            }
        };
        // 初始加载用户信息
        loadUserInfo();
        // 监听头像更新事件
        const handleAvatarUpdate = (event) => {
            loadUserInfo(); // 重新加载用户信息
        };

        window.addEventListener('userAvatarUpdated', handleAvatarUpdate);

        // 清理事件监听器
        return () => {
            window.removeEventListener('userAvatarUpdated', handleAvatarUpdate);
        };
    }, [location]);

    const showMobileMenu = () => {
        setMobileMenuOpen(true);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };
    const contIsLogin = Utils.getToken()
    // 获取导航函数
    const navigate = useNavigate();
    return (
        <Header className={Style.header}>
            <div className={Style.headerContainer}>
                <div className={Style.HeaderContainerTO}>
                    {/* Logo */}
                    <div className={Style.logo}
                        onClick={() => setMenuItemsState('/')}
                    >
                        <Link to={'/'}>
                            <img src={Utils.logoPng()} alt="Logo" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className={Style.desktopNav}>
                        {menuItems.map((item) => (
                            <Link
                                key={item.key}
                                to={`/${item.key}`}
                                className={menuItemsState === item.key ? Style.activeLink : Style.navLink}
                                onClick={() => setMenuItemsState(item.key)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                </div>



                {/* Login Button */}
                {
                    contIsLogin ? <div className={Style.loginCoure}>
                        <Popover
                            title={null}
                            arrow={false}
                            content={
                                <div className={Style.loginSeting}>
                                    <Button><Link to={'/UserInfo'}>Personal Center</Link></Button>
                                    <Button onClick={() => Utils.LogOut()}>Log out</Button>
                                </div>
                            }
                        // color={'#f8f6f2'}
                        >
                            {userInfo && userInfo.user_info.cover_display && <img src={Utils.returnFileUrl(userInfo.user_info.cover_display)} alt={userInfo.user_info.username} />}
                            {userInfo && !userInfo.user_info.cover_display && <span className={Style.loginUserName}>{userInfo.user_info.username}</span>}
                        </Popover>
                        {/* <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=900&fit=crop" /> */}

                    </div> : <div className={Style.loginButton}>
                        <Button
                            ghost
                            className={Style.loginBtn}
                            onClick={() => {
                                setMenuItemsState('/')
                            }}
                        >
                            <Link to={'/Login'} >
                                LOGIN
                            </Link>
                        </Button>
                    </div>
                }
                {/* Mobile Menu Button */}
                <div className={Style.mobileMenuButton}>
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={showMobileMenu}
                        className={Style.mobileMenuIcon}
                    />
                </div>
            </div>

            {/* Mobile Drawer */}
            <Drawer
                title=""
                placement="right"
                onClose={closeMobileMenu}
                open={mobileMenuOpen}
                className={Style.mobileDrawer}
                width="80%"
                // headerStyle={{ display: 'none' }}
                // bodyStyle={{ padding: 0 }}
                closable={false}
            >
                <div className={Style.mobileDrawerContent}>
                    {/* Close Button */}
                    <div className={Style.mobileCloseButton}>
                        <div>
                            {
                                contIsLogin && <>
                                    {userInfo && <img src={userInfo.user_info.cover} alt={userInfo?.user_info?.username} />}
                                    {userName && <span className={Style.loginUserName}>{userInfo?.user_info?.username}</span>}
                                </>
                            }
                        </div>
                        <Button
                            type="text"
                            onClick={closeMobileMenu}
                            className={Style.closeBtn}
                        >
                            ✕
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className={Style.mobileNav}>
                        {
                            contIsLogin && <Link className={Style.mobileNavItem} to={'/UserInfo'} onClick={closeMobileMenu}>
                                Personal Center
                            </Link>
                        }
                        {menuItems.map((item) => (
                            <Link
                                key={item.key}
                                to={`/${item.key}`}
                                className={Style.mobileNavItem}
                                onClick={closeMobileMenu}
                            >
                                <span className={Style.mobileNavText}>{item.label}</span>
                                {item.hasArrow && <RightOutlined className={Style.mobileNavArrow} />}
                            </Link>
                        ))}

                    </div>

                    {/* Mobile Action Buttons */}
                    {
                        !contIsLogin && <div className={Style.mobileActionButtons}>
                            {/* <Button className={Style.subscribeBtn} onClick={() => {
                                navigate('/Register')
                                setMobileMenuOpen(false)
                            }}>
                                SUBSCRIBE
                            </Button> */}
                            <Button className={Style.signInBtn} >
                                <Link to={'/Login'} onClick={() => {
                                    setMobileMenuOpen(false)
                                }}>
                                    SIGN IN
                                </Link>
                            </Button>
                        </div>
                    }
                    {
                        contIsLogin && <div className={Style.mobileActionButtons}>

                            <Button className={Style.signInBtn} onClick={() => {
                                Utils.LogOut()
                                setMobileMenuOpen(false)
                            }}>
                                Log out
                            </Button>
                        </div>
                    }

                    {/* Language Selector */}
                    {/* <div className={Style.languageSelector}>
                  <span className={Style.languageText}>LANGUAGE</span>
                  <RightOutlined className={Style.languageArrow} />
              </div> */}
                </div>
            </Drawer>
        </Header>
    )
}

export default HeaderCompoment