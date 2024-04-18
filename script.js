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
    let townMap = document.querySelector('.town-map');
    let townMapRect = townMap.getBoundingClientRect();
    let townMapWidth = townMapRect.width;
    let townMapHeight = townMapRect.height;
    let icons = document.querySelectorAll('.icon');
    let iconCount = icons.length;

    // Calculate a reasonable icon size based on the available map area
    let iconSize = Math.min(townMapWidth, townMapHeight) / Math.ceil(Math.sqrt(iconCount));
    let iconWidth = iconSize;
    let iconHeight = iconSize;

    // Array to keep track of occupied positions
    let occupiedPositions = [];
    let maxAttempts = 100; // Maximum attempts to position an icon

    icons.forEach(function(icon) {
        let randomX, randomY;
        let overlaps;
        let attempts = 0;

        do {
            // Generate random coordinates within the town map area
            randomX = Math.floor(Math.random() * (townMapWidth - iconWidth));
            randomY = Math.floor(Math.random() * (townMapHeight - iconHeight));

            // Check if the randomly generated position overlaps with any existing icon
            overlaps = occupiedPositions.some(pos => {
                return (
                    randomX < pos.x + iconWidth &&
                    randomX + iconWidth > pos.x &&
                    randomY < pos.y + iconHeight &&
                    randomY + iconHeight > pos.y
                );
            });

            attempts++;
            // Break the loop if maximum attempts reached
            if (attempts >= maxAttempts) {
                console.warn("Exceeded maximum attempts to position icon:", icon);
                break;
            }
        } while (overlaps);

        // Update the icon's position if a valid position was found
        if (!overlaps) {
            icon.style.left = randomX + "px";
            icon.style.top = randomY + "px";
            occupiedPositions.push({ x: randomX, y: randomY });
        }
    });
}

// Call the positionIcons function when the page loads
window.addEventListener('load', positionIcons);


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
                <div id="carouselHospital" class="carousel slide carousel-fade" data-ride="carousel">
                <ol class="carousel-indicators">
    <li data-target="#carouselHospital" data-slide-to="0" class="active"></li>
</ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <a href="https://aurigandrea.itch.io/anxiety-twine-game"><img src="img/anxiety.png" class="d-block w-100" alt="Hospital Image 1"></a>
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
                <div id="carouselSchool" class="carousel slide carousel-fade" data-ride="carousel">
                <ol class="carousel-indicators">
    <li data-target="carouselSchool" data-slide-to="0" class="active"></li>
    <li data-target="carouselSchool" data-slide-to="1"></li>
    <li data-target="carouselSchool" data-slide-to="2"></li>
    <li data-target="carouselSchool" data-slide-to="3"></li>
</ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
        <a href="https://storymaps.arcgis.com/stories/03390c459fbc42afa211c2d3aba38709"><img src="../img/redlining.png" alt="redlining"></a>
                        </div>
                        <div class="carousel-item">
        <a href="https://storymaps.arcgis.com/stories/625750a424bd4ce8b794024fcb2429d7"><img src="../img/spectacle.png" alt="spectacle"></a>
                        </div>
                        <div class="carousel-item">
        <a href="https://storymaps.arcgis.com/stories/b89214ce881747869b6b11afdcc5710c"><img src="../img/microagression.png" alt="microagression"></a>
                        </div>
                        <div class="carousel-item">
        <a href="https://aurigandrea.itch.io/national-curriculum-and-social-challenges"><img src="../img/bobby.png" alt="bobby"></a>
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
                <div id="carouselChurch" class="carousel slide carousel-fade" data-ride="carousel">
                    <ol class="carousel-indicators">
    <li data-target="carouselChurch" data-slide-to="0" class="active"></li>
</ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
        <a href="https://storymaps.arcgis.com/stories/f0ed540b49544d79a493fd46a8697fc7"><img src="../img/irish.png" alt="irish"></a>
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
                <div id="carouselMuseum" class="carousel slide carousel-fade" data-ride="museum">
                   <ol class="carousel-indicators">
    <li data-target="carouselMuseum" data-slide-to="0" class="active"></li>
    <li data-target="carouselMuseum" data-slide-to="1"></li>
    <li data-target="carouselMuseum" data-slide-to="2"></li>
</ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                                 <a href="https://storymaps.arcgis.com/stories/d809c80c7b7745ff83ee59f815d4be13"><img src="../img/cortes.png" alt="cortes"></a>
                        </div>
                         <div class="carousel-item">
                           <a href="https://storymaps.arcgis.com/stories/db71842087234725952aa42bdd762dfb"><img src="../img/sex.png" alt="sex"></a>
                        </div>
                         <div class="carousel-item">
                           <a href="https://storymaps.arcgis.com/stories/bc6670773c3747739f328539be62739f"><img src="../img/india.png" alt="india"></a>
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
                <div id="carouselLibrary" class="carousel slide carousel-fade" data-ride="carousel">
                   <ol class="carousel-indicators">
    <li data-target="carouselLibrary" data-slide-to="0" class="active"></li>
    <li data-target="carouselLibrary" data-slide-to="1"></li>
    <li data-target="carouselLibrary" data-slide-to="2"></li>
</ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
        <a href="https://storymaps.arcgis.com/stories/df4d81b60d704440bc01945244cd3379"><img src="../img/ria.png" alt="ria"></a>
                        </div>
                         <div class="carousel-item">
        <a href="https://storymaps.arcgis.com/stories/cd6d5d86122e47af8d12e24a808f29a5"><img src="../img/911.png" alt="911"></a>
                        </div>
                         <div class="carousel-item">
        <a href="https://storymaps.arcgis.com/stories/468a8d2845584deba536c23e40beb26f"><img src="../img/anna.png" alt="anna"></a>
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
                <div id="carouselGovernment" class="carousel slide carousel-fade" data-ride="carousel">
<ol class="carousel-indicators">
    <li data-target="carouselGovernment" data-slide-to="0" class="active"></li>
</ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
        <a href="https://aurigandrea.itch.io/metropoli-habitus"><img src="../img/metropoli.png" alt="metropoli"></a>
                        </div>
                         <div class="carousel-item">
        <a href="ethics.html"><img src="../img/ethics.png" alt="ethics"></a>
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
                <div id="carouselFun" class="carousel slide carousel-fade" data-ride="carousel">
                   <ol class="carousel-indicators">
    <li data-target="carouselFun" data-slide-to="0" class="active"></li>
    <li data-target="carouselFun" data-slide-to="1"></li>
</ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
        <a href="https://storymaps.arcgis.com/stories/ca2d1ceb68b944e6adb7c5270f6f8573"><img src="../img/madchester.png" alt="madchester"></a>
                        </div>
                         <div class="carousel-item">
        <a href="https://storymaps.arcgis.com/stories/f0ed540b49544d79a493fd46a8697fc7"><img src="../img/football.png" alt="football"></a>
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
        // Modify the event listener to target the icon image and handle the click event
        let iconImg = icon.querySelector('img');
        iconImg.addEventListener('click', function(event) {
            event.stopPropagation(); // Stop event propagation to prevent clicks on parent container
            let iconType = iconImg.alt.toLowerCase();
            showGallery(iconType); // Show gallery for the clicked icon type
        });
    });

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
    let prevScrollPos = window.pageYOffset;
    let header = document.getElementById("header");

    window.addEventListener('scroll', function() {
        let currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
            // Show navbar on scroll up
            header.style.top = "0";
        } else {
            // Hide navbar on scroll down
            header.style.top = "-50px";
        }

        prevScrollPos = currentScrollPos;
    });
});function toggleMenu() {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.style.display = navbarLinks.style.display === 'block' ? 'none' : 'block';
}
