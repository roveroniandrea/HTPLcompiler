# Function declaration and invocation

A function can be declared with the `<div>` element. Function name is specified by the id, and optional parameters are specified by the classes of the element:

```markup
<div id="anakinSays" class="name, age">
    <return>
        <p>This is were the fun begins</p>
    </return>
</div>
```

this is compiled as:

```javascript
function anakinSays(name, age){
    return 'This is were the fun begins';
}
```

Classes can be omitted if function does not require any parameters. Also `<return>` can be omitted to make a void function.

Functions can be invoked with `<h3>` tag. Function name must be specified with the id \(without brackets\) and all the children are considered parameters:

```markup
<h3 id="anakinSays">
    <p>Andrea</p>
    <p id="19"></p>
</h3>
```

is compiled as:

```javascript
anakinSays('Andrea', 19);
```

