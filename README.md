[![Build Status](https://travis-ci.org/diliburong/coveralls-test.svg?branch=master)](https://travis-ci.org/diliburong/coveralls-test)
[![Coverage Status](https://coveralls.io/repos/github/diliburong/coveralls-test/badge.svg?branch=master)](https://coveralls.io/github/diliburong/coveralls-test?branch=master)

# 使用Travis-CI+Coveralls持续集成

## What?
* Travis-CI是一个持续集成构建项目
* Coveralls是一个自动化测试覆盖率的服务
* Istanbul是一个代码覆盖率工具并生成测试报告发送到Coveralls
* mocha是js的测试框架
* Mocha本身是一个单元测试框架而chai则是一个被称之为期望函数的库。为了能够更直观的说明两者的关系，我们可以把mocha比作一个用于描述单元测试的组件，而chai则可以通过便利的辅助函数设立断言来判断我们的代码执行结果是否有达到预期。


## How?

### Travis-CI
* 在 *https://travis-ci.org/* 中选择需要持续集成的项目
并且在本地创建`.travis.yml`文件
代码如下：
```yml
# 配置语言以及版本
language: node_js
node_js:
  - "8"

# 缓存
cache: yarn
# Node.js v4（或io.js v3）编译器要求
env:
  - CXX=g++-4.8
addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - g++-4.8

install:
  - yarn install

script:
  - yarn test
  - yarn run cov

#指定分支，只有指定的分支提交时才会运行脚本
branches:
  only:
    - master
```

* 将代码提交到github就会自动构建

### Istanbul
* Statements: 语句覆盖率，执行到每个语句

* Branches: 分支覆盖率，执行到每个if代码块

* Functions: 函数覆盖率，调用到程式中的每一个函数

* Lines: 行覆盖率, 执行到程序中的每一行


### Coveralls

* 在 *https://coveralls.io/* 中选择需要生成报告的项目，在`Travis` 中build并且没有错误之后会自动的生成覆盖率分析报告
* 安装`npm install coveralls`


## script命令解释
`"cov": "istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage"`

* 需要注意的是`_mocha`前面的下划线是不能省略的。`mocha`会新建一个进程执行测试，而`_mocha`是在当前进程（即 istanbul 所在的进程）执行测试，只有这样， istanbul 才会捕捉到覆盖率数据。

* 同时`_mocha` 的参数要在`--` 双杠后面 如 `-- -R`,之前的参数都为istanbul的参数

```
-R, --REPORTER
这个命令可以用来指定报告格式，默认是“spec”。可以使用第三方的报告样式，例如：
npm install mocha-lcov-reporter,--reporter mocha-lcov-reporter
```


## Problems?
### 代码覆盖率无法显示 

当运行Istanbul 进行代码覆盖率检查时会出现`No coverage information was collected`

#### 问题原因以及解决办法
在当前 `istanbul latest 0.4.5` 不能 `parse async/await`, 需要 `npm i istanbul@next --save-dev` 即可 见`awaitReadFile.js`

### 当放到test文件夹后仍然无法显示？？？？？

#### 问题原因以及解决办法

应该是代码组织结构的问题，之前在做覆盖率测试demo时把需要测试的代码源文件一起放入了test，
按照现在组织结构用index将源文件暴露出来之后再在测试文件中引入，就能够得到代码覆盖率

### 'cat' 不是内部或外部命令，也不是可运行的程序?
在windows下会有相关问题，运行在服务器linxu系统下就没问题
