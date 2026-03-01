import { useState, useEffect, useRef } from 'react';
import './Preloader.css';
import preloaderVidDesktop from '../assets/intro_enhanced.webm';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            if (duration) {
                const rawPercent = current / duration;
                // Ease-out curve, power of 5: rapidly jumps to ~90% earlier, then crawls
                const easedPercent = 1 - Math.pow(1 - rawPercent, 5);
                const percent = Math.min(Math.round(easedPercent * 100), 100);
                setProgress(percent);
            }
        }
    };

    useEffect(() => {

        // If autoPlay is blocked by the browser, try to force play it
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.2;

            videoRef.current.play().catch(error => {
                console.warn("Autoplay was prevented by browser:", error);
            });
        }

        // Safety fallback timer in case 'onEnded' doesn't fire for some reason
        const fallbackTimer = setTimeout(() => {
            handleComplete();
        }, 15000);

        return () => {
            clearTimeout(fallbackTimer);
        };
    }, []);

    const handleComplete = () => {
        setFadeOut(true);
        setTimeout(() => {
            onComplete();
        }, /* matches CSS transition duration */ 500);
    };

    return (
        <div className={`preloader-container ${fadeOut ? 'fade-out' : ''}`}>
            <video
                ref={videoRef}
                // We need a key to force React to remount the video element if the source changes,
                // otherwise some browsers don't update the video src properly
                key="preloader"
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleComplete}
                onTimeUpdate={handleTimeUpdate}
                className="preloader-video"
            >
                <source
                    src={preloaderVidDesktop}
                    type="video/webm"
                />
                {/* Fallback for browsers that don't support video */}
            </video>

            <div className="loading-wrapper">
                <div className="loading-percentage">{progress}%</div>
                <div className="loading-text">Loading 3D Experience...</div>
                <div className="loading-bar-bg">
                    <div
                        className="loading-bar-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
