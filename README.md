<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">execution-queue</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-GPL-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A javascript/typescript queue that runs functions sequentially. <br>
  When you add one function it will be pushed to the queue and run.<br/>
  If you add more functions they will be pushed to the queue and they will be run, one by one. <br/>
  Only one function is executed at time.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

Executes a queue of functions one by one

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

- NodeJs

### Installing

Using npm:
* `npm install execution-queue`

Using yarn:
* `yarn add execution-queue`

## 🔧 Running the tests <a name = "tests"></a>

Test are jest based, so
* `path_to_jest --config jest.config.js`
i.e.
* `./node_modules/.bin/jest --config jest.config.js`

## 🎈 Usage <a name="usage"></a>

```
const { ExecutionQueue } = require("execution-queue");
const executionQueue = new ExecutionQueue();


executionQueue.push(() => {
    console.log("Hello world!");
});
executionQueue.push(() => {
    console.log("Hello world 2!");
});

```

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- (https://github.com/fbrisa) - Francesco

