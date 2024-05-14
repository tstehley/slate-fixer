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
        //console.log(date_chunks)
        page_dateline = date_chunks[0]+" "+date_chunks[1]+" "+date_chunks[2].slice(0,-4)
        //console.log(page_dateline)
    }catch(TypeError){
        //TODO Add Logic for Podcast Episodes
        var column_title = "Podcast?";
        var page_dateline = "IDK";
        console.log("I think this one's a podcast");
    }
    //console.log(page_dateline)
    return [column_title, page_dateline];
}

async function get_advice(links){
    for (let i=0; i<links.length; i++){
        //iterate through links
        //TODO Make this cleaner by using getElementsByClassName
        //console.log(links.item(i))
        if (links.item(i).className == "homepage-advice__side-by-side"){
            console.log("found");
            var article_link = links.item(i).href;
            console.log(links.item(i));
            var article_data = await follow_url(article_link);
            console.log(article_data);
            var new_title = article_data[0] + ": " + article_data[1];
            links.item(i).innerText = new_title;
            //console.log(links.item(i))
        }
    }
}
document.body.style.border = "20px solid red";
var all_links = document.links;
//console.log("EEEEAAAAOOOOOUUUU")
//TODO, add code to handle the big one in the middle and podcast episodes
get_advice(all_links);