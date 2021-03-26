function swapQuoteType(selector, remove, addOpen, addClose) {
    const string = document.querySelector(selector).innerHTML;
    const stringArray = Array.from(string);
    const opens = [];
    const closes = [];
    const indiciesArray = [opens, closes];
    let newString = string;

    stringArray.reduce(function (a, e, i) {
        if (e === remove)
            if (i % 2 === 0) {
                indiciesArray[opens.push(i)];
                mapToLetter(opens, i, addOpen);
            } else {
                indiciesArray[closes.push(i)];
                mapToLetter(closes, i, addClose);
            }
        return a;
    }, indiciesArray);

    let order = arrayOrder(indiciesArray[0], indiciesArray[1]);
    console.log(order);

    function mapToLetter(array, index, markType) {
        for (const item of array) {
            stringArray.filter((letter, i) => {
                if (i === item) {
                    newString = swap(newString, item, markType);
                }
            });
        };

    };

    function arrayOrder(a, b) {
        return `${a[0]}, ${b[0]}`;
    }
    console.log(indiciesArray, newString, order);
    setTimeout(() => {
        document.querySelector(selector).innerHTML = newString;
    }, 3000);

    function swap(str, loc, newChar) {
        var chars = str.split('');
        chars[loc] = newChar;
        return chars.join('');
    }
};
swapQuoteType('.heading .rich-editable', '"', '‘', '’');