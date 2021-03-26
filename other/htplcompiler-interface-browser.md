# HTPLCompiler interface - Browser

The HTPLCompiler interface can be accessed by opening che debugger's console in your browser. You will see a welcome log. The interface is implemented in one static class `HTPLCompiler`. His two most important functions are `HTPLCompiler.compile(displayCode = false)`, which compiles your HTPL code and creates a `<script>` element, and `HTPLCompiler.runHTPL()`, that runs your compiled script tag. You may execute both of them by calling `HTPLCompiler.compileAndRun(displayCode = false)`. If you call the compiler by passing true as the argument, the compiled JS code will be logged in the console.

If you need help, type `HTPLCompiler.help()` on your console.

