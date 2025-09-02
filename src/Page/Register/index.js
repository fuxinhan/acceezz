import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";
import Utils from "../../Util/webCofig";
import ActionType from "../../Store/actionType";
import { message, Spin } from "antd";
import { CheckCircleTwoTone } from '@ant-design/icons';
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
    const [fileID, setFileID] = useState(null)

    // 其他字段状态
    const [hearAbout, setHearAbout] = useState([]);
    const [artWorkAttention, setArtWorkAttention] = useState("");
    const [currentStatus, setCurrentStatus] = useState('');
    const [motivations, setMotivations] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState("")
    const [membership, setMembership] = useState("")
    const [currency, setCurrency] = useState("")
    // 多选框必选处理
    const [checkboxStatus, setCheckboxStatus] = useState({
        collecting: false,
        motivates: false,
        about: false,
    })

    // 提交成功后

    const [postForm, setPostForm] = useState(false)


    // 你目前的艺术收藏状况如何
    // const handleCurrentStatusChange = (value) => {
    //     if (currentStatus.includes(value)) {
    //         setCurrentStatus(currentStatus.filter(item => item !== value));
    //     } else {
    //         setCurrentStatus([...currentStatus, value]);
    //     }
    //     setCheckboxStatus(pre => ({
    //         ...pre,
    //         collecting: false,
    //     }))
    // };

    // 是什么促使你加入Accezz？
    const handleMotivationsChange = (value) => {
        if (motivations.includes(value)) {
            setMotivations(motivations.filter(item => item !== value));
        } else {
            setMotivations([...motivations, value]);
        }
        setCheckboxStatus(pre => ({
            ...pre,
            motivates: false,
        }))
    };

    // 了解渠道？
    const handleHearAboutChange = (value) => {
        if (hearAbout.includes(value)) {
            setHearAbout(hearAbout.filter(item => item !== value));
        } else {
            setHearAbout([...hearAbout, value]);
        }
        setCheckboxStatus(pre => ({
            ...pre,
            about: false,
        }))
    };
    // 处理文件上传
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file)
        Utils.post({
            url: 'api_v1/file_upload/',
            data: formData,
            actionType: ActionType().PostRegister,
            Success: (data) => {
                // console.log(data)
                setFileID(data?.cloud_id);
                setResume(file)
            },
            Error: (data) => {
                console.log(data)
                message.warning('Accidentally failed, please try again!')
            }
        })


    };

    // 处理表单提交
    const handleSubmit = (e) => {
        e.preventDefault();

        // 检查简历文件是否上传
        if (!fileID) {
            message.warning("Resume file is required. Please select a file before submitting.");
            return;
        }

        if (motivations.length === 0) {
            setCheckboxStatus(pre => ({
                ...pre,
                motivates: true
            }))
        }
        if (hearAbout.length === 0) {
            setCheckboxStatus(pre => ({
                ...pre,
                about: true
            }))
        }
        if (hearAbout.length === 0 || motivations.length === 0) {
            message.warning('多选框最少选一个')
            return;
        }
        const urls = 'api_v1/submit_form/'
        const formData = new FormData();
        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        formData.append("gender", gender)
        formData.append("date_of_birth", dateOfBirth)
        formData.append("location", location)
        formData.append("email", email)
        formData.append("instagram", instagramHandle)
        formData.append("resume", fileID)

        formData.append("current_status", JSON.stringify([currentStatus]))
        formData.append("motivations", JSON.stringify(motivations))
        formData.append("how_did_you_hear", JSON.stringify(hearAbout))
        formData.append("membership_tier", membership)
        formData.append("currency", currency)
        formData.append("additional_info", additionalInfo);
        formData.append("art_attention", artWorkAttention);
        // formData.append("favorite_ways", JSON.stringify(artEngagement));


        // formData.append("expectations", expectations);
        console.log(formData)

        Utils.post({
            url: urls,
            data: formData,
            actionType: ActionType().PostRegister,
            Success: (data) => {
                setPostForm(true)
                message.success('You can expect to hear from us in a few weeks. Thank you for your patience. We look forward to welcoming you to the community soon.')

            }
        })
    };
    const getResourcesData = useSelector(data => data.PostRegister)
    return (
        <div className={style.RegisterPage}>
            <div className={style.card}>
                <div className={style.logo}>Create your account</div>
                <h1 className={style.heading}>Enter your details to create an account.</h1>

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
                                <div className={style.formGenders}>
                                    {/* <div className={style.radioGroup}> */}
                                    {[
                                        "Female",
                                        "Male",
                                        "Other",
                                    ].map((option, index) => (
                                        <label key={index} className={style.radioLabel}>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={option}
                                                checked={gender === option}
                                                onChange={(e) => setGender(e.target.value)}
                                                className={style.radio}
                                                required={index === 0}
                                            />
                                            <span className={style.radioText}>{option}</span>
                                        </label>
                                    ))}
                                    {/* </div> */}

                                    {/* <label className={style.radioLabel}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={gender === "Female"}
                                            onChange={(e) => setGender(e.target.value)}
                                            className={style.radio}
                                        />
                                        <span className={style.radioText}>Female</span>
                                    </label>
                                    <label className={style.radioLabel}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={gender === "Male"}
                                            onChange={(e) => setGender(e.target.value)}
                                            className={style.radio}
                                        />
                                        <span className={style.radioText}>Male</span>
                                    </label>
                                    <label className={style.radioLabel}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Other"
                                            checked={gender === "Other"}
                                            onChange={(e) => setGender(e.target.value)}
                                            className={style.radio}
                                        />
                                        <span className={style.radioText}>Other</span>
                                    </label> */}
                                </div>


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
                                <label htmlFor="resume" className={style.label}>Resume or LinkedIn *</label>
                                <div className={style.fileUpload}>
                                    <input
                                        id="resume"
                                        type="file"
                                        accept=".pdf,.doc,.docx,.png"
                                        onChange={handleFileChange}
                                        className={style.fileInput}
                                    />
                                    <label htmlFor="resume" className={style.fileButton}>
                                        Select File
                                    </label>
                                    <span className={style.fileName}>
                                        {resume ? resume.name : "please upload a PNG, PDF, or word document"}
                                    </span>
                                </div>
                            </div>
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

                    {/* 你目前的艺术收藏状况如何 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle} >What is your current status in art collecting?  *</h2>
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
                                        name="currentStatus"
                                        type="radio"
                                        value={option}
                                        required={index === 0}
                                        checked={currentStatus === option}
                                        onChange={(e) => setCurrentStatus(e.target.value)}
                                        className={style.radio}
                                    />
                                    <span className={style.radioText}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 是什么促使你加入Accezz？ */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle} style={{ color: checkboxStatus?.motivates ? 'red' : 'black' }}>What motivates you to join Accezz?  *</h2>

                        <div className={style.checkboxGroup}>
                            {[
                                "Collect or build an art collection",
                                "Learn more about art",
                                "Visit gallery and museum exhibitions",
                                "Attend parties and exhibit openings",
                                "Build connections in the art world",
                                "Meet new people",
                                "Other"
                            ].map((option, index) => (
                                <label key={index} className={style.checkboxLabel}>
                                    <input
                                        name="motivations"
                                        type="checkbox"
                                        value={option}
                                        checked={motivations.includes(option)}
                                        onChange={(e) => handleMotivationsChange(option)}
                                        className={style.checkbox}
                                    />
                                    <span className={style.checkboxText}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 你是怎么听说Accezz的 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle} style={{ color: checkboxStatus?.about ? 'red' : 'black' }}>How did you hear about Accezz? *</h2>

                        <div className={style.checkboxGroup}>

                            {[
                                "Social media",
                                "Word of mouth",
                                "Referral",
                                "Other",
                            ].map((option, index) => (
                                <label key={index} className={style.checkboxLabel}>
                                    <input
                                        name="hearAbout"
                                        type="checkbox"
                                        value={option}
                                        checked={hearAbout.includes(option)}
                                        onChange={(e) => handleHearAboutChange(option)}
                                        className={style.checkbox}
                                    />
                                    <span className={style.checkboxText}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 会员级别 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle}>Which membership tier are you applying for?  *</h2>

                        <div className={style.radioGroup}>
                            {[
                                "Patron",
                                "Explorer",
                                "Introduction",
                            ].map((option, index) => (
                                <label key={index} className={style.radioLabel}>
                                    <input
                                        type="radio"
                                        name="membership"
                                        value={option}
                                        checked={membership === option}
                                        onChange={(e) => setMembership(e.target.value)}
                                        className={style.radio}
                                        required={index === 0}
                                    />
                                    <span className={style.radioText}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 选择货币 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle}>Which currency are you paying with?  *</h2>

                        <div className={style.radioGroup}>
                            {[
                                "USD",
                                "GBP",
                                "HKD",
                            ].map((option, index) => (
                                <label key={index} className={style.radioLabel}>
                                    <input
                                        type="radio"
                                        name="currency"
                                        value={option}
                                        checked={currency === option}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className={style.radio}
                                        required={index === 0}
                                    />
                                    <span className={style.radioText}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* 其他信息 */}
                    <div className={style.section}>
                        <h2 className={style.sectionTitle}>Is there anything else you would like us to know?(optional)</h2>
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
                    {
                        postForm && <div className={style.fromSuccess}>
                            <CheckCircleTwoTone twoToneColor="#52c41a" />  You can expect to hear from us in a few weeks. Thank you for your patience. We look forward to welcoming you to the community soon.
                        </div>
                    }
                    {/* 按钮组 */}
                    <div className={style.buttonGroup}>
                        <button type="submit" className={style.primaryBtn}  >
                            Submit Registration <Spin spinning={getResourcesData ? getResourcesData.loading : false} />
                        </button>
                        <Link to="/Login" className={style.loginBtn}>
                            Do you already have an account? Log in now
                        </Link>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default RegisterPage;