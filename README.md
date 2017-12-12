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
checkCookie | boolean | true | if set to `true`, then the plugin checks the cookie for existence and add cookie. When set to `false`, creates a new cookie or updates old cookie.
expires | integer | 3 | The cookies expire date, specified in days.
type | string | 'full' | Type of block displaying. `full` - display block at full screen width. `corner` - display block in corner of screen.
position | string | 'bottom-left' | Position is used to describe where on the screen your block should display. Allowed position: `top-left`, `top-right`, `bottom-left`, `bottom-right`.
description | string | 'This website uses cookies to ensure you get the best experience on our website.' | Text strings used for description content of block.
textButton | string | 'Got it!' | Text used for button.

#### Example
Initialize block in top right corner with button text "Ok":
```javascript
$('body').cookieAccept({
  position: 'top-right',
  type: 'corner',
  textButton: 'Ok'
});
```

## Dependencies
[JQuery](http://jquery.com/download/)


## License
CookieAccept is Copyright © Alex Dolzhenkov and is licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT).
