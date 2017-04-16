var mongoose = require("mongoose");
var Comment = require("./models/comment");
var Campground = require("./models/campground");

var data = [
        {name : "Salmon Creek", image : "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg", description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod ex velit, a egestas purus porttitor mollis. Proin eros purus, tempor vitae risus at, varius iaculis tortor. Sed eget arcu rutrum, elementum felis id, accumsan arcu. Cras cursus, lacus nec blandit placerat, augue quam varius massa, eu mollis dolor tellus feugiat ante. Sed tincidunt varius sem, vel tristique velit pretium vitae. Donec sapien sem, consequat at tellus quis, tincidunt placerat lectus. Nunc mattis urna vel neque malesuada, eget pulvinar ante tempus. "},
        {name : "High Garden", image : "https://cdn.pixabay.com/photo/2017/03/02/02/23/camp-hope-2110256__340.jpg", description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod ex velit, a egestas purus porttitor mollis. Proin eros purus, tempor vitae risus at, varius iaculis tortor. Sed eget arcu rutrum, elementum felis id, accumsan arcu. Cras cursus, lacus nec blandit placerat, augue quam varius massa, eu mollis dolor tellus feugiat ante. Sed tincidunt varius sem, vel tristique velit pretium vitae. Donec sapien sem, consequat at tellus quis, tincidunt placerat lectus. Nunc mattis urna vel neque malesuada, eget pulvinar ante tempus. "},
        {name : "Westros", image:"https://cdn.pixabay.com/photo/2016/12/27/22/52/morning-1935072__340.jpg", description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod ex velit, a egestas purus porttitor mollis. Proin eros purus, tempor vitae risus at, varius iaculis tortor. Sed eget arcu rutrum, elementum felis id, accumsan arcu. Cras cursus, lacus nec blandit placerat, augue quam varius massa, eu mollis dolor tellus feugiat ante. Sed tincidunt varius sem, vel tristique velit pretium vitae. Donec sapien sem, consequat at tellus quis, tincidunt placerat lectus. Nunc mattis urna vel neque malesuada, eget pulvinar ante tempus. "},
        {name : "WorldCup", image : "https://cdn.pixabay.com/photo/2016/03/09/12/06/night-sky-1246279__340.jpg", description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod ex velit, a egestas purus porttitor mollis. Proin eros purus, tempor vitae risus at, varius iaculis tortor. Sed eget arcu rutrum, elementum felis id, accumsan arcu. Cras cursus, lacus nec blandit placerat, augue quam varius massa, eu mollis dolor tellus feugiat ante. Sed tincidunt varius sem, vel tristique velit pretium vitae. Donec sapien sem, consequat at tellus quis, tincidunt placerat lectus. Nunc mattis urna vel neque malesuada, eget pulvinar ante tempus. "},
        {name : "Shibu Chan", image : "https://cdn.pixabay.com/photo/2017/02/09/04/11/bonfire-2051093__340.png", description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod ex velit, a egestas purus porttitor mollis. Proin eros purus, tempor vitae risus at, varius iaculis tortor. Sed eget arcu rutrum, elementum felis id, accumsan arcu. Cras cursus, lacus nec blandit placerat, augue quam varius massa, eu mollis dolor tellus feugiat ante. Sed tincidunt varius sem, vel tristique velit pretium vitae. Donec sapien sem, consequat at tellus quis, tincidunt placerat lectus. Nunc mattis urna vel neque malesuada, eget pulvinar ante tempus. "},
        {name : "Tree", image:"https://cdn.pixabay.com/photo/2016/11/03/16/59/tree-1795206__340.jpg", description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod ex velit, a egestas purus porttitor mollis. Proin eros purus, tempor vitae risus at, varius iaculis tortor. Sed eget arcu rutrum, elementum felis id, accumsan arcu. Cras cursus, lacus nec blandit placerat, augue quam varius massa, eu mollis dolor tellus feugiat ante. Sed tincidunt varius sem, vel tristique velit pretium vitae. Donec sapien sem, consequat at tellus quis, tincidunt placerat lectus. Nunc mattis urna vel neque malesuada, eget pulvinar ante tempus. "},
        {name : "Looks Cool", image: "https://cdn.pixabay.com/photo/2016/03/09/12/06/night-sky-1246279__340.jpg", description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod ex velit, a egestas purus porttitor mollis. Proin eros purus, tempor vitae risus at, varius iaculis tortor. Sed eget arcu rutrum, elementum felis id, accumsan arcu. Cras cursus, lacus nec blandit placerat, augue quam varius massa, eu mollis dolor tellus feugiat ante. Sed tincidunt varius sem, vel tristique velit pretium vitae. Donec sapien sem, consequat at tellus quis, tincidunt placerat lectus. Nunc mattis urna vel neque malesuada, eget pulvinar ante tempus." } 
    ];

var SeedDb = function(){
  Campground.remove({}, function(err){
      if(err){console.log(err);}
      else{
          console.log("All campgrounds are removed");
          // Need to take care to run this code inside the callback function
          data.forEach(function(campground){
             Campground.create(campground,function(err,createdCampground){
                if(err){console.log(err);}
                else{
                    console.log("Added a new campground");
                    Comment.create({
                        text : "This place is awesome",
                        author : "Homer"
                    }, function(err, newlyCreatedCaomment){
                        if(err){console.log(err);}
                        else{
                            createdCampground.comments.push(newlyCreatedCaomment);
                            createdCampground.save();
                            console.log("Added a comment to the newly created Campground");
                        }
                    })
                }
             }); 
          });
      }
  })  
    
};

module.exports = SeedDb;