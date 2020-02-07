const fs = require('fs');
const mergeImg = require('merge-img');

(async () => {
    let itens = fs.readdirSync('images');

    let lines = [];
    let columns = [];

    for (var i = 0; i < itens.length; i++) {
        lines.push(+itens[i].split("_")[0]);
        columns.push(+itens[i].split("_")[1].replace(".png", ""));
    }

    let maxLine = Math.max(...lines);
    let maxColumn = Math.max(...columns);

    let thisLine = [];
    let final = [];
    for (var i = 0; i <= maxLine; i++) {
        thisLine = [];
        for (var j = 0; j <= maxColumn; j++) {
            thisLine.push(`images\\${i}_${j}.png`);
        }
        let newImage = await mergeImg(thisLine, { direction: false });
        await newImage.write(`${i}.png`);
        final.push(`${i}.png`);
    }

    let finalImage = await mergeImg(final, { direction: true });
    await finalImage.write(`final.png`);

    console.log('done');
})();