

function showCodeInput(){
  let code_inputs=["", "", "", ""]
  let converted_code="";

  if(getQueryVariable("c")!=""){
    alert(getQueryVariable("c"))
    // console.log()
  }

  Array.from(document.getElementsByClassName("code-input")).forEach((input)=>{
    input.value=""
    let index=Array.from(document.getElementsByClassName("code-input")).indexOf(input)
    input.oninput=()=>{
      document.documentElement.style.setProperty('--border-state', 'var(--border-off-color)');
      document.getElementById("enter-config-button").style.opacity="0"
      document.getElementById("enter-config-button").onclick=()=>{}
      let regEx = /^[0-9a-fA-F]+$/;
      let isHex = regEx.test(input.value);
      let all_submited=true
      converted_code=""
      if(!isHex) {
        input.value = input.value.slice(0, -1);
        return
      }
  
      code_inputs[index]=input.value
      code_inputs.forEach((value)=>{
        if(value.length<2){        
          all_submited=false
        }
      })
  
      if(all_submited){
        code_inputs.forEach((value)=>{
          converted_code=converted_code+String(parseInt(value, 16))+"."
        })
        converted_code=converted_code.substring(0, converted_code.length - 1);
        console.log("Checking: "+converted_code)
        checkIP(converted_code, (ip, hostname)=>{
          if(ip==""){
            document.documentElement.style.setProperty('--border-state', 'var(--color-red)');
            document.getElementById("enter-config-button").style.opacity="0"
            return
          }
          document.documentElement.style.setProperty('--border-state', 'var(--color-green)');
          document.getElementById("hostname").innerHTML=hostname;
          document.getElementById("enter-config-button").innerHTML="Konfiguracja "+hostname
          document.getElementById("enter-config-button").style.opacity="1"
          document.getElementById("enter-config-button").onclick=()=>{
            showConfig(ip, hostname);
          }
  
        }, 1000)
      }
  
      if(input.value.length==2){
        if(index==3){
          document.activeElement.blur()
          return
        }
        Array.from(document.getElementsByClassName("code-input"))[index+1].focus()
      }
    }
  
    input.addEventListener('keydown', function (event) {
      if (event.code == 'Delete' || event.code == 'Backspace' || event.key == 'Delete' || event.key == 'Backspace') {
        if(input.value.length==0){
          if(index==0){
            document.activeElement.blur()
            return
          }
          Array.from(document.getElementsByClassName("code-input"))[index-1].focus()
        }    
      }
    });
  })
}

function showDeviceListItem(ip, hostname){
  console.log(document.getElementById("pre-device-list-item"))
  let c_list_item=document.getElementById("pre-device-list-item")
  let org_list_item=c_list_item.outerHTML
  c_list_item.getElementsByClassName("qclock-id")[0].innerHTML=hostname
  c_list_item.id=""

  document.getElementById("device-list-container").appendChild(c_list_item)
  document.getElementById("future-container").innerHTML+=org_list_item
}

function handleArrow(){
  if(document.getElementById("device-list-container").childElementCount!=0){
    document.getElementById("hide-arrow-container").classList.add("hide-arrow-shown")
  } else {
    document.getElementById("hide-arrow-container").classList.remove("hide-arrow-shown")
  }
}

async function scanNetwork(){
  while(true){
    performScan()
    await sleep(10000)
    document.getElementById("device-list-container").innerHTML=""
    for ([ip, hostname] of Object.entries(device_list)){
      showDeviceListItem(ip,hostname)
    }
    device_list={}
  }
}

function showStep(step){
  let c_step=document.getElementById("pre-step-"+step)
  c_step.id="step-"+step
  document.getElementById("step-container").innerHTML=c_step.outerHTML
}

window.onload=async ()=>{
  let search_hidden=false
  document.getElementById("hide-arrow-container").onclick=()=>{
    if(search_hidden){
      document.getElementById("device-list-container").classList.remove("device-list-container-hidden")
      document.getElementById("hide-arrow-element").classList.remove("hide-arrow-up")
      search_hidden=false
    } else {
      document.getElementById("device-list-container").classList.add("device-list-container-hidden")
      document.getElementById("hide-arrow-element").classList.add("hide-arrow-up")
      search_hidden=true
    }
  }

  showStep(1)
  scanNetwork()
  // showDeviceListItem()
  // showDeviceListItem()
  // showDeviceListItem()
  // showDeviceListItem()
  // showDeviceListItem()
  // showDeviceListItem()
  handleArrow()
  // window.setInterval(performScan(),10000)
  // await sleep(1000)
  // showStep(2)
}