import ExitIcon from '@/assets/icons/exit_24x24.svg';
import SpecialtyBox from './specialties/specialty-box';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: () => void;
    canDelete: boolean;
};

export default function SpecialtyInput({ value, onChange, onDelete, canDelete }: Props) {
    return (
        <SpecialtyBox>
            <div className="flex w-full justify-between ">
                <input
                    className="bg-inherit flex h-full w-full items-center border-none bg-newGray-100 p-0 text-Subtitle2 text-newGray-900 outline-none outline-newGray-100"
                    placeholder="공백 포함 최대 10자"
                    value={value}
                    onChange={onChange}
                    maxLength={10}
                />
                {canDelete && (
                    <button onClick={onDelete}>
                        <ExitIcon />
                    </button>
                )}
            </div>
        </SpecialtyBox>
    );
}
