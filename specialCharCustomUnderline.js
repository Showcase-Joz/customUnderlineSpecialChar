function spchunderline(selector) {
    // use input selectors to create array of DOM elements
    const allInstances = document.querySelectorAll(selector);
    // iterate over array items with function
    setTimeout(() => {
        for (const [index, item] of allInstances.entries()) {
            let sampleElement = item.getElementsByTagName('token-value')[0];
            if (item.children[0].tagName === 'TOKEN-VALUE') {
                let updatedContent = runInstance(sampleElement);
                let newItem = newElement(updatedContent);
                insertNewElement(sampleElement, newItem);
                sampleElement.style.display = 'none';
            }
        }
    }, 500);

    // the function
    function runInstance(item) {
        const captureGroup = /[,.?;:'!()]/g;
        let cutString = '';
        let newString = '';
        let output = '';
        // get an innerHTML element and work it
        const inputString = item.innerHTML;
        // get last char of string
        const lastCharCheck = inputString.length - 1;
        const lastChar = inputString.charAt(lastCharCheck);

        // check for capture char at end
        const found = captureGroup.test(lastChar);
        // slice end char
        if (found === true) {
            cutString = inputString.slice(0, -1);

        }
        // add custom underline
        function addUnderline(type, string) {
            // split to lines on <br>
            const lines = string.split('<br>');
            // create string literal, iterate over lines
            lines.forEach((line, index) => {
                // swap-out any double quotes for left/right single
                line = swapQuoteType(line, '"', '“', '”');
                // conditionally add classes
                if (index < lines.length - 1 && !found) {
                    //  add css classes to each parent div and span. if NOT last line, if NO special character
                    const lineHTML = `<div class="line customUnderline"><span>${line}</span></div>`;
                    output += lineHTML;
                } else if (index === lines.length - 1 && found) {
                    //  add css classes to each parent div and span AND re-add lastChar outside of span classes. if last line and special character
                    const lineHTML = `<div class="line customUnderline"><span>${line}</span>${lastChar}</div>`;
                    output += lineHTML;
                } else {
                    //  add css classes to each parent div and span
                    const lineHTML = `<div class="line customUnderline"><span>${line}</span></div>`;
                    output += lineHTML;
                }
            });
            console.log(type, `${string}` + (found ? lastChar : ''));
            return output;
        }
        // replace in DOM based on last char type
        if (cutString.length > 0) {
            newString = cutString;
            output = addUnderline("MODIFIED:", newString);
            return output;
            //let newItem = newElement(output);
            //insertNewElement(item, newItem);
            // item.style.display = 'none';
        } else {
            output = addUnderline("ORIGINAL:", inputString);
            return output;
            // let newItem = newElement(output);
            // insertNewElement(item, newItem);
            // item.style.display = 'none';
        }
        return;
    }

    function swapQuoteType(substring, remove, addOpen, addClose) {
        const string = substring;
        const stringArray = Array.from(string);
        const indiciesArray = [];
        let newString = string;

        swapQuotes(indiciesArray);

        indiciesArray.forEach((i, a, r) => {
            if (a % 2 === 0) {
                newMap(i, addOpen);
            } else {
                newMap(i, addClose);
            }
        })

        function swapQuotes(array) {
            stringArray.map((l, i) => {
                if (l === remove) {
                    array.push(i);
                    for (const index of array) {}
                }
            })
        }

        function newMap(index, markType) {
            stringArray.filter((letter, i, a) => {
                if (i === index) {
                    newString = swap(newString, index, markType);
                }
            })
        }

        function swap(str, loc, newChar) {
            var chars = str.split('');
            chars[loc] = newChar;
            return chars.join('');
        }
        return newString;
    }

    function newElement(newContent) {
        let newDiv = document.createElement('div');
        newDiv.classList.add("non-editable");
        newDiv.innerHTML = newContent;
        return newDiv;
    }

    function insertNewElement(item, replacement) {

        let parent = item.parentNode;
        parent.insertBefore(replacement, item);
    }
}

spchunderline([".heading", ".bob"]);