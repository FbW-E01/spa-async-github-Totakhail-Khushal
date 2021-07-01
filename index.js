


class GHWidget {
    constructor(container){
        this.container = container;
    }

    handleSearch(e){
        const input=this.container.querySelector(".username")
        console.log(input.value);


        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(json =>{
            console.log(json);
            this.handleSearchResults(json)
        })
        .catch(err =>{
            console.warn(err);
            alert("Error")
        })
    }

    handleSearchResults(repositories){
        const oldResults=this.container.querySelectorAll(".result");
        oldResults.forEach(r => r.remove())

        repositories.forEach(repo => {
            const element =document.createElement("div");
            element.classList.add("result");
            element.innerText=repo.name
            this.container.appendChild(element)
        })
    }

    init (){
        const result=document.createElement("div")
        result.classList.add("result");
        this.container.appendChild(result)
        const input=document.createElement("input");
        input.classList.add("username");
        input.setAttribute("type","text")
        this.container.appendChild(input)



        const button= document.createElement("button");
        button.classList.add("search");
        button.innerHTML="Submit";
        button.addEventListener("click", (e) => { this.handleSearch(e); })
        this.container.appendChild(button);
        };

}
    


const widget = new GHWidget(
    document.querySelector(".mainContainer")
);
widget.init();


const container= document.createElement("div")
document.body.appendChild(container)
const widget2= new GHWidget(container)
