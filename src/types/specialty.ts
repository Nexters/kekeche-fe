export interface Specialty {
    id: number;
    content: string;
    memoCnt: number;
}

export interface NewSpecialty extends Pick<Specialty, 'content'> {}
