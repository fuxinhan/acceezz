import React, { useEffect, useMemo, useState } from "react";
import style from './index.module.css';
import { Avatar, Button, Form, Input, DatePicker, Modal, message } from 'antd';

const MENU = {
    PROFILE: 'profile',
    PASSWORD: 'password',
    PREFERENCES: 'preferences',
    MEMBERSHIP: 'membership',
    SIGNOUT: 'signout'
};

function readUserFromStorage(){
    try{
        const raw = localStorage.getItem('userInfo');
        if(!raw) return null;
        return JSON.parse(raw);
    }catch{ return null; }
}

function toInitialProfile(){
    const stored = readUserFromStorage();
    const info = stored?.user_info || {};
    return {
        username: info.username || 'Member',
        email: info.email || 'member@example.com',
        avatar: info.cover || '',
        location: info.location || '—',
        dateOfBirth: info.dateOfBirth || null,
        address: info.address || '',
        phone: info.phone || ''
    };
}

const UserInfoPage = ()=>{
    const [active, setActive] = useState(MENU.PROFILE);
    const [profile, setProfile] = useState(toInitialProfile());
    const [editOpen, setEditOpen] = useState(false);
    const [pwdOpen, setPwdOpen] = useState(false);

    useEffect(()=>{
        setProfile(toInitialProfile());
    },[]);

    const handleEditSubmit = (values)=>{
        /* 打印提交字段 */
        // 合并默认值
        const submitted = { ...profile, ...values };
        // 控制台输出
        // eslint-disable-next-line no-console
        console.log('profile_update', submitted);
        message.success('已打印到控制台');
        setEditOpen(false);
        setProfile(prev=>({ ...prev, ...values }));
    };

    const handlePwdSubmit = (values)=>{
        // eslint-disable-next-line no-console
        console.log('change_password', values);
        message.success('已打印到控制台');
        setPwdOpen(false);
    };

    const handleProposeSubmit = (values)=>{
        // eslint-disable-next-line no-console
        console.log('propose_member', values);
        message.success('已打印到控制台');
    };

    const signOut = ()=>{
        localStorage.clear();
        window.location.reload(true);
    };

    const SideMenu = useMemo(()=> (
        <aside className={style.sideMenu}>
            <div className={active===MENU.PROFILE?`${style.menuItem} ${style.active}`:style.menuItem} onClick={()=>setActive(MENU.PROFILE)}>
                <span>Profile</span>
                <span className={style.arrow}>›</span>
            </div>
            <div className={active===MENU.PASSWORD?`${style.menuItem} ${style.active}`:style.menuItem} onClick={()=>setActive(MENU.PASSWORD)}>
                <span>Change password</span>
                <span className={style.arrow}>›</span>
            </div>
            <div className={active===MENU.PREFERENCES?`${style.menuItem} ${style.active}`:style.menuItem} onClick={()=>setActive(MENU.PREFERENCES)}>
                <span>Preferences</span>
                <span className={style.arrow}>›</span>
            </div>
            <div className={active===MENU.MEMBERSHIP?`${style.menuItem} ${style.active}`:style.menuItem} onClick={()=>setActive(MENU.MEMBERSHIP)}>
                <span>Membership application</span>
                <span className={style.arrow}>›</span>
            </div>
            <div className={style.menuItem} onClick={signOut}>
                <span>Sign out</span>
                <span className={style.arrow}>›</span>
            </div>
        </aside>
    ),[active]);

    return(
        <div className={style.UserInfoPage}>
            <div className={style.layout}>
                {SideMenu}
                <main className={style.content}>
                    {active===MENU.PROFILE && (
                        <section className={style.section}>
                            <header className={style.headerBar}>
                                <h2 className={style.title}>Profile</h2>
                                <p className={style.sub}>Here you can edit your phone number and email address. This information is not visible to others. If you need to amend your personal details please get in touch. <a className={style.link} href="#">Contact us</a></p>
                            </header>

                            <div className={style.profileTop}>
                                <div className={style.leftIntro}>
                                    <Avatar size={80} src={profile.avatar}>{profile.username?.[0]}</Avatar>
                                    <div className={style.nameBlock}>
                                        <div className={style.name}>{profile.username}</div>
                                        <div className={style.location}>Location: {profile.location || '—'}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={style.fieldList}>
                                <div className={style.fieldRow}>
                                    <div className={style.fieldLabel}>Email</div>
                                    <div className={style.fieldValue}>{profile.email}</div>
                                </div>
                                <div className={style.fieldRow}>
                                    <div className={style.fieldLabel}>Date of birth</div>
                                    <div className={style.fieldValue}>{profile.dateOfBirth || '—'}</div>
                                </div>
                                <div className={style.fieldRow}>
                                    <div className={style.fieldLabel}>Address</div>
                                    <div className={style.fieldValue}>{profile.address || '—'}</div>
                                </div>
                                <div className={style.fieldRow}>
                                    <div className={style.fieldLabel}>Phone</div>
                                    <div className={style.fieldValue}>{profile.phone || '—'}</div>
                                </div>
                            </div>

                            <Button className={style.primaryBtn} onClick={()=>setEditOpen(true)}>Edit information</Button>

                            <Modal
                                title="Edit profile"
                                open={editOpen}
                                onCancel={()=>setEditOpen(false)}
                                footer={null}
                                destroyOnClose
                            >
                                <Form layout="vertical" initialValues={profile} onFinish={handleEditSubmit}>
                                    <Form.Item label="Email" name="email" rules={[{ required:true, message:'请输入邮箱' }]}>
                                        <Input placeholder="your@email.com"/>
                                    </Form.Item>
                                    <Form.Item label="Date of birth" name="dateOfBirth">
                                        <DatePicker style={{ width:'100%' }} />
                                    </Form.Item>
                                    <Form.Item label="Address" name="address">
                                        <Input placeholder="Address"/>
                                    </Form.Item>
                                    <Form.Item label="Phone" name="phone">
                                        <Input placeholder="Phone"/>
                                    </Form.Item>
                                    <div className={style.modalActions}>
                                        <Button onClick={()=>setEditOpen(false)}>Cancel</Button>
                                        <Button type="primary" htmlType="submit">Save</Button>
                                    </div>
                                </Form>
                            </Modal>
                        </section>
                    )}

                    {active===MENU.PASSWORD && (
                        <section className={style.section}>
                            <header className={style.headerBar}>
                                <h2 className={style.title}>Change password</h2>
                            </header>
                            <Form layout="vertical" className={style.card} onFinish={handlePwdSubmit}>
                                <Form.Item label="Current password" name="oldPassword" rules={[{ required:true, message:'请输入当前密码' }]}>
                                    <Input.Password placeholder="Current password"/>
                                </Form.Item>
                                <Form.Item label="New password" name="newPassword" rules={[{ required:true, message:'请输入新密码' }]}>
                                    <Input.Password placeholder="New password"/>
                                </Form.Item>
                                <Form.Item label="Confirm password" name="confirmPassword" dependencies={["newPassword"]} rules={[{ required:true, message:'请确认密码' }]}>
                                    <Input.Password placeholder="Confirm password"/>
                                </Form.Item>
                                <Button className={style.primaryBtn} htmlType="submit">Update password</Button>
                            </Form>
                        </section>
                    )}

                    {active===MENU.MEMBERSHIP && (
                        <section className={style.section}>
                            <header className={style.headerBar}>
                                <h2 className={style.title}>Membership application</h2>
                            </header>
                            <div className={style.card}>
                                <div className={style.metaGrid}>
                                    <div><div className={style.metaLabel}>Tier</div><div className={style.metaValue}>—</div></div>
                                    <div><div className={style.metaLabel}>Join date</div><div className={style.metaValue}>—</div></div>
                                    <div><div className={style.metaLabel}>Expiry</div><div className={style.metaValue}>—</div></div>
                                </div>
                            </div>

                            <div className={style.card}>
                                <div className={style.blockTitle}>Propose a new member</div>
                                <Form layout="inline" onFinish={handleProposeSubmit} className={style.inlineForm}>
                                    <Form.Item name="name" rules={[{ required:true, message:'请输入姓名' }]}>
                                        <Input placeholder="Name"/>
                                    </Form.Item>
                                    <Form.Item name="email" rules={[{ required:true, message:'请输入Email' }]}>
                                        <Input placeholder="Email"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">Submit</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </section>
                    )}

                    {active===MENU.PREFERENCES && (
                        <section className={style.section}>
                            <header className={style.headerBar}>
                                <h2 className={style.title}>Preferences</h2>
                                <p className={style.sub}>You can set your basic preferences here.</p>
                            </header>
                            <div className={style.card}>No preferences yet.</div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    )
}

export default UserInfoPage