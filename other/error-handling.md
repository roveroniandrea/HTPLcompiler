# Error handling

During compilation, the HTPLCompiler will detect the following errors:

* Missing or incorrect id on element \(where required\)
* Wrong number of children elements in constructs \(where an exact number is required\)

Please note that **the HTPLCompiler will not validate your code**, for example by checking for undeclared variables, misspelling and so on. This work is handled by the javascript engine in your browser when you run your code, so a compiled HTPL code may not produce a valid Javascript code. I recommend you to check the console for JS errors.

Also, if you want to insert characters like `"` or `'`, please use the backslash notation `\"` and `\'` to avoid errors.

