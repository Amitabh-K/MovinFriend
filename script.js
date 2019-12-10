$(document).ready(function(){
  
     // adding newus api wiht querry also API key
    $("#submit-btn").on("click",function(e){
      e.preventDefault();
      // defining variables
     var query = $("#city").val();
      // adding newus api wiht querry also API key
      var url = "https://newsapi.org/v2/everything?q="+query+"&sources=cbc-news&apiKey=7dc0f278dd4541128c558c191e758ae5";
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
                <div class="col-6">
                <h5>${latestNews[i].title}</h5>
                <img src="${latestNews[i].urlToImage}" class="responsive-img">
                <p>${latestNews[i].description}</p>
                <a href="${latestNews[i].url}" rel="noopener noreferrer" target="_blank" class="btn p-1">Read more</a>         
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
  
          var elementH3 = $("<h5>").text(name + " " + currentTime);
          elementH3.addClass("panel-heading text");
  
          // append element H3 to Div with classname = search result
  
          $(".search-result").append(elementH3);
          $(".search-result").append(iconImage);
  
          //Create a variable to store temperature data
          var tempF = response.main.temp;
  
          //Create an HTML element and assign temperature data to it
  
          var elementP1 = $("<p>").html("Temperature: " + tempF + "&#8457;");
  
          // append temperature data to Div with classname = search result
  
          $(".search-result").append(elementP1);
  
  
          //create a variable to store humidity date            
  
          $( "#submit-btn" ).click(function() {
              $( ".search-result" ).empty();
              $(".search-result").append(elementP3); 
            });
  
      })
   
  
  })


});







