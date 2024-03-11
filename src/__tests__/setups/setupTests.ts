import '@testing-library/jest-dom';
import 'vitest-canvas-mock';

vi.mock('@/services/auth/getMember');
vi.mock('@/services/character/getCharacterDetail');
vi.mock('@/services/character/getCharacterMemos');
vi.mock('@/services/character/getCharacterSpecialty');
vi.mock('@/services/character/editCharacterName');
vi.mock('@/services/character/deleteCharacterName');
vi.mock('next/headers', async () => {
    return {
        cookies: () => {
            return {
                get: (name: string) => {
                    return {
                        value: 'cookie',
                    };
                },
            };
        },
    };
});

beforeAll(() => {});

afterEach(() => {
    vi.clearAllMocks();
});

afterAll(() => {
    vi.resetAllMocks();
});

// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: any) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
