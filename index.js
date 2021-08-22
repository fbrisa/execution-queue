//@ts-check

/**
 * Internal function in the queue
 *
 * @class PieceOfQueue
 */
class PieceOfQueue {
  constructor({functionToRun, resolve=null, reject=null}) {
    this.functionToRun = functionToRun;
    this.resolve = resolve;
    this.reject = reject;
  }
}

/**
 * Manage and run a queue of function to be executed one by one
 *
 * @class ExecutionQueue
 */
class ExecutionQueue {
  constructor() {
    this.runningFunction = null;
    this.queue = [];
  }

  async _exec(functionToRun) {
    return await functionToRun.apply();
  }

  async _execNext() {
    if (this.queue.length) {
      const poq = this.queue.shift();
      this.runningFunction = poq.functionToRun;
      const res = await this._exec(this.runningFunction);
      if (poq.resolve) {
        poq.resolve(res);
      }

      this.runningFunction = null;
    }
    
  }
  _isRunningSomething() {
    return this.runningFunction;
  }
  _runNextIfPossible() {
    if (!this._isRunningSomething()) {
      this._execNext();
      this._runNextIfPossible();
    }
  }

  /**
   * Add a unction to the queue that will be scheduled to be executed
   *
   * @param {Function} functionToRun
   * @memberof ExecutionQueue
   */
  push(functionToRun) {
    const poq = new PieceOfQueue({ functionToRun });
    this.queue.push(poq);

    setTimeout(() => {this._runNextIfPossible();}, 0);
  }

  /**
   * Add a function to the queue and try to call it asap (If not queued)
   *
   * @param {Function} functionToRun
   * @memberof ExecutionQueue
   */
  pushAndExec(functionToRun) {
    const poq = new PieceOfQueue({ functionToRun });
    this.queue.push(poq);

    this._runNextIfPossible()
  }

  /**
   * Add a function to the queue and wait until it is finished, even if it is queued
   *
   * @param {Function} functionToRun
   * @returns Promise<any>
   * @memberof ExecutionQueue
   */
  pushAndWait(functionToRun) {
    return new Promise((resolve, reject) => {
      const poq = new PieceOfQueue({ functionToRun, resolve, reject });
      this.queue.push(poq);
      this._runNextIfPossible()
    });
  }

}

module.exports = ExecutionQueue;
