
//TO-DO 
//Create a function to style the retrieved numbers and parse them into a float
//The data that will not be graphed must be styled and displayed beautifly 

    $( document ).ready(function() {
//________________________________________________________________________________________>
        var cityInput = document.querySelector('#city');
        var provinceInput = document.querySelector('#province');
        //All DOM Selectors(Naz)
         
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
   
        var province;
        $('#main').css("display","none");
       
        $('#submit-btn').on('click', function(e){
            e.preventDefault();
            $('#tickets-events').html("");

            province = regions.indexOf(provinceInput.value);
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
                        opacity: 0.9,
                      },
                    type: 'bar',
                  };
                  
                  var countryEarning = {
                    x: ['Weekly Earnings'],
                    y: [canadaEarnings],
                    name: 'Country',
                    marker:{
                        color: ['#cc9966'],
                        opacity: 0.9
                      },
                    type: 'bar'
                  };
                  
                  var data = [provincialEarning, countryEarning];
                  
                  var layout = {barmode: 'group',
                            width: "450",
                            height: "330",
                            title: 'Individual Weekly Earning',
                            yaxis: {range: [700, 1200]},
                            paper_bgcolor: '#faf0e6',
                            plot_bgcolor:  '#faf0e6',  
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
                                yaxis: {range: [40000, 80000]},
                                paper_bgcolor: '#faf0e6',
                                plot_bgcolor:  '#faf0e6',
                                width: "450",
                                height: "330"
                               
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
                        opacity: [0.9,0.9,0.9]
                      },
                    type: 'bar'
                  };

                  var data = [provincialData, countryData];
                  var layout = {barmode: 'group',
                                title: 'Regional and Country-Wide Crime Comparisons',
                                paper_bgcolor: '#faf0e6',
                                plot_bgcolor:  '#faf0e6',
                                width: "450",
                                height: "330" 
                                };
                  Plotly.newPlot('crime-graph', data, layout);
                  $('#main').css("display", "block");
             
             });
             var wquery;
             var cityQuery = cityInput.value;
             wquery = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=CA&city=${cityQuery}&classificationName=music&apikey=GwTwXQi9DbfiHSen5gClF1DLybWdAUhj`;

             $.ajax({
                url: wquery,
                method: "GET"
              }).then(function(res){
                 for(var x = 0; x < 6; x++){
                   var event = res._embedded.events[x].name;
                   var eventDate = res._embedded.events[x].dates.start.localDate;
                   var eventTime = res._embedded.events[x].dates.start.localTime;
                   var eventImg = res._embedded.events[x].images[x].url;
                   var eventPurchase = res._embedded.events[x].url;

                   var html = ` <div id="all-events" class="three columns">
                                <div class="event-name">%name%</div>
                                <div class="event-date">%date%</div>
                                <a class="button button-primary" href="%buy%" rel="noopener noreferrer" target="_blank">Tickets</a>
                                <div class="event-img">
                                  <img  src="%pic%" width="250px" height="150px">
                                </div>
                              </div>`;
                    var newHtml = html.replace("%name%",event).replace("%date%",`${eventDate} ${eventTime}`).replace("%buy%",eventPurchase).replace("%pic%",eventImg);
                    $('#tickets-events').append(newHtml);         
                 }
                 
                 
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

 


    var $body = $('body');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');


    // clear out old data before new request
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;




    

$('#form-container').submit(loadData);

*/




// above not working







