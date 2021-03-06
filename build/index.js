'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startAnimation = exports.formatNumber = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _countup = require('countup.js');

var _countup2 = _interopRequireDefault(_countup);

var _dialectMappings = require('../src/dialectMappings.json');

var _dialectMappings2 = _interopRequireDefault(_dialectMappings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Adapted from the countup.js format number function
// https://github.com/inorganik/countUp.js/blob/master/countUp.js#L46-L60
var formatNumber = exports.formatNumber = function formatNumber(start, options) {
  var neg = start < 0;
  var num = '' + Math.abs(start).toFixed(options.decimals);
  var x = num.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '' + options.decimal + x[1] : '';
  var rgx = /(\d+)(\d{3})/;

  if (options.separator) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + options.separator + '$2');
    }
  }

  return '' + (neg ? '-' : '') + (options.prefix || '') + x1 + x2 + (options.suffix || '');
};

var startAnimation = exports.startAnimation = function startAnimation(component) {
  if (!(component && component.spanElement)) {
    throw new Error('You need to pass the CountUp component as an argument!\neg. this.myCountUp.startAnimation(this.myCountUp);');
  }

  var _component$props = component.props,
      decimal = _component$props.decimal,
      decimals = _component$props.decimals,
      duration = _component$props.duration,
      easingFn = _component$props.easingFn,
      end = _component$props.end,
      formattingFn = _component$props.formattingFn,
      onComplete = _component$props.onComplete,
      onStart = _component$props.onStart,
      prefix = _component$props.prefix,
      separator = _component$props.separator,
      start = _component$props.start,
      suffix = _component$props.suffix,
      useEasing = _component$props.useEasing,
      mapping = _component$props.mapping,
      dialect = _component$props.dialect;


  var countupInstance = new _countup2.default(component.spanElement, start, end, decimals, duration, {
    decimal: decimal,
    easingFn: easingFn,
    formattingFn: formattingFn,
    separator: separator,
    prefix: prefix,
    suffix: suffix,
    useEasing: useEasing,
    useGrouping: !!separator
  }, _dialectMappings2.default[dialect] || undefined, mapping);

  if (typeof onStart === 'function') {
    onStart();
  }

  countupInstance.start(onComplete);
};

var CountUp = function (_React$Component) {
  _inherits(CountUp, _React$Component);

  function CountUp() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CountUp);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CountUp.__proto__ || Object.getPrototypeOf(CountUp)).call.apply(_ref, [this].concat(args))), _this), _this.spanElement = null, _this.refSpan = function (span) {
      _this.spanElement = span;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CountUp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      startAnimation(this);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var hasCertainPropsChanged = this.props.duration !== nextProps.duration || this.props.end !== nextProps.end || this.props.start !== nextProps.start;

      return nextProps.redraw || hasCertainPropsChanged;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      startAnimation(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          start = _props.start,
          decimal = _props.decimal,
          decimals = _props.decimals,
          separator = _props.separator,
          prefix = _props.prefix,
          suffix = _props.suffix,
          style = _props.style,
          mapping = _props.mapping,
          dialect = _props.dialect;


      return _react2.default.createElement(
        'span',
        { className: className, ref: this.refSpan, style: style },
        formatNumber(start, {
          decimal: decimal,
          decimals: decimals,
          separator: separator,
          prefix: prefix,
          suffix: suffix
        })
      );
    }
  }]);

  return CountUp;
}(_react2.default.Component);

CountUp.defaultProps = {
  className: undefined,
  decimal: '.',
  decimals: 0,
  duration: 3,
  easingFn: null,
  end: 100,
  formattingFn: null,
  onComplete: undefined,
  onStart: undefined,
  prefix: '',
  separator: '',
  start: 0,
  suffix: '',
  redraw: false,
  style: undefined,
  useEasing: true
};
exports.default = CountUp;