import CharacterDetailPage from '@/app/(routes)/character/[id]/page';
import render from './setups/render';

it('', async () => {
    render(await CharacterDetailPage({ params: { id: 2 } }));
});
