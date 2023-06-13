/* Móviles: entre 320 y 480 píxeles.
Tablets: entre 768 y 1024 píxeles.
Pantallas grandes: más de 1200 píxeles. */
//properties and variables
let allow=true;
let expression='';
const texto=document.querySelector('.textarea');
const encriptar=document.querySelector('#encriptar');
const desencriptar=document.querySelector('#desencriptar');
const copiar=document.querySelector('#copiar');
const content=document.querySelector('.content');
const textoutput=document.querySelector('#textoutput');
//function to remove spaces

/* window.addEventListener('resize', function() {
    if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      
      textoutput.classList.add('hide');
    } else {
      element.classList.add('my-class');
    }
});
 */
const removeAccents = (texto) => {
    const normalized = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalized;
}
texto.addEventListener('input', () => {
    const originalValue = texto.value;
    const lowercaseValue = originalValue.toLowerCase();
    const nonAccents=removeAccents(lowercaseValue);
    
      texto.value =nonAccents;
    
  });
const removeSpaces=()=>{
    expression=texto.value;
    const processeedExpresion=expression.trim().replace(/\s+/g, " ");
    return processeedExpresion.split('');

}
// function to replace characters
 const replaceCharacters=(array)=>{
    const encripted=array.map(character=>{
        const encriptedMap={
            'a': 'ai',
            'e': 'enter',
            'i': 'imes',
            'o': 'ober',
            'u': 'ufat'
        };
        return encriptedMap[character]||character;
    })
    return encripted;
} 
// function to build a new encripted expression
const buildString=(array)=>{
    return array.join('');
}
// function to unencript the encript expression
const unEncript=(encripted)=>{
    const originalExpression=encripted.replace(/ai/g,'a')
                                            .replace(/enter/g,'e')
                                            .replace(/imes/g,'i')
                                            .replace(/ober/g,'o')
                                            .replace(/ufat/g,'u');
    textoutput.innerText=originalExpression;
    console.log(originalExpression);
    return originalExpression;                        
}
//function to hide and show elements in DOM
const showExpression=()=>{
        textoutput.innerText=expression;
        if(allow){
            textoutput.classList.toggle('hide');
            content.classList.toggle('hide');
            copiar.classList.toggle('hide');   
            allow=false;
        }
    

}
const copyClipBoard=(texto)=>{
    navigator.clipboard.writeText(texto)
    .then(() => {
      console.log('Texto copiado al portapapeles: ', texto);
    })
    .catch((error) => {
      console.error('Error al copiar el texto: ', error);
    });
}
// event listener for encript button
encriptar.addEventListener('click',()=>{
    if(texto.value==''){
        alert('debe ingresar un texto para encriptar');
    }else{
        const array=removeSpaces();
        const encripted=replaceCharacters(array);
        expression=buildString(encripted);
        console.log(expression);
        showExpression();
    }
})
//event listner for unencript button
desencriptar.addEventListener('click',()=>{
    expression=texto.value;
    console.log(expression);
    console.log(unEncript(expression)); 
})

copiar.addEventListener('click',()=>{
    
    textoutput.select();
    textoSeleccionado = textoutput.value.substring(
      textoutput.selectionStart,
      textoutput.selectionEnd
    );
    copyClipBoard(textoSeleccionado);
});
