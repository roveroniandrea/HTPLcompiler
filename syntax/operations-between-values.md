# Operations between values



The `<b>` element is used to execute operations between two values. The operation is defined by its id, for example:

```markup
<b id="+">
    <p id="10"></p>
    <p id="foo"></p>
</b>
<b id="*">
    <p id="10"></p>
    <p id="foo"></p>
</b>
```

is compiled as

```javascript
10 + foo
10 * foo
```

