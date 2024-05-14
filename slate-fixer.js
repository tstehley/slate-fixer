async function get_new_headline(article_url){
    const url_response = await fetch(article_url);
    var text = await url_response.text()
    var parser = new DOMParser();
    var doc = await parser.parseFromString(text, "text/html");
    var new_headline = await doc.getElementsByClassName("article__hed article__hed--");
    try{
        var new_headline_text = await new_headline.item(0).childNodes.item(0).data;
    }catch(TypeError){
        var new_headline_text="Could Not Find Replacement Headline"
    }
    return new_headline_text
}

async function replace_headline(element){
    var headline_text = element.innerText;
    var article_url = element.href;
    const url_response = await fetch(article_url);
    var text = await url_response.text()
    var parser = new DOMParser();
    var doc = await parser.parseFromString(text, "text/html");
    var new_headline = await doc.getElementsByClassName("article__hed article__hed--");
    try{
        var new_headline_text = await new_headline.item(0).childNodes.item(0).data;
    }catch(TypeError){
        var new_headline_text="Could Not Find Replacement Headline"
    }
    console.log("replacing ", headline_text, "with ", new_headline_text)
    //replace old headline with new headline on the page (hopefully...)
    //I wonder if js has some kind of reference mechanic to make this easier
    element.innerText = new_headline_text;
    }


async function replace_advice_headlines(element_list){
    //console.log("replace advice headline")
    for(let i=0; i<element_list.length; i++){
        //console.log("list item ", i, " ", element_list.item(i).nodeName);
        if (element_list.item(i).nodeName == "A"){
            try{
                var old_headline = element_list.item(i).children.item(1).children.item(1).childNodes.item(0).data
                //console.log("old headline: ", old_headline)
                var edge_case = false
            }catch(TypeError){
                //console.log("type error")
                var old_headline = element_list.item(i).children.item(1).childNodes.item(0).firstChild.data
                //console.log("old headline:", old_headline)
                var edge_case = true
            }
            var article_url = element_list.item(i).href;
            var new_headline_text = await get_new_headline(article_url);
            if (edge_case == false){
                element_list.item(i).children.item(1).children.item(1).childNodes.item(0).data = new_headline_text;
            }
            else{
                element_list.item(i).children.item(1).childNodes.item(0).firstChild.data = new_headline_text
            }
        }
    }
}
async function replace_teaser_headlines(element_list){
    for (let i=0;i<element_list.length;i++){
        console.log(element_list.item(i))
        var old_headline = element_list.item(i).childNodes.item(3).textContent
        console.log("old headline: ", old_headline)
        var article_url = element_list.item(i).href
        var new_headline_text = await get_new_headline(article_url);
        console.log("replacing ", old_headline, "with ", new_headline_text)
        if(new_headline_text){
            try{
            element_list.item(i).childNodes.item(3).textContent = new_headline_text
            }catch{
                console.log("non-conforming element: ", element_list.item(i))
            }
        } else{
            element_list.item(i).childNodes.item(3).textContent = "Can't find headline"
        }
    }

}
async function handle_text(){
    //This is only a subset of the headlines I want to replace, I'll need to get the rest of them. For now, I'm happy
    //with this as a proof of concept.
    //var story_teasers = document.getElementsByClassName("story-teaser__headline");
    //var story_cards = document.getElementsByClassName("story-card__headline");
    //var advice_1 = document.getElementsByClassName("homepage-advice__a1-pull-quote")
    //var advice_2 = document.getElementsByClassName("homepage-advice__side-by-side")
    //var most_recent = document.getElementsByClassName("recent-stories-item")
    //var most_read =document.getElementsByClassName("most-engaged-teaser__link")
    //var culture_1 = document.getElementsByClassName("section-feed-two-column__card-link")
    //var culture_2 = document.getElementsByClassName("section-feed-two-column__teaser")
    //var tech_1 = document.getElementsByClassName("section-feed-three-column__card-link")
    //var tech_2 = document.getElementsByClassName("section-feed-three-column__teaser")
    var all_links = document.links
    console.log(all_links) //link at item.href, text at item.innerText
   for (let i=0; i<all_links.length; i++){
        var cur_class = all_links.item(i).className
        if (cur_class == "story-card__link" || cur_class == "related-story__link"){
            pass
            //replace_headline(all_links.item(i))
        }
        //console.log(all_links.item(i))
    //    console.log("class: ", all_links.item(i).className)
    //    console.log("parent: ", all_links.item(i).parentElement)
    //    console.log("innerText:", all_links.item(i).innerText)
    }
    //var human_1= document.getElementsByClassName("section-feed-four-column__card-link")
    //skipping asides and "more good advive" for now
    //var story_teasers = document.getElementsByClassName("story-teaser__cta");
    //next to do are the culture, politics, etc sections
    //replace_headlines(story_teasers)
    //replace_headlines(story_cards)
    //console.log(advice_2)
    //replace_advice_headlines(advice_2)
    //console.log("replacing most recent")
    //replace_advice_headlines(most_recent)
    //console.log("replacing most read")
    //replace_teaser_headlines(most_read)
    //console.log("replacing culture")
    //replace_teaser_headlines(culture_1) //Not working, seems to be putting it in the byline instead.
    //replace_teaser_headlines(culture_2)
}

document.body.style.border = "10px solid green";
var link_list = document.links;
//console.log(link_list)
handle_text()