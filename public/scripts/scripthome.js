const carsoulContainr=document.getElementById('container');
function createCar(data){
    console.log('fun',data)
const div1=document.createElement('div');
div1.classList.add('carousel-item','add')

const image=document.createElement('img');
image.src=`../images/${data.image}`;
image.classList.add('d-block','w-100','h-100')
const div2=document.createElement('div');
div2.classList.add("carousel-caption","d-none","d-md-block")
var head5=document.createElement('h5');
head5.textContent=data.name

var paragraph=document.createElement('p');
paragraph.textContent=data.description
div1.appendChild(image)
div1.appendChild(div2)
div2.appendChild(head5)
div2.appendChild(paragraph)
carsoulContainr.appendChild(div1)
}
const getData=()=>
fetch('/project',{
    method:'GET'
}).then((data)=>data.json()).then((result)=>{
for(var i=0;i<result.length;i++){
    createCar(result[i])
}
})

getData()

{/* <div class="carousel-item active">
            <img src="#" class="d-block w-100 h-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div> */}