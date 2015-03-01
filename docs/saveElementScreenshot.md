

<!-- Start coffee/commands/saveElementScreenshot.coffee -->

Take a screenshot of the requested element

This command requires ImageMagick installed on the system and node-easyimage installed as a npm module. You can install node-easyimage with:

    npm install --production

And imagemagick with:

    #Centos
    yum install ImageMagick

    #OSX
    brew install imagemagick --build-from-source

    #Ubuntu
    apt-get install ImageMagick
### Examples:

    browser.saveElementScreenshot(".class", "screenshot-name.jpg");

Author: maxgalbu

### Params:

* **String** *elementSelector* - css/xpath selector for the element
* **Function** *fileName* - file path where the screenshot is saved

<!-- End coffee/commands/saveElementScreenshot.coffee -->

