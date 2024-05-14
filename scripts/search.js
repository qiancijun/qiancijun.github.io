const wrap_html = (data, author) =>  {
    const data_url = data.url;
    const data_tags = data.tags;
    const data_categories = data.categories;
    const data_date = moment(data.date).format('MMMM Do YYYY, h:mm:ss a');
    const data_tag_number = data.tag_number;
    const data_title = data.title;
    let str = "";
    str += '<tr class="post-list-item">';
    str += '<td class="phone-item"><span class="article-authority"># -rw-r--r--</span></td>';
    str += `<td class="phone-item"><span class="link">${data_tag_number}</span></td>`
    str += `<td class="phone-item"><span class="author">${author}</span></
    td>`
    str += `<td class="phone-item"><span class="author">${author}</span></
    td>`
    str += '<td class="phone-item"><span class="group">root</span></td>';
    str += `<td class="phone-item">${data_date}</td>`
    
    str += "<td>"
    for (let i = 0; i < data.categories.length; i++) {
        const category = data.categories[i];
        if (category != "") {
            str += `<a class="category-link" href="/categories/${category}/" rel="category">${i != data_categories.length - 1 ? category + "," : category}</a>`;
        }
    }
    str += "</td>"

    str += "<td>"
    for (let i = 0; i < data_tags.length; i++) {
        const tag = data_tags[i];
        if (tag != "") {
            str += `<a class="tag-link" href="/tags/${tag}/" rel="tag">${i != data_tags.length - 1 ? tag + "," : tag}</a>`;
        }
    }
    str += "</td>"

    str += `<td><a href="${data_url}" class="title">${data_title}</a></td>`
    str += "</tr>";
    return str;
}

const init = (datas, author) => {
    let str = '<table class="post-list">';
    datas.forEach(data => {
        str += wrap_html(data, author)
    })
    str += '</table>'
    return str
}

var searchFunc = function(path, search_id, content_id, author) {
    const $resultContent = document.getElementById(content_id);
    const $ql = document.getElementById("query-language");
            
    if ($resultContent == undefined) {
        return;
    }
    'use strict';
    $.ajax({
        url: path,
        dataType: "xml",
        success: function( xmlResponse ) {
            // get the contents from search data
            const datas = $( "entry", xmlResponse ).map(function() {
                return {
                    title: $( "title", this ).text().trim(),
                    url: $( "url" , this).text().trim(),
                    categories: $( "categories", this).text().trim().split("\n").map(c => c.trim()),
                    tags: $("tags", this).text().trim().split("\n").map(tag => tag.trim()),
                    date: $("date", this).text().trim(),
                    tag_number: $("tag-number", this).text()
                };
            }).get();

            // 第一次加载全数据
            const html = init(datas, author)
            $resultContent.innerHTML = html;

            const $input = document.getElementById(search_id);
			if (!$input) return;
            
            if ($("#local-search-input").length > 0) {
                $input.addEventListener('input', function () {
                    let str = '<table class="post-list">';
                    let keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                    
                    if ($ql != undefined) {
                        $ql.textContent = `WHERE title LIKE %${keywords}% OR tags in (${keywords}) OR category in (${keywords})`
                    }

                    $resultContent.innerHTML = "";
                    if (this.value.trim().length <= 0) {
                        $resultContent.innerHTML = html;
                        $ql.textContent = "";
                        return;
                    }

                    datas.forEach(function (data) {
                        let isMatch = true;
                        if (!data.title || data.title.trim() === '') {
                            data.title = "Untitled";
                        }
                        const data_title = data.title.trim().toLowerCase();
                        const data_tags = data.tags;
                        const data_categories = data.categories;
                        let index_title = -1;
                        let tag_catch = false;
                        let category_catch = false;
                        // hello world
                        keywords.forEach(function (keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            if (index_title < 0) {
                                isMatch = false;
                            }
                            for (let tag of data_tags) {
                                tag = tag.toLowerCase();
                                if (tag.includes(keyword)) {
                                    tag_catch = true;
                                    break;
                                }
                            }
                            for (let category of data_categories) {
                                category = category.toLowerCase();
                                if (category.includes(keyword)) {
                                    category_catch = true;
                                    break;
                                }
                            }
                        });
                        // show search results
                        if (isMatch || tag_catch || category_catch) {
                            str += wrap_html(data, author)
                        }
                    });
                    str += "</table>";
                    $resultContent.innerHTML = str;
                });
            }
        }
    });
}