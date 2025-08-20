import React, { useState,useEffect } from "react";
import Style from "./index.module.css"
import { Layout, Button, Drawer, Avatar, Popover } from 'antd';
import { MenuOutlined, RightOutlined } from '@ant-design/icons';
import { Link,useLocation  } from "react-router-dom";
import IsLogin from "../../Util/isLogin";
import Utils from "../../Util/webCofig";

const {Header} = Layout

function HeaderCompoment (){
   // 在组件内获取当前路径
const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuItemsState,setMenuItemsState] = useState('/')
  const menuItems  =  [
    { key: 'Highlights', label: 'HIGHLIGHTS',  hasArrow: true },
    { key: 'Membership', label: 'MEMBERSHIP',   hasArrow: true },
    { key: 'about', label: 'ABOUT',  hasArrow: true },
    { key: 'houses', label: 'HOUSES', hasArrow: true },
    { key: 'bedrooms', label: 'BEDROOMS',  hasArrow: true },
    { key: 'wellness', label: 'WELLNESS',  hasArrow: true },
    { key: 'book', label: 'BOOK',  hasArrow: true },
    { key: 'news', label: 'NEWS',  hasArrow: false },
    { key: 'shop', label: 'SHOP',  hasArrow: true }
  ]
// 根据路径设置激活状态（示例）
useEffect(() => {
  const pathKey = location.pathname.replace('/', '');
  if (menuItems.some(item => item.key === pathKey)) {
    setMenuItemsState(pathKey);
  }
}, [location]);
  const showMobileMenu = () => {
      setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
      setMobileMenuOpen(false);
  };
  const contIsLogin = Utils.getToken()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return(
      <Header className={Style.header}>
      <div className={Style.headerContainer}>
          {/* Logo */}
          <div className={Style.logo}
          onClick={()=>setMenuItemsState('/')}
          >
            <Link to={'/'}>
              ACCEZZ
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={Style.desktopNav}>
              {menuItems.map((item) => (
                  <Link
                      key={item.key}
                      to={`/${item.key}`}
                      className={menuItemsState === item.key ? Style.activeLink : Style.navLink}
                      onClick={()=>setMenuItemsState(item.key)}
                  >
                      {item.label}
                  </Link>
              ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className={Style.mobileMenuButton}>
              <Button
                  type="text"
                  icon={<MenuOutlined />}
                  onClick={showMobileMenu}
                  className={Style.mobileMenuIcon}
              />
          </div>

          {/* Login Button */}
          {
            contIsLogin?<div className={Style.loginCoure}>
                <Popover
                    title={null}
                    arrow={false}
                    content={
                        <div className={Style.loginSeting}>
                            <Button>Personal Center</Button>
                            <Button onClick={()=>{
                                localStorage.clear();
                                window.location.reload(true);
                            }}>Log out</Button>
                        </div>
                    }
                    color={'#f8f6f2'}
                >
                    {userInfo.user_info.cover&&<img src={userInfo.user_info.cover} alt={userInfo.user_info.username} />}
                    {!userInfo.user_info.cover&&<span className={Style.loginUserName}>{userInfo.user_info.username}</span>}
                </Popover>
                {/* <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=900&fit=crop" /> */}
                
            </div>:<div className={Style.loginButton}>
            <Button 
                ghost 
                className={Style.loginBtn}
            >
              <Link to={'/Login'}
                   onClick={()=>setMenuItemsState('/')}
              > 
                  LOGIN
              </Link> 
            </Button>
        </div>
          }
          
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
              <div className={Style.mobileActionButtons}>
                  <Button className={Style.subscribeBtn}>
                      SUBSCRIBE
                  </Button>
                  <Button className={Style.signInBtn}>
                      SIGN IN
                  </Button>
              </div>

              {/* Language Selector */}
              <div className={Style.languageSelector}>
                  <span className={Style.languageText}>LANGUAGE</span>
                  <RightOutlined className={Style.languageArrow} />
              </div>
          </div>
      </Drawer>
  </Header>
    )
}

export default HeaderCompoment