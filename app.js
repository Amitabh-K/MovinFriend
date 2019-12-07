
//TO-DO 
//Create a function to style the retrieved numbers and parse them into a float
//The data that will not be graphed must be styled and displayed beautifly 

    $( document ).ready(function() {
//________________________________________________________________________________________>
 
        //All DOM Selectors 

        var employment, earnings,homeOwn, homeInc, uniInc;
        employment   = document.querySelector('#employment');
        earnings     = document.querySelector('#earnings');
        homeOwn      = document.querySelector('#home-own');
        homeInc      = document.querySelector('#house-inc'); 
        uniInc       = document.querySelector('#uni-inc');  
  
        //Crime
        var crimeIndx, nonViolent, violent, crimeReports, homicideVictims, homRate;

        crimeIndx       = document.querySelector('#crime');
        nonViolent      = document.querySelector('#non-violent');
        violent         = document.querySelector('#violent');
        crimeReports    = document.querySelector('#crime-reports');
        homicideVictims = document.querySelector('#homicide');
        homRate         = document.querySelector('#homicide-rate');
        
        const regions = ["Canada","Newfoundland and Labrador","Prince Edward Island","Nova Scotia","New Brunswick","Quebec","Ontario","Manitoba","Saskatchewan","Alberta","British Columbia","Yukon","Northwest Territories","Nunavut",];
   
        var province = regions.indexOf('Ontario');
        console.log(province);
            var query = "https://cors-anywhere.herokuapp.com/https://www150.statcan.gc.ca/n1/dai-quo/ssi/homepage/ind-all.json";
            $.ajax({
                url: query,
                method: "GET"
              })
              .then(function(response) {
                  var responseArr = response.results.indicators;
                  //Now you can obtain regional statistics
                  
                for(var i = 0; i<responseArr.length; i++){
                    //Weekly earnings
                    if(responseArr[i].registry_number == 3555 && responseArr[i].geo_code == province){
                        var provEarnings = responseArr[i].value.en.replace("$","");
                        provEarnings = parseFloat(provEarnings.replace(",",""));
                        
                        earnings.textContent = responseArr[i].value.en; 
                        
                    }
                    //weekly Earnings Canada
                    if(responseArr[i].registry_number == 3555 && responseArr[i].geo_code == 0){
                        var canadaEarnings = responseArr[i].value.en;
                        canadaEarnings = canadaEarnings.replace(",", "");
                        canadaEarnings = canadaEarnings.replace("$","");
                        canadaEarnings = parseFloat(canadaEarnings);   
                    }
                   
                   // Unemployment
                    if(responseArr[i].registry_number == 3587 && responseArr[i].geo_code == province){
                        employment.textContent = responseArr[i].value.en;
                       
                    }
                    //Home Ownership
                    if(responseArr[i].registry_number == 14429 && responseArr[i].geo_code == province){
                        homeOwn.textContent = responseArr[i].value.en; 
                      }
                    //Household Income
                    if(responseArr[i].registry_number == 14427 && responseArr[i].geo_code == province && responseArr[i].indicator_number == 1){
                        var provHomeInc = parseFloat(responseArr[i].value.en.replace(",", "").replace("$", ""));
                        homeInc.textContent = responseArr[i].value.en; 
                        console.log(provHomeInc);
                      }
                    //Household Income Canada
                    if(responseArr[i].registry_number == 14427 && responseArr[i].geo_code == 0 && responseArr[i].indicator_number == 1){
                       var caHomeInc = parseFloat(responseArr[i].value.en.replace(",", "").replace("$", ""));
                       console.log(caHomeInc);
                      }

                    //Uni graduates
                    if(responseArr[i].registry_number == 19104 && responseArr[i].geo_code == province && responseArr[i].indicator_number == 1){
                        var provUniInc = parseFloat(responseArr[i].value.en.replace(",", "").replace("$", ""));
                        uniInc.textContent = responseArr[i].value.en; 
                        console.log(provUniInc);
                    }
                    //Uni grads Canada
                    if(responseArr[i].registry_number == 19104 && responseArr[i].geo_code == 0 && responseArr[i].indicator_number == 1){
                        var caUniInc = parseFloat(responseArr[i].value.en.replace(",", "").replace("$", ""));
                         
                        console.log(caUniInc);
                    }
                    //Homicide Victims
                    if(responseArr[i].registry_number == 3435 && responseArr[i].geo_code == province && responseArr[i].indicator_number == 1){
                        homicideVictims.textContent = responseArr[i].value.en;
                    }
                    //Homicide rate 
                    if(responseArr[i].registry_number == 3435 && responseArr[i].geo_code == province && responseArr[i].indicator_number == 2){
                        homRate.textContent = responseArr[i].value.en;
                    }
                    //Crime reports rate
                    if(responseArr[i].registry_number == 4751 && responseArr[i].geo_code == province && responseArr[i].indicator_number == 2){
                        crimeReports.textContent = responseArr[i].value.en;
                    }
                    //Crime Index
                    if(responseArr[i].registry_number == 4751 && responseArr[i].geo_code == province && responseArr[i].indicator_number == 1){
                        var provinceCrime = parseFloat(responseArr[i].value.en);
                        crimeIndx.textContent = provinceCrime;
                    }
                    //Crime Index Canada
                    if(responseArr[i].registry_number == 4751 && responseArr[i].geo_code == 0 && responseArr[i].indicator_number == 1){
                        var canadaCrime = parseFloat(responseArr[i].value.en);
               
                    }
                    //Violent Crime Index 
                    if(responseArr[i].registry_number == 4751 && responseArr[i].geo_code == province && responseArr[i].indicator_number == 3){
                        var provinceViolent = parseFloat(responseArr[i].value.en);
                        violent.textContent = provinceViolent;
                    }
                    //Canada Violent
                    if(responseArr[i].registry_number == 4751 && responseArr[i].geo_code == 0 && responseArr[i].indicator_number == 3){
                        var canadaViolent = parseFloat(responseArr[i].value.en);
                       
                    }
                    //Non Violent Crime Index
                    if(responseArr[i].registry_number == 4751 && responseArr[i].geo_code == province && responseArr[i].indicator_number == 5){
                        var provinceNonViolent = parseFloat(responseArr[i].value.en);
                        nonViolent.textContent = provinceNonViolent;
                    }
                    //Canada Non Violent
                    if(responseArr[i].registry_number == 4751 && responseArr[i].geo_code == 0 && responseArr[i].indicator_number == 3){
                        var canadaNonViolent = parseFloat(responseArr[i].value.en);
                       
                    }
                }
                //Weekly Earnings Graph 
                var provincialEarning = {
                    x: ['Weekly Earnigns'],
                    y: [provEarnings],
                    name: 'Regional',
                    marker:{
                        color:'#6699cc',
                        opacity: 0.5,
                      },
                    type: 'bar',
                  };
                  
                  var countryEarning = {
                    x: ['Weekly Earnings'],
                    y: [canadaEarnings],
                    name: 'Country',
                    marker:{
                        color: ['#cc9966'],
                        opacity: 0.5
                      },
                    type: 'bar'
                  };
                  
                  var data = [provincialEarning, countryEarning];
                  
                  var layout = {barmode: 'group',
                            title: 'Individual Weekly Earning',
                            yaxis: {range: [700, 1200]},
                            paper_bgcolor: '#faf0e6',
                            plot_bgcolor:  '#faf0e6'
                            };
                  
                Plotly.newPlot('weekly-earnings', data, layout);
                //Yearly Income Graph
                var provincialIncome = {
                    x: ['Household', 'University Graduates'],
                    y: [provHomeInc, provUniInc],
                    name: 'Regional',
                    marker:{
                        color: ['#6699cc', '#8cb3d9']
                      },
                    type: 'bar'
                  };
                  
                  var countryIncome = {
                    x: ['Household', 'University Graduates'],
                    y: [caHomeInc, caUniInc],
                    name: 'Country',
                    marker:{
                        color: ['#cc9966', '#d9b28c']
                      },
                    type: 'bar'
                  };
                  
                  var data = [provincialIncome, countryIncome];
                  
                  var layout = 
                            {
                                barmode: 'group',
                                title: 'Regional and Country-Wide Income Comparison',
                                xaxis: {
                                    tickangle: -45
                                  },
                                yaxis: {range: [40000, 80000]},
                                paper_bgcolor: '#faf0e6',
                                plot_bgcolor:  '#faf0e6'
                            };

                    Plotly.newPlot('yearly-income', data, layout);

                //CRIME INDEX GRAPH
                  var provincialData = {
                      x: ['Crime Index', 'Violent', 'Non-violent'],
                      y: [provinceCrime, provinceViolent, provinceNonViolent],
                     
                      name: 'Regional',
                      marker:{
                        color: ['#39B7CD', '#C3E4ED', '#9AC0CD']
                      },
                      type: 'bar'
                    
                    };
                  
                  var countryData = {
                    x: ['Crime Index', 'Violent', 'Non-violent'],
                    y: [canadaCrime, canadaViolent, canadaNonViolent],
                    
                    name: 'Country Average',
                    marker:{
                        color: ['#ffa500', '#ffc04c', '#ffb732'],
                        opacity: [0.7,0.7,0.7]
                      },
                    type: 'bar'
                  };

                  var data = [provincialData, countryData];
                  var layout = {barmode: 'group',
                                title: 'Regional and Country-Wide Crime Comparisons',
                                xaxis: {
                                    tickangle: -45
                                  },
                                paper_bgcolor: '#faf0e6',
                                plot_bgcolor:  '#faf0e6' 
                                };
                  Plotly.newPlot('crime-graph', data, layout);

                console.log(canadaCrime,canadaViolent, canadaNonViolent);
                console.log(provinceCrime, provinceViolent, provinceNonViolent);
                console.log(response);
             });

             $('#ent-button').click(function(){
              var wquery;

              wquery = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=CA&city=Toronto&classificationName=music&apikey=GwTwXQi9DbfiHSen5gClF1DLybWdAUhj`;

              $.ajax({
                 url: wquery,
                 method: "GET"
               }).then(function(res){
                  for(var x = 0; x < 3; x++){
                    var event = res._embedded.events[x].name;
                    var eventDate = res._embedded.events[x].dates.start.localDate;
                    var eventTime = res._embedded.events[x].dates.start.localTime;
                    var eventImg = res._embedded.events[x].images[x].url;
                    var eventPurchase = res._embedded.events[x].url;

                    var html = ` <div id="all-events" class="four columns">
                                 <div class="event-name">%name%</div>
                                 <div class="event-date">%date%</div>
                                 <a class="button button-primary" href="%buy%">Tickets</a>
                                 <div class="event-img">
                                   <img  src="%pic%" width="95%" height="auto">
                                 </div>
                               </div>`;
                     var newHtml = html.replace("%name%",event).replace("%date%",`${eventDate} ${eventTime}`).replace("%pic%",eventImg);
                     $('#tickets-events').append(newHtml);           
                  }
                  
                  // console.log(res._embedded.events[0]);
                  // console.log(res._embedded.events[0].name);
                 
                  // console.log(res._embedded.events[0].dates.start.localDate);
                  // console.log(res._embedded.events[0].dates.start.localTime);
                  // console.log(res._embedded.events[0].images[0].url);
                     
                 });
            });

             
             

    });



         // ************WORKS EXCEPT FOR CITIES COMMON TO OTHER COUNTRIES */
        // var city = "Calgary";
      
        // var queryURL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${city}&format=json&callback=wikiCallback`;
        // //Wikipedia URL to display statistics based on the city being searched. Only a basic description
        // $.ajax({
        //     url: queryURL,
        //     dataType: "jsonp",
        //     method: "GET"
        //   })
        //     // We store all of the retrieved data inside of an object called "response"
        //     .then(function(response) {
        //        for(var i = 0; i < response[2].length;i++){
        //            if(response[2][i].toLowerCase().includes("town") || response[2][i].toLowerCase().includes("city")){
        //                if(response[2][i].includes('(listen)')){
        //                    var cleanresponse = response[2][i].replace('(listen)','');
        //                    console.log(cleanresponse);
        //                     break;
        //                }
        //              console.log(response[2][i]);
        //              break;
        //            } else {
        //                console.log(city);
        //            }
        //        }
                
        //     }); 


        // Regional DataStructures that will be placed in local storage
             // const regionalData = [
        //         {"registry number": 3605}, //--->Housing Price Indexretrieve "title" and "growth_rate[growth][en]"
        //         {"registry number": 3587}, //--->Unemployment Rate retrieve "title" and "value"
        //         {"registry number": 3555}//----->Weekly Earnings retrieve "title" and "value"
        // ];
        // IndexOf("<Region>") ==> geo-code

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
                <a href="${latestNews[i].url}" class="btn p-1">Read more</a>         
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
          

          var elementP4 = $("<p>");                    
  
          $(".search-result").append(elementP4);

          
  
          //set variable for UV index API call
  
          $( "#searchbtn" ).click(function() {
              $( ".search-result" ).empty();
            });
  
      })
   
  //
  
  })
  $("#submit-btn").click(function(){
    $("#main").show();
  });
  

});


var coll = document.getElementsByClassName("toggler");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}



