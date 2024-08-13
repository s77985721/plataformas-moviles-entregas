const nodeList = document.querySelectorAll(".col-5 span");
const span = Array.from(nodeList)

function sumarPunto(e){

    span.forEach(element => {

        if(e.target.id == "localMas" && element.id == "local" ){

            let texto = element.innerText
            num = parseInt(texto)
            num = num + 1
            texto = toString(num)
            element.innerText = num

        }
        
        else if(e.target.id == "visitanteMas" && element.id == "visitante" ){

            let texto = element.innerText
            num = parseInt(texto)
            num = num + 1
            texto = toString(num)
            element.innerText = num

        }

    });
  
}
function quitarPunto(e) {

    span.forEach(element => {

        if(e.target.id == "localMenos" && element.id == "local" ){

            let texto = element.innerText
            num = parseInt(texto)
            if( num != 0 && num >= 0){
                num = num - 1
                texto = toString(num)
                element.innerText = num
            }

        }
        
        else if(e.target.id == "visitanteMenos" && element.id == "visitante" ){

            let texto = element.innerText
            num = parseInt(texto)
            if( num != 0 && num >= 0){
                num = num - 1
                texto = toString(num)
                element.innerText = num
            }
        }

    });
  
}

function reinicio(){

    const nodeButtons = document.querySelectorAll("button")
    const buttons = Array.from(nodeButtons)

    span.forEach(element => {
        element.innerText = "0"
    });
    
    buttons.forEach(element => {

        if( element.innerText == "Iniciar"){

            alert("El partido comenzo")
            element.innerText = "Reinicio"

        }

        if (!element.hasAttribute('onclick')) {
            
            if(element.id == "localMas" || element.id == "visitanteMas"){

                element.addEventListener("click", sumarPunto)

            }

            if(element.id == "localMenos" || element.id == "visitanteMenos"){

                element.addEventListener("click", quitarPunto)

            }
        }

    });

}

function intercambiar(){

    span.forEach(element => {
        
        if( element.id == "local" ){

           span.forEach(e => {

                if( e.id == "visitante" ){

                    visitante = e.innerText
                    e.innerText = element.innerText
   
                }

           });

        }
    
        else if( element.id == "visitante" ){

            span.forEach(e => {

                if( e.id == "local" ){
    
                    e.innerText = visitante
    
                }
    
               });

        }

    });
    
}

function finalizar(){

    const nodeButtons = document.querySelectorAll("button")
    const buttons = Array.from(nodeButtons)

    buttons.forEach(e => {

        if( e.id != "reinicio" && e.id != "intercambiar" && e.id != "fin"){
            
            e.removeAttribute("onclick")   

        }
        
        else if( e.id == "reinicio" ){
        
            e.innerText = "Iniciar"
        
        }

        if (!e.hasAttribute('onclick')) {

            e.removeEventListener("click", quitarPunto, false)
            e.removeEventListener("click", sumarPunto, false)
        
        }

    });
    
    span.forEach(e => {
        
        if( e.id == "local" ){

            localString = e.innerText
            localInt = parseInt(localString)

        }

        else if( e.id == "visitante" ){

            visitanteString = e.innerText
            visitanteInt = parseInt(visitanteString)

        }

    });
            
    if( localInt > visitanteInt){

        alert("El partido termino, gano el local")

    }


    else if( visitanteInt > localInt){

        alert("El partido termino, gano el visitante")

    }

    else if( visitanteInt == localInt){

        alert("El partido termino, Empate")

    }



}