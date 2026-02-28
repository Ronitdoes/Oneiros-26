import { useState, useEffect, useRef } from 'react';
import './Preloader.css';
import preloaderVid from '../assets/onoPre.webm';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // If autoPlay is blocked by the browser, try to force play it
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.warn("Autoplay was prevented by browser:", error);
                // Even if it fails, we wait some time before showing the app
                setTimeout(handleComplete, 3000);
            });
        }

        // Safety fallback timer in case 'onEnded' doesn't fire for some reason
        // Assuming the video isn't longer than 15s. If it is, this might need adjusting.
        const fallbackTimer = setTimeout(() => {
            handleComplete();
        }, 15000);

        return () => clearTimeout(fallbackTimer);
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
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleComplete}
                className="preloader-video"
            >
                <source src={preloaderVid} type="video/webm" />
                {/* Fallback for browsers that don't support video */}
            </video>
        </div>
    );
};

export default Preloader;
