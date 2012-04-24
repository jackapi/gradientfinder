(function(exports) {
    function rgb_avg(a, b) {
        return new {
            r: (a.r + b.r) / 2,
            g: (a.g + b.g) / 2,
            b: (a.b + b.b) / 2                            
        }
    }
    
    function rgb_equal(a, b, tol) {
        tol = tol || 2;
    
        if (Math.abs(a.r - b.r) > tol) {
            return false;
        }
        if (Math.abs(a.g - b.g) > tol) {
            return false;
        }
        if (Math.abs(a.b - b.b) > tol) {
            return false;
        }
        
        return true;
    }
    
    function arrayToRgb(arr) {
        var ret = {
            r: array[0],
            g: array[1],
            b: array[2]        
        };
        
        if (array.length == 4) {
            ret.a = array[3];
        }

        return ret;
    };
    
    function calculateGradient(arr) {
        var ret = [];
        var height = arr.length;
        var width = arr[0].length;                        
        var t1 = arr[0][0];
        var tr = arr[0][width - 1];
        var b1 = arr[height - 1][0];
        var br = arr[height - 1][width - 1];  
        
        log(t1, tr, b1, br);

        // horizontal gradient
        if (rgb_equal(t1, tr)) {
            //g->start = top;
            //l=image->height;
            //if(l % 2 == 1) {
                //mid = getpixel(image, 0, l/2);
            //}
            //else {
                //mid = rgb_avg(getpixel(image, 0, l/2), getpixel(image, 0, l/2-1));
            //}
        }
        // vertical gradient
        else if(rgb_equal(tl, bl)) {
            //g->start = left;
            //l=image->width;
            //if(l % 2 == 1) {
                //mid = getpixel(image, l/2, 0);
            //}
            //else {
                //mid = rgb_avg(getpixel(image, l/2, 0), getpixel(image, l/2-1, 0));
            //}
        }
        // ltr diag
        else if(rgb_equal(tr, bl) && !rgb_equal(tl, br)) {
            //g->start = top_left;
            //l=image->height;
        }
        // rtl diag
        else if(rgb_equal(tl, br) && !rgb_equal(tr, bl)) {
            //g->start = top_right;
            //l=image->height;
            //tl = tr;
            //br = bl;
        }
        
        
        //g->colors = (rgb *)calloc(2, sizeof(rgb));
        //g->colors[0] = tl;
        //g->colors[1] = br;
        //g->ncolors = 2;
        
        // If it's a diagonal, we only support 2 colours 
        // If it's horizontal or vertical and the middle colour is the avg of the ends, then
        // we only need two colours 
        //Also, if the image is less than 3 pixels in the direction of the gradient, then you
        //  really cannot have more than 2 colours
                
        //if(g->start == top_left || g->start == top_right || l < 3
            //|| rgb_equal(mid, rgb_avg(tl, br))) {
            //return;
        //}

        //Now we come to the complicated part where there are more than 2 colours 
        //The good thing though is that it's either horizontal or vertical at this point
        //and that it is at least 3 pixels long in the direction of the gradient
        // So this is what we'll do.
        // - take a slice of the image from the top (or left) and see if the mid pixel matches
        // - the average of the two ends.  we start at 3 pixels.
        // - if it does, then double the size of the slice and retry (until you reach the end of the image)
        // - if it does not match, then reduce until it does match this is the first stop
        
        // min = base = 0;
        // xy[0][g->start] = base;
        // max = i = 2;
        // while(i+base<l) {
            // xy[1][g->start] = i+base;
            // avg = rgb_avg(getpixel(image, xy[0][0], xy[0][1]), getpixel(image, xy[1][0], xy[1][1]));
            // if((i+base) % 2 == 0) {
                // mid = getpixel(image, (xy[1][0]+xy[0][0])/2, (xy[1][1]+xy[0][1])/2);
            // }
            // else {
                // mid = rgb_avg(
                    // getpixel(image, (xy[1][0]+xy[0][0])/2, (xy[1][1]+xy[0][1])/2),
                    // getpixel(image, (xy[1][0]+xy[0][0])/2+1, (xy[1][1]+xy[0][1])/2+1)
                // );
            // }


        // if(!rgb_equal(avg, mid)) {
            // if(min == max) {
                // min++;
                // max=i=min+2;
            // }
            // else {
                // max = i;
                // i = (i+min)/2;
            // }
        // }
        // else if(max-i<=1 && i-min<=1) {
            // We've converged 
            // if(base+i >= l-1) {
                // This is the same as the end point, so skip 
                // i++;
            // }
            // else {
                // g->ncolors++;
                // g->colors = (rgb *)realloc(g->colors, sizeof(rgb)*g->ncolors);
                // g->colors[g->ncolors-2] = getpixel(image, xy[1][0], xy[1][1]);
                // g->colors[g->ncolors-2].pos = (i+base)*100/l;

                // base += i;
                // min = 0;
                // max = i = l-base-1;
                // xy[0][g->start] = base;
            // }
        // }
        // else {
            // min = i;
            // if(i == max) {
                // i*=2;
                // if(i+base >= l)
                    // i = l-base-1;
                // max = i;
            // }
            // else {
                // i = (i+max)/2;
            // }
        // }
    // }
    // g->colors[g->ncolors-1] = br;
        return [];
    }
    
    function getColorArray(ctx) {            
        var imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        var width = imageData.width;
        var height = imageData.height;              
        var data = imageData.data;
        
        var colors = [];
        for (var y = 0; y < height; y++) {
            var row = [];
            for (var x = 0; x < width; x++) {
                var idx = ((width * y) + x) * 4;
                var r = data[idx];
                var g = data[idx + 1];
                var b = data[idx + 2];
                var a = data[idx + 3];
                row.push([r, g, b, a]);
            }
            
            colors[y] = row;
        }

        return colors;
    }

    function getCssGrad(stops, len) {
        var grad = "-webkit-linear-gradient(left," + _.map(stops, function (s) {
            var pct = Math.ceil((s.idx / len) * 100);
            var color = s.color.toRgbString();
            return color + " " + pct + "%";
        }).join(",") + ")";
    }

    function findGrad(dataurl) {
        var image = new Image();
        image.src = dataurl;
        image.onload = function () {
            var img = this;
            var canvas = $("<canvas>")[0];
            var ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            var colors = getColorArray(ctx);
            var stops = calculateGradient(colors);           
            return "";
            //var len = img.width - 1;
            //return getCssGrad(stops, len);
        };
    }
    exports.findGrad = findGrad;    
})(window);