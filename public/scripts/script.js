const nameEl=document.getElementById('nameId');
const emailEl=document.getElementById('emailId');
const reviewEl=document.getElementById('reviewId');
const rateEl=document.getElementById('rateId');

const fetchData=(data)=>
    fetch('/api',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),

    }).then((res)=>{
 return res.json()}).then((data)=>{
return data}).catch((err)=>{
    throw err
})

document.getElementById('submitId').addEventListener('click',(e)=>{
   e.preventDefault()
    var userData={
        name:nameEl.value.trim(),
        email:emailEl.value.trim(),
        rate:rateEl.value.trim(),
        review:reviewEl.value.trim()

    }
  fetchData(userData).then((d)=>{
    console.log(d.id)
window.alert(`ID: ${d.id} has been added to your review,your review will be so helpful to improve our products!!!Thanks! `)  }).catch((err)=>{
    console.log(err)
  })


})