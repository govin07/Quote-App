
let quoteParagraph = document.getElementById('quote');
let authorSection = document.getElementById('author');
let newquoteBtn = document.getElementById('new-qouteBtn')
let copyBtn = document.getElementById('copy')
let downloadBtn = document.getElementById('dwonload-btn');

// console.log(newquoteBtn)

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

    // console.log(quote);
    // console.log(authorName)

    authorSection.innerText = `~${authorName}`;
    quoteParagraph.innerText = ` " ${quote} " `;
     
    copyBtn.addEventListener('click', function(){
        copyText(quoteParagraph)
    })

    newquoteBtn.addEventListener('click', async ()=>{
        try{
            const response = await fetch(url);
            const newdata = await response.json();

            // console.log(newdata)

            quoteParagraph.innerText = ` " ${newdata.data.content} "`;
            authorSection.innerText = `~${newdata.data.author}`;

            copyBtn.innerText = "Copy"

            copyBtn.addEventListener('click',function(){
                copyText(quoteParagraph)
            })

          
              }catch(err){
            console.log("error getting data", err)

        }
       


    })

   
}


function copyText(quote){
    copyBtn.innerText === "copy"? copyBtn.innerText = "Copied" : copyBtn.innerText = "copy"
    
    const copied = quote.innerText
   navigator.clipboard.writeText(copied)
  .then((res)=>{
    console.log("coping is done")

  })
  .catch((err)=>{


  })
    

}

downloadBtn.addEventListener('click',function(){
    exportQuoteImage();
})



function exportQuoteImage(){
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 400;

  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0,0, canvas.width, canvas.height);

  ctx.fillStyle = '#333333';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';

  const quoteText = quoteParagraph.innerText;
  const authorText = authorSection.innerText;

  wrapText(ctx, quoteText, canvas.width/2, 100, canvas.width - 100, 30);

  ctx.font = 'italic 20px Arial';
  ctx.fillText(authorText, canvas.width/2, canvas.height - 50);

  const imageDataURL = canvas.toDataURL('image/png');
 
  const downloadLink = document.createElement('a');
  downloadLink.href = imageDataURL;
  downloadLink.download = 'quote.png';

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    
    for(let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    
    context.fillText(line, x, y);
}




gettingDataFromApi()
