import { Meta, StoryObj } from '@storybook/react';
import CtaButton from '@/components/ui/cta-button';

export default {
    title: 'Components/CtaButton', // story 이름
    component: CtaButton,
} as Meta<typeof CtaButton>;

type Story = StoryObj<typeof CtaButton>;
export const Basic: Story = {
    argTypes: {
        text: { control: 'text' },
        disabled: { control: 'boolean' },
    },
    render: (props) => <CtaButton {...props} />,
};
