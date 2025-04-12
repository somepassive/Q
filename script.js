document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-image');
    const fullscreenModal = document.getElementById('fullscreenModal');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const closeButton = document.getElementById('closeButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let currentIndex = 0;

    // 新增: 获取头像和音乐元素
    const profilePicture = document.getElementById('profilePicture');
    const profileMusic = document.getElementById('profileMusic');
    let isPlaying = false;

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            currentIndex = index;
            fullscreenImage.src = image.src;
            fullscreenModal.style.display = 'flex';
        });
    });

    closeButton.addEventListener('click', () => {
        fullscreenModal.style.display = 'none';
    });

    document.addEventListener('keydown', (e) => {
        if (fullscreenModal.style.display === 'flex') {
            if (e.key === 'Escape') {
                fullscreenModal.style.display = 'none';
            } else if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    prevButton.addEventListener('click', showPreviousImage);
    nextButton.addEventListener('click', showNextImage);

    function showPreviousImage() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        fullscreenImage.src = images[currentIndex].src;
    }

    function showNextImage() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        fullscreenImage.src = images[currentIndex].src;
    }

    images.forEach(image => {
        image.addEventListener('load', () => {
            image.style.transform = 'translateY(0)';
        });
    });

    // 添加触摸事件监听器
    let touchStartX = 0;
    let touchEndX = 0;

    fullscreenModal.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    fullscreenModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleGesture();
    });

    function handleGesture() {
        if (touchStartX > touchEndX + 50) {
            showNextImage();
        } else if (touchStartX < touchEndX - 50) {
            showPreviousImage();
        }
    }

    // 新增: 头像点击事件处理
    profilePicture.addEventListener('click', () => {
        if (isPlaying) {
            profileMusic.pause();
            profilePicture.classList.remove('rotating');
        } else {
            profileMusic.play();
            profilePicture.classList.add('rotating');
        }
        isPlaying = !isPlaying;
    });

    // 新增: 音乐播放结束时移除旋转动画
    profileMusic.addEventListener('ended', () => {
        profilePicture.classList.remove('rotating');
        isPlaying = false;
    });
});