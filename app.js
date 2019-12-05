//Add click events to the toggler icons so that they show up and/or hid depending on our need
//https://open.canada.ca/data/en/dataset/3d3ef740-4f02-4e58-9592-357c290666c2 --> crime datasets
//https://www.statcan.gc.ca/eng/developers
/*
var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=cs&' +
          'apiKey=7dc0f278dd4541128c558c191e758ae5';
var req = new Request(url);
fetch(req)
    .then(function(response) {
        console.log(response.json());
    })

    */
   
function loadData() {

    var $body = $('body');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');


    // clear out old data before new request
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;




    // load nytimes
    var nytimesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${cityStr}&api-key=hnBAPj1FFGUSX5ULP7XmAzyZmoAbiwgA`;


    $.getJSON(nytimesUrl, function(data){

        $nytHeaderElem.text('Local News Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                '<p>' + article.snippet + '</p>'+
            '</li>');
        };

    }).error(function(e){
        $nytHeaderElem.text('Local News Articles Could Not Be Loaded');
    });


    return false;
};

$('#form-container').submit(loadData);



