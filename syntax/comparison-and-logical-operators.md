# Comparison and logical operators

As seen previously, a comparison is identified by the `<strong>` element. The operator is specified by the id. Exactly two children are required, both of them must return a comparable value:

```markup
<strong id=">=">
    <p id="foo"></p>
    <p id="10"></p>
</strong>
<strong id="!=">
    <p id="foo"></p>
    <p>Hello there!</p>
</strong>
```

is compiled as:

```javascript
foo >= 10;
foo != 'Hello there!';
```

`<strong>` comparison can be chained with `<and>`, `<or>` and `<not>` logical operations to make more complex conditions. Both `<and>`, `<or>` require exactly two children, while `<not>` requires only one child:

```markup
<or>
    <and>
        <strong id=">=">
            <p id="foo"></p>
            <p id="10"></p>
        </strong>
        <strong id="==">
            <p id="phrase"></p>
            <p>Hello there!</p>
        </strong>
    </and>
    <not>
        <strong id="==">
            <p id="reply"></p>
            <p>General Kenobi</p>
        </strong>
    </not>
</or>
```

is compiled as:

```javascript
(((foo >= 10) && (phrase == 'Hello there!')) || (!(reply == 'General Kenobi')))
```

This comparisons can be inserted as first child of `<ul>` elements to create complex if conditions

