const messageForm = document.getElementById('send-form');

async function sendWish(data) {
    try {
        const res = await fetch('http://127.0.0.1:5000/api/wish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        let result;
        try {
            result = await res.json();
        } 
        catch (jsonError) {
            throw new Error("Invalid JSON response from server.");
        }

        if (!res.ok) {
            Swal.fire({
                icon: "error",
                title: "ข้อความมีปัญหา",
                text: result.response || "พบปัญหาในข้อความ ลองส่งใหม่อีกครั้งนะครับ",
            });
            return;
        }

        messageForm.reset();
        Swal.fire({
            icon: "success",
            title: "ส่งข้อความเรียบร้อย!",
            text: result.response || "ขอบคุณที่เข้ามาอวยพรให้ฟูมิมากเลยนะครับ!",
        });
    }
    catch (error) {
         Swal.fire({
            icon: "error",
            title: "Network มีปัญหา",
            text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ ลองส่งใหม่อีกครั้งนะครับ",
        });
        console.error("Unexpected error:", error);
    }
}

function validateForm(data) {
    const errors = [];
    const valid_card = ['red', 'gold', 'brown', 'cyan'];
    const valid_sticker = ['dough_kung', 'fumi', 'human', 'raccoon'];
                          

    if (data.name.length > 20) errors.push('name');
    if (data.message.length > 500) errors.push('message');
    if (!valid_card.includes(data.card)) errors.push('select-card');
    if (!valid_sticker.includes(data.sticker)) errors.push('select-sticker');

    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function highlightInvalidFields(fields) {
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.classList.add('invalid');
            input.nextElementSibling.classList.add('show')
        }
    });
}

messageForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(messageForm);
    const data = Object.fromEntries(formData);

    const validationResult = validateForm(data);

    if (!validationResult.valid) {
        highlightInvalidFields(validationResult.errors);
        return;
    }
    if (!data.name || !data.message) {

        const alert = {title: "ยังไม่ได้เขียนอะไรเลย?", text: "จะใส่ชื่อเป็นคุณมนุษย์และใช้ข้อความทั่วไปให้แทนน้า ส่งเลยมั้ยครับ?"}
      
        if (!data.name && data.message) {
            alert.title = "ยังไม่ได้เขียนชื่อ?"
            alert.text = "จะใส่ชื่อเป็นคุณมนุษย์ให้แทนน้า ส่งเลยมั้ยครับ?"
        }
        else if (data.name && !data.message) {
            alert.title = "ยังไม่ได้เขียนข้อความ?"
            alert.text = "จะใช้ข้อความทั่วไปให้แทนน้า ส่งเลยมั้ยครับ?"
        }

        Swal.fire({
            title: alert.title,
            text: alert.text,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ส่งเลยยย!",
            cancelButtonText: "ขอเขียนใหม่ก่อน"
            }).then((result) => {
                if (result.isConfirmed) {
                    sendWish(data);
                }
        });
    }
    else {
        Swal.fire({
            title: "ส่งเลยมั้ย?",
            text: "สามารถส่งคำอวยพรฟูมิได้แค่ครั้งเดียวนะครับ",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ส่งเลยยย!",
            cancelButtonText: "ขอเขียนใหม่ก่อน"
            }).then((result) => {
                if (result.isConfirmed) {
                    sendWish(data);
                }
        });
    }
});

messageForm.addEventListener('input', event => {
    if (event.target.classList.contains('invalid')) {
        event.target.classList.remove('invalid');
        event.target.nextElementSibling.classList.remove('show');
    }
})