export declare class ChunkIterator {
    private finishCallback;
    private executor;
    private currentIndex;
    private chunkSize;
    private stoppedCounter;
    private maxIterations;
    constructor(executor: (index: number) => void, callback: () => void, maxIterations: number);
    iterate(taskIndex?: number): void;
    reset(): void;
}
