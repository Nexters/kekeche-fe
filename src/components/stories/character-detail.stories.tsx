import { Args, Meta, StoryObj } from '@storybook/react';
import { PageContainer } from '@/components/ui';
import CharacterDetail from '../new-character-detail';

const IMG_STORAGE_BASE_URL = 'https://kr.object.ncloudstorage.com/kekeche-character';

export default {
    title: 'Compounds/Character',
    args: {
        name: '캐릭터 이름',
        shape: 1,
        level: 1,
        color: 1,
        item: 1,
        hasBubble: true,
    },

    argTypes: {
        name: { description: '캐릭터 이름', controls: 'text' },
        shape: { description: '캐릭터 모양', options: [1, 2, 3], control: { type: 'radio' } },
        color: {
            description: '캐릭터 색깔',
            options: ['빨강', '파랑', '노랑', '보라', '초록', '분홍'],
            mapping: {
                빨강: 1,
                파랑: 2,
                노랑: 3,
                보라: 4,
                초록: 5,
                분홍: 6,
            },
            control: { type: 'radio' },
        },
        level: { description: '캐릭터 레벨', options: [1, 2, 3], control: { type: 'radio' } },
        item: {
            description: '캐릭터 아이템',
            options: ['(없음)', '노트북', '아령', '돈', '연필', '책'],
            mapping: {
                '(없음)': null,
                노트북: 1,
                아령: 2,
                돈: 3,
                연필: 4,
                책: 5,
            },
            control: { type: 'radio' },
        },
        hasBubble: { description: '말풍선 존재 여부', control: 'boolean' },
    },
} as Meta;

type Story = StoryObj;

export const Detail: Story = {
    render: ({ hasBubble, shape, level, name, color, item }: Args) => {
        return (
            <PageContainer>
                <div className="h-screen w-full gradation-bg">
                    <CharacterDetail>
                        <CharacterDetail.Name className="mt-[30px]">{name}</CharacterDetail.Name>
                        <CharacterDetail.Keywords keywordIds={[1, 10, 20]} />
                        <CharacterDetail.Image
                            hasBubble={hasBubble}
                            characterImage={`${IMG_STORAGE_BASE_URL}/character/${shape - 1}/${level - 1}/${color - 1}.webp`}
                            itemImage={item !== null ? `${IMG_STORAGE_BASE_URL}/item/${item - 1}.webp` : undefined}
                        />
                        <CharacterDetail.Exp
                            animate={false}
                            expAnimating={false}
                            currentExp={4}
                            nextExp={12}
                            level={level}
                        />
                    </CharacterDetail>
                </div>
            </PageContainer>
        );
    },
};
