import { Meta, StoryObj } from '@storybook/react';
import CtaButton from '../../ui/cta-button';

export default {
    title: 'Components/CtaButton', // story 이름
    component: CtaButton,
} as Meta<typeof CtaButton>;

type Story = StoryObj<typeof CtaButton>;
export const Basic: Story = {
    render: () => <CtaButton text="테스트" />,
};
