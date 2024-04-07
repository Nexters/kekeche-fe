import { Meta, StoryObj } from '@storybook/react';
import { PageContainer } from '@/components/ui';
import ActionButtonPopover from '../components/popover/action-button-popover';

export default {
    title: 'Components/Popover', // story 이름
    component: ActionButtonPopover,
} as Meta<typeof ActionButtonPopover>;

type Story = StoryObj<typeof ActionButtonPopover>;

export const ActionButton: Story = {
    render: () => (
        <PageContainer>
            <h2 className="mx-auto mt-[40px] text-[20px] font-[700]">아래 클릭하세요</h2>
            <div className="mx-auto">
                <ActionButtonPopover onClick={() => {}} onEdit={() => {}} />
            </div>
        </PageContainer>
    ),
};
