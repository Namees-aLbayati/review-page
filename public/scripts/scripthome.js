const carsoulContainr=document.getElementById('container');
function createCar(data){
    console.log('fun',data.description)
const div1=document.createElement('div');
var link=document.createElement('a')
const icon=document.createElement('p');
icon.innerHTML = `<a href='${data.github}'><i class='fab fa-github 'style='font-size:36px;color:white;' ></i></a> <a href='${data.url}'><i class='fas fa-eye' style='font-size:48px;color:white'></i></a>`;

link.setAttribute('href',data.github)
link.setAttribute('style','outline: none;border: 0;')
div1.classList.add('carousel-item','add')

const image=document.createElement('img');
image.src=`../images/${data.image}`;
image.classList.add('d-block','w-100','h-100')

const div2=document.createElement('div');
div2.classList.add("carousel-caption","d-none","d-md-block")
div2.setAttribute('style','margin-bottom:100px;height:10px;')
var head5=document.createElement('h4');
head5.setAttribute('href',data.github)
head5.textContent=data.name

var paragraph=document.createElement('h6');
paragraph.textContent=data.description
paragraph.setAttribute('style','color: yellow;font-size:small')
head5.appendChild(link)
div2.appendChild(icon)

div2.appendChild(paragraph)
div2.appendChild(head5)

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