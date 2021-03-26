# While loop

This is the only available loop in HTPL. It's defined by `<while>` element \(so much fantasy\). At least two children are required, the first for the condition and the second \(and others\) for the code to loop:

```markup
<while>
    <strong id=">">
        <p id="numberOfLoops"></p>
        <p id="0"></p>
    </strong>
    <h2 id="numberOfLoops">
        <b id="-">
            <p id="numberOfLoops"></p>
            <p id="1"></p>
        </b>
    </h2>
</while>
```

this code is compiled as:

```javascript
while(numberOfLoops > 0){
    numberOfLoops = numberOfLoops - 1;
}
```

