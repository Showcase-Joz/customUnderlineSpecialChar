function swapQuoteType(selector, remove, addOpen, addClose) {
    const string = document.querySelector(selector).innerHTML;
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

    setTimeout(() => {
        document.querySelector(selector).innerHTML = newString;
    }, 1000);
    //console.log(newString);

};
swapQuoteType('.heading .rich-editable', '"', '‘', '’');