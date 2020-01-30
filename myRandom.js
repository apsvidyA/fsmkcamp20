function getRandom(min,max){
    return Math.random() * (max-min) + min;
}

exports.between1and10 = function(){
     return getRandom(1,10);
 }
