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
 * This custom command allows us to wait until the value of the page title matches the provided expression
 * (aka. the 'checker' function).
 * It retries executing the checker function every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test).
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForTitle(function(title) {
 *         return title === "something";
 *     });
 *
 * @author dkoo761
 * @see https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345
 * @param {Function} checker - function that must return true if the title matches your requisite, false otherwise
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 * @param {String} [defaultMessage] - message to display
*/

var WaitForTitle = function (_events$EventEmitter) {
	_inherits(WaitForTitle, _events$EventEmitter);

	function WaitForTitle() {
		_classCallCheck(this, WaitForTitle);

		var _this = _possibleConstructorReturn(this, (WaitForTitle.__proto__ || Object.getPrototypeOf(WaitForTitle)).call(this));

		_this.timeoutRetryInMilliseconds = _this.api.globals.waitForConditionPollInterval || 100;
		_this.defaultTimeoutInMilliseconds = _this.api.globals.waitForConditionTimeout || 5000;
		_this.startTimeInMilliseconds = null;
		return _this;
	}

	_createClass(WaitForTitle, [{
		key: 'command',
		value: function command(checker, timeoutInMilliseconds, defaultMessage) {
			var _this2 = this;

			this.startTimeInMilliseconds = new Date().getTime();

			if (typeof timeoutInMilliseconds !== 'number') {
				timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
			}
			if (defaultMessage && typeof defaultMessage !== 'string') {
				this.emit('error', "defaultMessage is not a string");
				return;
			}

			this.check(checker, function (result, loadedTimeInMilliseconds) {
				var message = "";
				if (defaultMessage) {
					message = defaultMessage;
				} else if (result) {
					message = 'waitForTitle: Expression was true after ' + (loadedTimeInMilliseconds - _this2.startTimeInMilliseconds) + '.';
				} else {
					message = 'waitForTitle: ' + element + '@' + attribute + '. Expression wasn\'t true in ' + timeoutInMilliseconds + ' ms.';
				}

				_this2.client.assertion(result, 'expression false', 'expression true', message, true);
				return _this2.emit('complete');
			}, timeoutInMilliseconds);

			return this;
		}
	}, {
		key: 'check',
		value: function check(checker, callback, maxTimeInMilliseconds) {
			var _this3 = this;

			return this.api.getTitle(function (title) {
				var now = new Date().getTime();
				if (checker(title)) {
					return callback(true, now);
				} else if (now - _this3.startTimeInMilliseconds < maxTimeInMilliseconds) {
					return setTimeout(function () {
						return _this3.check(checker, callback, maxTimeInMilliseconds);
					}, _this3.timeoutRetryInMilliseconds);
				} else {
					return callback(false);
				}
			});
		}
	}]);

	return WaitForTitle;
}(_events2.default.EventEmitter);

exports.default = WaitForTitle;
module.exports = exports['default'];