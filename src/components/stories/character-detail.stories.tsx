import { ArgTypes, Args, Meta, StoryObj } from '@storybook/react';
import { PageContainer } from '@/components/ui';
import CharacterDetail from '../new-character-detail';

export default {
    title: 'Components/캐릭터 상세',
} as Meta<typeof CharacterDetail>;

type Story = StoryObj<typeof CharacterDetail>;

const args: Args = {
    name: '캐릭터 이름',
    shape: 1,
    level: 1,
    color: 1,
    hasBubble: true,
};

const argTypes: ArgTypes = {
    name: { description: '캐릭터 이름', controls: 'text' },
    shape: { description: '캐릭터 모양', options: [1, 2, 3], control: { type: 'radio' } },
    color: { description: '캐릭터 색깔', options: [1, 2, 3], control: { type: 'radio' } },
    level: { description: '캐릭터 레벨', options: [1, 2, 3], control: { type: 'radio' } },
    hasBubble: { description: '말풍선 존재 여부', control: 'boolean' },
};

export const Basic: Story = {
    args,
    argTypes,
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
