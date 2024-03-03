import { Meta, StoryObj } from '@storybook/react';
import { PageContainer } from '@/components/ui';
import CTAButton from '../ui/cta-button';
import { useState } from 'react';
import Dialog from '../dialog';

export default {
    title: 'Components/다이얼로그', // story 이름
    component: Dialog,
} as Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

export const Alert: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <PageContainer>
                <div style={{ height: '1000vh', width: '100%' }}>
                    <CTAButton onClick={() => setIsOpen(true)}>다이얼로그 띄우기</CTAButton>
                </div>
                <Dialog
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    title="다이얼로그"
                    description="다이얼로그를 띄웁니다."
                    leftText="취소"
                    rightText="삭제"
                />
            </PageContainer>
        );
    },
};
