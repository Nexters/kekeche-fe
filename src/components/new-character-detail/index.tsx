import { twMerge } from 'tailwind-merge';
import Name from './compounds/name';
import Keywords from './compounds/keywords';
import CharacterImage from './compounds/character-image';
import Exp from './compounds/exp';

type Props = {
    className?: string;
    children: React.ReactNode;
};

function CharacterDetail({ className, children }: Props) {
    return <div className={twMerge('flex h-auto w-full flex-col items-center', className)}>{children}</div>;
}
CharacterDetail.Name = Name;
CharacterDetail.Keywords = Keywords;
CharacterDetail.Image = CharacterImage;
CharacterDetail.Exp = Exp;

export default CharacterDetail;
