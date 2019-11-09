window.addEventListener('load', () => HTPLCompiler.welcome());

class HTPLCompiler {

    static welcome(){
        console.log(`HTPLCompiler enabled
        To begin running code, type HTPLCompiler.compileAndRun()
        To display help menu, please type HTPLCompiler.help()

        HTPLCompiler by Andrea Roveroni
        `);
    }

    static help(){
        console.log(`List of available commands:
        compile() -> Compiles HTPL code and attaches a script element on body
        runHTPL() -> Runs script attacked to body. HTML code must have been previously compiled
        compileAndRun() -> Calls both compile() and runHTPL()
        compileElement() -> Compiles a single element and his children and returns the code (does not create script element)
        compileChildOf() -> Compiles the cildren of an element but not the element itself. Returns the code (does not create script element)
        help() -> Displays a list of available commands
        welcome() -> Displays welcome information`);
        let readmeUrl = 'https://github.com/roveroniandrea/HTPLcompiler/blob/master/README.md';
        console.warn(`Please check on github to get detailed information: ${readmeUrl}`);
    }

    static compile(displayCode = false) {
        //HTML element containg code
        let HTPLelement = document.querySelector('HTPL');

        if(!HTPLelement){
            throw `Error, HTPL element not found. Please create HTPL element in order to run HTML`
        }
        //Compiled HTPL code
        let stringCompiled = this.compileElement(HTPLelement);
        if(!stringCompiled){
            throw `Error, no code compiled but HTPL element was found. Check for HTPL-ignore class on element`
        }
        if(displayCode){
            console.log('HTPL compiled!', stringCompiled);
        }

        //add or replace script element to run HTPL
        let scriptElement = document.querySelector('#HTPLScript');
        if (scriptElement) { document.body.removeChild(scriptElement) };
        scriptElement = document.createElement('script');
        scriptElement.id = "HTPLScript";
        scriptElement.innerHTML = stringCompiled;
        document.body.appendChild(scriptElement);

        console.log('Script tag added in body element. Please run HTPLCompiler.runHTPL() to execute code')
    }

    static compileAndRun(displayCode = false) {
        this.compile(displayCode);
        this.runHTPL();
    }

    static runHTPL() {
        let scriptElement = document.querySelector('#HTPLScript');
        if(!scriptElement){
            throw 'No HTPLScript found in body, please compile HTPL before running it';
        }
        compiledCode();
    }

    static compileElement(element) {
        let resultString = '';
        if (!element || !element.tagName || element.classList.contains('HTPL-ignore')) return resultString;
        switch (element.tagName.toLowerCase()) {
            //start of HTPL code
            case 'htpl': {
                resultString = `function compiledCode(){
                    ${this.compileChildOf(element)}
                }`
                break;
            }
            //declaration with assignment
            case 'h1': {
                let id = element.id;
                if (!id) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): variable declaration must provide variable name (missing id)`;
                }
                resultString = `let ${id} = ${this.compileElement(element.children[0])}`;
                break;
            }
            //operation between two values
            case 'b': {
                if(!element.id){
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): operation must define operation type (missing id)`;
                }
                if (element.childElementCount != 2) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): sum must have two operators (wrong numer of children)`;
                }
                else {
                    resultString = `(${this.compileElement(element.children[0])} ${element.id} ${this.compileElement(element.children[1])})`;
                }
                break;
            }
            //value or variable name
            case 'p': {
                if (element.id) {
                    resultString = `${element.id}`;
                }
                else
                    resultString = `'${element.innerHTML}'`
                break;
            }
            //assignment
            case 'h2': {
                let id = element.id;
                if (!id) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): variable assignment must provide variable name (missing id)`;
                }
                resultString = `${id} = ${this.compileElement(element.children[0])};`;
                break;
            }
            //alert
            case 'cite': {
                resultString = `alert(${this.compileElement(element.children[0])})`;
                break;
            }
            //condition
            case 'ul': {
                if (element.childElementCount != 2 && element.childElementCount != 3) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): if/else construct must have two or three operators (wrong number of children)`;
                }
                resultString = `if(${this.compileElement(element.children[0])}){
                    ${this.compileElement(element.children[1])}
                }
                else {
                    ${this.compileElement(element.children[2])}
                }`
                break;
            }
            //comparison == >= <= !=
            case 'strong': {
                if (!element.id || (element.id != '==' && element.id != '!=' && element.id != '<=' && element.id != '>=' && element.id != '<' &&  element.id != '>' &&  element.id != '===')) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): Comparison operations must define a valid comparison type (missing or incorrect id)`;
                }
                if (element.childElementCount != 2) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): Comparison operation ${element.id} must have two operators (wrong number of children)`;
                }
                resultString = `(${this.compileElement(element.children[0])} ${element.id} ${this.compileElement(element.children[1])})`
                break;
            }
            //and
            case 'and': {
                if (element.childElementCount != 2) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): AND condition must have two operators (wrong number of children)`;
                }
                resultString = `(${this.compileElement(element.children[0])} && ${this.compileElement(element.children[1])})`
                break;
            }
            //or
            case 'or': {
                if (element.childElementCount != 2) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): OR condition must have two operators (wrong number of children)`;
                }
                resultString = `(${this.compileElement(element.children[0])} || ${this.compileElement(element.children[1])})`
                break;
            }
            //not
            case 'not': {
                if (element.childElementCount != 1) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): NOT condition must have one operator (wrong number of children)`;
                }
                resultString = `!(${this.compileElement(element.children[0])})}`
                break;
            }
            //if branch
            case 'if': {
                resultString = `${this.compileChildOf(element)}`;
                break;
            }
            //else branch
            case 'else': {
                resultString = `${this.compileChildOf(element)}`;
                break;
            }
            //prompt branch
            case 'prompt': {
                resultString = `prompt('${element.id}')`;
                break;
            }

            //function declaration
            case 'div': {
                let id = element.id;
                if (!id) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): function declaration must provide function name (missing id)`;
                }
                let params = element.classList.toString();
                resultString = `function ${id} (${params}){
                    ${this.compileChildOf(element)}
                }`;
                break;
            }
            //function invocation
            case 'h3': {
                if (!element.id) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): function invocation must provide function name (missing id)`;
                }
                resultString = `${element.id}(`
                for (let i = 0; i < element.childElementCount; i++) {
                    resultString += `${this.compileElement(element.children[i])}`;
                    if (i != element.childElementCount - 1) {
                        resultString += `, `;
                    }
                }
                resultString += `)`;
                break;
            }
            //function return
            case 'return' : {
                if (element.childElementCount != 1) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): Return statemant must have only one child (wrong number of children)`;
                }
                resultString = `return ${this.compileElement(element.children[0])}`;
                break;
            }
            //while loop
            case 'while':{
                if (element.childElementCount < 2) {
                    console.error('Error in: ', element);
                    throw `Error in ${element} (see above): while loop must have at least one code and one condition branches (wrong number of children)`;
                }
                resultString = `while(${this.compileElement(element.children[0])}){
                    `;
                for(let i= 1; i< element.childElementCount; i++){
                    resultString += `${this.compileElement(element.children[i])};
                    `;
                }
                resultString += `}`;
                break;
            }
            default: {
                console.warn('Warning, element not recognized, code skipped', element);
                resultString = ``;
                break;
            }
        }
        return resultString;
    }

    static compileChildOf(element) {
        let resultString = ``;
        for (let i = 0; i < element.childElementCount; i++) {
            resultString += `${this.compileElement(element.children[i])};
            `;
        }
        return resultString;
    }
}