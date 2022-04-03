const item0 = document.getElementById("item-0");
const item1 = document.getElementById("item-1");
const item2 = document.getElementById("item-2");
const item3 = document.getElementById("item-3");
const item4 = document.getElementById("item-4");
const imgList = [item0.src,item1.src,item2.src,item3.src,item4.src];

function left(){
    imgList.unshift(imgList.pop());
    update()
}

function right(){

    imgList.push(imgList.shift());
    update()

}

function update(){
    for(i = 0; i<5;i++){
        var index = i%5;
        item = document.getElementById(`item-${i}`);
        item.src = imgList[index];
        
    }
}

function initialize(){
    var buttonLeft = document.getElementById("left");
    var buttonRight = document.getElementById("right");

    buttonLeft.innerText("<Previous");
    buttonRight.innerText("Next>");
}