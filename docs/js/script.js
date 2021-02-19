const makeRequest = () => {
  const author = document.querySelector("#autor").value;
  const material = document.querySelector("#material").value;
  const place = document.querySelector("#lugar").value;
  const title = document.querySelector("#titulo").value;
  document.querySelector("#items-container").innerHTML = "";
  console.log("requesting");
  fetch("http://localhost:3000/consult", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ author, material, place, title }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      createItem(resp.result, author);
    })
    .catch((err) => console.log(err));
};

const createItem = (items) => {
  console.log(items);
  items.forEach((item) => {
    const element = document.createElement("div");
    element.innerHTML = `<div class = "col-md-3">                  
        <a href="artifact.html" target="_blank"> 
            <div class="artifact-tile">
                <img width="100" height="100" src="https://via.placeholder.com/100" alt="Museum Object">
                <div class="artifact-info">
                    <div>${item.labelArtifact.value}</div>
                    <div class="row">
                        <div class="col-xs-4">Autor</div>
                        <div class="text-info col-xs-8">${item.labelCreator.value}</div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4">Periodo</div>
                        <div class="text-info col-xs-8">Desconocido</div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4">Material</div>
                        <div class="text-info col-xs-8">${item.labelMaterial.value}</div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4">Ubicación</div>
                        <div class="text-info col-xs-8">${item.labelKeeper.value}</div>
                    </div>
                </div>   
            </div>         
        </a>                   
      </div>`;
    document.querySelector("#items-container").append(element);
  });
};
