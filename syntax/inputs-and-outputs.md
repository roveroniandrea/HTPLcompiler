# Inputs and outputs

If you want to ask the user to insert a value, you have to use `<prompt>` element. The optional message is specified by the id:

```markup
<h2 id="foo">
    <prompt id="Please insert a value for foo: ">
    </prompt>
</h2>
```

this code is compiled as:

```javascript
foo = prompt('Please insert a value for foo: ');
```

Outputs are displayed with `<cite>` element:

```markup
<cite>
    <b id="+">
        <p>Foo now has value: </p>
        <p id="foo"></p>
    </b>
</cite>
```

Which is compiled as an `alert()` function:

```javascript
alert(('Foo has new value: ' + foo))
```

