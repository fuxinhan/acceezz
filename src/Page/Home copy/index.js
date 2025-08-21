import React, { useState } from "react";
import Style from "./index.module.css"
import { Button, } from 'antd';


function HomePage() {
    const [userName, setUserName] = useState("");

    return(
        <div className={Style.homeContainer}>
           

            {/* 欢迎区域 */}
            <section className={Style.welcomeSection}>
                <div className={Style.welcomeContent}>
                    <h1 className={Style.welcomeTitle}>Welcome</h1>
                    {/* <div className={Style.nameInput}>
                        <input 
                            type="text" 
                            placeholder="Enter your name" 
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={Style.nameField}
                        />
                    </div> */}
                </div>
            </section>

            {/* 主图片区域 */}
            <section  >
                    {/* <div className={Style.pageIndicator}>P8</div> */}
                        <div className={Style.imagePlaceholder}>
                            <img src="https://ix-marketing.imgix.net/liftkit-hero.png?auto=format,compress&w=2618" />
                        </div>
            </section>

            {/* 会员申请区域 */}
            <section className={Style.membershipSection}>
                <div className={Style.membershipContent}>
                    <h2 className={Style.membershipTitle}>It's easy to propose a new member.</h2>
                    <p className={Style.membershipText}>Membership applications are now open at all of ourHouses,including London, New York and Los
Angeles. Send your friends a personalised link to
support their application.</p>
                    <Button className={Style.referButton} type="primary">
                        Refer
                    </Button>
                </div>
            </section>

            {/* 即将到来的活动区域 */}
            <section className={Style.upcomingSection}>
                <h2 className={Style.upcomingTitle}>Upcoming</h2>
                <div className={Style.eventsGrid}>
                    <div className={Style.eventCard}>
                        <div className={Style.eventImage}>
                            <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop" alt="Gallery Walk" />
                        </div>
                        <div className={Style.eventContent}>
                            <h3 className={Style.eventTitle}>Gallery Walk</h3>
                            <p className={Style.eventDescription}>Join us for an exciting gallery walk event featuring local artists and their amazing works.</p>
                            <Button className={Style.rsvpButton} type="primary">
                                RSVP
                            </Button>
                        </div>
                    </div>
                    
                    <div className={Style.eventCard}>
                        <div className={Style.eventImage}>
                            <img src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop" alt="XXXX Event" />
                        </div>
                        <div className={Style.eventContent}>
                            <h3 className={Style.eventTitle}>XXXX</h3>
                            <p className={Style.eventDescription}>Another exciting event coming up soon. Stay tuned for more details.</p>
                            <Button className={Style.rsvpButton} type="primary">
                                RSVP
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) 
}

export default HomePage;