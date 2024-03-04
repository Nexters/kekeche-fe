import { Args, Meta, StoryObj } from '@storybook/react';
import { PageContainer } from '@/components/ui';
import { useToast } from '@/components/ui-shadcn/toast/use-toast';
import { Toaster } from '../ui-shadcn/toast/toaster';

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
                <button onClick={handleClick}>토스트 띄우기</button>
            </PageContainer>
            <Toaster />
        </>
    );
};

export default {
    title: 'Components/토스트', // story 이름
    component: Toast,
} as Meta<typeof Toast>;

type Story = StoryObj<typeof Toast>;

export const Basic: Story = {
    args: {
        duration: 2000,
        description: '윤서 경리 태환 준근 순영 은솔 만세 ✌️',
    },
};
