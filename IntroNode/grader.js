function average(scores) {
    var sum=0, cnt=0;
    scores.forEach(function (grade) {
        sum+=grade; cnt++;
    });
    
    console.log(Math.round(sum/cnt));
}

var scores=[90, 98, 89, 100, 100, 86, 94];
average(scores);