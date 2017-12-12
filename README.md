# cookieAccept
JQuery plugin to the EU cookie law.

## Installation

Just add a link to the css file in your `<head>`:
```html
<link rel="stylesheet" type="text/css" src="css/cookieaccept.css" />
```

Then, before your closing ```<body>``` tag add plugin:
```html
<script type="text/javascript" src="js/jquery.cookieaccept.js"></script>
```

Init plugin:
```html
<script>
    $('body').cookieAccept();
</script>
```



## Settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
checkCookie | boolean | true |Check cookie or not
expires | integer | 3 | Life of cookie. Days.
type | string | 'full' | Type of view block. Full - full width of window. Corner - position in corner of window.
position | string | 'bottom-left' | Position in window.
description | string | 'This website uses cookies to ensure you get the best experience on our website.' | Description of block.
textButton | string | 'Got it!' | Button text.

## Dependencies
[JQuery](http://jquery.com/download/)


## License
CookieAccept is Copyright © Alex Dolzhenkov and is licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT).
