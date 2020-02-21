const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
// Anyhthing with data-skip attribute
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const full_screen = player.querySelector('.full_screen');

function togglePlay() {
    const method = video.paused? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    console.log(this.value, this.name);
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

function scrub(e) {
    console.log(e.offsetX);
    const scrubTime = (e.offsetX / progress.offsetWidth)
    const videoTime = scrubTime * video.duration;
    video.currentTime = videoTime;
}

function handleFullscreen() {
    video.requestFullscreen();
}

video.addEventListener('click', togglePlay);
video.addEventListener('click', updateButton);
video.addEventListener('timeupdate', handleProgress);
// video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => {
    button.addEventListener('click', skip);
});

ranges.forEach(range => {
    range.addEventListener('mousemove', handleRangeUpdate);
})

progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('click', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

full_screen.addEventListener('click', handleFullscreen)