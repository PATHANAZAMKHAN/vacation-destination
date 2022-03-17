


(function () {

    "use strict"; 

    function changeHeading(){
        let WishListContainer = document.getElementById('destinations_container');
        // console.log(WishListContainer)

        if (WishListContainer.children.length === 0) {
            // console.log("if executed");
            document.getElementById('title').innerHTML = "Enter Destination Details";
        }
        else {
            // console.log("else executed");
            document.getElementById('title').innerHTML = "My WishList";
        }
    }

    changeHeading();

    let detailsForm = document.querySelector("#destination_details_form");

    detailsForm.addEventListener('submit', handleFormSubmit)

    function handleFormSubmit(event) {
        event.preventDefault();

        let destname = event.target.elements['name'].value;
        let destlocation = (event.target.elements['location'].value).split(" ").join("");
        //destlocation = destlocation.split(" ").join("");
        // console.log(destlocation)
        let destphoto = event.target.elements['photo'].value;
        let destdesc = event.target.elements['description'].value;

        for (let i = 0; i < detailsForm.length; i++) {
            detailsForm.elements[i].value = "";
        }

        let destcard = createDestinationCard(destname, destlocation, destphoto, destdesc);

        document.getElementById('destinations_container').appendChild(destcard);

        changeHeading();

    }

    function createDestinationCard(name, location, photoURL, description) {

        let card = document.createElement('div');
        card.className = "card";

        let img = document.createElement('img');


        //let constantPhotoUrl = "signpost.jpg";

        if (photoURL.length === 0) {
            require("dotenv").config();
            let API_KEY = process.env.APIKEY;

            const url = `https://api.unsplash.com/search/photos/?query=${API_KEY}` + name + "&per_page=1&client_id=";

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        alert(response.status);
                    }
                })
                .then(data => {
                    if (data.total === 0) {
                        img.setAttribute('src', "");
                        img.setAttribute('alt', " Not found, make sure you spelled the image name correctly!");
                    }
                    else {
                        let constantPhotoUrl = data.results[0].urls.regular;
                        img.setAttribute('alt', name);
                        img.setAttribute('src', constantPhotoUrl);
                    }
                })

        }
        else {
            img.setAttribute('src', photoURL);
        }

        card.appendChild(img);
        //console.log(card);

        let cardbody = document.createElement('div');
        cardbody.className = "card-body";

        let cardTitle = document.createElement("h3");
        cardTitle.innerText = name;
        cardbody.appendChild(cardTitle);

        let cardSubtitle = document.createElement("h4");
        cardSubtitle.innerText = location;
        cardbody.appendChild(cardSubtitle);

        if (description.length !== 0) {
            var cardText = document.createElement('p');
            cardText.className = "card-text";
            cardText.innerText = description;
            cardbody.appendChild(cardText);
        }

        var cardDeleteButton = document.createElement("button");
        cardDeleteButton.innerText = "Remove";

        cardDeleteButton.addEventListener('click', removeDestination);
        cardbody.appendChild(cardDeleteButton);

        card.appendChild(cardbody);

        return card;
    }

    function removeDestination(event) {
        let card = event.target.parentElement.parentElement;
        card.remove();

        changeHeading();
    }

    

})()