const __jlua__ = require("jlua/lib/js/runtime");

let Person = __jlua__.class("Person", function (name) {
  this.name = name;
});

Person.prototype.sayHi = function () {
  return "hi";
};

let SuperMan = __jlua__.class("SuperMan", Person, function (name, skill) {
  this.skill = skill;
});

SuperMan.prototype.sayHi = function () {
  return __jlua__.add(Object.getPrototypeOf(SuperMan.prototype).sayHi.call(this), __jlua__.add(" ", this.name));
};

let sp = SuperMan("tom", "fly");

__jlua__.print(sp.name);

__jlua__.print(sp.skill);

__jlua__.print(sp.sayHi());