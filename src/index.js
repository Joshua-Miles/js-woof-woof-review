fetch('http://localhost:3000/pups')
	.then( response => response.json() )
    .then( puppies => addPuppiesToPage(puppies) )
    
function addPuppiesToPage(puppies){
    const bar = document.querySelector('#dog-bar')

    const filter = document.getElementById('good-dog-filter')
    let filterMode = false;
    filter.addEventListener('click', filterDogs)
    function filterDogs(){
        filterMode = !filterMode
        filter.innerHTML = filterMode ? 'Filter good dogs: ON' : 'Filter good dogs: OFF'
        puppies.forEach(puppy => {
            let filter = document.getElementById(`puppy-${puppy.id}`)
            if(!puppy.isGoodDog && filterMode){
                filter.style.display = 'none'
            } else {
                filter.style.display = ''
            }
        })
    }
   
    puppies.forEach( puppy => {

        const puppySpan = document.createElement('span')
        puppySpan.id = `puppy-${puppy.id}`
        puppySpan.innerHTML = `${puppy.name}`
        bar.append(puppySpan)

        // Also Good:
        // bar.innerHTML += `<span id="puppy-${puppy.id}">${puppy.name}</span>`
        // const puppySpan = document.querySelector(`#puppy-${puppy.id}`)

        puppySpan.addEventListener('click', function() {
            let info = document.getElementById('dog-info')
            info.innerHTML = `
            <span>
                <img src=${puppy.image}>
                <h2>${puppy.name}</h2>
                <span id="good-bad-span">Is a ${puppy.isGoodDog ? 'Good Dog' : 'Bad Dog'}</span>
                <button id="good-bad-button">${puppy.isGoodDog ? 'Change To Bad Dog!' : 'Change To Good Dog!'}</button>
            </span>`

            // Adding Event Listeners
            let toggle = document.getElementById('good-bad-button')
            let span = document.getElementById('good-bad-span')
            
            toggle.addEventListener('click', function(){
                puppy.isGoodDog = puppy.isGoodDog ? false : true

                fetch(`http://localhost:3000/pups/${puppy.id}`, {
                    method:'PATCH',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(puppy),
                    // Also Good: 
                    // body: JSON.stringify({
                    //     "isGoodDog": puppy.isGoodDog
                    //     // Also Good: "isGoodDog": !puppy.isGoodDog
                    // })
                })

                toggle.innerHTML = puppy.isGoodDog ? 'Change To Bad Dog!' : 'Change To Good Dog!'
                span.innerHTML = puppy.isGoodDog ? 'Is a Good Dog' : 'Is a Bad Dog'
            })
        })
    })
}


// Also Good:
// *Currying*
// function buildShowPuppyInfoCallback(puppy){
//     return function() {
//         let info = document.getElementById('dog-info')
//         info.innerHTML = `
//         <span>
//             <img src=${puppy.image}>
//             <h2>${puppy.name}</h2>
//             <button>${puppy.isGoodDog ? 'Change To Bad Dog!' : 'Change To Good Dog!'}</button>
//         </span>`
//     }
// }