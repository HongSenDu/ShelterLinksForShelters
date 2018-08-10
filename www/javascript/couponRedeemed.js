var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months=["January","Febuary","March","April","May","June","July","August","September","October","November","December"];

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name=auth.currentUser.displayName;
    var img2 = document.getElementById('myimg2');
    if(user.photoURL==null){
      img2.src="../images/white.png";
    }else{
      img2.src = user.photoURL;
    }
    console.log(user.photoURL);
    console.log(name);
  }else {
    console.log("boi");
  }
});
(function(){
  db.collection("Coupons").where("isRedeemed", "==", true)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var ourData=doc.data();
      company=ourData.business;
      var today = new Date();
      var time=today.getHours()+":"+today.getMinutes();
      if (time.substring(0,time.indexOf(":"))<13){
        time+="AM";
      }else{
        time=(parseInt(time.substring(0,time.indexOf(":")))-12)+":"+time.substring(time.indexOf(":")+1)+"PM";
      }
      var day =today.getDay();
      var dayOfWeek=days[day];
      var mm = months[today.getMonth()]; //January is 0!
      var yyyy = today.getFullYear();
      today = dayOfWeek + ', ' + mm +" "+ day;
      $("#redeemed").append("<div class=\"center\"><img class=\"couponImage\" src=\""+ourData.image+"\"></div>"+
      "<h5 class=\"thanks\">Thank you for your commitment to the community. Here is your reward:</h5><br><h5 class=\"desc\">"+ourData.description+"</h5>"+
      "<h5 class=\"show\">Simply show this confirmation page to the cashier to use the coupon</h5>"+
      "<h3 class=\"scan\">Scanned on: "+today+" at "+time+"</h3>"+
      "<div class=\"logo\"><img class=\"smallLogos\" src=\"../images/smallLogo.png\"><img class=\"shelterlinkLogo\" src=\"../images/ShelterLinksLogo.png\"/></div>")
      return db.collection("Coupons").doc(doc.id).update({
        isRedeemed: false
      })
    });
  });
}());
