let offset = 0;
let isLoading = false;
let finished = false;
let cardNumber;
const wishContainer = document.querySelector('.wish-container');
const loader = document.querySelector('.loader');

async function loadMessages() {
    if (isLoading || finished) {
        return;
    }

    loader.style.display = "block"  
    isLoading = true;

    try {
        const res = await fetch(`https://fumi-birthday-back-end.onrender.com/api/wish?offset=${offset}`);
        if (!res.ok) {
            console.log('Response status:', res.status);
            return;
        }

        const wishes = await res.json();
        if (!wishes) {   
            return;
        }    

        if (wishes.length < 6) {
            finished = true;
        }
        
        wishes.forEach(wish => {
            const wishComponent = document.createElement('div');
            wishComponent.classList.add('card', wish.card);
            wish.timestamp = new Date(wish.timestamp).toISOString().replace('T', ' ').substring(0, 19).toLocaleString();

            wishComponent.innerHTML = `
                    <div class="card-header">
                        <img src="images/stickers/${wish.sticker}.png" alt="fumi sticker" class="sticker" id="sticker-example" loading="lazy">
                        <span class="card-name">${wish.name}</span>
                    </div>
                    <hr>
                    <p class="card-message">
                        ${wish.message}
                    </p>
                    <hr>
                    <div class="card-footer">
                        <span>ส่งเมื่อ:</span>
                        <time>${wish.timestamp}</time>
                    </div>
                    <span class="card-count">#${cardNumber}</span>`;
            
            wishContainer.appendChild(wishComponent);
            cardNumber--;
        });

        offset += wishes.length;
    }
    catch(error) {
        console.log(error);
    }
    
    finally {
        loader.style.display = "none";
        isLoading = false;
    }
 
};


window.addEventListener("scroll", () => {
    if (finished) return;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        loadMessages();
    }
});


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('https://fumi-birthday-back-end.onrender.com/api/wish_count');
        if (!res.ok) {
            console.log('Response status:', res.status);
            return;
        }

        const count = await res.json();
        console.log(count)
        if (!count) {
            return;
        }      

        cardNumber = count.count;
        loadMessages();
    }
    catch(error) {
        console.log(error);
    }  
})
