const ExecutionQueue = require("./index");

jest.setTimeout(30000);

// if (fs.existsSync(__dirname + "/testData.json")) {
//   defaultValues = JSON.parse(fs.readFileSync(__dirname + "/testData.json"));
// }

/** @type {ExecutionQueue} */
let executionQueue;

beforeEach(async () => {
  executionQueue = new ExecutionQueue();
});

test("push", async () => {
  executionQueue.push(() => {
    console.log("CIAO");
  });

  setTimeout(() => {
    expect(executionQueue.queue).toHaveLength(0);
  }, 2000);
});

test("pushAndExec", async () => {
  executionQueue.pushAndExec(() => {
    console.log("CIAO2");
  });
  expect(executionQueue.queue).toHaveLength(0);
});

test("pushAndExecAsync", async () => {
  const res = await executionQueue.pushAndWait(() => {
    return new Promise((resolve, reject) => {
      // resolve("OK1");
      setTimeout(() => {
        console.log("resolved");
        resolve("OK1");
      }, 1000);
    });
  });

  expect(executionQueue.queue).toHaveLength(0);
  expect(res).toBe("OK1");
});
