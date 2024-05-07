// const, let
const canvas = document.querySelector('canvas'); // vado a prendere il canvas che ho creato in html
const ctx = canvas.getContext('2d'); // indicazione di stile
const links = [...document.querySelectorAll('button#sbarrato')]; // stabilisco dove l'immagine deve comparire

function lerp(start, end, t){           // funzione lerp: mi regola i tempi (dissolvenza)
    return start * (1 - t) + end * t;
}


let imgIndex = 0;
// Carico le immagini in un array (lista), per vederle facilmente
const images = [
    './assets/img/pixelatedEffect/VeronicaSimonteProfilePhoto.png',
    './assets/img/pixelatedEffect/1.jpeg',
    './assets/img/pixelatedEffect/2.jpeg',
    './assets/img/pixelatedEffect/3.jpeg',
    './assets/img/pixelatedEffect/4.jpeg',
    './assets/img/pixelatedEffect/5.jpeg'
]

let imgArr = []; // lista vuota, per iterare dopo

// Variabili per la posizione del cursore
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener('mousemove', (e)=> { // Variabili per la posizione del cursore
    targetX = e.clientX;
    targetY = e.clientY;
    
})

images.forEach((image, idx) => { // Creo una nuova immagine
    let elImage = new Image(300);
    elImage.src = image;
    elImage.classList.add('project-image');
    document.body.append(elImage);
    imgArr.push(elImage)
})

// Disegno sul canvas

let percent = 0;
let target = 0;

function drawImage(idx){
    let {width, height} = imgArr[idx].getBoundingClientRect();

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // pixelate by diabling the smoothing
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    if(target === 1){ // Quando l'hover è sul link
        // velocità x2 per rendere l'effetto graduale
        if(percent < 0.2){
            percent += .01;
        }else if(percent < 1){
            percent += .1;
        }
    }else if(target === 0){
        if(percent > 0.2){
            percent -= .3
        }else if( percent > 0){
            percent -= .01;
        }
    }

    let scaledWidth = width * percent;
    let scaledHeight = height * percent;

    if(percent >= 1){
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.drawImage(imgArr[idx], 0, 0, width, height);
    }else{
        ctx.drawImage(imgArr[idx], 0, 0, scaledWidth, scaledHeight);
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        if(canvas.width !== 0 && canvas.height !== 0){
            ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height)
        }
    }
}

for(let i = 0; i < links.length; i++){
    links[i].addEventListener('mouseover', () => {
        for(let j = 0; j < links.length; j++){
            if(j !== i){
                links[j].style.opacity = 0.2;
                links[j].style.zIndex = 0;
            }else{
                links[j].style.opacity = 1;
                links[j].style.zIndex = 3;
            }
        }
    })

    links[i].addEventListener('mouseleave', () => {
        for(let i = 0; i < links.length; i++){
            links[i].style.opacity = 1;
        }
    })

    links[i].addEventListener('mouseenter', () => {
        imgIndex = i;
        target = 1
    });

    links[i].addEventListener('mouseleave', () => {
        target = 0;
    })
}

function animate(){
    currentX = lerp(currentX, targetX, 0.075);
    currentY = lerp(currentY, targetY, 0.075);
    let { width, height} = imgArr[imgIndex].getBoundingClientRect();
    canvas.style.transform = `translate3d(${currentX - (width / 2)}px, ${currentY - (height / 2)}px, 0)`;
    drawImage(imgIndex);
    window.requestAnimationFrame(animate);
}

animate()

document.addEventListener('DOMContentLoaded', function() {
    const titleText = "I might be your trustworthy UI/UX designer"; // Cambia con il tuo titolo
    const typingTitle = document.getElementById('typing-title');
    const cursor = document.getElementById('cursor');
  
    function typeWriter(text, i) {
      if (i < text.length) {
        typingTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(function() {
          typeWriter(text, i);
        }, 120); // Regola la velocità di scrittura
      } else {
        cursor.style.display = 'none'; // Nascondi il cursore alla fine della scrittura
      }
    }
  
    typeWriter(titleText, 0);
  });
  