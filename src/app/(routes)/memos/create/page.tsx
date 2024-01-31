'use client';

import BackArrowIcon from '@/assets/icons/arrow-left_24x24.svg';
import { PageContainer } from '@/components/ui';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui-shadcn/select';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function MemoCreate() {
    const [textareaValue, setTextareaValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const regex = /#(\S+)(?=\s|\p{P}|$)/gu; // \S는 공백이 아닌 문자, \p{P}는 구두점을 나타냅니다.
    const matches = [...textareaValue.matchAll(regex)];
    const hashtags = matches.map((match) => match[0]).map((text) => text.replace('&nbsp;', ''));

    const router = useRouter();

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    });

    return (
        <PageContainer>
            <header className="mb-[10px] flex justify-between gap-2">
                <button
                    onClick={() => {
                        router.back();
                    }}
                    aria-label="뒤로 가기 버튼"
                    className="p-3"
                >
                    <BackArrowIcon stroke="#8E939E" />
                </button>
                <span className=" grid flex-1 place-items-center text-center text-[18px] font-semibold leading-7 text-gray-500">
                    기록 작성
                </span>
                <button className="p-3 text-semibold16 text-[#1E73F3]">저장</button>
            </header>
            <Select>
                <div className="flex flex-row items-center gap-[10px] px-6">
                    <SelectTrigger className="w-[160px] border-none bg-gray-100 outline-none focus:outline-none focus:ring-0">
                        <SelectValue
                            placeholder={
                                <div className="felx-row flex gap-[6px]">
                                    <span className="h-6 w-6 rounded-full bg-gray-200" />
                                    <span>캐릭터 선택</span>
                                </div>
                            }
                        />
                    </SelectTrigger>
                    <span>의 말</span>
                </div>
                <SelectContent className="border-none bg-gray-100">
                    <SelectGroup className="bg-gray-100">
                        <SelectItem value="apple">
                            <div className="felx-row flex gap-[6px]">
                                <span className="h-6 w-6 rounded-full bg-gray-200" />
                                <span>캐릭터1</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="apple">
                            <div className="felx-row flex gap-[6px]">
                                <span className="h-6 w-6 rounded-full bg-gray-200" />
                                <span>캐릭터2</span>
                            </div>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <TextareaAutosize
                ref={textareaRef}
                cacheMeasurements
                placeholder="메모를 입력해주세요"
                value={textareaValue}
                onChange={(e) => {
                    if (e.target.value.length > 200) return;
                    setTextareaValue(e.target.value);
                }}
                className="min-h-[188px] px-6 py-[10px] focus:outline-none"
            />
            <p className="py-2 pr-6 text-right text-gray-300">{textareaValue.length}/200</p>
            <div className="mt-2 h-[12px] bg-[#F7F8F9]" />
            <div className="px-6 py-3 text-semibold14 text-gray-500">해시태그</div>
            <div className="flex flex-wrap gap-[6px] px-6">
                {hashtags.length === 0 ? (
                    <span className="text-gray-400">
                        해쉬태그로 키워드를 생성할 수 있어요.
                        <br /> ex) #넥스터즈
                    </span>
                ) : (
                    hashtags.map((hashtag, i) => (
                        <span
                            className="min-h-[37px] w-fit break-all rounded-full bg-[#ECEFF5] px-3 py-2 text-semibold14 text-gray-400"
                            key={i}
                        >
                            {hashtag}
                        </span>
                    ))
                )}
            </div>
        </PageContainer>
    );
}

/*
// TODO: 에디터


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
        console.log(matches);
        const hashtags = matches.map((match) => match[0]).map((text) => text.replace('&nbsp;', ''));

        // hashtag 만들어질때마다 키워드 붙여주자.
        console.log(hashtags);
        let str = html;
        hashtags.forEach((hashtag) => {
            let idx = html.indexOf(hashtag);
            if (html[idx - 1] === '>') return;
            str = str.replace(hashtag, `<span class='keyword'>${hashtag}</span>`);
        });
        console.log(str);

        //<span class="keyword">#${keyword}</span>

        // <div> 태그를 <br> 태그로 변환하여 줄 바꿈이 발생하도록 함
        //let formattedContent = updatedContent.replace(/<div>/g, '<br>');

        return (
            <div className="text-gray-500">
                <ContentEditable
                    className="mb-[10px] min-h-[188px] break-all px-6 pt-[10px] focus:outline-none"
                    html={str}
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
                <p className="py-2 pr-6 text-right text-gray-300">{textNodeCount}/200</p>
            </div>
        );
    };
}
*/
