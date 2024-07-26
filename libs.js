let subnets=[
  "192.168.",
  "172.16.",
  "10.0"
]

let device_list={}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function injectHTML(dom_element="main", docs_file){
  document.scrollingElement.scrollTop=0
  document.getElementById(dom_element).style.opacity="0"
  await sleep(150)
  await fetch(docs_file)
  .then(response=> response.text())
  .then(text=> document.getElementById(dom_element).innerHTML = text);
  await sleep(150)
  document.getElementById(dom_element).style.opacity="1"
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return ""
}

function checkIP(ip, callback, timeout=5000){
  // console.log(ip)
  fetchWithTimeout("http://"+ip+"/qclocktest", {timeout: timeout})
  .then(response=> response.text())
  .then(text=>{
    // if(text=="success"){
    //   callback(ip)
    // }
    callback(ip, text)
  })
  .catch(error =>{
    callback("")
    // console.log("cos")
    // error_callback()
  })
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);

  return response;
}

function ping(ip, callback) {
  if (!this.inUse) {
    this.status = 'unchecked';
    this.inUse = true;
    this.callback = callback;
    this.ip = ip;
    var _that = this;
    this.img = new Image();
    this.img.onload = function () {
    _that.inUse = false;
    _that.callback('responded');

    };
    this.img.onerror = function (e) {
    if (_that.inUse) {
      _that.inUse = false;
      _that.callback('responded', _that.ip, e);
    }

    };
    this.start = new Date().getTime();
    this.img.src = "http://" + ip;
    this.timer = setTimeout(function () {
      if (_that.inUse) {
        _that.inUse = false;
        _that.callback('timeout');
      }
    }, 1500);
  }
}

function performScan(){
console.log("scan start")
this.ip_list=[]
for (s in subnets){
  for(x=0; x<255; x++){
    let test_ip=subnets[s]+String(x)+"."+"1"
    ping(test_ip, (status, test_ip)=>{
    this.test_ip=test_ip.slice(0, -1)
    if(status=="responded"){
      for(y=0; y<255; y++){
        checkIP(this.test_ip+y, (ip, hostname)=>{
          if(ip==""){
            return
          }
          this.ip_list.push(ip)
          device_list[ip]=hostname
          // showDeviceListItem(ip, hostname)
        })
      }
    }
    })
  }
}
// ip_list=this.ip_list
// console.log(this.ip_list)
// callback(this.ip_list);
}

function isElementInViewport (el) {

  // Special bonus for those using jQuery
  // if (typeof jQuery === "function" && el instanceof jQuery) {
  //     el = el[0];
  // }

  var rect = el.getBoundingClientRect();
  var parent=el.parentElement

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
}
  