document.addEventListener("DOMContentLoaded", function() {
    // Get all icon elements within .town-map
    let icons = document.querySelectorAll(".icon");
    let townMap = document.querySelector(".town-map");
    let closeButton = document.querySelector(".close");
    if (closeButton) { // Check if closeButton is not null
        closeButton.addEventListener('click', closeGallery);}

    // Function to check if two icons overlap
    function iconsOverlap(icon1, icon2) {
        let rect1 = icon1.getBoundingClientRect();
        let rect2 = icon2.getBoundingClientRect();
        return !(rect1.right < rect2.left ||
                 rect1.left > rect2.right ||
                 rect1.bottom < rect2.top ||
                 rect1.top > rect2.bottom);
    }

    // Function to check if an icon overlaps with any other icons
    function iconOverlapsOtherIcons(icon, otherIcons) {
        for (let otherIcon of otherIcons) {
            if (otherIcon !== icon && iconsOverlap(icon, otherIcon)) {
                return true;
            }
        }
        return false;
    }

    // Function to randomly position icons without overlapping
    function positionIcons() {
        icons.forEach(function(icon) {
            let iconRect = icon.getBoundingClientRect();
            let maxX = townMap.offsetWidth - iconRect.width;
            let maxY = townMap.offsetHeight - iconRect.height;
            let randomX, randomY;
            do {
                randomX = Math.floor(Math.random() * maxX);
                randomY = Math.floor(Math.random() * maxY);
                icon.style.left = randomX + "px";
                icon.style.top = randomY + "px";
            } while (iconOverlapsOtherIcons(icon, icons));
        });
    }

    // Call positionIcons function initially and on window resize
    positionIcons();
    window.addEventListener('resize', positionIcons);

    // Function to show image gallery for specific icon
    function showGallery(icon) {
        // Show modal
        document.getElementById("gallery-modal").style.display = "block";

        // Load images for the gallery based on the icon
        let gallery = document.getElementById("image-gallery");
        gallery.innerHTML = ""; // Clear previous images

        // Load images dynamically based on the icon clicked
        if (icon === "hospital") {
            // Load hospital images into the carousel
            gallery.innerHTML += `
                <div id="carouselHospital" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="img/hospital-image1.jpg" class="d-block w-100" alt="Hospital Image 1">
                        </div>
                        <!-- Add more hospital images here -->
                    </div>
                    <a class="carousel-control-prev" href="#carouselHospital" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselHospital" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            `;
        } else if (icon === "school") {
            // Load school images into the carousel
            gallery.innerHTML += `
                <div id="carouselSchool" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="img/redlining.png" class="d-block w-100" alt="Redlining">
                        </div>
                        <div class="carousel-item">
                            <img src="img/spectacle.png" class="d-block w-100" alt="Spectacle">
                        </div>
                        <div class="carousel-item">
                            <img src="img/microagression.png" class="d-block w-100" alt="Microagression">
                        </div>
                        <div class="carousel-item">
                            <img src="img/bobby.png" class="d-block w-100" alt="Fakenews">
                        </div>
                        <!-- Add more school images here -->
                    </div>
                    <a class="carousel-control-prev" href="#carouselSchool" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselSchool" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            `;
        } else if (icon === "church") {
            // Load church images into the carousel
            gallery.innerHTML += `
                <div id="carouselChurch" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="img/irish.png" class="d-block w-100" alt="Irish">
                        </div>

                        <!-- Add more church images here -->
                    </div>
                    <a class="carousel-control-prev" href="#carouselChurch" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselChurch" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            `;
        }
        else if (icon === "museum") {
            // Load museum images into the carousel
            gallery.innerHTML += `
                <div id="carouselMuseum" class="carousel slide" data-ride="museum">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="img/cortes.png" class="d-block w-100" alt="cortes">
                        </div>

                        <!-- Add more museum images here -->
                    </div>
                    <a class="carousel-control-prev" href="#carouselMuseum" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselMuseum" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            `;
        }
        else if (icon === "library") {
            // Load Library images into the carousel
            gallery.innerHTML += `
                <div id="carouselLibrary" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="img/ria.png" class="d-block w-100" alt="Kipling">
                        </div>

                        <!-- Add more library images here -->
                    </div>
                    <a class="carousel-control-prev" href="#carouselLibrary" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselLibrary" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            `;
        }
        else if (icon === "government") {
            // Load government images into the carousel
            gallery.innerHTML += `
                <div id="carouselGovernment" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="img/metropoli.png" class="d-block w-100" alt="metropoli">
                        </div>

                        <!-- Add more government images here -->
                    </div>
                    <a class="carousel-control-prev" href="#carouselGovernment" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselGovernment" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            `;
        }
        else if (icon === "fun") {
            // Load fun images into the carousel
            gallery.innerHTML += `
                <div id="carouselFun" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="img/madchester.png" class="d-block w-100" alt="madchester">
                        </div>
                         <div class="carousel-item">
                            <img src="img/football.png" class="d-block w-100" alt="football">
                        </div>

                        <!-- Add more fun images here -->
                    </div>
                    <a class="carousel-control-prev" href="#carouselFun" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselFun" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            `;
        }
        // Add more conditions for other icons
    }


   // Function to close the image gallery
    function closeGallery() {
        document.getElementById("gallery-modal").style.display = "none";
    }

    // Event delegation for close button
    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('close')) {
            closeGallery();
        }
    });


   // Attach click event listeners to each icon
icons.forEach(function(icon) {
    icon.addEventListener('click', function() {
        // Get the icon type
        let iconType = icon.querySelector('img').alt.toLowerCase();
        // Show gallery for the clicked icon type
        showGallery(iconType);
    });
});



/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollpos = window.scrollY > 1;
window.onscroll = function() {
  let currentScrollPos = window.scrollY > 1;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}
});
