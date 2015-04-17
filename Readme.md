## Nightwatch custom commands and assertions

[![Build Status](https://travis-ci.org/maxgalbu/nightwatch-custom-commands-assertions.svg?branch=master)](https://travis-ci.org/maxgalbu/nightwatch-custom-commands-assertions) [![npm version](https://badge.fury.io/js/nightwatch-custom-commands-assertions.svg)](http://badge.fury.io/js/nightwatch-custom-commands-assertions)

These are some commands and assertion I use when I'm testing with nightwatch.js and selenium.

### How to use these things?

You can install it using npm:

```
npm install nightwatch-custom-commands-assertions --save-dev
```

Then, open the nightwatch.json file in your editor (or [create it if it doesn't exist](http://nightwatchjs.org/guide#settings-file)) and edit the `custom_commands_path` and `custom_assertions_path` keys so they look like this:

```json
{
	... //your config
	
	"custom_commands_path" : "node_modules/nightwatch-custom-commands-assertions/js/commands",
	"custom_assertions_path" : "node_modules/nightwatch-custom-commands-assertions/js/assertions",
	
	... //your config again
}
```

Now you should be able to use these commands/assertions when you call `nightwatch --test`.

### Alternative ways of installing

- Go into your `tests` folder (or where your nightwatch.json is) and do:
  
  ```
  git clone https://github.com/maxgalbu/nightwatch-custom-commands-assertions.git
  ```

- Download the zipped repository [here](https://github.com/maxgalbu/nightwatch-custom-commands-assertions/archive/master.zip) and extract it wherever you want

You then need to open your nightwatch.json and edit `custom_commands_path` and `custom_assertions_path` according to where you cloned or extracted the repository. 


### Contributing

See [Contributing.md](https://github.com/maxgalbu/nightwatch-custom-commands-assertions/blob/master/Contributing.md).

### List of commands

See [the docs folder](https://github.com/maxgalbu/nightwatch-custom-commands-assertions/blob/master/docs)
