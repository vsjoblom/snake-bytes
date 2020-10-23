var W = [],              // worm array (warning, contains apple(s))
    h, i,                // h for worm head, i for index
    apl, grw, Y,         // apples, grow and delta y
    pts = apl = grw =      
    Y = 0, X = 1, D = 2, // initial direction, direction index for loop
    itv, C, k;             // interval handle, canvas and key

// grab the canvas, set styles and dimensions
C = document.getElementById("c");
C.width = C.height = 210;
C.style.border = "1px solid #000";

// initial worm size and postion
for(k = 5; 11 > k; ++k)
    W.push([k,5]);

// handling
window.addEventListener("keydown", function (a) { k = a.keyCode - 37 }, !1);

// game loop
itv = setInterval(function () {
    
    // allowed turns, change D
    4 > k && k - 2 != D && k + 2 != D && (D = k);
    
    // pick delta X and Y for head location based on D
    X = [-1,0,1,0][D];
    Y = [0,-1,0,1][D];
    
    // find the worm's head
    for(i = W.length; W[--i][2];); 
    
    h = W[i]; // meet the new head
    
    // add X and Y to the new head location (mod canvas dimensions)
    h = [(h[0] + X) % 30, (h[1] + Y) % 30];
    0 > h[0] && (h[0] += 30);
    0 > h[1] && (h[1] += 30);
    
    // traverse through worm and apples
    for(i = -1; W[++i];)
        h[0] == W[i][0] && h[1] == W[i][1] && ( // new head collides with...
            // apple -> remove apple, incr grow and points
            // tail -> stop loop, alert points
            W[i][2] ? ( 
                W.splice(i, 1), ++grw, ++pts, --apl 
            ) : (
                clearInterval(itv), alert(pts)
            )
        );

    // if in need to grow ...
    if(grw) --grw;
    else {
        // else find and cut the tail
        for(i = -1; W[++i][2];);
        W.splice(i,1)
    }
    
    // do we need new apples?
    if(!apl)
        with(Math)
            W.push([ // insert a random apple
                floor(30 * random()), floor(30 * random()), ++apl
            ]);
            
    i = W.push(h);
    
    // repetition -> better compression :)
    for(C.getContext("2d").clearRect(0,0,210,210); ~--i; )
        C.getContext("2d").fillStyle = W[i][2] ? "#f00" : "#555",
        C.getContext("2d").fillRect(7 * W[i][0], 7 * W[i][1], 7, 7);
    
    C.getContext("2d").fillText(pts, 1, 10)
    
}, 80)