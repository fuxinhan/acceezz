import React, { useState, useEffect } from "react";
import Style from './index.module.css'

function NotPage() {
    const [errorCode, setErrorCode] = useState('404');
    const [glitchText, setGlitchText] = useState('');
    const [showMatrix, setShowMatrix] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    // 矩阵雨效果
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // 故障文字效果
    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchText(errorCode === '404' ? '4O4' : '404');
            setTimeout(() => setGlitchText(errorCode), 100);
        }, 2000);

        return () => clearInterval(glitchInterval);
    }, [errorCode]);

    // 矩阵背景效果
    useEffect(() => {
        setShowMatrix(true);
        const timer = setTimeout(() => setShowMatrix(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleRetry = () => {
        window.location.reload();
    };

    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className={Style.notPage}>
            {/* 矩阵背景效果 */}
            {showMatrix && (
                <div className={Style.matrixBackground}>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className={Style.matrixColumn} style={{ left: `${i * 5}%` }}>
                            {Array.from({ length: 15 }).map((_, j) => (
                                <span key={j} className={Style.matrixChar}>
                                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {/* 主要内容 */}
            <div className={Style.errorContainer}>
                {/* 错误代码 */}
                <div className={Style.errorCode}>
                    <span className={Style.glitchText}>{glitchText}</span>
                    <div className={Style.errorCodeShadow}>404</div>
                </div>

                {/* 错误标题 */}
                <h1 className={Style.errorTitle}>
                    <span className={Style.codeComment}>//</span> Page Not Found
                </h1>

                {/* 错误描述 */}
                <p className={Style.errorDescription}>
                    <span className={Style.codeComment}>/*</span> The requested resource could not be found on this server. 
                    This might be due to a mistyped URL, a broken link, or the page has been moved. <span className={Style.codeComment}>*/</span>
                </p>

                {/* 技术信息 */}
                <div className={Style.techInfo}>
                    <div className={Style.infoItem}>
                        <span className={Style.infoLabel}>Status:</span>
                        <span className={Style.infoValue}>404 Not Found</span>
                    </div>
                    <div className={Style.infoItem}>
                        <span className={Style.infoLabel}>Timestamp:</span>
                        <span className={Style.infoValue}>{currentTime.toISOString()}</span>
                    </div>
                    <div className={Style.infoItem}>
                        <span className={Style.infoLabel}>Path:</span>
                        <span className={Style.infoValue}>{window.location.pathname}</span>
                    </div>
                    <div className={Style.infoItem}>
                        <span className={Style.infoLabel}>User Agent:</span>
                        <span className={Style.infoValue}>{navigator.userAgent.substring(0, 50)}...</span>
                    </div>
                </div>

                {/* 代码片段 */}
                <div className={Style.codeSnippet}>
                    <div className={Style.codeHeader}>
                        <span className={Style.codeLanguage}>JavaScript</span>
                        <span className={Style.codeError}>Error</span>
                    </div>
                    <pre className={Style.codeContent}>
                        <code>
                            <span className={Style.keyword}>try</span> {'{'}{'\n'}
                            {'  '}<span className={Style.function}>fetchPage</span>(<span className={Style.string}>'{window.location.pathname}'</span>);{'\n'}
                            {'}'} <span className={Style.keyword}>catch</span> (error) {'{'}{'\n'}
                            {'  '}<span className={Style.function}>console</span>.<span className={Style.function}>error</span>(<span className={Style.string}>'Page not found'</span>);{'\n'}
                            {'  '}<span className={Style.function}>show404Page</span>();{'\n'}
                            {'}'}
                        </code>
                    </pre>
                </div>

                {/* 操作按钮 */}
                <div className={Style.actionButtons}>
                    <button className={Style.primaryButton} onClick={handleGoHome}>
                        <span className={Style.buttonIcon}>🏠</span>
                        Go Home
                    </button>
                    <button className={Style.secondaryButton} onClick={handleGoBack}>
                        <span className={Style.buttonIcon}>⬅️</span>
                        Go Back
                    </button>
                    <button className={Style.tertiaryButton} onClick={handleRetry}>
                        <span className={Style.buttonIcon}>🔄</span>
                        Retry
                    </button>
                </div>

                {/* 调试信息 */}
                <div className={Style.debugInfo}>
                    <details className={Style.debugDetails}>
                        <summary className={Style.debugSummary}>
                            <span className={Style.codeComment}>//</span> Debug Information
                        </summary>
                        <div className={Style.debugContent}>
                            <div className={Style.debugItem}>
                                <strong>Browser:</strong> {navigator.appName}
                            </div>
                            <div className={Style.debugItem}>
                                <strong>Platform:</strong> {navigator.platform}
                            </div>
                            <div className={Style.debugItem}>
                                <strong>Language:</strong> {navigator.language}
                            </div>
                            <div className={Style.debugItem}>
                                <strong>Cookies Enabled:</strong> {navigator.cookieEnabled ? 'Yes' : 'No'}
                            </div>
                            <div className={Style.debugItem}>
                                <strong>Online:</strong> {navigator.onLine ? 'Yes' : 'No'}
                            </div>
                        </div>
                    </details>
                </div>

                {/* 页脚信息 */}
                <div className={Style.pageFooter}>
                    <span className={Style.footerText}>
                        <span className={Style.codeComment}>//</span> ACCZZ Error Handler v1.0.0
                    </span>
                    <span className={Style.footerText}>
                        <span className={Style.codeComment}>//</span> Built with React & ❤️
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NotPage;