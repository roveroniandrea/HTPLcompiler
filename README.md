# HTPL compiler

## HTPL Compiler by Andrea Roveroni

### [Try some examples](https://roveroniandrea.github.io/HTPLcompiler/) - or you're looking for [Htpl-CLI](https://github.com/roveroniandrea/HTPLcompiler/tree/master/Htpl-CLI)?

**It's known that HTML is not a programming language.** In fact it stands for Hyper Text Markup Language.

No one could make a program in HTML.

**UNTIL NOW**

Welcome to the HTPLcompiler, a compiler that lets you program in HTML.

Ladies and gentleman, ~~we're~~ I'm proud to present you the **HTPL**, or **Hyper Text Programming Language**.

The compiler checks for all elements inside a defined element \(which is `<HTPL>`\) in body, and creates a `<script>` element containing JS code.

### What can you do in HTPL?

HTPL supports lots of the basic feature required for a programming language. It allows you to declare variables, compute operations, assigning values, evaluating logical expressions, inserting conditions with an `if then else` structure, and supports the `while` loop construct. In addition to this, it provides interfaces for user inputs and program outputs via `prompt` and `alert` JS functions.

### Why using HTPL?

HTPL main purpose is to destoy the "HTML is not a programming language" meme, but you're able to make complex programs too, if you want.

### Get started - CLI

If you want to use the new Htpl-CLI, please follow [this guide](https://github.com/roveroniandrea/HTPLcompiler/tree/master/Htpl-CLI)

### Get started - Browser

If you want to simply inject the compiler in your code, download `main.js` file and attach it in you `index.html` file. If you need some examples and introduction, continue reading or [try some examples](https://roveroniandrea.github.io/HTPLcompiler/).

HTPLCompiler interface can be found on your browser console, and provides you with an help\(\) function to get started.

### HTPL tag

`<HTPL>` tag must contain all the HTPL code you want to compile. Children elements must respect the rules of HTPL programming language. All elements that are not children of HTPL tag are simply ignored.

### Variable declaration

Variables can be declared with the following syntax:

```markup
<h1 id="varName">
    <p>A value</p>
</h1>
```

which is compiled as

```javascript
let varName = 'A value';
```

More details about the `<p>` element in the next section

### Returning values

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

### Operations between values

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

### Value assignment

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

### If then else branches

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

### Comparison and logical operations

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

### Function declaration and invocation

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

### While loop

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

### Inputs and outputs

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

### Comments

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

## HTPLCompiler interface - Browser

The HTPLCompiler interface can be accessed by opening che debugger's console in your browser. You will see a welcome log. The interface is implemented in one static class `HTPLCompiler`. His two most important functions are `HTPLCompiler.compile(displayCode = false)`, which compiles your HTPL code and creates a `<script>` element, and `HTPLCompiler.runHTPL()`, that runs your compiled script tag. You may execute both of them by calling `HTPLCompiler.compileAndRun(displayCode = false)`. If you call the compiler by passing true as the argument, the compiled JS code will be logged in the console.

If you need help, type `HTPLCompiler.help()` on your console.

### Error handling

During compilation, the HTPLCompiler will detect the following errors:

* Missing or incorrect id on element \(where required\)
* Wrong number of children elements in constructs \(where an exact number is required\)

Please note that **the HTPLCompiler will not validate your code**, for example by checking for undeclared variables, misspelling and so on. This work is handled by the javascript engine in your browser when you run your code, so a compiled HTPL code may not produce a valid Javascript code. I recommend you to check the console for JS errors.

Also, if you want to insert characters like `"` or `'`, please use the backslash notation `\"` and `\'` to avoid errors.

