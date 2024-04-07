import { Meta, StoryObj } from '@storybook/react';
import CTAButton from '../components/ui/cta-button';
import { useState } from 'react';
import Dialog from '../components/dialog';
import AlertDialog from '../components/dialog/alert-dialog';
import { PageContainer } from '@/components/ui';

export default {
    title: 'Components/Dialog', // story 이름
    component: Dialog,
} as Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

export const Confirm: Story = {
    render: () => {
        const [isLargeOpen, setIsLargeOpen] = useState(false);
        const [isSmallOpen, setIsSmallOpen] = useState(false);
        return (
            <PageContainer>
                <div className="flex h-screen w-full justify-center gradation-bg">
                    <div
                        style={{ height: '1000vh', marginTop: '40px', width: '100%' }}
                        className="flex flex-col items-center gap-[40px]"
                    >
                        <CTAButton onClick={() => setIsLargeOpen(true)}>Large</CTAButton>
                        <CTAButton onClick={() => setIsSmallOpen(true)}>Small</CTAButton>
                    </div>
                    <Dialog
                        size="large"
                        open={isLargeOpen}
                        onOpenChange={setIsLargeOpen}
                        title="다이얼로그"
                        description="다이얼로그를 띄웁니다."
                        leftText="취소"
                        rightText="완료"
                        contents={<div className="mx-auto my-[24px] w-full">컨펌 다이얼로그 컨텐츠 내용...</div>}
                    />
                    <Dialog
                        open={isSmallOpen}
                        onOpenChange={setIsSmallOpen}
                        title="다이얼로그"
                        description="다이얼로그를 띄웁니다."
                        leftText="취소"
                        rightText="완료"
                        contents={<div className="mx-auto my-[24px] w-full">컨펌 다이얼로그 컨텐츠 내용...</div>}
                    />
                </div>
            </PageContainer>
        );
    },
};

export const Alert: Story = {
    render: () => {
        const [isLargeOpen, setIsLargeOpen] = useState(false);
        const [isSmallOpen, setIsSmallOpen] = useState(false);
        return (
            <PageContainer>
                <div className="flex h-screen w-full justify-center gradation-bg">
                    <div
                        style={{ height: '1000vh', marginTop: '40px', width: '100%' }}
                        className="flex flex-col items-center gap-[40px]"
                    >
                        <CTAButton onClick={() => setIsLargeOpen(true)}>Large</CTAButton>
                        <CTAButton onClick={() => setIsSmallOpen(true)}>Small</CTAButton>
                    </div>
                    <AlertDialog
                        size="large"
                        open={isLargeOpen}
                        onOpenChange={setIsLargeOpen}
                        title="다이얼로그"
                        description="다이얼로그를 띄웁니다."
                        leftText="취소"
                        rightText="삭제"
                    />
                    <AlertDialog
                        open={isSmallOpen}
                        onOpenChange={setIsSmallOpen}
                        title="다이얼로그"
                        description="다이얼로그를 띄웁니다."
                        leftText="취소"
                        rightText="삭제"
                    />
                </div>
            </PageContainer>
        );
    },
};
