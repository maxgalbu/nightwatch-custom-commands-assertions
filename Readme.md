## Nightwatch custom commands and assertions [![Build Status](https://travis-ci.org/maxgalbu/nightwatch-custom-commands-assertions.svg?branch=master)](https://travis-ci.org/maxgalbu/nightwatch-custom-commands-assertions)

These are some commands and assertion I use when I'm testing with nightwatch.js and selenium.

### How to use these things?

Go into your `tests` folder (or where your nightwatch.json is) and do:

	git clone https://github.com/maxgalbu/nightwatch-custom-commands-assertions.git

(or download the zipped repository [here](https://github.com/maxgalbu/nightwatch-custom-commands-assertions/archive/master.zip) and extract it).

Then, open the nightwatch.json file in your editor (or [create it if it doesn't exist](http://nightwatchjs.org/guide#settings-file)) and edit the `custom_commands_path` and `custom_assertions_path` keys so they look like this:

```json
{
	... //your config
	
	"custom_commands_path" : "nightwatch-custom-commands-assertions/js/commands",
	"custom_assertions_path" : "nightwatch-custom-commands-assertions/js/assertions",
	
	... //your config again
}
```

Now you should be able to use these commands/assertions when you call `nightwatch --test`.

### Contributing

See [Contributing.md](https://github.com/maxgalbu/nightwatch-custom-commands-assertions/blob/master/Contributing.md).

### List of commands

See [the docs folder](https://github.com/maxgalbu/nightwatch-custom-commands-assertions/blob/master/docs)