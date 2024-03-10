// 9th Wedding Anniversary
// 2024.03.07

function changeColor() {
    // declare the palette of 10 shades of gray
    let palette: string[] = ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999"];
  
    // css id list to change colors
    let cssIdList: string[] = ["row1_1", "row1_2", "row2", "row3"];
  
    // loop through the css id list
    for (let i = 0; i < 4; i++) {
      // generate a random index from 0 to 9
      let index: number = Math.floor(Math.random() * 10);
  
      // get the color from the palette by the index
      let color: string = palette[index];
  
      // assign the color to the element by the css id
      document.getElementById(cssIdList[i])!.style.color = color;
    }
  }
  
  // call the function every 500 milliseconds
  setInterval(changeColor, 500);
  