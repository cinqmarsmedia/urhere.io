webpackJsonp([0],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__panzoom_panzoom__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__panzoom_panzoom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__panzoom_panzoom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//declae var panzoom;
var HomePage = /** @class */ (function () {
    function HomePage(platform, geolocation, storage, alertCtrl) {
        this.platform = platform;
        this.geolocation = geolocation;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.markerLeft = 0;
        this.markerTop = 0;
        this.loader = false;
        this.geodata = null;
        this.storageData = {};
        this.showPrompt = true;
        this.hidePrompt = false;
        this.error = false;
        this.internet = window.navigator.onLine;
        this.points = [];
        this.adjustment = [0, 0];
        this.adjustParam = null;
        this.adjustIT = false;
        this.shouldZoom = true;
        this.errorWait = false;
        this.trueError = '';
        this.displayLocSet = true;
        this.displaySizeRel = [];
        this.lastLatLng = null;
        this.confirm = false;
        this.landscape = false;
        this.hide = true;
        this.currentlocation = [];
        this.spinner = false;
        this.currLoc = [];
        this.markerWidth = 12;
        this.MapOn = false;
        window.onresize = this.setMapDimensions.bind(this);
        if (window.navigator['standalone'] === false) {
            var msg = this.alertCtrl.create({
                title: 'Add to Homescreen',
                subTitle: 'This allows the app to run fullscreen',
                message: '<img src="assets/prompt.png">',
                buttons: ['Dismiss']
            });
            msg.present();
        }
        /*
        var lastFired = new Date().getTime();
        setInterval(()=> {
        var now = new Date().getTime();
            if(now - lastFired > 5000) {//if it's been more than 5 seconds
                this.resumePWA();
            }
            lastFired = now;
        }, 500);
        */
        /*
            console.log(this.points[0].lat<this.points[1].lat)
            console.log(this.points[0].lng<this.points[1].lng)
        */
        this.orientation();
        if (this.points.length == 2) {
            if (this.points[0].lat > this.points[1].lat) {
                //console.log('re-order');
                this.points = this.points.reverse();
            }
        }
        //this.geoloc();
        // debug stuff
        // this.preview = '/assets/test.jpeg';
        // this.expandit();
        //this.currentlocation=[200,300]
        //--------------
        //console.log(this.getMissingCoord([0,0],[5,0],this.getMagAngles([0,0],[5,0],[9/5,12/5])));
    }
    HomePage.prototype.convertRelPan = function (x, y) {
        this.mapWidth = this.mapImage.nativeElement.clientWidth;
        this.mapHeight = this.mapImage.nativeElement.clientHeight;
        //console.log(this.mapHeight)
        return [50 - x / this.mapWidth * 100, 50 - y / this.mapHeight * 100];
    };
    HomePage.prototype.setMapDimensions = function () {
        this.orientation();
        if (this.landscape) {
            return;
        }
        if (this.mapImage && this.mapImage.nativeElement && this.marker && this.marker.nativeElement) {
            var markerWidth = this.marker.nativeElement.clientWidth;
            var markerHeight = this.marker.nativeElement.clientHeight;
            this.mapWidth = this.mapImage.nativeElement.clientWidth;
            this.mapHeight = this.mapImage.nativeElement.clientHeight;
            var marginTop = +document.defaultView.getComputedStyle(this.mapImage.nativeElement, "").getPropertyValue("margin-top").replace(/[^0-9\.\-]/g, '');
            if (this.currentlocation.length > 0) {
                this.markerLeft = (-1 * this.currentlocation[0] * this.mapWidth + this.mapWidth / 2 - markerWidth / 2);
                this.markerTop = (-1 * this.currentlocation[1] * this.mapHeight + marginTop + this.mapHeight / 2 - markerHeight / 2);
                this.mapEle.pan(this.currentlocation[0] * this.mapWidth, this.currentlocation[1] * this.mapHeight);
                //console.log(this.mapEle.getPan());
            }
            // console.log(marginTop, this.mapWidth, this.mapHeight, this.markerLeft, this.markerTop, markerWidth, markerHeight);
        }
    };
    HomePage.prototype.resumePWA = function () {
        if (this.points.length == 2 && this.preview) {
            this.shouldZoom = true;
            this.spinner = true;
            this.errorWait = false;
            this.geoloc();
        }
    };
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.resume.subscribe(function (result) {
            if (!_this.hide) {
                _this.loadMap();
            }
            // loading iff points are whatever
        });
        this.setMapDimensions();
        this.storage.get("data").then(function (val) {
            if (val) {
                _this.storageData = val;
                //console.log(this.storageData)
            }
        });
    };
    HomePage.prototype.cmm = function () {
        window.open("https://cinqmarsmedia.com", "_blank");
    };
    HomePage.prototype.github = function () {
        window.open("https://github.com/cinqmarsmedia/urhere.io", "_blank");
    };
    HomePage.prototype.orientation = function () {
        if (window.innerWidth > window.innerHeight) {
            this.landscape = true;
        }
        else {
            this.landscape = false;
        }
    };
    HomePage.prototype.adjust = function () {
        if (this.adjustIT) {
            this.adjustIT = false;
        }
        else {
            this.adjustIT = true;
            this.mapEle.zoom(10, { animate: true });
        }
        //.reset({ animate: false })
    };
    HomePage.prototype.adjustFactor = function (num, scale, xy) {
        var factor = num;
        var invert = false;
        //this.displaySizeRel[0]
        factor = Math.pow(factor, 1 / scale);
        /*
        if (factor<1){
        factor=1/factor
        invert=true;
        }
        
        if (invert){
          factor=1/factor;
        }
        */
        return factor;
    };
    HomePage.prototype.makeAdjust = function () {
        // test by tracking event listener? I feel like one of the
        var newLoc = this.mapEle.getPan();
        //console.log(this.currLoc)
        //console.log(newLoc)
        var scale = this.mapEle.getScale();
        // again, magic with scale, force zoom of 10 when adjusting?
        var factor = 3; // as a function of the image resolution?
        var expectedPoint = this.convertRelPan(this.currLoc[0], this.currLoc[1]);
        var actualPoint = this.convertRelPan(newLoc.x, newLoc.y);
        //console.log(actualPoint)
        //console.log(expectedPoint);
        this.adjustment = [(actualPoint[0] - expectedPoint[0]) * factor, (actualPoint[1] - expectedPoint[1]) * factor];
        //console.log(this.adjustment)
        //this.adjustment=this.convertRelPan(newLoc.x-this.currLoc[0],newLoc.y-this.currLoc[1])
        //this.adjustment=[this.adjustFactor(this.adjustment[0],scale),this.adjustFactor(this.adjustment[1],scale)]
        this.mapEle.pan(newLoc.x, newLoc.y, { animate: true });
        //console.log(this.adjustment)
        this.adjustParam = { x: (actualPoint[0] - expectedPoint[0]), y: (actualPoint[1] - expectedPoint[1]), factor: factor, dist: this.distClosestPoint(newLoc.x, newLoc.y), mapdiff: [newLoc.x - this.currLoc[0], newLoc.y - this.currLoc[1]] };
        this.adjustIT = false;
        // compare this.currLoc to ;
        // calculate shit for adjustment [1,1]
    };
    HomePage.prototype.vecDist = function (x1, y1, x2, y2) {
        var xs = x2 - x1;
        var ys = y2 - y1;
        xs *= xs;
        ys *= ys;
        return Math.sqrt(xs + ys);
    };
    ;
    HomePage.prototype.distClosestPoint = function (x, y) {
        var firstPt = this.vecDist(x, y, this.points[0].x, this.points[0].y);
        var secondPt = this.vecDist(x, y, this.points[1].x, this.points[1].y);
        if (firstPt < secondPt) {
            return firstPt;
        }
        else {
            return secondPt;
        }
    };
    HomePage.prototype.reset = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Start Over',
            //subTitle: 'wowowow',
            message: 'Do you want to reset with a different picture or resync with the same picture and choose different points?',
            buttons: [
                {
                    text: "Reset",
                    handler: function (data) {
                        if (typeof _this.storageData[_this.hash(_this.preview)] !== 'undefined' && _this.storageData[_this.hash(_this.preview)].length > 1) {
                            delete _this.storageData[_this.hash(_this.preview)];
                        }
                        _this.storage.set("data", _this.storageData).then(function (val) {
                            _this.refresh();
                        });
                    }
                },
                {
                    text: "ReSync",
                    handler: function (data) {
                        _this.reSync();
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.reSync = function (prompt) {
        if (prompt === void 0) { prompt = false; }
        if (prompt && this.points.length > 0) {
            var msg = this.alertCtrl.create({
                title: 'ReSync Needed',
                //subTitle: 'wowowow',
                message: 'Your current position is off the map. A Resync is required. ',
                buttons: ['Dismiss']
            });
            msg.present();
        }
        this.points = [];
        this.currentlocation = [];
        this.showPrompt = true;
        this.adjustment = [1, 1];
        this.hidePrompt = false;
        this.shouldZoom = true;
        this.errorWait = false;
        this.adjustParam = null;
    };
    HomePage.prototype.hash = function (str) {
        var len = str.length;
        var hash = str[len - Math.ceil(len / 2)] + str[len - Math.ceil(len / 3)] + str[len - Math.ceil(len / 4)] + str[len - Math.ceil(len / 5)] + str[len - Math.ceil(len / 6)] + str[len - Math.ceil(len / 7)] + str[len - Math.ceil(len / 8)] + str[len - Math.ceil(len / 9)] + str[len - Math.ceil(len / 10)] + str[len - Math.ceil(len / 11)] + str[len - Math.ceil(len / 12)] + str[len - Math.ceil(len / 13)] + str[len - Math.ceil(len / 14)];
        return hash;
    };
    HomePage.prototype.showPreview = function (x) {
        var _this = this;
        if (x.target && x.target.files && x.target.files[0]) {
            var reader = new FileReader();
            reader.onloadstart = function () { _this.loader = true; };
            reader.onload = function (e) {
                //console.log(e);
                if (typeof e.target.result == 'undefined') {
                    return;
                }
                var fromStorage = false;
                _this.preview = e.target.result;
                //console.log(this.preview);
                //---------------------------------------
                if (typeof _this.storageData[_this.hash(_this.preview)] !== 'undefined' && _this.storageData[_this.hash(_this.preview)].length > 1) {
                    _this.points = _this.storageData[_this.hash(_this.preview)];
                    fromStorage = true;
                }
                _this.expandit(fromStorage);
            };
            reader.readAsDataURL(x.target.files[0]);
        }
    };
    HomePage.prototype.expandit = function (fs) {
        var _this = this;
        if (fs === void 0) { fs = false; }
        if (fs) {
            setTimeout(function () {
                _this.hidePrompt = false;
                setTimeout(function () {
                    _this.hidePrompt = true;
                }, 3000);
                _this.interpolatePoint();
                _this.geoloc();
            }, 1000);
        }
        setTimeout(function () {
            _this.mapEle = __WEBPACK_IMPORTED_MODULE_3__panzoom_panzoom___default()(document.getElementById('expands'), {
                maxScale: 15,
                minScale: 1,
                step: 1
            });
            _this.mapEle.zoom(4, { animate: false });
            document.getElementById('expands').addEventListener('panzoomchange', function (resp) {
                if (_this.adjustIT && resp.detail.scale !== 10) {
                    _this.mapEle.zoom(10);
                }
                var Xscalar = .3245 * Math.log(resp.detail.scale) + 1.0593;
                var Yscalar = 1.0552 * Math.log(resp.detail.scale) + 1.462;
                var width = window.innerWidth;
                var height = window.innerHeight;
                _this.displaySizeRel = [width / Xscalar, height / Yscalar];
                if (Math.abs(resp.detail.x) > width / Xscalar || Math.abs(resp.detail.y) > height / Yscalar) {
                    if (_this.displayLocSet) {
                        //console.log('ohhhhh boy');
                        _this.reSync(true);
                    }
                    else {
                        _this.mapEle.reset({ animate: true });
                        console.log('reset');
                    }
                }
                //this.scale=resp.detail.scale;
                _this.markerWidth = 12 / Math.pow(resp.detail.scale, .8);
                if (_this.hidePrompt) {
                    _this.showPrompt = false;
                }
                _this.displayLocSet = false;
                // @ts-ignore
                //console.log(event.detail.scale) // => { x: 0, y: 0, scale: 1 }
            });
            //button.addEventListener('click', this.mapEle.zoomIn)
            if (!(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent))) {
                document.getElementById('expands').parentElement.addEventListener('wheel', _this.mapEle.zoomWithWheel);
            }
            // debug
            setTimeout(function () {
                _this.loader = false;
                _this.hide = false;
            }, 500);
            setTimeout(function () {
                _this.errorWait = true;
            }, 3000);
            //this.setDisplayLoc(this.points[0].x,this.points[0].y)
            //this.geoloc();
        }, 0); // hacky solution
    };
    HomePage.prototype.start = function () {
        //
        this.loadMap();
    };
    HomePage.prototype.loadMap = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.error = false;
            //console.log(resp)
            _this.geodata = resp;
            var latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            _this.lastLatLng = latLng;
            //console.log(latLng);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                rotateControl: false,
                streetViewControl: false,
                zoomControl: false,
                fullscreenControl: false,
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'],
                mapTypeControl: true,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN],
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_CENTER
                }
            };
            _this.googleMap = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            _this.googleMap.setTilt(0);
            _this.geoloc();
        }).catch(function (error) {
            console.log(error);
            _this.trueError = error;
            _this.error = true;
        });
    };
    HomePage.prototype.refresh = function () {
        window.location.reload(true);
    };
    HomePage.prototype.setDisplayLoc = function (x, y) {
        var _this = this;
        //console.log(x,y)
        setTimeout(function () {
            var realCoords = _this.convertRelPan(x, y);
            //console.log(realCoords)
            _this.setMapDimensions();
            _this.currentlocation = [-1 * (realCoords[0] - 50) / 100, -1 * (realCoords[1] - 50) / 100];
            //console.log(this.currentlocation);
            _this.setMapDimensions();
            _this.displayLocSet = true;
            var mapadjust;
            if (_this.adjustParam) {
                var currdist = _this.distClosestPoint(x, y);
                var factor;
                if (currdist > _this.adjustParam.dist) {
                    factor = _this.adjustParam.factor;
                }
                else {
                    factor = currdist / _this.adjustParam.dist * _this.adjustParam.factor;
                }
                _this.adjustment = [_this.adjustParam.x * factor, _this.adjustParam.y * factor];
                mapadjust = [_this.adjustParam.mapdiff[0] * factor, _this.adjustParam.mapdiff[1] * factor];
            }
            else {
                mapadjust = [0, 0];
            }
            if (_this.shouldZoom) {
                _this.mapEle.pan(x, y, { animate: true });
                if (_this.adjustParam) {
                    _this.mapEle.zoom(8, { animate: true });
                }
                else {
                    _this.mapEle.zoom(10, { animate: true });
                }
                _this.shouldZoom = false;
            }
            else {
                var scale = _this.mapEle.getScale();
                if (scale < 3) {
                    _this.mapEle.pan(x, y, { animate: true });
                }
                if (scale < 2) {
                    _this.mapEle.zoom(scale + 1, { animate: true });
                }
            }
        }, 0);
    };
    HomePage.prototype.newCalibrate = function () {
        var _this = this;
        if (typeof this.googleMap == 'undefined') {
            return;
        }
        //this.map.setCenter(new google.maps.LatLng(-34, 151)); updated geolocation
        if (!this.MapOn) {
            if (this.mapEle.getScale() + 1 < 7) {
                this.confirm = true;
                this.mapEle.zoom(8, { animate: true });
                return;
            }
            this.confirm = false;
            if (this.lastLatLng) {
                this.googleMap.setCenter(this.lastLatLng);
                this.googleMap.setZoom(15);
            }
            //this.googleMap.panTo()
            //this.googleMap.events.resize()
            this.coords = this.mapEle.getPan();
            this.MapOn = true;
        }
        else {
            //-------- Ensure Point is far enough -----//
            if (this.points.length == 1) {
                if ((this.points[0].lat == this.googleMap.getCenter().lat() && this.points[0].lng == this.googleMap.getCenter().lng()) || (Math.abs(this.points[0].x - this.coords.x) < 2 && Math.abs(this.points[0].y - this.coords.y) < 2)) {
                    var prompt = this.alertCtrl.create({
                        title: 'Too Close',
                        //subTitle: 'wowowow',
                        message: 'The points you select need to be farther away. The farther the points, the more accurate the approximation.',
                        buttons: ['Dismiss']
                    });
                    prompt.present();
                    this.points = [];
                    this.MapOn = false;
                    return;
                }
            }
            //----------------------------------------//
            this.points.push({
                lat: this.googleMap.getCenter().lat(),
                lng: this.googleMap.getCenter().lng(),
                x: this.coords.x,
                y: this.coords.y,
                scale: this.coords.scale
            });
            if (this.points.length == 2) {
                // reorder if necessary, left to right
                if (this.points[0].lat > this.points[1].lat) {
                    //console.log('re-order');
                    this.points = this.points.reverse();
                }
                this.storageData[this.hash(this.preview)] = this.points;
                this.storage.set("data", this.storageData);
                this.interpolatePoint();
                this.hidePrompt = false;
                setTimeout(function () {
                    _this.hidePrompt = true;
                }, 3000);
            }
            //console.log(this.points)
            this.MapOn = false;
        }
    };
    HomePage.prototype.thirdPoint = function (pointH, pointM, magABC) {
        // negative or not? 
        function calculate_third_point(Ax, Ay, Cx, Cy, a, b, c, A, B, C) {
            // What code goes here?
            var Arad = A; //* Math.PI/180; //degrees to radians
            //unit vector
            var uACx = (Cx - Ax) / b;
            var uACy = (Cy - Ay) / b;
            //rotated vector
            var uABx = uACx * Math.cos(Arad) - uACy * Math.sin(Arad);
            var uABy = uACx * Math.sin(Arad) + uACy * Math.cos(Arad);
            //B position uses length of edge
            var BxA = Ax + c * uABx;
            var ByA = Ay + c * uABy;
            //console.log(By);
            //vector rotated into another direction
            uABx = uACx * Math.cos(Arad) + uACy * Math.sin(Arad);
            uABy = -uACx * Math.sin(Arad) + uACy * Math.cos(Arad);
            //second possible position
            var BxB = Ax + c * uABx;
            var ByB = Ay + c * uABy;
            return [BxA, ByA, BxB, ByB];
        }
        return calculate_third_point(pointH[0], pointH[1], pointM[0], pointM[1], magABC[0], magABC[2], magABC[1], magABC[3], magABC[5], magABC[4]);
    };
    HomePage.prototype.getMissingCoord = function (pointH, pointM, magABC) {
        //console.log(pointH,pointM);
        var C = Math.sqrt(this.lenSquare(pointH, pointM));
        var A = Math.sin(magABC[3]) / Math.sin(magABC[5]) * C;
        var B = Math.sin(magABC[4]) / Math.sin(magABC[5]) * C;
        var transformedMagAngles = magABC;
        transformedMagAngles[0] = A;
        transformedMagAngles[1] = B;
        transformedMagAngles[2] = C;
        //console.log(magABC);
        // figure out negative or positive?
        //console.log(transformedMagAngles)
        return this.thirdPoint(pointH, pointM, transformedMagAngles);
    };
    HomePage.prototype.lenSquare = function (x, y) {
        var xDiff = x[0] - y[0];
        var yDiff = x[1] - y[1];
        return xDiff * xDiff + yDiff * yDiff;
    };
    HomePage.prototype.getMagAngles = function (pointA, pointB, pointC) {
        //console.log(pointA,pointB,pointC)
        // # Square of lengths be a2, b2, c2 
        var a2 = this.lenSquare(pointB, pointC);
        var b2 = this.lenSquare(pointA, pointC);
        var c2 = this.lenSquare(pointA, pointB);
        // # length of sides be a, b, c 
        var a = Math.sqrt(a2);
        var b = Math.sqrt(b2);
        var c = Math.sqrt(c2);
        //return [c,a,b]
        var alpha = Math.acos((b2 + c2 - a2) /
            (2 * b * c));
        var beta = Math.acos((a2 + c2 - b2) /
            (2 * a * c));
        var gamma = Math.acos((a2 + b2 - c2) /
            (2 * a * b));
        /*
          // # Converting to degree
            alpha = alpha * 180 / Math.PI;
            beta = beta * 180 / Math.PI;
            gamma = gamma * 180 / Math.PI;
        
        */
        return [a, b, c, alpha, beta, gamma];
    };
    HomePage.prototype.interpolatePoint = function (override) {
        var _this = this;
        if (override === void 0) { override = false; }
        if (this.points.length < 2 || !this.preview) {
            return;
        }
        if (!this.geodata) {
            //alert('No GeoData!!!');
            console.log('no geodata!!! SOS');
            if (!override) {
                setTimeout(function () {
                    if (_this.currentlocation.length == 0) {
                        _this.interpolatePoint(true);
                    }
                }, 4000);
            }
            return;
        }
        var data = this.geodata;
        //console.log(data);
        //console.log(this.currentlocation[0], this.currentlocation[1])
        if (data.coords.latitude == this.points[0].lat && data.coords.longitude == this.points[0].lng) {
            this.setDisplayLoc(this.points[0].x, this.points[0].y);
            return;
        }
        if (data.coords.latitude == this.points[1].lat && data.coords.longitude == this.points[1].lng) {
            this.setDisplayLoc(this.points[1].x, this.points[1].y);
            return;
        }
        var currLoc = this.getMissingCoord([this.points[0].x, this.points[0].y], [this.points[1].x, this.points[1].y], this.getMagAngles([this.points[0].lat, this.points[0].lng], [this.points[1].lat, this.points[1].lng], [data.coords.latitude, data.coords.longitude]));
        var m = (this.points[1].lng - this.points[0].lng) / (this.points[1].lat - this.points[0].lat);
        var b = this.points[0].lng - m * this.points[0].lat;
        if (data.coords.longitude > m * data.coords.latitude + b) {
            this.currLoc = [currLoc[0], currLoc[1]];
        }
        else {
            this.currLoc = [currLoc[2], currLoc[3]];
        }
        // conditional setting of correct point
        this.setDisplayLoc(this.currLoc[0], this.currLoc[1]); // set 0 and 1
        //this.mapEle.pan(this.currentlocation[0], this.currentlocation[1]);
        //this.mapEle.zoom(2, { animate: true })
    };
    HomePage.prototype.geoloc = function () {
        var _this = this;
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            var latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
            _this.lastLatLng = latLng;
            _this.geodata = data;
            _this.showPrompt = true;
            _this.interpolatePoint();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('mapImage'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "mapImage", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('marker'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "marker", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/ccj242/Desktop/YouAreHere/src/pages/home/home.html"*/'\n\n<!-- && -->\n\n<div class="landscape" *ngIf="landscape" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:white;z-index:9999;padding-left:2vw;padding-right:2vw">\n	\n<img class="main landscap" style="width:60vh !important;position:absolute;left:5vw;top:-1vw;max-width:35vw" src="assets/urhere.png">\n\n<div style="position:absolute;top:14%;width:33%">\n<div style="text-align:center;" class="txt">\n	<img style="width:8vw" src="assets/733524.svg">\n	<div style="font-size:2.5vw;padding-left:3vh;padding-right:3vh" >\nApp only works in portrait, rotate device to use.\n</div>\n  </div>\n</div>\n\n<div (click)="github()" style="position:absolute;top:14%;width:33%;right:0">\n<div style="text-align:center;cursor: pointer" class="txt">\n	<img style="width:8vw" src="assets/733553.svg">\n	<div style="font-size:2.5vw;padding-left:3vh;padding-right:3vh" >\nNon-Profit and Open-Source on GitHub\n</div>\n  </div>\n</div>\n<div class="row">\n  <div class="column">\n\n<div style="text-align:center" class="txt">\n	<img style="width:8vw" src="assets/138584.svg">\n	<div style="font-size:2.5vw;padding-left:3vh;padding-right:3vh" >\nSnap or upload a picture of any map or trail\n</div>\n  </div>\n</div>\n\n\n  <div class="column">\n  <div style="text-align:center" class="txt">\n	<img style="width:8vw" src="assets/856336.svg">\n	<div style="font-size:2.5vw;padding-left:3vh;padding-right:3vh" >\nSync two points with satellite imagery\n</div></div>\n  </div>\n  <div class="column">\n<div style="text-align:center"><!---->\n<img style="width:8vw" src="assets/1809437.svg">\n	<div style="font-size:2.5vw;padding-left:3vh;padding-right:3vh">\n\nWe use trigonometry to approximate your GPS location on your image\n</div>\n\n</div>\n  </div>\n</div>\n\n\n\n\n\n\n\n\n\n<div (click)="cmm()" class="txt" style="text-align:center;position:absolute;bottom:2.5vh;left:0;right:0"><img src="assets/cmm2.png" style="width:8vh">&nbsp;©Cinq-Mars Media 2020</div>\n	<div class="bck"></div>\n</div>\n\n\n\n<div *ngIf="(preview && !googleMap && !hide && errorWait) || error" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:white;z-index:9999">\n	\n<img class="main" src="assets/urhere.png">\n<!--<div style="text-align:center" ></div>-->\n<div style="width:100%;padding-left:2vh;padding-right:2vh;padding-top:30vh" >\n\n<div style="text-align:center">\n	<img style="width:9vh" src="assets/1541402.svg">\n	<div style="font-size:2.8vh" >\nThere was a fatal error. Ensure geolocation <b>permissions</b> are granted and that you are <b>online</b> on initialization to sync with Google Maps\n</div>\n</div>\n\n<div (click)="github()" style="text-align:center;padding-top:3vh">\n	<img style="width:9vh" src="assets/733553.svg">\n	<div style="font-size:2.8vh" >\nFor help or to raise an issue, check out the repo on <b>GitHub</b>.\n</div>\n</div>\n\n<div style="text-align:center;padding-top:4vh">\n	<div style="font-size:2.8vh" >\nError Code: {{preview?\'1\':\'0\'}}{{googleMap?\'1\':\'0\'}}{{hide?\'1\':\'0\'}}{{error?\'1\':\'0\'}}{{internet?\'1\':\'0\'}}{{trueError.code}}<br>\n{{trueError.message}}\n</div>\n</div>\n\n\n\n<button ion-button large class="custom-file-upload" (click)="refresh()" style="width:100%" >Try Again<b></b>\n</button>\n<div (click)="cmm()" class="txt" style="text-align:center;position:absolute;bottom:2.5vh;left:0;right:0"><img src="assets/cmm2.png" style="width:4vh">&nbsp;©Cinq-Mars Media 2020</div>\n	<div class="bck"></div>\n</div></div>\n\n\n\n\n<button *ngIf="preview && !hide && points.length<2" (click)="newCalibrate()" large style="position:absolute;left:0;right:0;margin-left:auto;margin-right:auto;bottom:15vh;margin:auto;z-index:98;background-color:#FF5461" ion-button>{{MapOn?"Sync Point":confirm?"Confirm Point":"Choose Point"}}&nbsp;<b>{{points.length+1}}</b></button>\n\n\n<button *ngIf="adjustIT" (click)="makeAdjust()" large style="position:absolute;left:0;right:0;margin-left:auto;margin-right:auto;bottom:15vh;margin:auto;z-index:98;background-color:#FF5461" ion-button><b>I\'m Actually Here</b></button>\n\n\n<button *ngIf="points.length==2 && preview" (click)="reset()" large style="position:absolute;left:0;margin-left:auto;margin-right:auto;top:4vh;z-index:98;background-color:#FF5461" ion-button>Reset</button>\n<!---->\n<button *ngIf="points.length==2 && preview && !adjustIT && adjustment[0]==0 && adjustment[1]==0 && !adjustParam" (click)="adjust()" large style="position:absolute;right:0;margin-left:auto;margin-right:auto;top:4vh;z-index:98;background-color:#FF5461" ion-button>Adjust</button>\n\n<button *ngIf="points.length==2 && preview && adjustIT && adjustment[0]==0 && adjustment[1]==0 && !adjustParam" (click)="adjust()" large style="position:absolute;right:0;margin-left:auto;margin-right:auto;top:4vh;z-index:98;background-color:#FF5461" ion-button>Cancel</button>\n\n<img src="assets/spin.svg" *ngIf="loader" style="position:absolute;top:0;right:0;left:0;bottom:0;margin:auto;width:80vw">\n <!-- opacity slider?-->\n \n<div class="bck"></div>\n<div style="background:white;width:100%;height:100%;position:absolute;top:0;left:0;z-index:-15"></div>\n<div *ngIf="preview && !hide && points.length<2" >\n<img style="position:absolute;left:0;right:5.5vw;margin:auto;top:0;bottom:0;width:45vw;z-index:99 !important;user-drag: none; \nuser-select: none;\n-moz-user-select: none;\n-webkit-user-drag: none;\n-webkit-user-select: none;\n-ms-user-select: none;pointer-events:none" src="assets/empty.svg">\n<div style="position:absolute;left:0;top:0;right:0;z-index:80;margin:auto;padding:2vw;text-align:center;padding-top:2vh;padding-bottom:3vh;background-color:#FF9CA4;font-size:3vh">Select the <b>{{points.length>0?\'second\':\'first\'}}</b> of two points to coordinate with google maps\n<div *ngIf="points.length==1" style="font-size:2vh;left:0;right:0;margin:auto;position:absolute;margin-top:.5vh">* The further the points, the more accurate</div>\n</div>\n\n</div>\n\n<img *ngIf="adjustIT" style="position:absolute;left:0;right:5.5vw;margin:auto;top:0;bottom:0;width:45vw;z-index:99 !important;user-drag: none; \nuser-select: none;\n-moz-user-select: none;\n-webkit-user-drag: none;\n-webkit-user-select: none;\n-ms-user-select: none;pointer-events:none" src="assets/youarehere.svg">\n\n<div *ngIf="!hide && !adjustIT" style="position:absolute;left:0;bottom:5vh;right:0;z-index:80;margin:auto;padding:5vw;text-align:center;font-size:2.5vh;color:white;text-shadow:2px 2px 5px #000;z-index:99"><b>swipe to pan & pinch to zoom</b></div>\n\n\n\n<div *ngIf="adjustIT" style="position:absolute;left:0;bottom:5vh;right:0;z-index:80;margin:auto;padding:5vw;text-align:center;font-size:2.5vh;color:white;text-shadow:2px 2px 5px #000;z-index:99"><b>move icon to current location</b></div>\n\n\n<div #map id="map" [ngStyle]="{\'opacity\':MapOn?1:0,\'pointer-events\':MapOn?\'auto\':\'none\'}" style="z-index: 95;"></div><!-- -->\n<div *ngIf="spinner" style="position:absolute;width:100%;height:100%;z-index:99 !important;background:rgba(0,0,0,.7)">\n<ion-spinner class="spin"  name="crescent"></ion-spinner>\n</div>\n\n\n\n\n\n\n\n<div id="expands" [ngClass]="{\'disable\':MapOn}" style="position:absolute;left:0;right:0;margin:auto;top:0;bottom:0;width:100%;" [hidden]="hide" *ngIf="preview" >\n<!--\n<img class="marker" *ngIf="currentlocation.length>0" [ngStyle]="{\'left\':currentlocation[0]+\'vw\',\'top\':currentlocation[1]+\'vw\',\'width\':markerWidth+\'vw\'}" src="/assets/marker.svg">\n-->\n\n<!---->\n\n\n\n<img #marker class="secondMarker" [ngStyle]="{\'left\':markerLeft+14+adjustment[0]+\'px\',\'top\':markerTop+10+adjustment[1]+\'px\',\'width\':\'15%\', \'opacity\':((currentlocation.length>0)?(!adjustIT?(1):(.5)):(0))}" src="assets/overlay.svg">\n\n\n<img #mapImage [src]="preview" style="position:absolute;left:0;right:0;margin:auto;top:0;bottom:0;width:100%;z-index:0 !important">\n</div>\n<!---->\n<div *ngIf="hide" style="z-index:99 !important;position:absolute; top:0; left:0">\n	\n<img class="main" src="assets/urhere.png">\n<!--<div style="text-align:center" ></div>-->\n<div style="width:100%;padding-left:3vh;padding-right:3vh;padding-top:30vh" >\n\n<div style="text-align:center" class="txt">\n	<img style="width:8vh" src="assets/138584.svg">\n	<div style="font-size:2.5vh" >\nSnap or upload a picture of any map or trail\n</div>\n\n\n<div style="text-align:center;padding-top:1vh" class="txt">\n	<img style="width:8vh" src="assets/856336.svg">\n	<div style="font-size:2.5vh" >\nSync two points with satellite imagery\n</div>\n<div style="text-align:center;padding-top:1vh"><!---->\n<img style="width:8vh" src="assets/1809437.svg">\n	<div style="font-size:2.5vh">\n\nWe use trigonometry to approximate your GPS location on your image\n</div>\n\n</div>\n	<!--\n<div style="padding-top:3vh">\n<img style="width:20vw" src="assets/856336.svg">\n\n<div style="float:right;width:55vw;font-size:2vh;padding-top:-5vh" ><b>\nSnap or upload a picture of any map or trail. Sync two points with corresponding satellite imagery.</b>\n</div>\n</div>\n\n<div style="padding-top:5vh;">\n<img style="width:20vw" src="assets/1809437.svg">\n<div style="float:right;width:55vw;padding-top:-1vh;font-size:2vh" ><b>\nWe use sophisticated trigonometry to approximate your GPS location atop the image you uploaded!</b>\n</div>\n\n</div>\n</div>\n\n-->\n</div>\n</div>\n\n\n</div>\n\n\n</div>\n<div *ngIf="hide" style="position:absolute;bottom:0vh;width:100%">\n<label ion-button large class="custom-file-upload" >Get Started<b></b>\n<input type="file" accept="image/*" (click)="start()" (change)="showPreview($event)">\n</label>\n<div (click)="cmm()" class="txt" style="text-align:center;position:absolute;bottom:2.5vh;left:0;right:0"><img src="assets/cmm2.png" style="width:4vh">&nbsp;©Cinq-Mars Media 2020</div>\n\n</div>\n<!---->\n\n\n'/*ion-inline-end:"/Users/ccj242/Desktop/YouAreHere/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(220);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/ccj242/Desktop/YouAreHere/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/ccj242/Desktop/YouAreHere/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[197]);
//# sourceMappingURL=main.js.map