function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  return {
    replace: function (name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function () {
      return new RegExp(regex, opt);
    }
  };
}

module.exports = edit;
