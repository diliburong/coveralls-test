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

当放到test文件夹后仍然无法显示？？？？？
可能是路径问题，或者本身istanbul测试版本的问题
解决方法未知

### 'cat' 不是内部或外部命令，也不是可运行的程序?
在windows下会有相关问题，运行在服务器linxu系统下就没问题
