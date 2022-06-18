// declare reusable variables in the global scope.
//link to movie data in server
const BASE_url="http://localhost:3000/films";

//declaring and selecting required variables in the global scope.
const buyTicket = document.getElementById("buy-ticket")
const availableTickets = document.getElementById("ticket-num")

//Step 1: Add an event listener to the buyTicket button, using click and a callback function(leftOverTickets) that subtracts one ticket when the user clicks, displays remaining tickets and returns sold out if the tickets are depleted.
buyTicket.addEventListener("click",()=>{
   availableTickets.innerText= leftOverTickets(parseInt(availableTickets.innerText,10))
   });
 //the callback function.  
function leftOverTickets(ticketNumber){
    ticketNumber-=1
    if(ticketNumber>0){
        return `${ticketNumber} remaining tickets`

    }
    else{
        return "sold out"
    }
}
//step 2: creating variables from HTML elements that need to be populated with data from the server.
function film(movieObj){
    //assigning elements in HTML to variables for manipulation.
    const poster = document.getElementById("poster")
    const title = document.getElementById("title")
    const runTime = document.getElementById("runtime")
    const filmInfo = document.getElementById("film-info")
    const showTime = document.getElementById("showtime")
    const description = document.querySelector(".description")

    poster.src = movieObj.poster
    title.innerText = movieObj.title
    runTime.innerText = movieObj.runtime +" minutes"
    filmInfo.innerText = movieObj.description
    showTime.innerText = movieObj.showtime
    availableTickets.innerText = movieObj.capacity-movieObj.tickets_sold +" remaining tickets"
   
};

//step 3: Fetching data from the server and creating a click sensitive list of movies.
fetch(BASE_url)
.then( response=>response.json())
.then(jsonData=>{
    //console.log(jsonData)
    //[0] ensures the page loads with the image[0] displayed
    film(jsonData[0])
    //adding an interactive list of movies to the page with data directly from the server.
    const movieList=document.getElementById("films")
    jsonData.forEach(movieObj=>{
    const li=document.createElement("li")
    li.className="film item"
    li.innerText=movieObj.title
    movieList.append(li)
    li.addEventListener("click",()=>{
        film(movieObj)
    });
    })
});