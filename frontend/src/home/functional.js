var foldl = function (f, acc, array) {
    
}

console.log(foldl(function(x,y){return x+y}, 0, [1,2,3]));
console.log(foldl(function(x,acc){return [x].concat(acc)}, [], [1,2,3]));

var foldr = function (f, z, array) {
}

console.log(foldr(function(x,y){return x/y}, 1, [2,4,8]));
console.log(foldr(function(x,acc){return [x].concat(acc)}, [], [1,2,3]));

var map = function (f, array) {
}

console.log(map(function(x){return x+x}, [1,2,3,5,7,9,11,13]));

