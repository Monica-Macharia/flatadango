// Your code here
const ticketNum=document.getElementById("ticket-num")
const buyTicket=document.getElementById("buy-ticket")
buyTicket.addEventListener("click",()=>{
   ticketNum.innerText= buyTickets(parseInt(ticketNum.innerText,10))
   })
const BASE_url="http://localhost:3000/films"
function displayMovie(movieObj){
    //pseudocode
    //inserting img src
    const poster=document.getElementById("poster")
    const title=document.getElementById("title")
    const runTime=document.getElementById("runtime")
    const filmInfo=document.getElementById("film-info")
    const showTime=document.getElementById("showtime")
    const description=document.querySelector(".description")

    poster.src=movieObj.poster

    title.innerText=movieObj.title
    runTime.innerText=movieObj.runtime+" minutes"
    filmInfo.innerText=movieObj.description
    showTime.innerText=movieObj.showtime
    ticketNum.innerText=movieObj.capacity-movieObj.tickets_sold+" remaining tickets"


    
    
    
   // console.log(tickets)
}
function buyTickets(ticketNumber){
    ticketNumber-=1
    if(ticketNumber>0){
        return `${ticketNumber} remaining tickets`

    }
    else{
        return "sold out"
    }
}
fetch(BASE_url)
.then( response=>response.json())
.then(jsonData=>{
    //console.log(jsonData)
    displayMovie(jsonData[0])
    const movieList=document.getElementById("films")
    jsonData.forEach(movieObj=>{
    const li=document.createElement("li")
    li.className="film item"
    li.innerText=movieObj.title
    movieList.append(li)
    li.addEventListener("click",()=>{
        displayMovie(movieObj)
    })

    

    })
})
