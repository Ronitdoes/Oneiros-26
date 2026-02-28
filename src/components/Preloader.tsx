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
            // Fast forward mobile video slightly so it matches desktop timing
            if (isMobile) {
                // Adjust this ratio based on exactly how much faster you want it 
                // e.g., 2.0 = 2x speed. 
                // Desktop is ~5s, mobile is ~4s. If you want mobile (4s) to stretch to 7s, playbackRate = 4/7 = 0.57 (slower)
                // Wait, user says "fast forward mobile preloader so both are at same time" which means mobile is running too SLOW?
                // Let's set it to 1.5x speed to make mobile run faster to keep up with desktop's animation speed
                videoRef.current.playbackRate = 1.35;
            } else {
                videoRef.current.playbackRate = 1.0;
            }

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
                onEnded={handleComplete}
                className="preloader-video"
            >
                <source src={isMobile ? preloaderVidMobile : preloaderVidDesktop} type="video/webm" />
                {/* Fallback for browsers that don't support video */}
            </video>
        </div>
    );
};

export default Preloader;
