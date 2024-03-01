import { Meta, StoryObj } from '@storybook/react';
import CtaButton from '@/components/ui/cta-button';
import { PageContainer } from '@/components/ui';
import FixedBottomArea from '@/components/fixed-bottom-area';

export default {
    title: 'Components/CtaButton', // story 이름
    component: CtaButton,
} as Meta<typeof CtaButton>;

type Story = StoryObj<typeof CtaButton>;

const args = {
    text: '테스트',
    disabled: false,
};
const argTypes = {
    text: { description: '버튼의 텍스트', control: 'text' },
    disabled: { description: '버튼의 활성화 여부', control: 'boolean' },
};

export const Basic: Story = {
    args,
    argTypes,
    render: (args) => <CtaButton {...args} className="mb-[31px]" />,
};
export const BottomFixed: Story = {
    args,
    argTypes,
    render: (props) => (
        <PageContainer>
            <FixedBottomArea>
                <CtaButton {...props} className="mb-[31px]" />
            </FixedBottomArea>
        </PageContainer>
    ),
};