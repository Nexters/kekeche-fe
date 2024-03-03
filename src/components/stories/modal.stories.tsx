import { Meta, StoryObj } from '@storybook/react';
import { PageContainer } from '@/components/ui';
import Modal from '@/components/ui/modal';

export default {
    title: 'Components/다이어로그', // story 이름
    component: Modal,
} as Meta<typeof Modal>;

type Story = StoryObj<typeof Modal>;

const args = {
    title: '모달 테스트',
    description: '모달을 테스트 중입니다.',
    open: true,
};
const argTypes = {
    title: { description: '버튼의 텍스트', control: 'text' },
    description: { description: '버튼의 활성화 여부', control: 'text' },
    open: { control: 'boolean' },
};

export const Basic: Story = {
    args,
    argTypes,
    render: (args) => (
        <PageContainer>
            <div style={{ height: '1000vh', width: '100%' }}>모달 뒤 콘텐츠...</div>
            <Modal {...args} className="mb-[31px]" />
        </PageContainer>
    ),
};
