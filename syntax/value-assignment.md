# Value assignment

The `<h2>` element is used to assign a new value to an existing variable, specified by the id. For example:

```markup
<h2 id="foo">
    <b id="+">
        <p id="10"></p>
        <p id="foo"></p>
    </b>
</h2>
```

is compiled as

```javascript
foo = 10 + foo
```

Please note that `foo` must be previously declared with `<h1>` element. If foo is not previously declared, the compiler won't give you an error, but the JS code will not work.

