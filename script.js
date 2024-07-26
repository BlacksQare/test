window.onload=()=>{
  // window.onscroll=(e)=>{
  //   var body = document.body,
  //   html = document.documentElement;
  //   var height = Math.max( body.scrollHeight, body.offsetHeight, 
  //     html.clientHeight, html.scrollHeight, html.offsetHeight )+window.innerHeight;
  //   console.log(window.scrollY)
  //   console.log(window.innerHeight)
  //   preview.innerHTML=Math.floor((height-window.scrollY)/window.innerHeight)
  // }

  var preview_list=Array.from(document.getElementsByClassName("overview-element"))
  console.log(preview_list)
  var preview=document.getElementById("preview")
  var overview=document.getElementById("overview-container")
  var previewRect=preview.getBoundingClientRect()

  document.getElementById("notify-me-button").onclick=()=>{
    // console.log("tak")
    document.getElementById("notify-me").classList.add("notify-me-visible")
    document.getElementById("notify-me-container").classList.add("notify-me-container-visible")
  }

  document.getElementById("notify-me").onclick=(e)=>{
    console.log(e)
    if(e.target!=document.getElementById("notify-me")){
      return
    }
    document.getElementById("notify-me").classList.remove("notify-me-visible")
    document.getElementById("notify-me-container").classList.remove("notify-me-container-visible")
  }


  window.onscroll=async ()=>{
    currentScrollY=window.scrollY
    // notScrolling=false
    // if(timer !== null) {
    //   clearTimeout(timer);
    // }
    // timer = setTimeout(function() {
    //   notScrolling=true
    //   console.log(notScrolling)
    // }, 150);
    preview_list.forEach(element => {
      var bounding_rect=element.getBoundingClientRect()
      if(bounding_rect.top+bounding_rect.height/2>window.innerHeight/2-100
      && bounding_rect.top+bounding_rect.height/2<window.innerHeight/2+100){
        // element.style.opacity=1
        preview.src="imgs/"+(preview_list.indexOf(element)+1)+".png"
        element.classList.remove("overview-element-dim")
        element.classList.add("overview-element-visible")
      } else {
        element.classList.remove("overview-element-visible")
        // element.style.opacity=0.5
        if(bounding_rect.top+bounding_rect.height/2>window.innerHeight/2-200
        && bounding_rect.top+bounding_rect.height/2<window.innerHeight/2+200){
          // element.style.opacity=1
          element.classList.add("overview-element-dim")
        } else {
          element.classList.remove("overview-element-dim")
          // element.style.opacity=0.5
        }
      }
    });



    if(window.scrollY>150){
      if (window.scrollY>overview.getBoundingClientRect().height+window.innerHeight/4){
        // console.log(window.scrollY)
        preview.classList.add("preview-hidden")
        // preview.style.top=(overview.getBoundingClientRect().height+1.5*window.innerHeight-window.scrollY)+"px"
      } else {
        preview.classList.remove("preview-hidden")
        preview.classList.add("preview-center")
        preview.style.top=""
      }
      // preview.classList.add("preview-center")
    } else {
      preview.classList.remove("preview-center")
    }


    // if(window.scrollY>window.innerHeight/1.5){
    //   if(overview.getBoundingClientRect().height+window.innerHeight<=window.scrollY){
    //     if(preview.style.top=="75%"){
    //       preview.classList.add("preview-end")
    //     }
    //   } else{
    //     preview.classList.remove("preview-transition")
    //     if(!preview.classList.contains("preview-fixed")){
    //       // preview.classList.remove("preview-transition")
    //       preview.classList.add("preview-fixed")
    //       // await sleep(500)
    //       // blockTransition()
    //       // console.log("tatatat")
    //     }
    //     // preview.style.top=(window.scrollY+window.innerHeight/2)+"px"
    //   }
    // } else{
    //   if(preview.classList.contains("preview-fixed")){
    //     // preview.classList.remove("preview-transition")
    //     preview.classList.remove("preview-fixed")
    //     // taktaktaktaktkatk
    //   } else {
    //     // console.log(previewRect.top)
    //     if(currentScrollY<oldScrollY){
    //       console.log("top")
    //       if(!preview.classList.contains("preview-transition")){
    //         animationCompleted=false
    //         await sleep(500)
    //         preview.classList.add("preview-transition")
    //         animationCompleted=true
    //       }
    //     }
        
        
    //     if(animationCompleted){
    //       preview.style.top=(previewRect.top-window.scrollY+previewRect.height)+"px"
    //     }
    //     preview.style.top=""
    //   }
    // }
    // oldScrollY=currentScrollY
  }
}