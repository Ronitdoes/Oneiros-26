import { useState } from 'react';
import Preloader from './components/Preloader';

export default function App() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            {!loading && (
                <h1>Oneiros-26 Application Loading Complete</h1>
            )}
        </>
    )
}