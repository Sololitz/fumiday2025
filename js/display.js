document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('http://127.0.0.1:5000/api/wish');
        if (!res.ok) {
            console.log('Response status:', res.status);
            return;
        }

        const wishes = await res.json();
        if (!wishes) {
            return;
        }

        let cardNumber = 1;
        
        wishes.forEach(wish => {
            const wishComponent = document.createElement('div');
            wishComponent.classList.add('card', wish.card);
            wish.timestamp = new Date(wish.timestamp).toISOString().replace('T', ' ').substring(0, 19);

            wishComponent.innerHTML = `
                    <div class="card-header">
                        <img src="/images/stickers/${wish.sticker}.png" alt="fumi sticker" class="sticker" id="sticker-example">
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
            
            document.querySelector('.wish-container').appendChild(wishComponent);
            cardNumber++;
        });
    }
    catch(error) {
        console.log(error);
    }
});