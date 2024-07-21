let divBox = document.getElementById('box')
let pInfo = document.getElementById('info')

divBox.addEventListener('mouseenter', handlerMoveEnter)
divBox.addEventListener('mouseleave', handlerLeave)
divBox.addEventListener('mousemove', handlerMouseMove)

function handlerMoveEnter() {
    pInfo.style.display = 'block'
}

function handlerLeave() {
    pInfo.style.display = 'none'
}

function handlerMouseMove(evt) {
    let _clientX = evt.clientX
    let _clientY = evt.clientY
    pInfo.style.left = _clientX + 10 + 'px'
    pInfo.style.top = _clientY + 10 + 'px'
}