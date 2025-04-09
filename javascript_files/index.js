// Track Scrolling

const track = document.getElementById( "image-track" );
const pageNumber = document.getElementById( "page-number" );


window.addEventListener( "wheel", event => {
    const scrollDir = Math.sign( event.deltaY );
    scrollTrack( scrollDir )
});


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;

    updateTrackPercentage( track.dataset.percentage )
}

window.onmouseup = ( ) => {
    track.dataset.mouseDownAt = "0";

    updateTrackPercentage( track.dataset.percentage )
}

// 'function' responsible for clicking and dragging
window.onmousemove = e => {

    if ( track.dataset.mouseDownAt === "0" ) return;

    let mouseDelta = parseFloat( track.dataset.mouseDownAt ) - e.clientX;
    let maxMouseDelta = window.innerWidth / 2;

    let percentage = ( ( mouseDelta / maxMouseDelta ) * -100 );

    // Ensure nextPercentage stays within the desired range
    let nextMousePercentage = Math.max( Math.min( parseFloat( track.dataset.prevPercentage ) + percentage, 0 ), track.dataset.percentageMax );


    updateTrackPercentage( nextMousePercentage )


    // Apply the translation to the track
    track.animate( {
        transform: `translate( ${nextMousePercentage}%, -50% )`
    }, { duration: 2000, fill: "forwards" } 
    );

    translateImageObj( nextMousePercentage )

    translateImageObj( nextMousePercentage ) 

    numberScroll.call( )

    updateTrackPercentage( nextPercentage )
   
}

// function respolsible for scrolling the track with litened mouse scroll wheel inputs
function scrollTrack( scrollDir ) {

    let prevScrollPercentage = track.dataset.percentage;

    let maxScrollDelta = 24

    let percentage = ( scrollDir / maxScrollDelta );

    // Ensure nextPercentage stays within the desired range
    let nextScrollPercentage = Math.max( Math.min( ( Number( prevScrollPercentage ) + ( scrollDir * 5 ) ) + percentage, 0 ), track.dataset.percentageMax );


    updateTrackPercentage( nextScrollPercentage )

    // Maths for number translation
    const trackAbsolutePercentage = ( Math.round( ( track.dataset.percentage / track.dataset.percentageMax ) * 100 ) ) / 100;


    // Apply Translation to the Track
    track.animate( {
        transform: `translate( ${nextScrollPercentage}%, -50% )`
    }, { duration: 2000, fill: "forwards" } 
    );

    translateImageObj( nextScrollPercentage )

    translateImageObj( nextScrollPercentage ) 

    numberScroll.call( )
}

function translateImageObj( nextPercentage ) {
    for ( const trackImage of track.getElementsByClassName( "trackImage" ) ) {
        trackImage.animate(
            {
                transform: `translateX(${3 * nextPercentage}%)`,
                objectPosition: `${100 + nextPercentage}% 50%`
            },
            {
                duration: 2400,
                fill: "forwards",
                easing: "ease"
            }
        );
    }
}

function translateHrefObj( nextPercentage ) {
    for ( const trackA of track.getElementsByClassName( "trackHref" ) ) {
        trackA.animate(
            {
                transform: `translateX(${3 * nextPercentage}%)`,
                objectPosition: `${100 + nextPercentage}% 50%`
            },
            {
                duration: 2400,
                fill: "forwards",
                easing: "ease"
            }
        );
    }
}

function numberScroll( ) {
    // Maths for number translation
    const trackAbsolutePercentage = ( Math.round( ( track.dataset.percentage / track.dataset.percentageMax ) * 100 ) ) / 100;
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

function updateTrackPercentage( nextPercentage ) {
    track.dataset.percentage = nextPercentage;
}

// TODO: Fix bug with track returning to 0 with each mousedown