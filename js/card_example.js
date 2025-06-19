const selectCard = document.getElementById('select-card');
const exampleCard = document.getElementById('card-example');
const cardOption = ['red', 'gold', 'brown', 'cyan'];

const selectSticker = document.getElementById('select-sticker');
const exampleSticker = document.getElementById('sticker-example');
const stickerOption = ['dough_kung', 'fumi', 'human', 'raccoon'];

selectCard.addEventListener('change', event => { 
    if (cardOption.includes(event.target.value)) {
        exampleCard.className = `card ${event.target.value}`;
    } 
})

selectSticker.addEventListener('change', event => {
    if (stickerOption.includes(event.target.value)) {
        exampleSticker.setAttribute('src', `images/stickers/${event.target.value}.png`);
        exampleSticker.setAttribute('alt', `${event.target.value.replace('_', ' ')} sticker`);
    }  
})
