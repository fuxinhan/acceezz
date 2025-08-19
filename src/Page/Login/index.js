import React, { useState } from "react";

import style from './index.module.css';
import { Link } from "react-router-dom";

const LoginPage = ()=>{
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = { email, password };
		console.log("Login submit payload:", payload);
		// TODO: 在此处调用实际登录接口
	};

	const handleRegister = () => {
		console.log("Go to register");
		// TODO: 在此处跳转注册页路由
	};

	return(
		<div className={style.LoginPage}>
			<div className={style.card}>
				{/* LOGO */}
				{/* <div className={style.logo} aria-label="Logo" role="img">
					<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<rect x="3" y="3" width="6" height="6" stroke="currentColor"/>
						<rect x="9" y="3" width="6" height="6" stroke="currentColor"/>
						<rect x="15" y="3" width="6" height="6" stroke="currentColor"/>
						<rect x="3" y="9" width="6" height="6" stroke="currentColor"/>
						<rect x="9" y="9" width="6" height="6" stroke="currentColor"/>
						<rect x="15" y="9" width="6" height="6" stroke="currentColor"/>
						<rect x="3" y="15" width="6" height="6" stroke="currentColor"/>
						<rect x="9" y="15" width="6" height="6" stroke="currentColor"/>
						<rect x="15" y="15" width="6" height="6" stroke="currentColor"/>
					</svg>
				</div> */}
 <div className={style.logo} >
    LOGIN
 </div>
				<h1 className={style.heading}>Sign in with ACCEZZ</h1>

				<form className={style.form} onSubmit={handleSubmit}>
					<label htmlFor="email" className={style.label}>Email address</label>
					<input
						id="email"
						type="email"
						placeholder="Email address"
						value={email}
						onChange={(e)=>setEmail(e.target.value)}
						className={style.input}
						required
					/>

					<label htmlFor="password" className={style.label}>Password</label>
					<input
						id="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e)=>setPassword(e.target.value)}
						className={style.input}
						required
					/>

					<button type="submit" className={style.primaryBtn}>Sign in</button>
				</form>

				<p className={style.altText}>
					We’ll sign you in with your email and password. Forgot? <Link to="/Resetpassword" className={style.link}>Reset it</Link>.
				</p>

				<button type="button" className={style.ghostBtn} onClick={handleRegister}>
                    <Link to={'/Register'}>
                    Don’t have an account?
                    </Link>
                    
                    
                    </button>
			</div>
		</div>
	)
}

export default LoginPage