[![Build Status](https://travis-ci.org/diliburong/coveralls-test.svg?branch=master)](https://travis-ci.org/diliburong/coveralls-test)
[![Coverage Status](https://coveralls.io/repos/github/diliburong/coveralls-test/badge.svg?branch=master)](https://coveralls.io/github/diliburong/coveralls-test?branch=master)

# 使用Travis-CI+Coveralls持续集成

## What?
* Travis-CI是一个持续集成构建项目
* Coveralls是一个自动化测试覆盖率的服务
* Istanbul是一个代码覆盖率工具并生成测试报告发送到Coveralls
* mocha是js的测试框架

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


### 代码覆盖率无法显示 

当运行Istanbul 进行代码覆盖率检查时会出现`No coverage information was collected`

#### 问题原因以及解决办法
在当前 `istanbul latest 0.4.5` 不能 `parse async/await`, 需要 `npm i istanbul@next --save-dev` 即可
