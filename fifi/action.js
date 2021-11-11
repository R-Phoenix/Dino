var player = document.getElementById("player");
var obstacle1 = document.getElementById("obstacle1");
var obstacle2 = document.getElementById("obstacle2");
var fly1 = document.getElementById("fly1");
var fly2 = document.getElementById("fly2");
var player_style = window.getComputedStyle(player, null);
var player_time = 600;
var obstacle1_style = window.getComputedStyle(obstacle1, null);
var obstacle2_style = window.getComputedStyle(obstacle2, null);
var fly1_style = window.getComputedStyle(fly1, null);
var fly2_style = window.getComputedStyle(fly2, null);
var iscrouched = false;
var obstacle_time = 3000.0;
var fly_time = 3000.0;
var fly1_time_start = 0;
var obstacle1_time_start = 0;
var obstacle2_time_start = 0;
var fly2_time_start = 0;
var points = 0.0;
var pxtovh = (100.0/window.innerHeight);
var time_lower_bound = 1000;
var left = (parseFloat(player_style.getPropertyValue("left"))*pxtovh);
var number_of_obstacles = 4;
window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
if (mobileAndTabletCheck()){
    document.getElementById("crouch").style.display = "none";
    number_of_obstacles = 2;
}
if (window.innerWidth <= 575){
    obstacle_time = 1500.0;
    fly_time = 1500.0;
    time_lower_bound = 500
}
else if (window.innerWidth <= 767){
    obstacle_time = 2000.0;
    fly_time = 2000.0;
    time_lower_bound = 500;
}
else if (window.innerWidth < 992){
    obstacle_time = 2500.0;
    fly_time = 2500.0;
    time_lower_bound = 750;
}
function jump() {
    if (player.classList.contains("jump"))
        return;
    var jump = "jump";
    if (iscrouched == true)
        jump = "jump_crouched";
    player.classList.add(jump);
    player.style.backgroundImage = "url(witch-fly.png)";
    setTimeout(() => {
        player.classList.remove(jump);
        if (iscrouched)
            player.style.backgroundImage = "url(dog.png)";
        else
            player.style.backgroundImage = "url(witch.jpg)";
    }, player_time);
}
function crouch() {
    player.style.height = "3vh";
    player.style.top = "37vh";
    player.style.backgroundImage = "url(dog.png)";
    iscrouched = true;
}
function stand() {
    player.style.height = "6vh";
    player.style.top = "34vh";
    player.style.backgroundImage = "url(witch.jpg)";
    iscrouched = false;
}
var check = setInterval (function(){
    points += 1;
    document.getElementById("points").innerHTML = points;
    player_top = (parseFloat(player_style.getPropertyValue("top"))*pxtovh);
    obstacle1_left = (parseFloat(obstacle1_style.getPropertyValue("left"))*pxtovh);
    fly1_left = (parseFloat(fly1_style.getPropertyValue("left"))*pxtovh);
    obstacle2_left = (parseFloat(obstacle2_style.getPropertyValue("left"))*pxtovh);
    fly2_left = (parseFloat(fly2_style.getPropertyValue("left"))*pxtovh);
    if (obstacle1_left < (left+5) && obstacle1_left > (left) && player_top > 30 && iscrouched == false){
        over();
    }
    if (obstacle1_left < (left+5) && obstacle1_left > (left) && player_top > 33 && iscrouched == true){
        over();
    }
    if (obstacle2_left < (left+5) && obstacle2_left > (left) && player_top > 30 && iscrouched == false){
        over();
    }
    if (obstacle2_left < (left+5) && obstacle2_left > (left) && player_top > 33 && iscrouched == true){
        over();
    }
    if (fly1_left < (left+5) && fly1_left > (left) && player_top < 32){
        over();
    }
    if (fly2_left < (left+5) && fly2_left > (left) && iscrouched == false){
        over();
    }
    if (fly2_left < (left+5) && fly2_left > (left) && player_top < 35 && iscrouched == true){
        over();
    }
},10);

function obstacle1_obstruct() {
    if (obstacle1.classList.contains("obstruct"))
        return;
    if (mobileAndTabletCheck()){
        if (obstacle2.classList.contains("obstruct"))
            return;
    }
    if (performance.now() - obstacle2_time_start < 600 && performance.now() - fly1_time_start < 600 && performance.now() - fly2_time_start < 600)
        return;
    if (obstacle_time > time_lower_bound)
        obstacle_time-=50;
    obstacle_time_str = ((obstacle_time/1000).toString() + "s");
    obstacle1.style.opacity = "1";
    obstacle1_time_start = performance.now();
    obstacle1.style.animationDuration = obstacle_time_str;
    obstacle1.classList.add("obstruct");
    setTimeout(() => {
        obstacle1.classList.remove("obstruct");
        obstacle1.style.opacity = "0";
    }, obstacle_time);
}
function obstacle2_obstruct() {
    if (obstacle2.classList.contains("obstruct"))
        return;
    if (mobileAndTabletCheck()){
        if (obstacle1.classList.contains("obstruct"))
            return;
    }
    if (performance.now() - obstacle1_time_start < 600  && performance.now() - fly1_time_start < 600 && performance.now() - fly2_time_start < 600)
        return;
    if (obstacle_time > time_lower_bound)
        obstacle_time-=50;
    obstacle_time_str = ((obstacle_time/1000).toString() + "s");
    obstacle2.style.opacity = "1";
    obstacle2_time_start = performance.now();
    obstacle2.style.animationDuration = obstacle_time_str;
    obstacle2.classList.add("obstruct");
    setTimeout(() => {
        obstacle2.classList.remove("obstruct");
        obstacle2.style.opacity = "0";
    }, obstacle_time);
}
function fly1_obstruct() {
    if (fly1.classList.contains("obstruct"))
        return;
        if (performance.now() - obstacle1_time_start < 600 && performance.now() - obstacle2_time_start < 600 && performance.now() - fly2_time_start < 600)
        return;
    if (fly_time > time_lower_bound)
        fly_time-=50;
    fly_time_str = (fly_time/1000).toString() + "s";
    fly1.style.opacity = "1";
    fly1_time_start = performance.now();
    fly1.style.animationDuration = fly_time_str;
    fly1.classList.add("obstruct");
    setTimeout(() => {
        fly1.classList.remove("obstruct");
        fly1.style.opacity = "0";
    }, fly_time);
}
function fly2_obstruct() {
    if (fly2.classList.contains("obstruct"))
        return;
        if (performance.now() - obstacle1_time_start < 600 && performance.now() - obstacle2_time_start < 600 && performance.now() - fly1_time_start < 600)
        return;
    if (fly_time > time_lower_bound)
        fly_time-=50;
    fly_time_str = (fly_time/1000).toString() + "s";
    fly2.style.opacity = "1";
    fly2_time_start = performance.now();
    fly2.style.animationDuration = fly_time_str;
    fly2.classList.add("obstruct");
    setTimeout(() => {
        fly2.classList.remove("obstruct");
        fly2.style.opacity = "0";
    }, fly_time);
}
var obstruct = setInterval(function(){
c = getRnd(1,number_of_obstacles);
if (c == 1) {
    obstacle1_obstruct();
}
else if (c == 2) {
    obstacle2_obstruct();
}
else if (c == 3){
    fly1_obstruct();
}
else if (c == 4) {
   fly2_obstruct();     
}
},600);
function getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
window.addEventListener("keydown",function(event){
    if (event.keyCode == 38)
        jump();
    else if (event.keyCode == 40)
        crouch();
});
window.addEventListener("keyup",function(event){
    if (event.keyCode == 40)
        stand();
});
function over() {
    clearInterval(check);
    clearInterval(obstruct);
}