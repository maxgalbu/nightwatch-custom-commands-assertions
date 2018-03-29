"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This custom command allows us to locate an HTML element on the page and then wait until the value of a
 * specified attribute matches the provided expression (aka. the 'checker' function).
 * It retries executing the checker function every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test). Nightwatch uses the Node.js EventEmitter pattern to handle
 * asynchronous code so this command is also an EventEmitter.
 *
 * h3 Examples:
 *
 *     browser.waitForAttribute("img", "src", function(imageSource) {
 *         return imageSource === "img/header.jpg";
 *     });
 *
 * @author dkoo761
 * @see https://github.com/beatfactor/nightwatch/issues/246#issuecomment-59461345
 * @param {String} elementSelector - css/xpath selector for the element
 * @param {String} attribute - attribute to be checked
 * @param {Function} checker - function that must return true if the attribute matches, false otherwise
 * @param {Integer} [timeoutInMilliseconds] - timeout of this wait commands in milliseconds
 * @param {String} [defaultMessage] - message to display
*/

var WaitForAttribute = function (_events$EventEmitter) {
	_inherits(WaitForAttribute, _events$EventEmitter);

	function WaitForAttribute() {
		_classCallCheck(this, WaitForAttribute);

		var _this = _possibleConstructorReturn(this, (WaitForAttribute.__proto__ || Object.getPrototypeOf(WaitForAttribute)).call(this));

		_this.timeoutRetryInMilliseconds = _this.api.globals.waitForConditionPollInterval || 100;
		_this.defaultTimeoutInMilliseconds = _this.api.globals.waitForConditionTimeout || 5000;
		_this.locateStrategy = "css";
		_this.startTimeInMilliseconds = null;
		return _this;
	}

	_createClass(WaitForAttribute, [{
		key: "restoreLocateStrategy",
		value: function restoreLocateStrategy() {
			if (this.locateStrategy === "xpath") {
				return this.api.useXpath();
			}
			if (this.locateStrategy === "css") {
				return this.api.useCss();
			}
		}
	}, {
		key: "command",
		value: function command(elementSelector, attribute, checker, timeoutInMilliseconds, defaultMessage) {
			var _this2 = this;

			//Save the origian locate strategy, because if this command is used with
			//page objects, the "checker" function of this command is wrapped with another
			//function which resets the locate strategy after the function is called,
			//but since the function is called many times, from the second one the locateStrategy
			//is wrong
			this.locateStrategy = this.client.locateStrategy;

			this.startTimeInMilliseconds = new Date().getTime();

			if (typeof timeoutInMilliseconds !== 'number') {
				timeoutInMilliseconds = this.defaultTimeoutInMilliseconds;
			}
			if (defaultMessage && typeof defaultMessage !== 'string') {
				this.emit('error', "defaultMessage is not a string");
				return;
			}

			this.check(elementSelector, attribute, checker, function (result, loadedTimeInMilliseconds) {
				var message = "";
				if (defaultMessage) {
					message = defaultMessage;
				} else if (result) {
					message = "waitForAttribute: " + elementSelector + "@" + attribute + ". Expression was true after " + (loadedTimeInMilliseconds - _this2.startTimeInMilliseconds) + ".";
				} else {
					message = "waitForAttribute: " + elementSelector + "@" + attribute + ". Expression wasn't true in " + timeoutInMilliseconds + " ms.";
				}

				_this2.client.assertion(result, 'expression false', 'expression true', message, true);
				return _this2.emit('complete');
			}, timeoutInMilliseconds);

			return this;
		}
	}, {
		key: "check",
		value: function check(elementSelector, attribute, checker, callback, maxTimeInMilliseconds) {
			var _this3 = this;

			//Restore the origian locate strategy
			this.restoreLocateStrategy();

			return this.api.getAttribute(elementSelector, attribute, function (result) {
				var now = new Date().getTime();
				if (result.status === 0 && checker(result.value)) {
					return callback(true, now);
				} else if (now - _this3.startTimeInMilliseconds < maxTimeInMilliseconds) {
					return setTimeout(function () {
						return _this3.check(elementSelector, attribute, checker, callback, maxTimeInMilliseconds);
					}, _this3.timeoutRetryInMilliseconds);
				} else {
					return callback(false);
				}
			});
		}
	}]);

	return WaitForAttribute;
}(_events2.default.EventEmitter);

exports.default = WaitForAttribute;
module.exports = exports["default"];