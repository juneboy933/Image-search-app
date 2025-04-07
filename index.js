const accessKey = "0zEgM_im85TGnKmwqaMAx0WM3twtixdeuE_MIg4Kgyk"

const formEL = document.querySelector("form");

const searchInputEL = document.getElementById("search-input");

const searchResultsEL = document.querySelector(".search-results");

const showMoreButtonEL = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

 async function searchImages(){
    inputData = searchInputEL.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if( page === 1){
        searchResultsEL.innerHTML = "";
    }
    const results = data.results;

    results.map((result) =>{
        
    const imageWrapper = document.createElement("div")
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description; 
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description; 

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEL.appendChild(imageWrapper);
    
    });

    page++;


    if(page > 1){
        showMoreButtonEL.style.display = "block";
    }
}

formEL.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImages()
});

showMoreButtonEL.addEventListener("click", ()=>{
    searchImages();
});