// 代码复制
const copyToClipboard = (text) => {
    // console.log(text)
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('文本已成功复制到剪贴板');
        })
        .catch(err => {
            console.error('复制失败：', err);
        });
}

(function() {
    'use strict';
    const asciiBanner = ` 
     ____  _                         _ <br>
    / ___|| |__    ___  _ __  _   _ | |<br>
   | |    | '_ \\  / _ \\| '__|| | | || |<br>
   | |___ | | | ||  __/| |   | |_| || |<br>
    \\____||_| |_| \\___||_|    \\__, ||_|<br>
                              |___/    
  `;
    console.log("js loaded successfully")
    
    // 滚动条
    $(".main-content").mCustomScrollbar({
        theme: "rounded-dots",
        mouseWheel:{scrollAmount:400},
        scrollButtons:{
            enable:true,
            scrollType:"continuous",
            scrollSpeed:40,
            scrollAmount:40,
            style:"crosshair"
        },
    });

    $('.btn-close').hover(function(e) {
        let btnClose = $('.btn-close')[0];
        btnClose.src = '/images/titlebutton-close-hover-alt.png';
    });
    let topbarBtn = $('.btn-container')[0];
    let close = $('.btn-close')[0];
    let minimize = $('.btn-minimize')[0];
    let maximize = $('.btn-maximize')[0];
    topbarBtn.addEventListener('mouseover', function(e) {
        close.src = '/images/close-hover.svg';
        minimize.src = '/images/minimize-hover.svg';
        maximize.src = '/images/maximize-hover.svg';
    });
    topbarBtn.addEventListener('mouseout', function(e) {
        close.src = '/images/close.svg';
        minimize.src = '/images/minimize.svg';
        maximize.src = '/images/maximize.svg';
    });

    const banner = $('.banner-container')[0]
    if (banner != undefined) {
        banner.innerHTML = asciiBanner;
    }
    
    // 首页动作监听
    const class_name = [".category", ".tag", ".archive", ".other"];
    for (let name of class_name) {
        const btns = $(`${name}-show-btn`);
        for (let i = 0; i < btns.length; i++) {
            const btn = btns[i];
            if (btn != undefined) {
                btn.addEventListener('click', function(e) {
                    const item = $(`${name}`)[0];
                    if (item != undefined) {
                        item.classList.toggle('collapsed');
                    }
                    const btn_img = $(btn).find('img')[0];
                    if (btn_img.src.includes('right-arrow')) {
                        btn_img.src = '/images/down-arrow.svg';
                    } else {
                        btn_img.src = '/images/right-arrow.svg';
                    }
                });
                btn.addEventListener('mouseover', function(e) {
                    btn.children[0].classList.remove('is-hover');
                });
                btn.addEventListener('mouseout', function(e) {
                    btn.children[0].classList.add('is-hover');
                });
            }
        }
    }

    // 打字机 
      
    const writer = $('.type-writer')[0];
    if (writer != undefined) {
        const text = writer.textContent.trim().split('\n');
        writer.textContent = "";
        const options = {
            strings: text,
            typeSpeed: 150,
            backSpeed: 100,
            loop: true,
        }
        new Typed(writer, options);
    }

    if ($(".github-calendar")[0] != undefined) {
        GitHubCalendar(".github-calendar", "qiancijun");
    }

    // 代码复制  
    const code_blocks = $('.highlight');
    // console.log(code_blocks);
    for (let i = 0; i < code_blocks.length; i++) {
        const block = code_blocks[i];
        $(block).attr("id", `code-${i}`)
        const copy_btn = `
        <div class="copy" id="copy-btn-${i}" data-clipboard-target="#code-${i}" style="width:16px; height: 16px; position: absolute; right: 10px; top: 10px; cursor: pointer"><img src="/images/copy.svg"></div>
        `
        
        $(block).prepend(copy_btn);
        let clipboard = new ClipboardJS(`#copy-btn-${i}`);
        clipboard.on('success', function(e) {
            Toastify({
                text: "Copy success",
                duration: 3000,
                // destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "rgba(45, 45, 45, 0.5)",
                  color: "color-text"
                },
                onClick: function(){} // Callback after click
              }).showToast();
            e.clearSelection();
          });
        
        clipboard.on('error', function(e) {
            Toastify({
                text: "Copy failed",
                duration: 3000,
                // destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "rgba(45, 45, 45, 0.5)",
                  color: "color-text"
                },
                onClick: function(){} // Callback after click
              }).showToast();
        });
    }

    // 引用展开
    const quotes = $('blockquote');
    for (let i = 0; i < quotes.length; i++) {
        const quote = quotes[i];
        const expand_btn = `
        <div id="expand-btn-${i}">
            <img style="position: absolute; top:0em; right: 1em; cursor: pointer;" src="/images/expand.svg">
        </div>
        `
        $(quote).prepend(expand_btn)
        $(quote).attr("id", `quote-${i}`)
        $(`#expand-btn-${i}`)[0].addEventListener('click', function() {
            $(`#quote-${i}`)[0].classList.toggle('expanded'); 
        });
    }
})();