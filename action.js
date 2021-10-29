var player = document.getElementById("player");
var obstacle = document.getElementById("obstacle");
var fly = document.getElementById("fly");
var player_style = window.getComputedStyle(player, null);
var obstacle_style = window.getComputedStyle(obstacle, null);
var fly_style = window.getComputedStyle(fly, null);
var iscrouched = false;
var obstacle_time = 3000.0;
var fly_time = 3000.0;
var fly_time_start = 0;
var obstacle_time_start = 0;
points = 0.0;
function jump() {
    if (player.classList.contains("jump"))
        return;
    var jump = "jump";
    if (iscrouched == true)
        jump = "jump_crouched";
    player.classList.add(jump);
    setTimeout(() => {
        player.classList.remove(jump);
    }, 600);
}
function crouch() {
    player.style.height = "25px";
    player.style.top = "125px";
    iscrouched = true;
}
function stand() {
    player.style.height = "50px";
    player.style.top = "100px";
    iscrouched = false;
}
var check = setInterval (function(){
    points += 1;
    document.getElementById("points").innerHTML = points;
    player_top = parseInt(player_style.getPropertyValue("top"));
    obstacle_left = parseInt(obstacle_style.getPropertyValue("left"));
    fly_left = parseInt(fly_style.getPropertyValue("left"));
    if (obstacle_left < 40 && player_top > 60 && iscrouched == false)
        over();
    else if (obstacle_left < 40 && player_top > 85 && iscrouched == true)
        over();
    if (fly_left < 40 && player_top < 80)
        over();
},50);
function over() {
    clearInterval(check);
}
function obstacle_obstruct() {
    if (obstacle.classList.contains("obstruct"))
        return;
    if (performance.now() - fly_time_start < 400)
        return;
    if (obstacle_time > 500)
        obstacle_time-=100;
    obstacle_time_str = ((obstacle_time/1000).toString() + "s");
    obstacle_time_start = performance.now();
    obstacle.style.animationDuration = obstacle_time_str;
    obstacle.classList.add("obstruct");
    setTimeout(() => {
        obstacle.classList.remove("obstruct");
    }, obstacle_time);
}
function fly_obstruct() {
    if (fly.classList.contains("obstruct"))
        return;
    if (performance.now() - obstacle_time_start < 400)
        return;
    if (fly_time > 500)
        fly_time-=100;
    fly_time_str = (fly_time/1000).toString() + "s";
    fly_time_start = performance.now();
    fly.style.animationDuration = fly_time_str;
    fly.classList.add("obstruct");
    setTimeout(() => {
        fly.classList.remove("obstruct");
    }, fly_time);
}
var obstruct = setInterval(function(){
c = getRnd(1,2);
if (c == 1) {
    obstacle_obstruct();
}
else {
    fly_obstruct();     
}
},500);
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