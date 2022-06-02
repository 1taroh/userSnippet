function splitAndFormat(text){
  let arr = text.split(/\r\n|\n/);
  let formattedText = "";

  for(let i=0; i<arr.length; i++){
    formattedText += `        \"${arr[i]}\",\n`;
  }

  formattedText = formattedText.replace(/\\/g,`\\`+`\\`)
  formattedText = formattedText.replace(/\\\\\\\\/g,`\\\\\\\\\\\\`)
  // /->//, //->//////にしたい
  formattedText = formattedText.replace(/\t/g,`    `)
  return formattedText;
}

function buttonClick(){
  const CodeTitle = "hoge";
  const OriginalCode1 = "fuga";
  const OriginalCode2 = "foo";
  const OriginalTitle = title.value;
  const OriginalPrefix = prefix.value;
  const OriginalCode = reviewTextarea.value;
  
  let output =
  `\"${OriginalTitle}\":{ \n`+
  `    \"prefix\": \"${OriginalPrefix}\",\n`+
  `    \"body\": [\n`+
  splitAndFormat(OriginalCode)+
  `    ]\n`+
  `}\n`;

  msg.innerText = output;
}

function copyButtonClick(){
  let text = document.querySelector('#msg').innerText;
  //console.log(msg.innerText);
  if(text==undefined){
    alert("undefined!");
    return;
  }

  navigator.clipboard.writeText(text)
      .then(
          success => alert('Successfully copied!!'),
          error => alert('Failed to copy!!')
      );
  //console.log(text);
  //なぜかtextの値がundefinedになる->msgのvalueとinnerTextの違いだった．
}

let reviewTextarea = document.getElementById('reviewTextarea');
reviewTextarea.value = 'input your code';
let msg = document.getElementById('msg');

let checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', buttonClick);

const copyButton = document.querySelector('#copyButton')
copyButton.addEventListener('click', copyButtonClick)