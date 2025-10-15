function getKeys(){
  let key = "hf_JSohQLNTfaUqHsXtxhXgbh"
  let key2 = "VlPuGfQpOIxY"
  return key+key2
}
async function askGPT(params) {
  key = getkeys()
  const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer "+key,  // ❌ DANGER
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: [
        { role: "system", content: "You are a cybersecurity teacher" },
        { role: "user", content: params }
      ]
    })
  });
  const data = await response.json();
  alert("responded")
  return data.choices[0].message.content;
  
}


async function RunGpt() {
    var inputval = document.getElementById("inp")
    let value = inputval.value
    inputval.value = ""
    var response = await askGPT(value.trim())
    
    console.log(response)
    var contentWriter= ""
    response = response.split(".");
    let para = document.getElementById("disp");
      if (!para) {
        para = document.createElement("p");
        para.id = "disp";
        document.body.appendChild(para);
      }
    
    for (let i = 0; i < response.length; i++) {
        let sentence = response[i].trim();
        if (sentence) {
          contentWriter += sentence + ".<br><br>";
          para.innerHTML = contentWriter;

          // wait 400ms between lines
          await new Promise(resolve => setTimeout(resolve, 400));
        }
      }

}


