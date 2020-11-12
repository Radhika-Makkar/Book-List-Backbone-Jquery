var BookModel = Backbone.Model.extend();

const app = $("#bottom");
// const container = document.createElement("div");
const container = $("<div class='row'></div><br>");
// container.setAttribute("class", "row");
app.append(container);

var BooksCollection = Backbone.Collection.extend({
  model: BookModel,
});
//As soon as window gets loaded form should not be displayed
window.onload = function () {
  $("#top2").hide();
};
var count = 0;
var ScreenView = Backbone.View.extend({
    //The body element in which all elements are displayed
    el: "body",
    initialize : function(){
    
        formView = new FormView();
         listView=new ListView();
        
    },
 });

    var FormView = Backbone.View.extend({
      el:"body",
        events:
    
    {
"click button#ADDBOOK" :"addbook",

  },
  addbook:function(e)
  {
      // console.log("hi");
      e.preventDefault();
      $("#top1").hide();
      $("#top2").show();
      $("#bottom").hide();
  }
  });
  var ListView = Backbone.View.extend({
    initialize : function(){
    
      cardView = new CardView();
      pageView = new PageView();

    },

    el:"body",
    events: {
      "click button#btnadd": "addData",
    },
    addData: function (e) {
      e.preventDefault();
      var newBook = new BookModel();
      newBook.set("TITLE", $("#TITLE").val());
      newBook.set("AUTHOR", $("#AUTHOR").val());
      newBook.set("ISBN", $("#ISBN").val());
      newBook.set("IMAGE", $("#IMAGE").val());
      if (
        $("#TITLE").val() === "" ||
        $("#AUTHOR").val() === "" ||
        $("#ISBN").val() === "" ||
        $("#IMAGE").val() === "" 
      ) {
        const div = $("<div/>", {
          class: "alert alert-danger",
          text: "Please fill in all details",
        });
  
        const container = $("#topcontainer");
        const form = $("#book-form");
        div.insertBefore(form);
        setTimeout(() => $(".alert").remove(), 2000);
      } else {
        $("#TITLE").val("");
        $("#AUTHOR").val("");
        $("#ISBN").val("");
        $("#IMAGE").val("");
        BookCollection.reset();
        BookCollection.add(newBook);
        const div = $("<div/>", {
          class: "alert alert-success",
          text: "Book Added Successfully",
        });
  
        const container = $("#topcontainer");
        const form = $("#book-form");
        div.insertBefore(form);
  
        //The alert should  Vanish in 2 seconds
        setTimeout(() => $(".alert").remove(), 2000);
        cardView.render();
      }
    },
  });
  var PageView = Backbone.View.extend({
    el:"body",
    events:
    {
      "click #bottom":"ViewBookFunction"
    },
    ViewBookFunction:function(e)
    {
      var enlarged = $("#enlarged");
    e2 = e.target.parentElement;
    $("#top1").hide();
   $("#bottom").hide();

    const back = $("<button/>", {
      class: "btn btn-success btn-lg",
      text: "Back",
      id: "btn_back",
    });
    const edit = $("<button/>", {
      class: "btn btn-info btn-lg",
      text: "EDIT",
      id: "EDIT",
    });
    const save = $("<button/>", {
      class: "btn btn-success btn-lg",
      text: "SAVE",
      id: "SAVE",
    });
    const img = e2.querySelector("#four").src;

    var title = e2.querySelector("#one").innerHTML;
    const h = $("<h1/>", {
      class: "display-4",
      html: title,
      id: "h",
    });

    var author = e2.querySelector("#two").innerHTML;
    const h1 = $("<h1/>", {
      class: "display-4",
      html: author,
      id: "h1",
    });
    var isbn = e2.querySelector("#three").innerHTML;
    // h2.innerHTML = isbn;
 const h2 = $("<h1/>", {
      class: "display-4",
      html: isbn,
      id: "h2",
    });

    const image = $("<img/>", {
       src:img,
        id: "h3",
      });
    $("#save").hide();

    const cardBig = $("<div/>", {
      class:"card",
       id: "cardBig",
     });
     const cardBig1 = $("<div/>", {
      class:"card-header",
       id: "cardBig",
     });
     cardBig1.append(image);
     const cardBig2 = $("<div/>", {
      class:"card-body",
       });
    // cardBig2.setAttribute("class", "card-body");
    cardBig2.append(h);
    cardBig2.append(h1);
    cardBig2.append(h2);
    cardBig2.append(edit);
    cardBig2.append(save);
    cardBig2.append(back);

    cardBig.append(cardBig1);
    cardBig.append(cardBig2);

    enlarged.append(cardBig);

    $("#EDIT").on("click", (e) => {
        console.log("hello");
        // console.log(e.target);
      $("body").addClass("editing");
      $("#EDIT").hide();
      $("#SAVE").show();
// console.log($("#h").html());
      var title =$("#h").html().substring(6);
      author = $("#h1").html().substring(7);
      isbn = $("#h2").html().substring(5);

      $("#h").html(
        '<input type="text" class="form-control title-update" value="' +
          title +
          '">'
      );
      $("#h1").html(
        '<input type="text" class="form-control author-update" value="' +
          author +
          '">'
      );

      $("#h2").html(
        '<input type="text" class="form-control isbn-update" value="' +
          isbn +
          '">'
      );
    });
    $("#SAVE").on("click", (e) => {
    $("body").removeClass("editing");

      $("#SAVE").hide();
      $("#EDIT").show();

      $("#h").html (
        `Title: ` + $(".title-update").val());

      $("#h1").html(
        `Author: ` + $(".author-update").val());
      $("#h2").html(
        `Isbn: ` + $(".isbn-update").val());
      const a = $("#h").html();
      const b = $("#h1").html();
      const c = $("#h2").html();
   
      //To reflect update made in enlarged screen back to card
      $("#one").html(`Title: ` + a.substring(8));
      $("#two").html( `Author: ` + b.substring(8));
      $("#three").html( `Isbn: ` + c.substring(8));
    });
    //Capturing event of clicking back button inside the enlarged view

    $("#btn_back").on("click", (e) => {
      var top1 = $("#top1");
      var bottom = $("#bottom");
      if ($("#top1").hide()) {
    //     // top1.style.display = "block";
        $("#top1").show();
        $("#bottom").show();
        // $("#enlarged").hide();
      }
        // bottom.style.display = "block";
      
      enlarged.html("");
    });
  }
});


  var CardView = Backbone.View.extend({
   el:"body",
   render:function(e)
   {
    var bottom = $(this.el).find("#bottom");
    var card = $("<div/>", {
      class: "card col-sm-12 col-md-4 col-lg-3",
      style: "padding:20px",
      style: "margin:20px",
      style: "border-width:10px",
    });
    _.each(BookCollection.models, function (m, i, l) {
      const img = $("<img>", {
        id: "four",
        width: "100%",
        height: "100",
        src: m.get("IMAGE"),
      });
      const h1 = $("<p/>", {
        id: "one",
        text:`TITLE:  ` +m.get("TITLE"),
      });
      const h2 = $("<p/>", {
        id: "two",
        text:`AUTHOR:  `+ m.get("AUTHOR"),
      });
      const h3 = $("<p/>", {
        id: "three",
        text:`ISBN:  ` +m.get("ISBN"),
      });
      const b = $("<button/>", {
        id: "VIEWBOOK",
        class: "btn btn-primary",
        text: "View Book",
      });
      card.append(img);
      card.append(h1);
      card.append(h2);
      card.append(h3);
      card.append(b);
      container.append(card);

      count = count + 1;
      console.log(count);
      if (count > 0) {
        $("#headCount").remove();
      }
   })
  }});
   //Capturing event on form
$("#top2").on("click", (e) => {
  c = $("#card");
  x = $("#top1");
  var top2 = $("#top2");

  if (e.target.innerHTML === "Back") {
    e.preventDefault();
    console.log("back clicked");
$("#top1").show();
    // top2.style.display = "none";
    $("#top2").hide();
    // $("#bottom").show();
    // bottom.style.display = "block";
     document.querySelector("#bottom").style.display="block";
  }
});
    // render: function (e) {
    
    //   var bottom = $(this.el).find("#bottom");
    //   var card = $("<div/>", {
    //     class: "card col-sm-12 col-md-4 col-lg-3",
    //     style: "padding:20px",
    //     style: "margin:20px",
    //     style: "border-width:10px",
    //   });
    //   _.each(BookCollection.models, function (m, i, l) {
    //     const img = $("<img>", {
    //       id: "four",
    //       width: "100%",
    //       height: "100",
    //       src: m.get("IMAGE"),
    //     }); 
    //     const h1 = $("<p/>", {
    //       id: "one",
    //       text:`TITLE:  ` +m.get("TITLE"),
    //     });
    //     const h2 = $("<p/>", {
    //       id: "two",
    //       text:`AUTHOR:  `+ m.get("AUTHOR"),
    //     });
    //     const h3 = $("<p/>", {
    //       id: "three",
    //       text:`ISBN:  ` +m.get("ISBN"),
    //     });
    //     const b = $("<button/>", {
    //       id: "VIEWBOOK",
    //       class: "btn btn-primary",
    //       text: "View Book",
    //     });
    //     card.append(img);
    //   card.append(h1);
    //   card.append(h2);
    //   card.append(h3);
    //   card.append(b);
    //   container.append(card);

    //   count = count + 1;
    //   console.log(count);
    //   if (count > 0) {
    //     $("#headCount").remove();
    //   }
    // });



        var BookCollection = new BooksCollection();
//The View Object and Pass Collection to it
var BooksView = new ScreenView({
  collection: BookCollection,
});
//Subscribe to the 'add' event of the collection
//When Collection changed
BookCollection.on("add", function () {
//   BooksView.render();
});