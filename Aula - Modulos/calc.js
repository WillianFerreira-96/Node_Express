//Carregando os módulos no arquivo principal usando o "require"
var somaFunc = require('./functions/modulo-soma') //Endereço do arquivo 
var subFunc = require('./functions/modulo-sub') //Endereço do arquivo 
var multFunc = require('./functions/modulo-mult') //Endereço do arquivo 
var divFunc = require('./functions/modulo-div') //Endereço do arquivo 

console.log(somaFunc(2,3))
console.log(subFunc(7,4))
console.log(multFunc(2,5))
console.log(divFunc(6,3))