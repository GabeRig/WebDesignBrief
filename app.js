// Track Scrolling

const track = document.getElementById("image-track");
const pageNumber = document.getElementById("page-number");


window.addEventListener("wheel", event => {
    const scrollDir = Math.sign(event.deltaY);
    scrollTrack(scrollDir)
});


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;

    updateTrackPercentage(track.dataset.percentage)
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";

    updateTrackPercentage(track.dataset.percentage)
}


window.onmousemove = e => {

    if ( track.dataset.mouseDownAt === "0" ) return;


    let mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    let maxMouseDelta = window.innerWidth / 2;

    let percentage = ( ( mouseDelta / maxMouseDelta ) * -100 );

    // Ensure nextPercentage stays within the desired range
    let nextPercentage= Math.max( Math.min( parseFloat( track.dataset.prevPercentage ) + percentage, 0 ), track.dataset.percentageMax);


    updateTrackPercentage(nextPercentage)


    // Apply the translation to the track
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 2000, fill: "forwards" });

    // Apply translation to individual images
    for ( const image of track.getElementsByClassName( "image" ) ) { //TODO: "button" to "image" restores parralax but breaks image to button placement
        image.animate(
            {
                transform: `translateX(${3 * nextPercentage}%)`,
                objectPosition: `${100 + nextPercentage}% 50%`
            },
            {
                duration: 2400,
                fill: "forwards",
                easing: "ease"
            });
    }

    numberScroll.call()
   
}

function scrollTrack(scrollDir) {

    let prevScrollPercentage = track.dataset.percentage;

    let maxScrollDelta = 24

    let percentage = (scrollDir / maxScrollDelta);

    // Ensure nextPercentage stays within the desired range
    let nextPercentage = Math.max( Math.min( (Number(prevScrollPercentage) + (scrollDir * 5) ) + percentage, 0 ), track.dataset.percentageMax);


    updateTrackPercentage(nextPercentage)

    // Maths for number translation
    const trackAbsolutePercentage = ( Math.round( ( track.dataset.percentage / track.dataset.percentageMax ) * 100) ) / 100;


    // Apply Translation to the Track
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 2000, fill: "forwards" });

    // Apply translation to individual images
    for ( const image of track.getElementsByClassName( "image" ) ) { //TODO: "button" to "image" restores parralax but breaks image to button placement
        image.animate(
            {
                transform: `translateX(${3 * nextPercentage}%)`,
                objectPosition: `${100 + nextPercentage}% 50%`
            },
            {
                duration: 2400,
                fill: "forwards",
                easing: "ease"
            });
    }

    numberScroll.call()
}

function numberScroll() {
    // Maths for number translation
    const trackAbsolutePercentage = ( Math.round( ( track.dataset.percentage / track.dataset.percentageMax ) * 100) ) / 100;
    const imageIndex = Math.round( trackAbsolutePercentage * 7 );
    const translatePx = imageIndex * -30

    pageNumber.animate(
        {
            transform: `translateY( ${translatePx}px )`
        },
        {
            duration: 2000,
            easing: "ease-out"
        }
    ).onfinish = () => {
        // This function will be called when the animation finishes
        pageNumber.style.transform = `translateY( ${translatePx}px )`;
    };
}

function updateTrackPercentage(nextPercentage) {
    track.dataset.percentage = nextPercentage;
}



// Images

