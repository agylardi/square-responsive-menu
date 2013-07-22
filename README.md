Square Responsive Menu - SRM (Alpha 1.0)
======================

jQuery plugin menu as alternative solution of navigation menu system for responsive website.
Inspired and based on research by <a href="http://dl.acm.org/citation.cfm?doid=1753326.1753534">Ahlstrom et al (2010)</a>. The menu system is customizable with some options. 
Built using jQuery version 1.8.3 and CSS 3

[ <a href="http://agylardi.com/demo/square-menu/" target="_blank">Live Demo</a> ]

## Author
Agyl Rahmadi / Gyl (agyl.ardi@gmail.com)<br />
**Notes**: *This is my first attemp to make a JQuery plugin. Any feedback will be much appreciated*

## Usage 
Download the package and link the JS file (jquery .js file and this plugin file: `jquery.squareresponsivemenu.js`) and 
CSS file (`square-responsive-menu.css`) in your HTML.
Also put *images* folder at the same directory with your HTML file.

There are 3 menu levels available in the menu (class): `level-1`, `level-2`, `level-3`.
The usage in basic HTML structure is as shown below: 
```html
<nav id="square-menu">
  <input type="button" id="toggle-square" value="" >
  <ul class="level-1">
    <li><a href="#">Menu Item #1</a></li>
  	<li><a href="#">Menu Item #2</a></li>
		<li><a href="#">Menu Item #3</a></li>
		<li><a href="#">Menu Item #4</a></li>
		<li><a href="#">Menu Item #5</a>
			 <ul class="level-2">
				<li><a href="#">Sub-Menu Item #5.1</a></li>
				<li><a href="#">Sub-Menu Item #5.2</a></li>
				<li><a href="#">Sub-Menu Item #5.3</a>
					<ul class="level-3">
						<li><a href="#">Sub-Menu Item #5.3.1</a></li>
						<li><a href="#">Sub-Menu Item #5.3.2</a></li>
						<li><a href="#">Sub-Menu Item #5.3.3</a></li>
						<li><a href="#">Sub-Menu Item #5.3.4</a></li>
						<li><a href="#">Sub-Menu Item #5.3.5</a></li>
						<li><a href="#">Sub-Menu Item #5.3.6</a></li>
						<li><a href="#">Sub-Menu Item #5.3.7</a></li>
						<li><a href="#">Sub-Menu Item #5.3.8</a></li>
            <li><a href="#">Sub-Menu Item #5.3.9</a></li>
					</ul>
				</li>
				<li><a href="#">Sub-Menu Item #5.4</a></li>
				<li><a href="#">Sub-Menu Item #5.5</a></li>
				<li><a href="#">Sub-Menu Item #5.6</a></li>
				<li><a href="#">Sub-Menu Item #5.7</a></li>
				<li><a href="#">Sub-Menu Item #5.8</a></li>
        <li><a href="#">Sub-Menu Item #5.9</a></li>
			 </ul>
		</li>
		<li><a href="#">Menu Item #6</a></li>
		<li><a href="#">Menu Item #7</a></li>
		<li><a href="#">Menu Item #8</a></li>
    <li><a href="#">Menu Item #9</a></li>
	</ul>
</nav>
```
For initiation of the plugin, just include the following script tag in your HTML:
```html
<script type="text/javascript">
  $(document).ready(function(){
		$('#square-menu').squareResponsiveMenu();
	});	
</script>
```

## Options
There are 5 options for this plugin. They are as the following:

### squareHeight
`squareHeight` is the height of menu items in pixel. 
To make square menu items, just make sure this options is the same with `squareWidth` option.
<br />*Default value*: `75`

----

### squareHeight
`squareHeight` is the width of menu items in pixel.
To make square menu items, just make sure this options is the same with `squareHeight` option.
<br />*Default value*: `75`

----

### squareNumbers
`squareNumbers` is the amount of spanning menu items (squares) in a menu level.
<br />*Default value*: `3`

----

### menuItemsFlow
`menuItemsFlow` is the orientation of which the menu items appear. (right to left, or left to right)
<br />*Default value*: `left`

----

### togglePosition
`togglePosition` is the orientation of on which way  the menu appears based on the `togglePosition` value. As the menu is targeted to be used in mobile screen, there
are 4 value for this options: `top-left`, `top-right`, `bottom-right` and `bottom-left`.
This option determine the appearance direction of menu items NOT the position of toggle button.
<br />*Default value*: `top-left`
