export class ChunkIterator {
  private finishCallback: () => void;

  private executor: (index: number) => void;

  private currentIndex: number;

  private chunkSize: number;

  private stoppedCounter: number = 0;

  private maxIterations: number;

  constructor(executor: (index: number) => void, callback: () => void, maxIterations: number) {
    this.executor = executor;
    this.finishCallback = callback;
    this.currentIndex = 0;
    this.maxIterations = maxIterations;
    this.chunkSize = 32;
  }

  iterate(taskIndex?: number) {
    // eslint-disable-next-line no-param-reassign
    if (!taskIndex) taskIndex = this.stoppedCounter;

    if (this.stoppedCounter > taskIndex) {
      return;
    }

    for (let i = this.currentIndex; i < this.currentIndex + this.chunkSize && i < this.maxIterations; i += 1) {
      if (this.stoppedCounter > taskIndex) {
        return;
      }

      this.executor(i);
    }

    this.currentIndex += this.chunkSize;

    if (this.currentIndex < this.maxIterations) {
      requestAnimationFrame(() => this.iterate(taskIndex));
    } else {
      this.reset();
      this.finishCallback();
    }
  }

  reset() {
    this.stoppedCounter += 1;
    this.currentIndex = 0;
  }
}
