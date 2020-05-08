import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController, Platform } from 'ionic-angular';
import Panzoom from '@panzoom/panzoom'
import { Storage } from "@ionic/storage";
//declae var panzoom;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  googleMap: any;
  @ViewChild('mapImage') mapImage: ElementRef;
  @ViewChild('marker') marker: ElementRef;
  mapHeight: number;
  mapWidth: number;
  markerLeft: number = 0;
  markerTop: number = 0;
  loader:any=false;
  geodata:any=null;
  storageData:any={};
  showPrompt:any=true;
  hidePrompt:any=false;
  preview: any;
  error:any=false;
  internet:any=window.navigator.onLine;
 points:any=[];
adjustment:any=[0,0];
adjustParam:any=null;
adjustIT:any=false;
shouldZoom:any=true;
errorWait:any=false;
trueError:any='';
displayLocSet:any=true;
displaySizeRel:any=[];
lastLatLng:any=null;
confirm:any=false;
landscape:any=false;
//scale:any=10;
  /*
  points: any = [
   { // right first if first
    "lat": 41.18200997540352,
    "lng": -73.8007367750116,
    "x": 174.29336938646838,
    "y": -107.83494519646536
  },
  {// wrong first if first
    "lat": 41.18711812720665,
    "lng": -73.79363083980881,
    "x": -78.72207641717644,
    "y": 89.5175158026719
  }
 
];
*/

  /**/
  mapEle: any;
  hide: any = true;
  currentlocation: any = [];
  spinner: any = false;
  currLoc = [];
  markerWidth = 12;
  MapOn = false;
  coords: any;

  public convertRelPan(x,y): Array<number>{

      this.mapWidth = this.mapImage.nativeElement.clientWidth;
      this.mapHeight = this.mapImage.nativeElement.clientHeight;
   
//console.log(this.mapHeight)

    return [50-x/this.mapWidth*100, 50-y/this.mapHeight*100];
  }

  private setMapDimensions(){

    this.orientation();

    if (this.landscape){return}

    if(this.mapImage&&this.mapImage.nativeElement&&this.marker&&this.marker.nativeElement){
      let markerWidth = this.marker.nativeElement.clientWidth;
      let markerHeight = this.marker.nativeElement.clientHeight;
      this.mapWidth = this.mapImage.nativeElement.clientWidth;
      this.mapHeight = this.mapImage.nativeElement.clientHeight;
      let marginTop = +document.defaultView.getComputedStyle(this.mapImage.nativeElement, "").getPropertyValue("margin-top").replace(/[^0-9\.\-]/g,'');
      if(this.currentlocation.length>0){
        this.markerLeft = (-1*this.currentlocation[0]*this.mapWidth+this.mapWidth/2-markerWidth/2);
        this.markerTop = (-1*this.currentlocation[1]*this.mapHeight+marginTop+this.mapHeight/2-markerHeight/2);
        this.mapEle.pan(this.currentlocation[0]*this.mapWidth, this.currentlocation[1]*this.mapHeight);
        //console.log(this.mapEle.getPan());
      }
     // console.log(marginTop, this.mapWidth, this.mapHeight, this.markerLeft, this.markerTop, markerWidth, markerHeight);
    }
  }







resumePWA(){
	if (this.points.length==2 && this.preview){
  this.shouldZoom=true;
  this.spinner=true;
  this.errorWait=false;
  this.geoloc();
}

}



  ngOnInit(){

this.platform.resume.subscribe((result)=>{

if (!this.hide){
  this.loadMap();
}



// loading iff points are whatever

})


    this.setMapDimensions();

    this.storage.get("data").then(val => {
      if (val) {

this.storageData=val;
//console.log(this.storageData)

      }
    })
  }
  constructor(public platform: Platform,private geolocation: Geolocation, public storage: Storage, public alertCtrl: AlertController) {
    window.onresize = this.setMapDimensions.bind(this);

if(window.navigator['standalone']===false){
  var msg = this.alertCtrl.create({
        title: 'Add to Homescreen',
        subTitle: 'This allows the app to run fullscreen',
        message:'<img src="assets/prompt.png">',
    buttons: ['Dismiss'] 

})
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

if (this.points.length==2){
  if (this.points[0].lat>this.points[1].lat){
          //console.log('re-order');
          this.points=this.points.reverse();
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

cmm(){
  window.open("https://cinqmarsmedia.com","_blank");

}

github(){
    window.open("https://github.com/cinqmarsmedia/urhere.io","_blank");
}




orientation(){

if (window.innerWidth>window.innerHeight){
this.landscape=true
}else{
this.landscape=false

}

}
adjust(){
 if (this.adjustIT){
  this.adjustIT=false; 
 }else{
this.adjustIT=true;
this.mapEle.zoom(10,{animate:true})
}
//.reset({ animate: false })

}



adjustFactor(num,scale,xy){

var factor=num;
var invert=false;

//this.displaySizeRel[0]

factor=Math.pow(factor,1/scale)
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
}

makeAdjust(){

// test by tracking event listener? I feel like one of the



var newLoc=this.mapEle.getPan();
//console.log(this.currLoc)
//console.log(newLoc)
var scale =this.mapEle.getScale();

// again, magic with scale, force zoom of 10 when adjusting?

var factor=3; // as a function of the image resolution?
var expectedPoint=this.convertRelPan(this.currLoc[0],this.currLoc[1]);
var actualPoint=this.convertRelPan(newLoc.x,newLoc.y);

//console.log(actualPoint)
//console.log(expectedPoint);
this.adjustment=[(actualPoint[0]-expectedPoint[0])*factor,(actualPoint[1]-expectedPoint[1])*factor];
//console.log(this.adjustment)
//this.adjustment=this.convertRelPan(newLoc.x-this.currLoc[0],newLoc.y-this.currLoc[1])
//this.adjustment=[this.adjustFactor(this.adjustment[0],scale),this.adjustFactor(this.adjustment[1],scale)]

this.mapEle.pan(newLoc.x, newLoc.y, { animate: true })
//console.log(this.adjustment)
this.adjustParam={x:(actualPoint[0]-expectedPoint[0]),y:(actualPoint[1]-expectedPoint[1]),factor:factor,dist:this.distClosestPoint(newLoc.x, newLoc.y),mapdiff:[newLoc.x-this.currLoc[0],newLoc.y-this.currLoc[1]]}
this.adjustIT=false;
// compare this.currLoc to ;



  // calculate shit for adjustment [1,1]
}

vecDist( x1, y1, x2, y2 ) {
  
  var   xs = x2 - x1
  var   ys = y2 - y1;    
  
  xs *= xs;
  ys *= ys;
   
  return Math.sqrt( xs + ys );
};


distClosestPoint(x,y){

 var firstPt=this.vecDist(x,y,this.points[0].x,this.points[0].y)
 var secondPt=this.vecDist(x,y,this.points[1].x,this.points[1].y)

 if (firstPt<secondPt){
   return firstPt
 }else{
   return secondPt
 }

}
reset(){
var prompt = this.alertCtrl.create({
        title: 'Start Over',
        //subTitle: 'wowowow',
        message:'Do you want to reset with a different picture or resync with the same picture and choose different points?',
        buttons: [
         {
            text: "Reset",
            handler: data => {
       
       if (typeof this.storageData[this.hash(this.preview)] !== 'undefined' && this.storageData[this.hash(this.preview)].length>1){
         delete this.storageData[this.hash(this.preview)];
       }


this.storage.set("data", this.storageData).then(val => {
  this.refresh()
    });
       
              



            }
          },
          {
            text: "ReSync",
            handler: data => {
             this.reSync();
          }
}]
})

prompt.present();
}

reSync(prompt:any=false){


  if (prompt && this.points.length>0){
var msg = this.alertCtrl.create({
        title: 'ReSync Needed',
        //subTitle: 'wowowow',
        message:'Your current position is off the map. A Resync is required. ',
    buttons: ['Dismiss'] 

})
msg.present();
  }
   this.points=[];
   this.currentlocation=[];
   this.showPrompt=true;
   this.adjustment=[1,1]
   this.hidePrompt=false;
   this.shouldZoom=true;
   this.errorWait=false;
   this.adjustParam=null;
}


hash(str){
var len=str.length
var hash= str[len-Math.ceil(len/2)]+str[len-Math.ceil(len/3)]+str[len-Math.ceil(len/4)]+str[len-Math.ceil(len/5)]+str[len-Math.ceil(len/6)]+str[len-Math.ceil(len/7)]+str[len-Math.ceil(len/8)]+str[len-Math.ceil(len/9)]+str[len-Math.ceil(len/10)]+str[len-Math.ceil(len/11)]+str[len-Math.ceil(len/12)]+str[len-Math.ceil(len/13)]+str[len-Math.ceil(len/14)];


return hash;


}

  showPreview(x) {
    if (x.target && x.target.files && x.target.files[0]) {
      let reader = new FileReader();
      reader.onloadstart=()=>{this.loader=true;}
      reader.onload = (e: any) => {
       
//console.log(e);
if (typeof e.target.result == 'undefined') { return }
var fromStorage=false;
        this.preview = e.target.result;
//console.log(this.preview);
//---------------------------------------

if (typeof this.storageData[this.hash(this.preview)] !== 'undefined' && this.storageData[this.hash(this.preview)].length>1){
  this.points=this.storageData[this.hash(this.preview)];
fromStorage=true;
}

        this.expandit(fromStorage);

      }


      reader.readAsDataURL(x.target.files[0]);
    }
  }

  expandit(fs:any=false) {

    if (fs){
      setTimeout(()=>{
        this.hidePrompt=false;
        setTimeout(()=>{
          this.hidePrompt=true;
        },3000)

 this.interpolatePoint();
 this.geoloc();
      },1000);
    }

    setTimeout(() => {
      this.mapEle = Panzoom(document.getElementById('expands'), {
        maxScale: 15,
        minScale: 1,
        step:1
      })

      this.mapEle.zoom(4, { animate: false })
      document.getElementById('expands').addEventListener('panzoomchange', (resp: any) => {

        if (this.adjustIT && resp.detail.scale !==10){
            this.mapEle.zoom(10)
        }

var Xscalar=.3245*Math.log(resp.detail.scale)+1.0593;
var Yscalar=1.0552*Math.log(resp.detail.scale)+1.462;
var width=window.innerWidth;
var height=window.innerHeight;

this.displaySizeRel=[width/Xscalar,height/Yscalar]

        if (Math.abs(resp.detail.x)>width/Xscalar || Math.abs(resp.detail.y)>height/Yscalar ){
          if (this.displayLocSet){
            //console.log('ohhhhh boy');

this.reSync(true)

          }else{
             this.mapEle.reset({ animate: true })
            console.log('reset');
          }
           
        }
       
        //this.scale=resp.detail.scale;
        this.markerWidth = 12 / Math.pow(resp.detail.scale, .8)
if(this.hidePrompt){
  this.showPrompt=false;
}

this.displayLocSet=false;
         // @ts-ignore
        //console.log(event.detail.scale) // => { x: 0, y: 0, scale: 1 }
      })
      //button.addEventListener('click', this.mapEle.zoomIn)
if (!(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent))){
document.getElementById('expands').parentElement.addEventListener('wheel', this.mapEle.zoomWithWheel)
}
      // debug
   setTimeout(()=>{
this.loader=false;
this.hide=false;
   },500)
   setTimeout(()=>{
     this.errorWait=true;
   },3000)

      //this.setDisplayLoc(this.points[0].x,this.points[0].y)
      //this.geoloc();

    }, 0); // hacky solution


  }




  start(){
//
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.error=false;
      //console.log(resp)
  this.geodata=resp;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

  this.lastLatLng=latLng

      //console.log(latLng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        rotateControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'],
        mapTypeControl:true,
        mapTypeControlOptions: {
          mapTypeIds:[google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN],
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER
        }
      }
      this.googleMap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

this.googleMap.setTilt(0);

this.geoloc();


    }).catch((error) => {

  console.log(error);

  this.trueError=error;
  this.error=true;
});
  }

refresh(){
  window.location.reload(true)
}

  setDisplayLoc(x, y) {
//console.log(x,y)
setTimeout(()=>{
    var realCoords=this.convertRelPan(x,y);

    //console.log(realCoords)
        this.setMapDimensions();
        this.currentlocation = [-1*(realCoords[0]-50)/100, -1*(realCoords[1]-50)/100];
        //console.log(this.currentlocation);
        this.setMapDimensions();
        this.displayLocSet=true;



var mapadjust
if (this.adjustParam){
var currdist=this.distClosestPoint(x,y)
var factor
if (currdist>this.adjustParam.dist){
  factor=this.adjustParam.factor;
}else{

factor=currdist/this.adjustParam.dist*this.adjustParam.factor

}



this.adjustment=[this.adjustParam.x*factor,this.adjustParam.y*factor];

mapadjust=[this.adjustParam.mapdiff[0]*factor,this.adjustParam.mapdiff[1]*factor]

}else{
  mapadjust=[0,0]
} 



        
        if (this.shouldZoom){
   this.mapEle.pan(x, y, { animate: true });
   if (this.adjustParam){
     this.mapEle.zoom(8, { animate: true });
   }else{
        this.mapEle.zoom(10, { animate: true });
        }
        this.shouldZoom=false;
        }else{
          var scale =this.mapEle.getScale();

          if (scale<3){
            this.mapEle.pan(x, y, { animate: true });
          }

          if (scale<2){
            this.mapEle.zoom(scale+1, { animate: true });
          }
        }
    
   },0)

  }


  newCalibrate() {
    if (typeof this.googleMap == 'undefined') {
      return;
    }
    //this.map.setCenter(new google.maps.LatLng(-34, 151)); updated geolocation



    if (!this.MapOn) {

if (this.mapEle.getScale()+1<7){
  this.confirm=true;
  this.mapEle.zoom(8, { animate: true })
  return;
}
  this.confirm=false;


       if (this.lastLatLng){
      this.googleMap.setCenter(this.lastLatLng)
      this.googleMap.setZoom(15)
    }  

    //this.googleMap.panTo()
      //this.googleMap.events.resize()
      this.coords = this.mapEle.getPan();
      this.MapOn = true;
    } else {

      //-------- Ensure Point is far enough -----//
      if (this.points.length==1){

if ((this.points[0].lat==this.googleMap.getCenter().lat() && this.points[0].lng==this.googleMap.getCenter().lng()) || (Math.abs(this.points[0].x-this.coords.x)<2 && Math.abs(this.points[0].y-this.coords.y)<2)){


var prompt = this.alertCtrl.create({
        title: 'Too Close',
        //subTitle: 'wowowow',
        message:'The points you select need to be farther away. The farther the points, the more accurate the approximation.',
    buttons: ['Dismiss'] 

})

prompt.present();
this.points=[];
this.MapOn=false;
return;

}


      }
      //----------------------------------------//


      this.points.push(
        {
          lat: this.googleMap.getCenter().lat(),
          lng: this.googleMap.getCenter().lng(),
          x: this.coords.x,
          y: this.coords.y,
          scale: this.coords.scale
        })

      if (this.points.length==2){
        // reorder if necessary, left to right

        if (this.points[0].lat>this.points[1].lat){
          //console.log('re-order');
          this.points=this.points.reverse();
        }


this.storageData[this.hash(this.preview)]=this.points;
        this.storage.set("data", this.storageData);

        this.interpolatePoint();
        this.hidePrompt=false;
        setTimeout(()=>{
          this.hidePrompt=true;
        },3000)
      }

      //console.log(this.points)
      this.MapOn = false;

    }




  }


  thirdPoint(pointH, pointM, magABC) {
    // negative or not? 

    function calculate_third_point(Ax, Ay, Cx, Cy, a, b, c, A, B, C) {


      // What code goes here?

      var Arad = A;//* Math.PI/180; //degrees to radians

      //unit vector
      var uACx = (Cx - Ax) / b;
      var uACy = (Cy - Ay) / b;

      //rotated vector
      var uABx = uACx * Math.cos(Arad) - uACy * Math.sin(Arad);
      var uABy = uACx * Math.sin(Arad) + uACy * Math.cos(Arad);

      //B position uses length of edge
      let BxA = Ax + c * uABx;
      let ByA = Ay + c * uABy;
      //console.log(By);
      //vector rotated into another direction
      uABx = uACx * Math.cos(Arad) + uACy * Math.sin(Arad);
      uABy = - uACx * Math.sin(Arad) + uACy * Math.cos(Arad);

      //second possible position
      let BxB = Ax + c * uABx;
      let ByB = Ay + c * uABy;


      return [BxA, ByA, BxB, ByB];
    }


    return calculate_third_point(pointH[0], pointH[1], pointM[0], pointM[1], magABC[0], magABC[2], magABC[1], magABC[3], magABC[5], magABC[4])

  }


  getMissingCoord(pointH, pointM, magABC) {
    //console.log(pointH,pointM);

    var C = Math.sqrt(this.lenSquare(pointH, pointM));

    var A = Math.sin(magABC[3]) / Math.sin(magABC[5]) * C

    var B = Math.sin(magABC[4]) / Math.sin(magABC[5]) * C

    var transformedMagAngles = magABC;
    transformedMagAngles[0] = A
    transformedMagAngles[1] = B
    transformedMagAngles[2] = C
    //console.log(magABC);
    // figure out negative or positive?
    //console.log(transformedMagAngles)
    return this.thirdPoint(pointH, pointM, transformedMagAngles)


  }

  lenSquare(x, y) {
    var xDiff = x[0] - y[0]
    var yDiff = x[1] - y[1]
    return xDiff * xDiff + yDiff * yDiff

  }

  getMagAngles(pointA, pointB, pointC) {
    //console.log(pointA,pointB,pointC)
    // # Square of lengths be a2, b2, c2 
    let a2 = this.lenSquare(pointB, pointC)
    let b2 = this.lenSquare(pointA, pointC)
    let c2 = this.lenSquare(pointA, pointB)

    // # length of sides be a, b, c 

    let a = Math.sqrt(a2);
    let b = Math.sqrt(b2);
    let c = Math.sqrt(c2);

    //return [c,a,b]

    let alpha = Math.acos((b2 + c2 - a2) /
      (2 * b * c));
    let beta = Math.acos((a2 + c2 - b2) /
      (2 * a * c));
    let gamma = Math.acos((a2 + b2 - c2) /
      (2 * a * b));

    /*  
      // # Converting to degree  
        alpha = alpha * 180 / Math.PI;  
        beta = beta * 180 / Math.PI;  
        gamma = gamma * 180 / Math.PI;  
    
    */
    return [a, b, c, alpha, beta, gamma]



  }


  interpolatePoint(override:any=false){

if (this.points.length < 2 || !this.preview) { return }

if (!this.geodata){
      //alert('No GeoData!!!');
console.log('no geodata!!! SOS');
if (!override){
setTimeout(()=>{

if (this.currentlocation.length==0){
  this.interpolatePoint(true)
}
},4000)}
      return;
    }

var data=this.geodata;

      //console.log(data);

      
      //console.log(this.currentlocation[0], this.currentlocation[1])

      if (data.coords.latitude == this.points[0].lat && data.coords.longitude == this.points[0].lng) {
        this.setDisplayLoc(this.points[0].x, this.points[0].y)
        return
      }
      if (data.coords.latitude == this.points[1].lat && data.coords.longitude == this.points[1].lng) {
        this.setDisplayLoc(this.points[1].x, this.points[1].y)
        return
      }



      var currLoc = this.getMissingCoord([this.points[0].x, this.points[0].y], [this.points[1].x, this.points[1].y], this.getMagAngles([this.points[0].lat, this.points[0].lng], [this.points[1].lat, this.points[1].lng], [data.coords.latitude, data.coords.longitude]));


var m=(this.points[1].lng-this.points[0].lng)/(this.points[1].lat-this.points[0].lat);

var b=this.points[0].lng-m*this.points[0].lat


if (data.coords.longitude>m*data.coords.latitude+b){
this.currLoc=[currLoc[0],currLoc[1]]
}else{
this.currLoc=[currLoc[2],currLoc[3]]
}



// conditional setting of correct point
this.setDisplayLoc(this.currLoc[0], this.currLoc[1]); // set 0 and 1
      //this.mapEle.pan(this.currentlocation[0], this.currentlocation[1]);
      //this.mapEle.zoom(2, { animate: true })

    

  }



  geoloc() {

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data: any) => {



      let latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
  this.lastLatLng=latLng
    

this.geodata=data;
this.showPrompt=true;
this.interpolatePoint();
    });

  }



}