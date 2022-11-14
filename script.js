// Globally stores variables
// Pulls tab id from document to allow button creation on tab
const homeButton = document.querySelector("#home")
const myCart = document.querySelector("#mycart")
const custService = document.querySelector("#contactus")
const aboutUs = document.querySelector("#aboutus")

// Pulls id to display information for randomly generated song
const vinylTitle = document.querySelector("#vinylTitle")
let vinylTitleHolder
const artistName = document.querySelector('#artistName')
let artistNameHolder
const trackList = document.getElementById("tracklist")
const videoThumbNail = document.querySelector("#videoTN")


const showHome = document.querySelector("#HomeScreen")
const showContact = document.querySelector("#ContactUs")
const showBio = document.querySelector("#Bio")
const randomButton = document.querySelector("#randomize")
const commentAlert = document.querySelector("#ContactUs")
let tracklistHolder = []
const totalReleases = 15589841

// When the page loads, creates event listeners for Home, My Cart, Customer Service, and About Us tabs

document.addEventListener("DOMContentLoaded", () => {
    homeButton.addEventListener("click", showHomePage)
    custService.addEventListener("click", showContactUs)
    aboutUs.addEventListener("click", showAboutUsPage)
    randomButton.addEventListener("click", fetchRandomtrack)
    commentAlert.addEventListener("submit", (e)=> {
        e.preventDefault()
        alert("Thank you for your comments! We appreciate your feedback!")
        resetForm() 
    })
    
    fetchRandomtrack()
    showHomePage()
})

// Reset form
function resetForm() {
    commentAlert.reset()
}

// Embed videolink
function changeYouTube(link) {
    let youtubelink = link.slice(0, 24)
    let videolink = link.slice(29)
    let newYouTubeLink = youtubelink + "embed" + videolink
    return newYouTubeLink
}

// Creates a function to randomly generate song from API
function fetchRandomtrack() {
    let randomtrack = (Math.floor((Math.random() * totalReleases) + 1))
    fetch(`https://api.discogs.com/releases/${randomtrack}`)
        .then(res => res.json())
        .then(data => {
            if(data.videos != null){
                videoThumbNail.src = changeYouTube(data.videos[0]["uri"])
                changeYouTube(data.videos[0]["uri"])
            }
            if(data.title != null){
                vinylTitle.textContent = data.title
            }
            if(data.artists != null){
                artistName.textContent = data.artists[0]["name"]
            }
            tracklistHolder = []
            trackList.innerHTML = ''
            for (tracks of data.tracklist) {
                
                tracklistHolder.push(tracks)
            }
            tracklistHolder.forEach((track) => {
                const trackLI = document.createElement("li")
                trackLI.textContent = track.title
                trackList.append(trackLI)
            })
            
        })
        .catch((error)=> console.log(error))        
}

// Alert for event listener on Home tab
function showHomePage() {
    showHome.style.display = "block"
    showContact.style.display = "none";
    showBio.style.display = 'none'
}

// Alert for event listener on Customer Service tab
function showContactUs() {
    showHome.style.display = "none";
    showContact.style.display = "block";
    showBio.style.display = 'none'
}

// Alert for event listener on About Us tab
function showAboutUsPage() {
    showHome.style.display = "none";
    showContact.style.display = "none";
    showBio.style.display = 'block'
}
