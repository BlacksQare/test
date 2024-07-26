async function showConfig(ip, hostname){
  await injectHTML("main", "config/config.html");

  // document.getElementById("font-input").onchange=async (e)=>{
  //   console.log(e.target.value);
  //   fetch("http://"+ip+"/font?f="+e.target.value);
  // }
  
  // document.getElementById("brightness-input").onchange=async (e)=>{
  //   console.log(e.target.value);
  //   fetch("http://"+ip+"/brightness?b="+e.target.value);
  // }
  
  // document.getElementById("color-input").onchange=async (e)=>{
  //   console.log(hexToRgb(e.target.value));
  //   fetch("http://"+ip+"/color?r="+hexToRgb(e.target.value).r+"&g="+hexToRgb(e.target.value).g+"&b="+hexToRgb(e.target.value).b);
  // }
  
  // document.getElementById("animation-input").onchange=async (e)=>{
  //   console.log(e.target.value);
  //   fetch("http://"+ip+"/animation?a="+e.target.value);;
  // }
  
  // document.getElementById("decorators-input").onchange=async (e)=>{
  //   console.log(e.target.value);
  //   fetch("http://"+ip+"/decorators?v="+e.target.value);
  // }
  
  // document.getElementById("decorators-opacity-input").onchange=async (e)=>{
  //   console.log(e.target.value);
  //   fetch("http://"+ip+"/decorators?o="+e.target.value);
  // }
  
  // document.getElementById("seconds-input").onchange=async (e)=>{
  //   console.log(e.target.value);
  //   fetch("http://"+ip+"/seconds?v="+e.target.value);
  // }
  
  // document.getElementById("seconds-opacity-input").onchange=async (e)=>{
  //   console.log(e.target.value);
  //   fetch("http://"+ip+"/seconds?o="+e.target.value);
  // }
  
  // document.getElementById("timeformat-input").onchange=async (e)=>{
  //   console.log(e.target.value);
  //   fetch("http://"+ip+"/timeformat?v="+e.target.value);
  // }
  
  // document.getElementById("timeoffset-input").onchange=async (e)=>{
  //   console.log(e.target.value);
  //   fetch("http://"+ip+"/timeoffset?v="+e.target.value);
  // }




  document.getElementById("font-input").onchange=async (e)=>{
    console.log(e.target.value);
    fetch("http://"+ip+"/config/set?opt=font&v1="+e.target.value);
  }
  
  document.getElementById("brightness-input").onchange=async (e)=>{
    console.log(e.target.value);
    fetch("http://"+ip+"/config/set?opt=brightness&v1="+e.target.value);
  }
  
  document.getElementById("color-input").onchange=async (e)=>{
    console.log(hexToRgb(e.target.value));
    fetch("http://"+ip+"/config/set?opt=color&v1="+hexToRgb(e.target.value).r+"&v2="+hexToRgb(e.target.value).g+"&v3="+hexToRgb(e.target.value).b);
  }
  
  document.getElementById("animation-input").onchange=async (e)=>{
    console.log(e.target.value);
    fetch("http://"+ip+"/config/set?opt=animation&v1="+e.target.value);;
  }
  
  document.getElementById("decorators-input").onchange=async (e)=>{
    console.log(e.target.value);
    fetch("http://"+ip+"/config/set?opt=decorators&v1="+e.target.value);
  }
  
  document.getElementById("decorators-opacity-input").onchange=async (e)=>{
    console.log(e.target.value);
    fetch("http://"+ip+"/config/set?opt=decorators-o&v1="+e.target.value);
  }
  
  document.getElementById("seconds-input").onchange=async (e)=>{
    console.log(e.target.value);
    fetch("http://"+ip+"/config/set?opt=seconds&v1="+e.target.value);
  }
  
  document.getElementById("seconds-opacity-input").onchange=async (e)=>{
    console.log(e.target.value);
    fetch("http://"+ip+"/config/set?opt=seconds-o&v1="+e.target.value);
  }
  
  document.getElementById("timeformat-input").onchange=async (e)=>{
    console.log(e.target.value);
    fetch("http://"+ip+"/config/set?opt=timeformat&v1="+e.target.value);
  }
  
  document.getElementById("timeoffset-input").onchange=async (e)=>{
    console.log(e.target.value);
    fetch("http://"+ip+"/config/set?opt=timeoffset&v1="+e.target.value);
  }
}