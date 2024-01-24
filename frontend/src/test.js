const nums=[1,2,3,4,5];
const arr=nums.map((current,i)=>{
    return current*2+i;
});
console.log(arr);
const arr2=nums.filter((current)=>{
    if(current>2){
        return current;
    }
});
console.log(arr2);
const sum=nums.reduce((acc,current)=>{
    console.log(acc);
return acc+current;
},1);
console.log(sum);
let students=[
    {name:"Piyush",rollnumber:31,marks:80},
    {name:"Fazila",rollnumber:15,marks:69},
    {name:"Kaushal",rollnumber:21,marks:35},
    {name:"Dilpreet",rollnumber:7,marks:55}
]
const result=students.map((s)=>{
    return s.name.toUpperCase();
});
console.log(result);
const result2=students.filter((s)=>{
    if(s.marks>60){
        return s.marks;
    }
});
console.log(result2);
const result3=students.reduce((acc,s)=>{
return acc+s.marks;
},0);
console.log(result3);
const result4=students.map((s)=>{
if(s.marks<60){
    s.marks+=20;
}
return s;
}).filter((s)=>s.marks>60);
console.log(result4);
function square(num){
    return num*num;
}
function display(fn){
    console.log('square is '+fn(2));
}
display(square);
for(let i=0;i<5;i++){
    console.log(i);
setTimeout(() => {
    console.log(i);
}, (i*1000));
}

if(true){
    var a=5;
    console.log(a);
}
function Name(...num){
    console.log(num);
}
const ar=[1,2];
console.log(...ar);
Name(...ar);
const fn=(a,x,y,...num)=>{
    console.log(x,y,num);
}
fn(3,4,5,6,7,8,9);
function local(){
    var username="Fazila";
}
console.log(username);
local();

function outerFunction() {
    let outerVariable = 0;
  
    function innerFunction() {
        outerVariable++;
      console.log(outerVariable);
    }
    
  
    return innerFunction;
  }
  
  outerFunction();
 // Outputs: "I am from the outer function"