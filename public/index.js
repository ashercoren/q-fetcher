const myRequest = new Request('data');
fetch(myRequest)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Something went wrong on api server!');
    }
  })
  .then(response => {
    document.getElementById("loading").style.visibility = "hidden";
    let listElement = document.getElementById("questions");
    response.forEach(item=>{
      let li = document.createElement("li");
      li.className = "list-group-item";
      
      let sourceDiv = document.createElement("div");
      sourceDiv.innerHTML = item.source;

      let textDiv = document.createElement("div");
      textDiv.innerHTML = item.value; 
           
      li.append(sourceDiv);
      li.append(textDiv);
      listElement.append(li);
    })
  }).catch(error => {
    console.error(error);
  });
