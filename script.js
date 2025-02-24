// YouTube API 準備好時會調用這個函數
function onYouTubeIframeAPIReady() {
    // 初始化所有 bento box 的點擊事件
    initBentoBoxes();
}

function initBentoBoxes() {
    document.querySelectorAll('.bento-item').forEach(item => {
        const videoUrl = item.getAttribute('data-video');
        const img = item.querySelector('img');
        let isVideo = false;

        item.addEventListener('click', () => {
            if (!isVideo) {
                // 儲存圖片元素
                const imgSrc = img.src;
                const imgAlt = img.alt;
                
                // 替換為 iframe
                const iframe = document.createElement('iframe');
                iframe.src = videoUrl;
                iframe.className = 'bento-image';
                iframe.allowFullscreen = true;
                iframe.frameBorder = '0';
                
                // 監聽影片結束事件
                iframe.addEventListener('load', () => {
                    const player = new YT.Player(iframe, {
                        events: {
                            'onStateChange': (event) => {
                                // 當影片結束時 (state = 0)
                                if (event.data === 0) {
                                    // 替換回圖片
                                    const newImg = document.createElement('img');
                                    newImg.src = imgSrc;
                                    newImg.alt = imgAlt;
                                    newImg.className = 'bento-image';
                                    iframe.parentNode.replaceChild(newImg, iframe);
                                    isVideo = false;
                                }
                            }
                        }
                    });
                });

                img.parentNode.replaceChild(iframe, img);
                isVideo = true;
            }
        });
    });
}