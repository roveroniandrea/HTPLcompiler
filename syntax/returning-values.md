# Returning values

The `<p>` element is used to return string values, integer values or variable values. This code:

```markup
<p>A string value</p>
<p id="10"></p>
<p id="varname"></p>
```

is compiled as

```javascript
'A string value'
10
varname
```

Please note that a string value will be returned only if no id is specified. For example:

```markup
<p id="foo">A string value</p>
```

will return

```javascript
foo
```

