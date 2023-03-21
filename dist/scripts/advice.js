
const tipEl=document.getElementById('tipText');
const nameEl=document.getElementById('tipUsername');
const tipsContainer=document.getElementById('tip-container')

function creatCard(tip){
        // Create card
        const cardEl = document.createElement('div');
        cardEl.classList.add('card', 'mb-3');
      
        // Create card header
        const cardHeaderEl = document.createElement('h4');
        cardHeaderEl.classList.add(
          'card-header',
          'bg-primary',
          'text-light',
          'p-2',
          'm-0'
        );
        cardHeaderEl.innerHTML = `${tip.username} </br>`;
      
        // Create card body
        const cardBodyEl = document.createElement('div');
        cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
        cardBodyEl.innerHTML = `<p>${tip.tip}</p>`;
      
        // Append the header and body to the card element
        cardEl.appendChild(cardHeaderEl);
        cardEl.appendChild(cardBodyEl);
      
        // Append the card element to the tips container in the DOM
        tipsContainer.appendChild(cardEl);
  
}
const getData=()=>{
    fetch('/api/advice',{
        method:'GET'
    }).then((res)=>res.json()).then((data)=>{
       data.forEach(element => {
        creatCard(element)
       });
    }).catch((err)=>{
        throw err
    })
}

const postData=(data)=>{
console.log('post data js',data)
    fetch('/try',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)

    }).then((res)=>res.json()).then((data1)=>{
console.log('data1',data1)
alert(data1.message)  
creatCard(data)
 }).catch((err)=>{
throw err    })}


document.getElementById('tip-form').addEventListener('submit',(e)=>{
e.preventDefault()
    const userInput={
    tip:tipEl.value.trim(),
    username:nameEl.value.trim()
}
console.log(userInput,'users input')

postData(userInput)
})

getData()
