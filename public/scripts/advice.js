
const tipEl=document.getElementById('tipText');
const nameEl=document.getElementById('tipUsername');

const postData=(data)=>
    fetch('/api/advice',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)

    }).then((res)=>res.json()).then((data)=>{


    }).catch((err)=>{
throw err    })


document.getElementById('tip-form').addEventListener('submit',(e)=>{
e.preventDefault()
    const userInput={
    tip:tipEl.value.trim(),
    username:nameEl.value.trim()
}
console.log(userInput)
postData(userInput)
})