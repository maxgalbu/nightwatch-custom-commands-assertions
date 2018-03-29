'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This custom command allows us to wait for every AJAX request made by jquery to be completed
 * It checks for jQuery.active every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test).
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForJqueryAjaxRequest();
 *
 * @author maxgalbu
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 * @param {String} [defaultMessage] - message to display
*/

var WaitForJqueryAjaxRequest = function (_events$EventEmitter) {
	_inherits(WaitForJqueryAjaxRequest, _events$EventEmitter);

	function WaitForJqueryAjaxRequest() {
		_classCallCheck(this, WaitForJqueryAjaxRequest);

		var _this = _possibleConstructorReturn(this, (WaitForJqueryAjaxRequest.__proto__ || Object.getPrototypeOf(WaitForJqueryAjaxRequest)).call(this));

		_this.timeoutRetryInMilliseconds = _this.api.globals.waitForConditionPollInterval || 100;
		_this.defaultTimeoutInMilliseconds = _this.api.globals.waitForConditionTimeout || 5000;
		_this.startTimeInMilliseconds = null;
		return _this;
	}

	_createClass(WaitForJqueryAjaxRequest, [{
		key: 'command',
		value: function command(timeoutInMilliseconds, defaultMessage) {
			var _this2 = this;

			this.startTimeInMilliseconds = new Date().getTime();

			if (typeof timeoutInMilliseconds !== 'number') {
				timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
			}
			if (defaultMessage && typeof defaultMessage !== 'string') {
				this.emit('error', "defaultMessage is not a string");
				return;
			}

			this.check(function (result, loadedTimeInMilliseconds) {
				var message = "";
				if (defaultMessage) {
					message = defaultMessage;
				} else if (result) {
					message = 'waitForJqueryAjaxRequest: AJAX requests finished after ' + (loadedTimeInMilliseconds - _this2.startTimeInMilliseconds) + ' ms.';
				} else {
					message = 'waitForJqueryAjaxRequest: AJAX requests not finished in ' + timeoutInMilliseconds + ' ms.';
				}

				_this2.client.assertion(result, 'expression false', 'expression true', message, true);
				return _this2.emit('complete');
			}, timeoutInMilliseconds);

			return this;
		}
	}, {
		key: 'check',
		value: function check(callback, maxTimeInMilliseconds) {
			var _this3 = this;

			var executeFunc = function executeFunc(selector) {
				return jQuery.active;
			};

			return this.api.execute(executeFunc, [], function (result) {
				var now = new Date().getTime();
				if (result.status === 0 && result.value === 0) {
					return callback(true, now);
				} else if (now - _this3.startTimeInMilliseconds < maxTimeInMilliseconds) {
					return setTimeout(function () {
						return _this3.check(callback, maxTimeInMilliseconds);
					}, _this3.timeoutRetryInMilliseconds);
				} else {
					return callback(false);
				}
			});
		}
	}]);

	return WaitForJqueryAjaxRequest;
}(_events2.default.EventEmitter);

exports.default = WaitForJqueryAjaxRequest;
module.exports = exports['default'];