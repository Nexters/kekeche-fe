import Dialog, { DialogProps } from '.';

export default function AlertDialog(props: Omit<DialogProps, 'type'>) {
    return <Dialog type="alert" {...props} />;
}
