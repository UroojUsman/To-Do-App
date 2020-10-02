const clear= document.querySelector(".clear");
const list=document.getElementById("list");
const input=document.getElementById("input");
const dateElement= document.getElementById("date");
let L=[];
let id=0;

const options= {weekday:'long',day:'numeric',month:'short', year:'numeric'};
const today=new Date();
dateElement.innerHTML= today.toLocaleDateString("en-US",options)

const UNCHECK="far fa-circle";
const CHECK="fas fa-check-circle";
const LINE_THROUGH="lineThrough";

function AddtoDo(toDo,Id,done,t)
{   if(t)
    {
        return;
         
    }
    const DONE= done ? CHECK : UNCHECK;
    const LINE= done? LINE_THROUGH: "";
    const items='<li class="item"> <i class="'+DONE+' cir" job="complete" id='+Id+'></i>  <p class="text '+LINE+'">'+toDo+'</p> <i class="fas fa-trash de" job="remove" id='+Id+'></i> </li>';
    const position="beforeend";
    list.insertAdjacentHTML(position,items);
}

document.addEventListener("keyup", function(event){
    if(event.keyCode==13)
    {
        const todo=input.value;
        if(todo)
        {
            AddtoDo(todo,id,false,false);
            L.push({name:todo,
                id:id,
                done:false,
                t:false
                });
                
                id++;
              
        }
        input.value="";
    }
});

function Complete(element)
{   
    if (element.classList.contains('far') && element.classList.contains('fa-circle')) {
        element.classList.remove('far');
        element.classList.remove('fa-circle');
        element.classList.add('fas');
        element.classList.add('fa-check-circle');
      } 
      else if(element.classList.contains('fas') && element.classList.contains('fa-check-circle')) 
      {
        element.classList.remove('fas');
        element.classList.remove('fa-check-circle');
        element.classList.add('far');
        element.classList.add('fa-circle');
        
      }

   // element.classList.toggle(CHECK);
   // element.classList.toggle(UNCHECK);
 
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    L[element.id].done=L[element.id].done? false:true;
}

function Remove(el){
    el.parentNode.parentNode.removeChild(el.parentNode);
    
    L[el.id].t=L[el.id].t ? false:true;
}

list.addEventListener("click",function(event){
    const element= event.target;
    const elementjob=element.attributes.job.value;
    if(elementjob=="complete")
    {
        Complete(element);
    }
    else if(elementjob=="remove")
    {
        
        Remove(element);
    }
   // localStorage.setItem("TODO",JSON.stringify(L));
});

clear.addEventListener("click",function(event){
      localStorage.clear();
      location.reload();
});
