const buttons = document.querySelectorAll("[data-carousel-btn]")
const dotBtns = document.querySelectorAll("[data-dot-btn]")
const images = document.querySelector("[data-images]")
const dots = document.querySelector("[data-carousel-dots]")
let timeout = setInterval(turnCarousel, 2000)

function restartInterval() {
    timeout = setInterval(turnCarousel, 2000)
}

function changeImageDot(newIdx) {
    const activeImg = images.querySelector("[data-active-img]")
    const activeDot = dots.querySelector("[data-active-dot]")
    images.children[newIdx].dataset.activeImg = true
    dots.children[newIdx].dataset.activeDot = true
    delete activeImg.dataset.activeImg
    delete activeDot.dataset.activeDot
}

function useArrows(button) {
    const offset = button.dataset.carouselBtn === "next" ? 1 : -1
    const activeImg = images.querySelector("[data-active-img]")
    let newIdx = [...images.children].indexOf(activeImg) + offset
    if (newIdx < 0) newIdx = images.children.length - 1
    if (newIdx >= images.children.length) newIdx = 0
    changeImageDot(newIdx)
}

function turnCarousel() {
    const activeImg = images.querySelector("[data-active-img]")
    let newIdx = [...images.children].indexOf(activeImg) + 1
    if (newIdx >= images.children.length) newIdx = 0
    changeImageDot(newIdx)
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        clearInterval(timeout)
        useArrows(button)
        restartInterval()
    })
})

dotBtns.forEach(dotBtn => {
    dotBtn.addEventListener("click", () => {
        clearInterval(timeout)
        let newIdx = [...dots.children].indexOf(dotBtn)
        changeImageDot(newIdx)
        restartInterval()
    })
})