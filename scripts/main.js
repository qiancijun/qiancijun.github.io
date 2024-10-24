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
};

const showTab = (multiCodeIndex, tabIndex) => {
    // 隐藏所有标签内容
    const tabContents = $(`.tab-content-${multiCodeIndex}`)
    if (tabContents.length == 0) {
        return;
    }
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    let tabButtons = $('.tabs > button');
    for (let i = 0; i < tabButtons.length; i++) {
        const tb = tabButtons[i];
        tb.classList.remove('tab-active')
    }
    const tabButton = $(`#tab-button-${multiCodeIndex}-${tabIndex}`)[0];
    tabButton.classList.add('tab-active') 
    // 显示选定的标签内容
    const selectedTab = $(`#tab-${multiCodeIndex}-${tabIndex}`)[0];
    selectedTab.classList.add('active');
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
    for (let i = 0; i < code_blocks.length; i++) {
        const block = code_blocks[i];
        $(block).attr("id", `code-${i}`)
        const copy_btn = `
        <div class="copy" id="copy-btn-${i}" data-clipboard-target="#code-${i} pre" style="width:16px; height: 16px; position: absolute; right: 10px; top: 10px; cursor: pointer"><img src="/images/copy.svg"></div>
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

    // 多语言代码块的复制
    // const multi_code_blocks = $('.tab-content')
    const multi_code_blocks = $('.multi-code');
    for (let i = 0; i < multi_code_blocks.length; i++) {
        const multi_code_block = multi_code_blocks[i];
        const tab_contents = $(multi_code_block).children('.tab-content');
        for (let j = 0; j < tab_contents.length; j++) {
            const tab_content = tab_contents[j];
            const copy_btn = `
                <div class="copy" id="tab-copy-btn-${i}-${j}" data-clipboard-target="#${tab_content.id} > pre" style="width:16px; height: 16px; position: absolute; right: 10px; top: 10px; cursor: pointer"><img src="/images/copy.svg"></div>
            `
            $(tab_content).prepend(copy_btn);
            let clipboard = new ClipboardJS(`#tab-copy-btn-${i}-${j}`);
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
    }
    // for (let i = 0; i < multi_code_blocks.length; i++) {
    //     const code_block = multi_code_blocks[i];
    //     const copy_btn = `
    //         <div class="copy" id="tab-copy-btn-${i}" data-clipboard-target="#tab${i}" style="width:16px; height: 16px; position: absolute; right: 10px; top: 10px; cursor: pointer"><img src="/images/copy.svg"></div>
    //     `
    //     $(code_block).prepend(copy_btn); 
    //     let clipboard = new ClipboardJS(`#tab-copy-btn-${i}`);
    //     clipboard.on('success', function(e) {
    //         Toastify({
    //             text: "Copy success",
    //             duration: 3000,
    //             // destination: "https://github.com/apvarun/toastify-js",
    //             newWindow: true,
    //             close: true,
    //             gravity: "top", // `top` or `bottom`
    //             position: "right", // `left`, `center` or `right`
    //             stopOnFocus: true, // Prevents dismissing of toast on hover
    //             style: {
    //               background: "rgba(45, 45, 45, 0.5)",
    //               color: "color-text"
    //             },
    //             onClick: function(){} // Callback after click
    //           }).showToast();
    //         e.clearSelection();
    //       });
        
    //     clipboard.on('error', function(e) {
    //         Toastify({
    //             text: "Copy failed",
    //             duration: 3000,
    //             // destination: "https://github.com/apvarun/toastify-js",
    //             newWindow: true,
    //             close: true,
    //             gravity: "top", // `top` or `bottom`
    //             position: "right", // `left`, `center` or `right`
    //             stopOnFocus: true, // Prevents dismissing of toast on hover
    //             style: {
    //               background: "rgba(45, 45, 45, 0.5)",
    //               color: "color-text"
    //             },
    //             onClick: function(){} // Callback after click
    //           }).showToast();
    //     });
    // }

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

    // 默认显示第一个
    const multiCodes = $('.multi-code')
    for (let i = 0; i < multiCodes.length; i++) {
        let first_content = null;
        const tab_content = $(multiCodes[i]).children('.tab-content')
        if (tab_content.length > 0) {
            first_content = tab_content[0]
        }
        if (first_content != null) {
            first_content.classList.add('active');
        }
        
        const btn = $(multiCodes[i]).children('.tabs').children('button')[0];
        if (btn != undefined) {
            btn.classList.add('tab-active');
        }
        
    }
})();

