var setScrollAnimation = function () {
    $("a").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
}

var getPageName = function (id) {
    if (id == "item_grid") {
        return "page_grid.html";
    } else if (id == "item_squareink") {
        return "page_squareink.html";
    } else if (id == "item_imdb") {
        return "page_imdb.html";
    } else if (id == "item_natureforce") {
        return "page_natureforce.html";
    }else{
        return null;
    }
}

var setModal = function () {
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    $(".carousel-item").click(function () {
        modal.style.display = "block";
        span.style.display = "block";
        var pageName = getPageName(this.id);
        // document.getElementById("projectitem").innerHTML='<object type="text/html" data="page-grid.html" ></object>';
        if (pageName != null) {
            $("#projectitem").load(pageName);
            $("#myModal").scrollTop(0);
            $("#myModal").addClass("scrollbar scrollbar-deep-blue");

            // if(pageName=="page_grid.html"){
                // alert(pageName);
            // }
        }
    });

    $(".close").click(function () {
        modal.style.display = "none";
        span.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

$(this).scrollTop(0);
setScrollAnimation();
setModal();