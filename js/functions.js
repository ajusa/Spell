function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );	//I copied this collide code for my game, hope ya don't mind -Jackson
}
function randomNumber (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
