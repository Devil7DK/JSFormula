import './styles.scss';

import { Monaco, useMonaco } from '@monaco-editor/react';
import React, { useEffect, useRef } from 'react';

interface IProps {
    children: string | string[];
    language: string;
}

export const CodeBlock: React.FC<IProps> = ({ language, children }: IProps) => {
    const input = Array.isArray(children) ? children.join('\n') : children;

    const monaco: Monaco | null = useMonaco();

    const codeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (monaco && codeRef.current) {
            monaco.editor.colorize(input, language, { tabSize: 4 }).then((html) => {
                if (codeRef.current) codeRef.current.innerHTML = html;
            });
        }
    }, [input, language, monaco, codeRef]);

    return (
        <div className="code-block-container">
            <div ref={codeRef} className={`code ${language}`}></div>
            <div className="copy" title="Copy Code" onClick={() => navigator.clipboard.writeText(input)}>
                <svg viewBox="0 0 24 24">
                    <rect
                        fill="none"
                        height="13"
                        rx="2"
                        ry="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        width="13"
                        x="9"
                        y="9"
                    />
                    <path
                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </svg>
            </div>
        </div>
    );
};
