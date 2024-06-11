function generateRandomColor() {
    let characters = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += characters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const btn = document.getElementById('changeColorBtn');

function changeBackgroundColor() {
    let randomColor = generateRandomColor();
    document.body.style.backgroundColor = randomColor;
}
btn.addEventListener('click', changeBackgroundColor);