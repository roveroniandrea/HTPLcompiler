# If then else branches

The if then else construct is defined by the `ul` element. This element must have exactly two or three branches \(`condition`, `if` branch and optional `else` branch\). This code:

```markup
<ul>
    <strong id="==">
        <p id="foo"></p>
        <p id="10"></p>
    </strong>
    <if>
        <p>Some code here</p>
    </if>
    <else>
        <p>Some other code here</p>
    </else>
</ul>
```

is compiled as:

```javascript
if(foo == 10){
    'Some code here';
}
else{
    'Some other code here';
}
```

The element `<strong>` will be explained in details later, but it stands for a comparison. Please note that condition, if and else branches must be declared in this exact order.

