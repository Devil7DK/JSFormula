import './App.scss';

import React from 'react';

import {
    HowToUse,
    Intro,
    ReusableFunctions,
    TryIt,
    WhySpecial,
} from './sections';

export const App: React.FC = () => {
    return (
        <div className="sections-container">
            <Intro />
            <HowToUse />
            <TryIt />
            <WhySpecial />
            <ReusableFunctions />
        </div>
    );
};
