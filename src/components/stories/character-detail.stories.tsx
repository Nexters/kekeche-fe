import { Meta, StoryObj } from '@storybook/react';
import { PageContainer } from '@/components/ui';
import CharacterDetail from '../new-character-detail';
import CharacterImageWithItem from '../character-image-with-item';

export default {
    title: 'Components/Character-Detail', // story 이름
    component: CharacterDetail,
} as Meta<typeof CharacterDetail>;

type Story = StoryObj<typeof CharacterDetail>;

export const Basic: Story = {
    render: () => (
        <PageContainer>
            <CharacterDetail>
                <CharacterDetail.Name className="mt-[30px]">{'황태환 ㅋ'}</CharacterDetail.Name>
                <CharacterDetail.Keywords keywordIds={[1, 2, 3]} />
                <CharacterImageWithItem
                    size="large"
                    characterImage={'https://kr.object.ncloudstorage.com/kekeche-character/character/1/0/1.webp'}
                    itemImage={'https://kr.object.ncloudstorage.com/kekeche-character/item/1.webp'}
                />
            </CharacterDetail>
        </PageContainer>
    ),
};
