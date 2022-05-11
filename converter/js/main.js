let inp1 = document.getElementById('inp1');
let inp2 = document.getElementById('inp2');


let p1 = document.querySelector('.convert1');
let p2 = document.querySelector('.convert2');

let leftList = document.querySelector('.leftList').children;
let rightList = document.querySelector('.rightList').children;


let x = 'RUB';
let y = 'USD';


for(let i=0 ; i<leftList.length ; i++){
    console.log(leftList[i].firstChild)
    leftList[i].firstChild.addEventListener('click', function (e){
        x = leftList[i].firstChild.textContent;
        for(let j=0 ; j<leftList.length ; j++){
            leftList[j].firstChild.classList.remove('active')
        }
        
        e.target.classList.add('active');
        myFunction();
    })
}


for(let i=0 ; i<rightList.length ; i++){
    console.log(rightList[i].firstChild)
    rightList[i].firstChild.addEventListener('click', function (e){
        y = rightList[i].firstChild.textContent;
        for(let j=0 ; j<rightList.length ; j++){
            rightList[j].firstChild.classList.remove('active')
        }
        
        e.target.classList.add('active');
        myFunction();
    })
}


function myFunction() {
    const inp1Value = +inp1.value.replace(',' , '.');
    if( typeof (inp1Value) == 'number'){
        let url = `https://api.exchangerate.host/latest?base=${x}&symbols=${y}`
        fetch(url)
        .then(res => res.json())
        .then(data => {
            p1.textContent = `1 ${x} = ${data.rates[y]} ${y}`;
            inp2.value =    parseFloat(inp1Value * data.rates[y]).toFixed(3);
        })
        fetch(`https://api.exchangerate.host/latest?base=${y}&symbols=${x}`)
        .then(res => res.json())
        .then(data => {
            p2.textContent = `1 ${y} = ${data.rates[x]} ${x}`;
        })
    }
}

inp1.addEventListener('keyup', myFunction);