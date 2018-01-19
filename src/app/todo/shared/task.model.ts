export class Task {
    constructor(
        public id: number,
        public userId: number,
        public title: string,
        public completed: boolean
    ) {}
}
