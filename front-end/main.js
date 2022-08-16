window.addEventListener("load", () => {
  getData();
});
let getData = async () => {
  let res = await fetch("https://secure-ravine-64351.herokuapp.com/api/todo");
  let data = await res.json();
  renderData(data);
};
let renderData = (data) => {
  let cont = document.getElementById("container");
  container.innerHTML = null;
  data.forEach(({ title, id, status }) => {
    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    h3.innerText = title;
    let p = document.createElement("p");
    p.innerText = status;
    let toggle_btn = document.createElement("button");
    toggle_btn.innerText = "Toggle";
    toggle_btn.onclick=()=>{
        toggle_fun(id);
    }
    let remove_btn = document.createElement("button");
    remove_btn.innerText = "Remove";
    remove_btn.onclick=()=>{
        remove_fun(id);
    }
    div.append(h3, p, toggle_btn, remove_btn);
    cont.append(div);
  });
};

// adding function
let addTodo=async ()=>{
    let todo=document.getElementById('todo').value;
    let data={
        title:todo,
        status:false,
        id:Date.now()
    };
    let res=await fetch('https://secure-ravine-64351.herokuapp.com/api/todo', {
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    });
    getData();
    res=await res.json();
    console.log(res);
}
let toggle_fun=async (id)=>{
let todo=await fetch(`https://secure-ravine-64351.herokuapp.com/api/todo/${id}`);
todo=await todo.json();
let data={status:!todo.status};
let res=await fetch(`https://secure-ravine-64351.herokuapp.com/api/todo/${id}`,{
    method:"PATCH",
    body:JSON.stringify(data),
    headers:{
        "Content-Type":"application/json"
    }
});
getData();
res=await res.json();
}
let remove_fun=async (id)=>{
    let todo=await fetch(`https://secure-ravine-64351.herokuapp.com/api/todo/${id}`);
    todo=await todo.json();
    let data=todo;
    let res=await fetch(`https://secure-ravine-64351.herokuapp.com/api/todo/${id}`,{
        method:"DELETE",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    });
    getData();
    res=await res.json();
}

