This is a small jQuery plugin to search the COLOURlovers API by colors or keywords.

Usage:

Insert the `src/colourloversWidget.js` and the `src/colourloversWidget.css` file into your page
and the following line to initialize the plugin.

```
$(yourInputField).colourLovers(options)
```

You can pass `options` to change the look of the widget and for a callback function
that will be called with an array of the hex value of palette colors.

```
{
  onSelect: function(colors){
    console.log(colors)
  },
  type: 'style-1|style-2'
}
```