import fs from "fs";
import { minimatch } from "minimatch";

var toRegExp = function (pattern: string) {
  pattern = pattern.replace(/\/$/, "");

  var i = pattern.indexOf("/");

  if (i === -1 || i === pattern.length - 1) {
    pattern = minimatch
      .makeRe(pattern, { dot: true })
      .toString()
      .replace(/^\/\^/, "/(^|\\/)")
      .replace(/\$\/$/, "($|\\/)/");
    return new RegExp(pattern.slice(1, -1), "i");
  }

  if (i === 0) pattern = pattern.slice(1);

  return minimatch.makeRe(pattern, { dot: true, nocase: true });
};

var falsy = function () {
  return false;
};

var toFunction = function (regexp: any) {
  return function (input: any) {
    return regexp.test(input);
  };
};

var or = function (a: any, b: any) {
  if (a === falsy) return b;
  return function (input: any) {
    return a(input) || b(input);
  };
};

export const ignore: any = function (filename: any, def: any, cb: any) {
  if (typeof def === "function") return ignore(filename, null, def);
  fs.readFile(filename, "utf-8", function (err: any, src: any) {
    if (err && err.code !== "ENOENT") return cb(err);
    if (err) return cb(null, null);
    cb(null, ignore.compile(src));
  });
};

ignore.compile = function (src: any) {
  if (Array.isArray(src)) src = src.join("\n");

  var lines = src
    .split("\n")
    .map(function (line: any) {
      return line.trim();
    })
    .filter(function (line: any) {
      return line && line[0] !== "#";
    });

  var negative = lines
    .filter(function (line: any) {
      return line[0] !== "!";
    })
    .map(toRegExp)
    .map(toFunction)
    .reduce(or, falsy);

  var positive = lines
    .filter(function (line: any) {
      return line[0] === "!";
    })
    .map(function (line: any) {
      return line.slice(1);
    })
    .map(toRegExp)
    .map(toFunction)
    .reduce(or, falsy);

  return function (input: any) {
    return !positive(input) && negative(input);
  };
};

ignore.sync = function (filename: any, def: any) {
  try {
    return ignore.compile(fs.readFileSync(filename, "utf-8"));
  } catch (err: any) {
    if (err.code !== "ENOENT") throw err;
    return null;
  }
};
