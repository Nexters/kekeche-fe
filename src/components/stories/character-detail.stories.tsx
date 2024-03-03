import { ArgTypes, Args, Meta, StoryObj } from '@storybook/react';
import { PageContainer } from '@/components/ui';
import CharacterDetail from '../new-character-detail';

export default {
    title: 'Compounds/캐릭터 상세',
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
            options: ['없음', 1, 2, 3, 4, 5],
            control: { type: 'radio' },
        },
        hasBubble: { description: '말풍선 존재 여부', control: 'boolean' },
    },
} as Meta;

type Story = StoryObj;

export const Basic: Story = {
    render: ({ hasBubble, shape, level, name, color }: Args) => {
        return (
            <PageContainer>
                <CharacterDetail>
                    <CharacterDetail.Name className="mt-[30px]">{name}</CharacterDetail.Name>
                    <CharacterDetail.Keywords keywordIds={[1, 10, 20]} />
                    <CharacterDetail.Image
                        hasBubble={hasBubble}
                        characterImage={`https://kr.object.ncloudstorage.com/kekeche-character/character/${shape - 1}/${level - 1}/${color - 1}.webp`}
                        itemImage={'https://kr.object.ncloudstorage.com/kekeche-character/item/1.webp'}
                    />
                    <CharacterDetail.Exp
                        animate={false}
                        expAnimating={false}
                        currentExp={4}
                        nextExp={12}
                        level={level}
                    />
                </CharacterDetail>
            </PageContainer>
        );
    },
};
