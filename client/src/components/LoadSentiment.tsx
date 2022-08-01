import React, { useEffect, useState, useRef } from 'react';

const useLoadSentiment = (topic: String) => {
    const [state, setState] = useState('loading');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const interval = useRef<NodeJS.Timeout>();

    const loadData = async () => {
        try {
            const r = await fetch(`/query/getDaysOfData?topic=${topic}&range=1`);
            const body = await r.json();

            if (r.status < 200 || r.status > 299) {
                setError(body.error);
                setState('error');
                return;
            }

            setData(body);
            setState('done');
        } catch (e) {
            setError(e);
            setState('error');
        }
    };

    useEffect(() => {
        loadData();
        interval.current = setInterval(loadData, 10000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        }
    }, [topic]);

    return [state, data, error];
};

interface ILoadSentiment {
    topic: String,
    component: React.ComponentType<any>,
    injectProps?: object,
}

const LoadSentiment = ({ topic, component, injectProps }: ILoadSentiment) => {
    const Component = component;
    const [state, data, error] = useLoadSentiment(topic);

    if (state === 'loading') {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (state === 'error') {
        return (
            <div>
                Error: {error?.toString() ?? 'Something bad happened'}
            </div>
        );
    }

    return (
        <Component
            {...injectProps}
            data={data}
        />
    );
}

export default LoadSentiment;