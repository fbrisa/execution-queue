/**
 * Internal function in the queue
 *
 * @class PieceOfQueue
 */
class PieceOfQueue {
  functionToRun: Function;
  resolve: Function | null;
  reject: Function | null;

  constructor(functionToRun: Function, resolve?: Function, reject?: Function) {
    this.functionToRun = functionToRun;
    this.resolve = resolve || null;
    this.reject = reject || null;
  }
}

/**
 * Manage and run a queue of function to be executed one by one
 *
 * @class ExecutionQueue
 */
class ExecutionQueue {
  private runningFunction: Function | null;
  private queue: PieceOfQueue[];

  constructor() {
    this.runningFunction = null;
    this.queue = [];
  }

  /**
   * Execute the function, waiting for it to finish
   *
   * @private
   * @param {Function} functionToRun
   * @returns {Promise<any>}
   * @memberof ExecutionQueue
   */
  private async _exec(functionToRun: Function): Promise<any> {
    return await functionToRun.apply(this, []);
  }

  /**
   * If there is a function in the queue, execute it and wait for it to finish
   *
   * @private
   * @returns {Promise<any>}
   * @memberof ExecutionQueue
   */
  private async _execNext(): Promise<any> {
    if (this.queue.length) {
      const poq = this.queue.shift();
      if (poq) {
        this.runningFunction = poq.functionToRun;
        const res = await this._exec(this.runningFunction);
        if (poq.resolve) {
          poq.resolve(res);
        }  
      }

      this.runningFunction = null;
    }
    
  }

  /**
   *  is there a function running now ?
   * @returns 
   */
  private _isRunningSomething():Boolean {
    return this.runningFunction ? true : false;
  }

  /**
   * If there is no function running it will run the next in the queue (if any)
   *
   * @private
   * @memberof ExecutionQueue
   */
  private _runNextIfPossible() {
    if (!this._isRunningSomething()) {
      this._execNext();
      this._runNextIfPossible();
    }
  }

  /**
   * Add a function to the queue that will be scheduled to be executed
   *
   * @param {Function} functionToRun
   * @memberof ExecutionQueue
   */
  push(functionToRun: Function) {
    const poq = new PieceOfQueue(functionToRun);
    this.queue.push(poq);

    setTimeout(() => {this._runNextIfPossible();}, 0);
  }

  /**
   * Add a function to the queue and try to call it asap (If not queued)
   *
   * @param {Function} functionToRun
   * @memberof ExecutionQueue
   */
  pushAndExec(functionToRun: Function) {
    const poq = new PieceOfQueue(functionToRun);
    this.queue.push(poq);

    this._runNextIfPossible()
  }

  /**
   * Add a function to the queue and wait until it is finished, even if it is queued
   * 
   * @param functionToRun 
   * @returns 
   */
  pushAndWait(functionToRun: Function) {
    return new Promise((resolve, reject) => {
      const poq = new PieceOfQueue(functionToRun, resolve, reject);
      this.queue.push(poq);
      this._runNextIfPossible()
    });
  }

}

export { ExecutionQueue }