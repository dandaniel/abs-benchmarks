##Angular boilerplate study benchmarks

Benchmarks done while researching for [angular boilerplate study](http://abs.danmind.ru) ([github](https://github.com/dandaniel/angular-boilerplate-study)).


###Getting started

There's not much to do in order to get started.
Angular benchpress is used for benchmarking, so check out [their repo](https://github.com/angular/benchpress).

```
$ npm install
```

###Running Benchmarks

A grunt task will build and run the benchmark server on **localhost:3339**.

```
$ grunt benchmark
```

You need to have Chrome Canary installed and navigate to the server above in order to run the benchmarks. (There's gonna be a simple interface once you navigate to a benchmark location)


Benchpress has a built-in command to launch Chrome Canary with the right settings. You can use it by running:

```
$ grunt chrome
```

