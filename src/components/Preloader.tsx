import { useState, useEffect, useRef } from 'react';
import './Preloader.css';
import preloaderVidDesktop from '../assets/onoPre.webm';
import preloaderVidMobile from '../assets/onoPreMob.webm';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Determine if mobile on mount
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);

        // If autoPlay is blocked by the browser, try to force play it
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.warn("Autoplay was prevented by browser:", error);
            });
        }

        // Always enforce a 7-second loading screen
        const timeoutDuration = 7000;

        const fallbackTimer = setTimeout(() => {
            handleComplete();
        }, timeoutDuration);

        return () => {
            clearTimeout(fallbackTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile]);

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
                key={isMobile ? 'mobile' : 'desktop'}
                autoPlay
                muted
                playsInline
                preload="auto"
                // Enforce strict 7s timer instead of exiting when video naturally ends
                className="preloader-video"
            >
                <source src={isMobile ? preloaderVidMobile : preloaderVidDesktop} type="video/webm" />
                {/* Fallback for browsers that don't support video */}
            </video>
        </div>
    );
};

export default Preloader;
