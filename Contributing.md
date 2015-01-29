# Contributing

So, you want to add you command or assertion. Great!

Read [this guide](http://nightwatchjs.org/guide#extending) on how to write it.
The name you give to the file will be the name of the command or assertion.

Now, do you use coffeescript? Follow these steps:

- checkout the repository (obviously :)
- run `npm install` (this will install gulp and coffeelint globally, and all the dev dependencies)
- run `gulp watch`
- start writing your command in the `coffee/commands` folder or your assertion in the `coffee/assertions` folder
- run `npm test` when you're done, and fix the errors
- make a pull request

Do you use javascript instead? Bad boy. Follow these steps:

- checkout the repository
- start writing your command in the `js/commands` folder or your assertion in the `js/assertions` folder
- make a pull request
- I'll convert the command/assertion for you in coffeescript
