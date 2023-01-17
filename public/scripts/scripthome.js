const carsoulContainr=document.getElementById('container');
function createCar(data){
    console.log('fun',data.description)
const div1=document.createElement('div');
var link=document.createElement('a')
link.setAttribute('href',data.github)
div1.classList.add('carousel-item','add')

const image=document.createElement('img');
image.src=`../images/${data.image}`;
image.classList.add('d-block','w-100','h-100')

const div2=document.createElement('div');
div2.classList.add("carousel-caption","d-none","d-md-block")
var head5=document.createElement('a');
head5.setAttribute('href',data.github)
head5.textContent=data.name

var paragraph=document.createElement('p');
paragraph.textContent=data.description
head5.appendChild(link)
div2.appendChild(head5)
div2.appendChild(paragraph)
div1.appendChild(image)

div1.appendChild(div2)

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