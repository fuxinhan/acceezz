import React, { useEffect, useMemo, useState, useRef } from "react";
import style from './index.module.css';
import { Avatar, Button, Form, Input, DatePicker, Modal, message, Slider } from 'antd';
import Utils from "../../Util/webCofig";
import ActionType from "../../Store/actionType";
import dayjs from "dayjs";

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
        avatar: info.cover || null,
        location: info.location || '—',
        date_of_birth: info.date_of_birth || null,
        address: info.address || '',
        phone: info.phone || ''
    };
}

const UserInfoPage = ()=>{
    const [active, setActive] = useState(MENU.PROFILE);
    const [profile, setProfile] = useState(toInitialProfile());
    const [editOpen, setEditOpen] = useState(false);
    const [pwdOpen, setPwdOpen] = useState(false);

    // 头像裁剪弹窗与状态
    const [avatarOpen, setAvatarOpen] = useState(false);
    const [rawImageSrc, setRawImageSrc] = useState(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const dragStateRef = useRef({ dragging:false, startX:0, startY:0, originX:0, originY:0 });
    const pinchRef = useRef({ startDistance: 0, startScale: 1 });
    const imgRef = useRef(null);
    const fileInputRef = useRef(null);
    const cropBoxRef = useRef(null);

    const onGetUserInfo = ()=>{
        Utils.get({
            url:'api_v1/user/-1/',
            actionType:ActionType().GetUserInfo,
            Success:(data)=>{
                setProfile((prev)=>({...prev,...data}))
            }
        })
    }
    useEffect(()=>{
        setProfile(toInitialProfile());
        onGetUserInfo()
    },[]);

    // 修改用户信息

    const handleEditSubmit = (values)=>{
        /* 打印提交字段 */
        // 合并默认值
        const submitted = { ...values };
        
        // 控制台输出
        // eslint-disable-next-line no-console
        // console.log('profile_update', submitted);
        
        Utils.patch({
            url:'/api_v1/user/-1/',
            data:submitted,
            actionType:ActionType().PatchUserInfo,
            Success:()=>{
                onGetUserInfo()
                setProfile(prev=>({ ...prev, ...values }));
                message.success('√');
            }
        })
        setEditOpen(false);
        
    };

    const handlePwdSubmit = (values)=>{
        // eslint-disable-next-line no-console
        // console.log('change_password', values);
        message.success('已打印到控制台');
        setPwdOpen(false);
    };

    const handleProposeSubmit = (values)=>{
        // eslint-disable-next-line no-console
        // console.log('propose_member', values);
        message.success('已打印到控制台');
    };

    const signOut = ()=>{
        localStorage.clear();
        window.location.reload(true);
    };

    // 头像相关逻辑
    const onOpenAvatar = ()=>{
        setAvatarOpen(true);
    };

    const onPickFile = ()=>{
        fileInputRef.current?.click();
    };

    const onFileChange = (e)=>{
        const file = e.target.files?.[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = ()=>{
            setRawImageSrc(reader.result);
            setScale(1);
            setOffset({ x:0, y:0 });
        };
        reader.readAsDataURL(file);
        // 重置 input 以便可再次选择相同文件
        e.target.value = '';
    };

    const startDrag = (clientX, clientY)=>{
        dragStateRef.current = {
            dragging: true,
            startX: clientX,
            startY: clientY,
            originX: offset.x,
            originY: offset.y
        };
    };

    const onMouseDown = (e)=>{
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
    };

    const onTouchStart = (e)=>{
        const touches = e.touches;
        if(touches.length === 1) {
            // 单指触摸 - 拖拽
            const t = touches[0];
            startDrag(t.clientX, t.clientY);
        } else if(touches.length === 2) {
            // 双指触摸 - 缩放
            const t1 = touches[0];
            const t2 = touches[1];
            const distance = Math.sqrt(
                Math.pow(t2.clientX - t1.clientX, 2) + 
                Math.pow(t2.clientY - t1.clientY, 2)
            );
            pinchRef.current = { startDistance: distance, startScale: scale };
        }
    };

    const doDrag = (clientX, clientY)=>{
        const ds = dragStateRef.current;
        if(!ds.dragging) return;
        const dx = clientX - ds.startX;
        const dy = clientY - ds.startY;
        
        setOffset({ x: ds.originX + dx, y: ds.originY + dy });



        // // // 计算边界限制
        // const boxSize = cropBoxRef.current?.clientWidth || 320;
        // const img = imgRef.current;
        // if(!img) return;
        
        // // 图片实际渲染尺寸
        // const naturalW = img.naturalWidth;
        // const naturalH = img.naturalHeight;
        // const baseScale = Math.max(boxSize / naturalW, boxSize / naturalH);
        // const renderScale = baseScale * scale;
        // const renderW = naturalW * renderScale;
        // const renderH = naturalH * renderScale;
        
        // // // 计算边界：图片边缘不能超出裁剪框
        // const maxOffsetX = Math.max(0, (renderW - boxSize) / 2);
        // const maxOffsetY = Math.max(0, (renderH - boxSize) / 2);
        
        // // 应用边界限制
        // const newX = clamp(ds.originX + dx, -maxOffsetX, maxOffsetX);
        // const newY = clamp(ds.originY + dy, -maxOffsetY, maxOffsetY);
        
        // setOffset({ x: newX, y: newY });
    };

    const onMouseMove = (e)=>{
        doDrag(e.clientX, e.clientY);
    };

    const onTouchMove = (e)=>{
        const touches = e.touches;
        if(touches.length === 1) {
            // 单指触摸 - 拖拽
            const t = touches[0];
            doDrag(t.clientX, t.clientY);
        } else if(touches.length === 2) {
            // 双指触摸 - 缩放
            const t1 = touches[0];
            const t2 = touches[1];
            const distance = Math.sqrt(
                Math.pow(t2.clientX - t1.clientX, 2) + 
                Math.pow(t2.clientY - t1.clientY, 2)
            );
            
            const { startDistance, startScale } = pinchRef.current;
            if(startDistance > 0) {
                const scaleRatio = distance / startDistance;
                const newScale = clamp(startScale * scaleRatio, 0.5, 4);
                setScale(newScale);
                
                // 缩放后重新计算边界限制
                if(imgRef.current && cropBoxRef.current) {
                    const boxSize = cropBoxRef.current.clientWidth;
                    const img = imgRef.current;
                    const naturalW = img.naturalWidth;
                    const naturalH = img.naturalHeight;
                    const baseScale = Math.max(boxSize / naturalW, boxSize / naturalH);
                    const renderScale = baseScale * newScale;
                    const renderW = naturalW * renderScale;
                    const renderH = naturalH * renderScale;
                    
                    const maxOffsetX = Math.max(0, (renderW - boxSize) / 2);
                    const maxOffsetY = Math.max(0, (renderH - boxSize) / 2);
                    
                    setOffset(prev => ({
                        x: clamp(prev.x, -maxOffsetX, maxOffsetX),
                        y: clamp(prev.y, -maxOffsetY, maxOffsetY)
                    }));
                }
            }
        }
    };

    const stopDrag = ()=>{
        dragStateRef.current.dragging = false;
    };

    const clamp = (val, min, max)=> Math.max(min, Math.min(max, val));

    // 鼠标滚轮缩放处理
    const onWheel = (e)=>{
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newScale = clamp(scale + delta, 0.5, 4);
        setScale(newScale);
        
        // 缩放后重新计算边界限制
        if(imgRef.current && cropBoxRef.current) {
            const boxSize = cropBoxRef.current.clientWidth;
            const img = imgRef.current;
            const naturalW = img.naturalWidth;
            const naturalH = img.naturalHeight;
            const baseScale = Math.max(boxSize / naturalW, boxSize / naturalH);
            const renderScale = baseScale * newScale;
            const renderW = naturalW * renderScale;
            const renderH = naturalH * renderScale;
            
            const maxOffsetX = Math.max(0, (renderW - boxSize) / 2);
            const maxOffsetY = Math.max(0, (renderH - boxSize) / 2);
            
            setOffset(prev => ({
                x: clamp(prev.x, -maxOffsetX, maxOffsetX),
                y: clamp(prev.y, -maxOffsetY, maxOffsetY)
            }));
        }
    };

    const performCrop = ()=>{
        const img = imgRef.current;
        const box = cropBoxRef.current;
        if(!img || !box) return null;

        const boxSize = box.clientWidth; // 方形
        const canvas = document.createElement('canvas');
        canvas.width = boxSize;
        canvas.height = boxSize;
        const ctx = canvas.getContext('2d');
        if(!ctx) return null;

        // 图片实际渲染尺寸
        const naturalW = img.naturalWidth;
        const naturalH = img.naturalHeight;

        // 渲染到容器内时的目标宽高（以容器为基准的缩放）
        // 让图片较短的一边正好与裁剪框同尺寸，再乘以 scale
        const baseScale = Math.max(boxSize / naturalW, boxSize / naturalH);
        const renderScale = baseScale * scale;
        const renderW = naturalW * renderScale;
        const renderH = naturalH * renderScale;

        // 图片左上角相对裁剪框中心的偏移
        const centerX = boxSize / 2 + offset.x;
        const centerY = boxSize / 2 + offset.y;
        const drawX = centerX - renderW / 2;
        const drawY = centerY - renderH / 2;

        ctx.clearRect(0,0,boxSize,boxSize);
        ctx.drawImage(img, drawX, drawY, renderW, renderH);
        return canvas.toDataURL('image/png');
    };
    // 修改头像
    const onSubmitAvatar = ()=>{
        const dataUrl = performCrop();
        if(!dataUrl){
            message.error('裁剪失败，请重试');
            return;
        }
           // 将 base64 转换为二进制数据
           const base64Data = dataUrl.split(',')[1]; // 移除 data:image/xxx;base64, 前缀
           const binaryString = atob(base64Data);
           const bytes = new Uint8Array(binaryString.length);
           for (let i = 0; i < binaryString.length; i++) {
               bytes[i] = binaryString.charCodeAt(i);
           }
           
           // 创建 Blob 对象
           const blob = new Blob([bytes], { type: 'image/jpeg' });
           
        const formData = new FormData();
        formData.append("cover", blob, "avatar.jpg"); // 使用二进制 blob  
        Utils.post({
            url:"programmer/set_password/",
            data:formData,
            actionType:ActionType().PostUserCover,
            Success:(data)=>{
                let stored = readUserFromStorage();
                let userSub = {
                    ...stored.user_info,
                    cover:data.src
                }
                stored['user_info']  = userSub
                localStorage.setItem("userInfo", JSON.stringify(stored));
                // 更新页面状态，立即显示新头像
                setProfile(prev=>({ ...prev, avatar: data.src }));
                
                // 触发自定义事件，通知 Header 组件更新头像
                window.dispatchEvent(new CustomEvent('userAvatarUpdated', {
                    detail: { avatar: data.src }
                }));
            },
            Error:(data)=>{
                console.log(data)
            }
        })
        // eslint-disable-next-line no-console
        console.log('submit_avatar', { avatarDataUrl: dataUrl });
        message.success('已打印到控制台');
        setAvatarOpen(false);
    };
    //左侧菜单栏
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
                                    <div className={style.avatarClickable} onClick={onOpenAvatar} title="点击更换头像">
                                        <Avatar size={80} src={Utils.returnFileUrl(profile.avatar) } >{profile.username?.[0]}</Avatar>
                                    </div>
                                    <div className={style.nameBlock}>
                                        <div className={style.name}>{profile.username}</div>
                                        <div className={style.location}>Location: {profile.location || '—'}</div>
                                    </div>
                                </div>
                            </div>
                            {console.log(profile)}
                            <div className={style.fieldList}>
                                <div className={style.fieldRow}>
                                    <div className={style.fieldLabel}>Email</div>
                                    <div className={style.fieldValue}>{profile.email}</div>
                                </div>
                                <div className={style.fieldRow}>
                                    <div className={style.fieldLabel}>Date of birth</div>
                                    <div className={style.fieldValue}>{profile.date_of_birth || '—'}</div>
                                </div>
                                <div className={style.fieldRow}>
                                    <div className={style.fieldLabel}>Location</div>
                                    <div className={style.fieldValue}>{profile.location || '—'}</div>
                                </div>
                                <div className={style.fieldRow}>
                                    <div className={style.fieldLabel}>Phone</div>
                                    <div className={style.fieldValue}>{profile.phone || '—'}</div>
                                </div>
                                <div className={style.fieldRow}>
                                    <div className={style.fieldLabel}>Gender</div>
                                    <div className={style.fieldValue}>{profile.gender || '—'}</div>
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
                                    <Form.Item 
                                    label="Date of birth" 
                                    name="date_of_birth"  
                                    getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
                                    normalize={(value) => value ? dayjs(value).format('YYYY-MM-DD') : null}
                                    >
                                        <DatePicker style={{ width:'100%' }} />
                                    </Form.Item>
                                    <Form.Item label="Location" name="location">
                                        <Input placeholder="location"/>
                                    </Form.Item>
                                    <Form.Item label="Phone" name="phone">
                                        <Input placeholder="Phone"/>
                                    </Form.Item>
                                    <Form.Item label="Gender" name="gender">
                                        <Input placeholder="Ghone"/>
                                    </Form.Item>
                                    <div className={style.modalActions}>
                                        <Button onClick={()=>setEditOpen(false)}>Cancel</Button>
                                        <Button type="primary" htmlType="submit">Save</Button>
                                    </div>
                                </Form>
                            </Modal>

                            {/* 更换头像弹窗 */}
                            <Modal
                                title="Change avatar"
                                open={avatarOpen}
                                onCancel={()=>setAvatarOpen(false)}
                                footer={null}
                                destroyOnClose
                                className={style.avatarModal}
                            >
                                <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={onFileChange} />
                                <div className={style.cropperBody}>
                                    {!rawImageSrc ? (
                                        <div className={style.emptyUploader}>
                                            <Button type="primary" onClick={onPickFile}>选择图片</Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div
                                                className={style.cropBox}
                                                ref={cropBoxRef}
                                                onMouseDown={onMouseDown}
                                                onMouseMove={onMouseMove}
                                                onMouseUp={stopDrag}
                                                onMouseLeave={stopDrag}
                                                onTouchStart={onTouchStart}
                                                onTouchMove={onTouchMove}
                                                onTouchEnd={stopDrag}
                                                onWheel={onWheel}
                                            >
                                                <img
                                                    ref={imgRef}
                                                    src={rawImageSrc}
                                                    alt="avatar"
                                                    className={style.cropImage}
                                                    style={{
                                                        transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                                                    }}
                                                    draggable={false}
                                                />
                                                <div className={style.cropMask} />
                                            </div>
                                            <div className={style.controls}>
                                                <div className={style.scaleRow}>
                                                    <span className={style.scaleLabel}>缩放</span>
                                                    <Slider
                                                    className={style.scaleSlider}
                                                    min={0.1}
                                                    max={4}
                                                    step={0.01}
                                                    value={scale}
                                                    onChange={(v)=> {
                                                        const newScale = clamp(v, 0.1, 4);
                                                        setScale(newScale);
                                                        
                                                        // 缩放后重新计算边界限制
                                                        if(imgRef.current && cropBoxRef.current) {
                                                            const boxSize = cropBoxRef.current.clientWidth;
                                                            const img = imgRef.current;
                                                            const naturalW = img.naturalWidth;
                                                            const naturalH = img.naturalHeight;
                                                            const baseScale = Math.max(boxSize / naturalW, boxSize / naturalH);
                                                            const renderScale = baseScale * newScale;
                                                            const renderW = naturalW * renderScale;
                                                            const renderH = naturalH * renderScale;
                                                            
                                                            const maxOffsetX = Math.max(0, (renderW - boxSize) / 2);
                                                            const maxOffsetY = Math.max(0, (renderH - boxSize) / 2);
                                                            
                                                            setOffset(prev => ({
                                                                x: clamp(prev.x, -maxOffsetX, maxOffsetX),
                                                                y: clamp(prev.y, -maxOffsetY, maxOffsetY)
                                                            }));
                                                        }
                                                    }}
                                                />
                                                </div>
                                                <div className={style.actionRow}>
                                                    <Button onClick={onPickFile}>重新选择</Button>
                                                    <Button type="primary" onClick={onSubmitAvatar}>保存头像</Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
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