import { Meta, StoryObj } from '@storybook/react';
import { PageContainer } from '@/components/ui';
import CTAButton from '../ui/cta-button';
import { useState } from 'react';
import Dialog from '../dialog';
import AlertDialog from '../dialog/alert-dialog';

export default {
    title: 'Components/다이얼로그', // story 이름
    component: Dialog,
} as Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

export const Basic_Large: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <PageContainer>
                <div style={{ height: '1000vh', width: '100%' }}>
                    <CTAButton onClick={() => setIsOpen(true)}>다이얼로그 띄우기</CTAButton>
                </div>
                <Dialog
                    size="large"
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    title="다이얼로그"
                    description="다이얼로그를 띄웁니다."
                    leftText="취소"
                    rightText="완료"
                    contents={<div className="mx-auto my-[24px] w-full">컨텐츠 내용...</div>}
                />
            </PageContainer>
        );
    },
};

export const Alert_Small: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <PageContainer>
                <div style={{ height: '1000vh', width: '100%' }}>
                    <CTAButton onClick={() => setIsOpen(true)}>다이얼로그 띄우기</CTAButton>
                </div>
                <AlertDialog
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
