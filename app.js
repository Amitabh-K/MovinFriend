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

*/




$(document).ready(function(){
    // adding newus api wiht querry also API key
    $("#submit-btn").on("click",function(e){
      e.preventDefault();
      // defining variables
      var query = $("#city").val();
      // adding newus api wiht querry also API key
      var url = "https://newsapi.org/v2/everything?q="+query+"&sortBy=popularity&apiKey=7dc0f278dd4541128c558c191e758ae5";
      // preventing page
      if(query !== ""){
        
        $.ajax({
          
          url: url,
          method: "GET",
          dataType: "json",
          
          beforeSend: function(){
            $("#loader").show();
          },
          
          compvare: function(){
            $("#loader").hide();
          },
          // handling response froim the api 
          success: function(news){
            var output = "";
            // creating var called latest news
            var latestNews = news.articles;
            
            for(var i in latestNews){
              //using backticks so that can write html w/o concatenation
              output +=`
                <div class="col-12 py-2 my1">
                <h5>${latestNews[i].title}</h5>
                <img src="${latestNews[i].urlToImage}" class="responsive-img">
                <p>Dated: ${latestNews[i].publishedAt}</p>
                <a href="${latestNews[i].url}" class="btn">Read more</a>               
                </div>
              `;
            }
             //till there is data 
            if(output !== ""){
              $("#newsResults").html(output);
               
              // once output is blank

            }else{            
              var noNews = `<div style='text-align:center; font-size:36px; margin-top:40px;'>This news isn't available. Sorry about that.<br>Try searching something else </div>`;
               $("#newsResults").html(noNews);
              M.toast({
                html: "No news for the City",
                
              });
            }
            
          },
          // handling error froim the api 
          error: function(){
             var internetFailure = `
             <div style="font-size:34px; text-align:center; margin-top:40px;">Please check your internet connection and try again.
             <img src="https://image.shutterstock.com/image-vector/system-failure-abstract-technology-background-600w-746163787.jpg" class="responsive-img">
             </div>`;
             
            $("#newsResults").html(internetFailure);
             M.toast({
                html: "We encountered an error, please try again",
                
              });
          }
          
          
        });
        
      }else{
        var missingVal = `<div style="font-size:34px; text-align:center; margin-top:40px;">Please enter any search term in the search engine</div>`;
        $("#newsResults").html(missingVal);
         M.toast({
                html: "Please enter search crieteria",
                classes: 'red'
              });
      }

    
    
    
    
      
      
    });

    

    $("#submit-btn").on("click", function (event) {
      event.preventDefault();
  
      var userInput = $("#city").val();
  
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial" + "&APPID=42289ea57481ffa0e2b1aa22ae9c2d55";
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function (response) {
          console.log(response);
          console.log(response.name);
          console.log(response.main.temp);
          console.log(response.main.humidity);
  
          var currentTime = moment().format('L');;
  
          //create a variable that store an icon code
  
          var iconCode = response.weather[0].icon;
          var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
          var iconImage = $("<img>").attr('src', iconUrl);
          iconImage.addClass("icon-image");
  
          // Create variable to store city name
          var name = response.name;
  
          // Create an HTML element to store variable city name
  
          var elementH3 = $("<p>").text(name + " " + currentTime);
          elementH3.addClass("title");
  
          // append element H3 to Div with classname = search result
  
          $(".search-result").append(elementH3);
          $(".search-result").append(iconImage);
  
          //Create a variable to store temperature data
          var tempF = response.main.temp;
  
          //Create an HTML element and assign temperature data to it
  
          var elementP1 = $("<p>").html("Temperature: " + tempF + "&#8457;");
  
          // append temperature data to Div with classname = search result
  
          $(".search-result").append(elementP1);
  
  
          //create a variable to store humidity data
  
          var humidity = response.main.humidity;
  
          // create a HTML element and assign humidity data to it
  
          var elementP2 = $("<p>").text("Humidity: " + humidity + "%");
  
          //  append humidity data to Div with classname = search result   
  
          $(".search-result").append(elementP2);
  
          //create a varialbe to store wind speed value
  
          var windSpeed = response.wind.speed;
  
          var elementP3 = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
  
          $(".search-result").append(elementP3);
  
          //set variable for UV index API call
  
          $( "#searchbtn" ).click(function() {
              $( ".search-result" ).empty();
            });
  
      })
  
  //
  
  })
  
  

});

