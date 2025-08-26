import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";
import Utils from "../../Util/webCofig";
import ActionType from "../../Store/actionType";
import { message, Spin } from "antd";
import { useSelector } from "react-redux";

const RegisterPage = () => {
    // 基本信息状态
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [instagramHandle, setInstagramHandle] = useState("");
    const [resume, setResume] = useState(null);
    
    // 其他字段状态
    const [hearAbout, setHearAbout] = useState("social-media");
    const [artWorkAttention, setArtWorkAttention] = useState("");
    const [artEngagement, setArtEngagement] = useState([]);
    const [currentStatus, setCurrentStatus] = useState("");
    const [whyJoin, setWhyJoin] = useState("");
    const [expectations, setExpectations] = useState("");
    const [additionalInfo,setAdditionalInfo] =  useState("")

    // 处理艺术参与方式选择
    const handleArtEngagementChange = (value) => {
        if (artEngagement.includes(value)) {
            setArtEngagement(artEngagement.filter(item => item !== value));
        } else {
            setArtEngagement([...artEngagement, value]);
        }
    };

    // 处理文件上传
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResume(file);
    };

    // 处理表单提交
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 检查简历文件是否上传
        if (!resume || !resume.name) {
            alert("Resume file is required. Please select a file before submitting.");
            return;
        }
        const urls  = 'api_v1/submit_form/'
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("gender", gender);
        formData.append("date_of_birth", dateOfBirth);
        formData.append("location", location);
        formData.append("email", email);
        formData.append("instagram", instagramHandle);
        formData.append("resume", resume);
        formData.append("how_did_you_hear", hearAbout);
        formData.append("art_attention", artWorkAttention);
        formData.append("favorite_ways", JSON.stringify(artEngagement));
        formData.append("current_status",JSON.stringify(currentStatus) );
        formData.append("why_join", whyJoin);
        formData.append("expectations", expectations);
        formData.append("additional_info", additionalInfo);
        Utils.post({
            url:urls,
            data:formData,
            actionType: ActionType().PostRegister,
            Success:(data)=>{
                alert('The information has been submitted. Please go to the homepage or other pages')
            }
        })
    };
    const getResourcesData = useSelector(data=>data.PostRegister)
    return (
        <div className={style.RegisterPage}>
            <div className={style.card}>
                <div className={style.logo}>REGISTER</div>
                <h1 className={style.heading}>ACCEZZ Member Registration</h1>

                <form className={style.form} onSubmit={handleSubmit}>
                    {/* 基本信息 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle}>Basic Info *</h2>
                        
                        <div className={style.formRow}>
                            <div className={style.formGroup}>
                                <label htmlFor="firstName" className={style.label}>First name *</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="Please enter your name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className={style.input}
                                    required
                                    title="First name is required"
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="lastName" className={style.label}>Last name *</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Please enter your last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className={style.input}
                                    required
                                    title="Last name is required"
                                />
                            </div>
                        </div>

                        <div className={style.formRow}>
                            <div className={style.formGroup}>
                                <label htmlFor="gender" className={style.label}>Gender *</label>
                                <input
                                    id="gender"
                                    type="text"
                                    placeholder="Please enter your gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className={style.input}
                                    required
                                    title="Gender is required"
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="dateOfBirth" className={style.label}>Date of birth *</label>
                                <input
                                    id="dateOfBirth"
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    className={style.input}
                                    required
                                    title="Date of birth is required"
                                />
                            </div>
                        </div>

                        <div className={style.formRow}>
                            <div className={style.formGroup}>
                                <label htmlFor="location" className={style.label}>Location *</label>
                                <input
                                    id="location"
                                    type="text"
                                    placeholder="Please enter your location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className={style.input}
                                    required
                                    title="Location is required"
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="email" className={style.label}>Email *</label>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Please enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={style.input}
                                    required
                                    title="Email is required"
                                />
                            </div>
                        </div>

                        <div className={style.formRow}>
                            <div className={style.formGroup}>
                                <label htmlFor="instagramHandle" className={style.label}>Instagram handle *</label>
                                <input
                                    id="instagramHandle"
                                    type="text"
                                    placeholder="Please enter your Instagram account"
                                    value={instagramHandle}
                                    onChange={(e) => setInstagramHandle(e.target.value)}
                                    className={style.input}
                                    required
                                    title="Instagram handle is required"
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="resume" className={style.label}>Resume *</label>
                                <div className={style.fileUpload}>
                                    <input
                                        id="resume"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className={style.fileInput}
                                    />
                                    <label htmlFor="resume" className={style.fileButton}>
                                    Select File
                                    </label>
                                    <span className={style.fileName}>
                                        {resume ? resume.name : "File not selected"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 了解渠道 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle}>How did you hear about Accezz？ *</h2>
                        <div className={style.radioGroup}>
                            <label className={style.radioLabel}>
                                <input
                                    type="radio"
                                    name="hearAbout"
                                    value="Social media"
                                    checked={hearAbout === "Social media"}
                                    onChange={(e) => setHearAbout(e.target.value)}
                                    className={style.radio}
                                />
                                <span className={style.radioText}>Social media</span>
                            </label>
                            <label className={style.radioLabel}>
                                <input
                                    type="radio"
                                    name="hearAbout"
                                    value="Word of mouth"
                                    checked={hearAbout === "Word of mouth"}
                                    onChange={(e) => setHearAbout(e.target.value)}
                                    className={style.radio}
                                />
                                <span className={style.radioText}>Word of mouth</span>
                            </label>
                            <label className={style.radioLabel}>
                                <input
                                    type="radio"
                                    name="hearAbout"
                                    value="Referral"
                                    checked={hearAbout === "Referral"}
                                    onChange={(e) => setHearAbout(e.target.value)}
                                    className={style.radio}
                                />
                                <span className={style.radioText}>Referral (Please provide name)</span>
                            </label>
                            <label className={style.radioLabel}>
                                <input
                                    type="radio"
                                    name="hearAbout"
                                    value="Other"
                                    checked={hearAbout === "Other"}
                                    onChange={(e) => setHearAbout(e.target.value)}
                                    className={style.radio}
                                />
                                <span className={style.radioText}>Other</span>
                            </label>
                        </div>
                    </div>

                    {/* 详细信息 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle}>Details *</h2>
                        <div className={style.formGroup}>
                            <label htmlFor="artWorkAttention" className={style.label}>
                            Which work of art has recently captured your attention? And why? *
                            </label>
                            <textarea
                                id="artWorkAttention"
                                placeholder="Please provide a detailed description..."
                                value={artWorkAttention}
                                onChange={(e) => setArtWorkAttention(e.target.value)}
                                className={style.textarea}
                                rows="4"
                                required
                            />
                        </div>
                    </div>

                    {/* 艺术参与方式 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle}>What is your favorite way to engage with art? (You can choose multiple options.)</h2>
                        <div className={style.checkboxGroup}>
                            {[
                                "Collect art",
                                "Visit gallery and museum exhibitions",
                                "Read and write about art",
                                "Attend live auctions",
                                "Parties and exhibit openings",
                                "Other"
                            ].map((option, index) => (
                                <label key={index} className={style.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={artEngagement.includes(option)}
                                        onChange={(e) => handleArtEngagementChange(option)}
                                        className={style.checkbox}
                                    />
                                    <span className={style.checkboxText}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 当前状态 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle}>What is your current status?</h2>
                        <div className={style.radioGroup}>
                            {[
                                "I have an established collection",
                                "I’ve collected 5 or more works",
                                "I’ve just started my collection",
                                "I want to start but don’t know where to begin",
                                "I’ve never considered collecting until now"
                            ].map((option, index) => (
                                <label key={index} className={style.radioLabel}>
                                    <input
                                        type="radio"
                                        name="currentStatus"
                                        value={option}
                                        checked={currentStatus === option}
                                        onChange={(e) => setCurrentStatus(e.target.value)}
                                        className={style.radio}
                                    />
                                    <span className={style.radioText}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 加入原因 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle}>Why do you want to join？ *</h2>
                        <div className={style.formGroup}>
                            <textarea
                                id="whyJoin"
                                placeholder="Please provide a detailed explanation..."
                                value={whyJoin}
                                onChange={(e) => setWhyJoin(e.target.value)}
                                className={style.textarea}
                                rows="4"
                                required
                            />
                        </div>
                    </div>

                    {/* 期望 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle}>What are your expectations from this community? *</h2>
                        <div className={style.formGroup}>
                            <textarea
                                id="expectations"
                                placeholder="Please provide a detailed explanation..."
                                value={expectations}
                                onChange={(e) => setExpectations(e.target.value)}
                                className={style.textarea}
                                rows="4"
                                required
                            />
                        </div>
                    </div>

                    {/* 其他信息 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle}>Anything else you would like us to know?(optional)</h2>
                        <div className={style.formGroup}>
                            <textarea
                                id="additionalInfo"
                                placeholder="Please fill in other information..."
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                                className={style.textarea}
                                rows="4"
                            />
                        </div>
                    </div>

                    {/* 按钮组 */}
                    <div className={style.buttonGroup}>
                        <button type="submit" className={style.primaryBtn}  >
                            Submit Registration <Spin spinning={getResourcesData?getResourcesData.loading:false} />
                        </button>
                        <Link to="/Login" className={style.loginBtn}>
                            Do you already have an account? Log in now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;