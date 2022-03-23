

function droite(){
    var item1 = document.getElementById("item-1");
    var item2 = document.getElementById("item-2");
    var item3 = document.getElementById("item-3");
    var item4 = document.getElementById("item-4");
    var item5 = document.getElementById("item-5");

    var imgList = [item1.src,item2.src,item3.src,item4.src,item5.src];
    
    for(i = 1; i<6;i++){
        var index = (i-2)%5;
        if(index<0){
            index=5+index;
        }
        item = document.getElementById(`item-${i}`);
        console.log(`item-${i}`);
        item.src = imgList[index];
        console.log(index);
        
    }

}

function gauche(){
    var item1 = document.getElementById("item-1");
    var item2 = document.getElementById("item-2");
    var item3 = document.getElementById("item-3");
    var item4 = document.getElementById("item-4");
    var item5 = document.getElementById("item-5");

    var imgList = [item1.src,item2.src,item3.src,item4.src,item5.src];
    
    var container_jeu=document.getElementById("container_jeu");

    for(i = 1; i<6;i++){
        var index = i%5;

        item = document.getElementById(`item-${i}`);
        item.src = imgList[index];
        
    }
}
function initialisation(){
    var button_droite = document.getElementById("droite"); 
    button_droite.addEventListener("click", droite);

    var button_gauche = document.getElementById("gauche"); 
    button_gauche.addEventListener("click", gauche);
}

initialisation();
