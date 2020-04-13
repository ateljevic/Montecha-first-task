const fs = require('fs');
const util = require('util');

const ROW_SIZE = 29;

const readFile = util.promisify(fs.readFile);

function rowTo8Bit(row1, row2, row3) {
    return [row1[0], row1[1], row2[2], row3[2], row3[1], row3[0], row2[0], row2[1]];
}

function eightBitToLittleEndian(array) {
    return array.map(element => element != " " ? 1 : 0)
                .reverse()
                .map((element, i) => element * Math.pow(2, i))
                .reduce((total, element) => total + element)
}

function littleEndianToNumber(n){
    return '0958634172'[n*3%77%10];
}


(async () => {

    let bigArray = await readFile('readDoc1.txt', 'utf8');

    let firstRow = bigArray.slice(0, ROW_SIZE - 2).split('');
    let secondRow = bigArray.slice(ROW_SIZE, ROW_SIZE * 2 - 2).split('');
    let thirdRow = bigArray.slice(ROW_SIZE * 2, ROW_SIZE * 3).split('');
    let output = '';

    for (let i = 0; i < firstRow.length; i += 3) {
        let eightBit = rowTo8Bit(firstRow.slice(i, i + 3), secondRow.slice(i, i + 3), thirdRow.slice(i, i + 3))
        let littleEndian = eightBitToLittleEndian(eightBit);
        let number = littleEndianToNumber(littleEndian)
        output += number;
    }
    console.log(output);



})();


