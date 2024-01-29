'use client';

import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import { PageContainer } from '@/components/ui';
import React from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

export default function Home() {
    return (
        <PageContainer>
            <header className="mb-[10px] flex justify-between gap-2">
                <button aria-label="뒤로 가기 버튼" className="p-3">
                    <BackArrowIcon stroke="#8E939E" />
                </button>
                <span className=" grid flex-1 place-items-center text-center text-[18px] font-semibold leading-7 text-gray-500">
                    기록 작성
                </span>
                <button className="p-3 text-semibold16 text-[#1E73F3]">저장</button>
            </header>
            <section>
                <Editor />
            </section>
        </PageContainer>
    );
}

interface EditorState {
    html: string;
    textNodeCount: number;
}

class Editor extends React.Component<{}, EditorState> {
    constructor(props: {}) {
        super(props);
        this.state = { html: '', textNodeCount: 0 };
    }

    private countTextNodes(html: string): number {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const textNodes = doc.body.childNodes;

        let count = 0;

        const countTextContent = (node: Node) => {
            if (node.nodeType === 3) {
                // TEXT_NODE
                const textContent = (node as Text).textContent || '';
                count += textContent.length;
            } else {
                for (let i = 0; i < node.childNodes.length; i++) {
                    countTextContent(node.childNodes[i]);
                }
            }
        };

        textNodes.forEach((node) => countTextContent(node));

        return count;
    }

    private handleChange = (event: ContentEditableEvent) => {
        const html = event.target.value;
        const textNodeCount = this.countTextNodes(html);

        this.setState({ html, textNodeCount });
    };

    render = () => {
        const { html, textNodeCount } = this.state;
        const regex = /#(\S+)(?=\s|\p{P}|$)/gu; // \S는 공백이 아닌 문자, \p{P}는 구두점을 나타냅니다.
        const matches = [...html.matchAll(regex)];
        const hashtags = matches.map((match) => match[1]).map((text) => text.replace('&nbsp;', ''));

        const updatedContent = html.replace(/#(\S+)(?=\s|$)/g, (_, keyword) => {
            return ` <span class="keyword">#${keyword}</span>`;
        });

        // <div> 태그를 <br> 태그로 변환하여 줄 바꿈이 발생하도록 함
        let formattedContent = updatedContent.replace(/<div>/g, '<br>');

        if (formattedContent.length > 200) {
            formattedContent = formattedContent.substring(0, 200);
        }

        return (
            <div className="px-6 py-[10px] text-gray-500">
                <ContentEditable
                    className="mb-[10px] break-all focus:outline-none"
                    html={formattedContent}
                    // @ts-ignore
                    placeholder="메모를 입력해주세요"
                    disabled={false}
                    onChange={this.handleChange}
                />
                <style>{`
           
                    .keyword {
                    text-decoration: underline;
                    }
                    `}</style>
                <p className="py-2 text-right text-gray-300">{textNodeCount}/200</p>
            </div>
        );
    };
}
