
let quoteParagraph = document.getElementById('quote');
let authorSection = document.getElementById('author');
let newquoteBtn = document.getElementById('new-qouteBtn')

console.log(newquoteBtn)

const url =  'https://api.freeapi.app/api/v1/public/quotes/quote/random';



 async function gettingDataFromApi(){
    try{
     const response  = await fetch(url);
     const data =  await response.json()
     showingQuotes(data)
       
    }catch(err){
        console.log("Failed to get data",err)
        
    }

}
let index = 0;

function showingQuotes(...data){ 
    const authorName =  data[index].data.author;
    const quote = data[index].data.content

    console.log(quote);
    console.log(authorName)

    authorSection.innerText = `~${authorName}`;
    quoteParagraph.innerText = ` " ${quote} " `;

    newquoteBtn.addEventListener('click', async ()=>{
        try{
            const response = await fetch(url);
            const newdata = await response.json();

            console.log(newdata)

            quoteParagraph.innerText = ` " ${newdata.data.content} "`;
            authorSection.innerText = `~${newdata.data.author}`

            



        }catch(err){
            console.log("error getting data", err)

        }
       


    })

   
}



gettingDataFromApi()
