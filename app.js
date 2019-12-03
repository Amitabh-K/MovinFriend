

    $( document ).ready(function() {
//________________________________________________________________________________________>
      // ************WORKS EXCEPT FOR CITIES COMMON TO OTHER COUNTRIES */
        var city = "Calgary";
      
        var queryURL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${city}&format=json&callback=wikiCallback`;
        //Wikipedia URL to display statistics based on the city being searched. Only a basic description
        $.ajax({
            url: queryURL,
            dataType: "jsonp",
            method: "GET"
          })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
               for(var i = 0; i < response[2].length;i++){
                   if(response[2][i].toLowerCase().includes("town") || response[2][i].toLowerCase().includes("city")){
                       if(response[2][i].includes('(listen)')){
                           var cleanresponse = response[2][i].replace('(listen)','');
                           console.log(cleanresponse);
                            break;
                       }
                     console.log(response[2][i]);
                     break;
                   } else {
                       console.log(city);
                   }
               }
                
            }); 


        //Regional DataStructures that will be placed in local storage
        //IndexOf("<Region>") ==> geo-code
        // const regions = ["Canada","Newfoundland and Labrador","Prince Edward Island","Nova Scotia","New Brunswick","Quebec","Ontario","Manitoba","Saskatchewan","Alberta","British Columbia","Yukon","Northwest Territories","Nunavut",];
        // const regionalData = [
        //         {"registry number": 3605}, //--->Housing Price Indexretrieve "title" and "growth_rate[growth][en]"
        //         {"registry number": 3587}, //--->Unemployment Rate retrieve "title" and "value"
        //         {"registry number": 3555}//----->Weekly Earnings retrieve "title" and "value"
        // ];
      
        //     var query = "https://cors-anywhere.herokuapp.com/https://www150.statcan.gc.ca/n1/dai-quo/ssi/homepage/ind-econ.json";
        //     $.ajax({
        //         url: query,
        //         method: "GET"
        //       })
        //       .then(function(response) {
        //           //Now you can obtain regional statistics
        //         console.log(response);
                 
        //      }); 
//______________________________________________________________________________________>
    });