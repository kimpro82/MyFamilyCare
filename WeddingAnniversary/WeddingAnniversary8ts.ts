function changeColor()                                                              // "Duplicate function implementation" is not a real error in VS code (can remove by "tsc --init")
{
    const randNumDec: number[] = [];                                                // for containing random numbers decimally
    const randNumHex: string[] = [];                                                // for containing converted numbers hexdecimally
    const cssIdList: string[] = ["row1_1", "row1_2", "row2", "row3"];               // css id list to change colors

    for (let i = 0; i < 4 ; i++)
    {
        do                                                                          // to avoid black letters on the black background
        {
            randNumDec[i] = Math.floor(Math.random() * Math.pow(256, 3));           // generate RGB color (decimal)
            console.log(i, randNumDec[i]);                                          // test : ok
        }
        while (randNumDec[i] == 16777216);                                          // 256^3 = 16777216

        randNumHex[i] = randNumDec[i].toString(16);                                 // turn to the hexdecimal
        document.getElementById(cssIdList[i])!.style.color = '#' + randNumHex[i];    // style-color requires #XXXXXX
    }
}

setInterval(changeColor, 500);