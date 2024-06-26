import { Meta, StoryObj } from '@storybook/react';
import { useToast } from '@/components/ui-shadcn/toast/use-toast';
import { Toaster } from '../components/ui-shadcn/toast/toaster';
import { PageContainer } from '@/components/ui';

interface Props {
    description: string;
    duration?: number;
}

const Toast = (props: Props) => {
    const { toast } = useToast();
    const handleClick = () => {
        toast(props);
    };
    return (
        <>
            <PageContainer>
                <button className="mx-auto mt-[40px] text-[20px] font-[700]" onClick={handleClick}>
                    토스트 띄우기
                </button>
            </PageContainer>
            <Toaster />
        </>
    );
};

export default {
    title: 'Components/Toast', // story 이름
    component: Toast,
} as Meta<typeof Toast>;

type Story = StoryObj<typeof Toast>;

export const Basic: Story = {
    args: {
        duration: 2000,
        description: '윤서 경리 태환 준근 순영 은솔 만세 ✌️',
    },
};
