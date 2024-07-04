async function follow_url(article_url){
    const url_response = await fetch(article_url);
    var text = await url_response.text();
    var parser = new DOMParser();
    var doc = await parser.parseFromString(text, "text/html");
    var page_headline = await doc.getElementsByClassName("article__hed article__hed--");
    try{
        var column_title = await doc.getElementsByClassName("article__rubric").item(0).innerHTML.trim();
        var page_dateline = await doc.getElementsByClassName("article__dateline").item(0).innerText.trim();
        var date_chunks = page_dateline.split(" ");
        page_dateline = date_chunks[0]+" "+date_chunks[1]+" "+date_chunks[2].slice(0,-4)
    }catch(TypeError){
        //TODO Add Logic for Podcast Episodes
        var column_title = "Podcast";
        var page_dateline = "";
        console.log("I think this one's a podcast");
    }
    //console.log(page_dateline)
    return [column_title, page_dateline];
}

async function get_advice(links){
    for (let i=0; i<links.length; i++){
        //iterate through links
        //TODO Make this cleaner by using getElementsByClassName
        if (links.item(i).className == "homepage-advice__side-by-side" ||links.item(i).className == "homepage-advice__stack"){
            var article_link = links.item(i).href;
            var article_data = await follow_url(article_link);
            var new_title = article_data[0] + ": " + article_data[1];
            links.item(i).innerText = new_title;
        }
    }
}
async function get_evergreen(document){
    var evergreen = document.getElementsByClassName("homepage-advice__evergreen");
    //console.log(evergreen.item(0).children.item(2).children)
    for (let i=0; i<evergreen.item(0).children.item(2).children.length; i++){
        console.log(evergreen.item(0).children.item(2).children.item(i));
        var old_headline=evergreen.item(0).children.item(2).children.item(i).outerText;
        var evergreen_json = evergreen.item(0).children.item(2).children.item(i).children.item(1).attributes.item(0).value;
        await read_json(evergreen_json);
    }
}
var all_links = document.links;
//TODO, add code to handle the big one in the middle and podcast episodes
get_advice(all_links);
get_evergreen(document);