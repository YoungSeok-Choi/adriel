import { useEffect } from 'react';
import ClockStore from './adriel/ClockStore';
import ClockWrapper from './adriel/ClockWrapper';

function App() {
    const { initialized, init } = ClockStore.use();

    useEffect(() => {
        const closer = init();

        return () => closer();
    }, []);

    if (!initialized) {
        return <div>Clock is loading...</div>;
    }

    return (
        <ClockWrapper />
    );
}

export default App;
