# Comments

All elements that are not children of the `<HTPL>` tag will be ignored. If you want to add comment to your code, you can use the traditional HTML comment `<!--comment-->` or assign the class `HTPL-ignore` to the element. This makes the compiler to skip the element and all his children:

```markup
<!--This cite tag and all his children will be ignored-->
<cite class="HTPL-ignore">
    <b id="+">
        <p>Foo now has values: </p>
        <p id="foo"></p>
    </b>
</cite>
```

