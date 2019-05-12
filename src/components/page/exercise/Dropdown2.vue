<template>
    <div class="ui main segment text center aligned container" style="margin-top: 90px;">
        <div id="menu" class="form" style="margin-top: 90px;margin-left: 100px; margin-right: 100px;">

            
            
            <form action="/buildExerciseAdd/" method="POST" enctype='multipart/form-data'>
                <div class='exeContainer ui form' id="e1">
                    <h2 class="ui center aligned icon header">
                        <i class="circular pencil alternate icon"></i>
                        Exercício de substituição de palavras
                    </h2>


                    <!-- Texto<input type='text' class='texto' value=''/>&nbsp;  -->

                    <div class="title">
                        <input name="titulo" type='text' placeholder="Digite o titulo do exercicio" required/>
                    </div>

                    <div class="field">
                        <textarea name="areaTexto" rows="6" class="texto" placeholder="Digite a frase aqui..." required></textarea>
                    </div>
                    
                    <div class="exe-cards ui  cards field">
                    <!--ESSE É O CARD XABLOCKS-->
                        <div class="ui card form keyWord">
                            <input type="file" name="ex1wo1" id="ex1wo1" required/>
                            <label class="lblFile" for="ex1wo1">
                                <i class='plus icon'></i>
                            </label>
                            <input name="palavra1" type='text' class='palavra' placeholder="Palavra #1" required/>
                        </div>
                    </div>
                    <!--FIM DO CARD XABLOCKS-->
                </div>
                <br>
                <div class="ui center aligned container">
                        <button class="ui big labeled icon green button" type="submit" name="gravar" value="Gravar">
                            <i class="save icon"></i>
                            Gravar  
                        </button>
                </div>
                <!--<input type="submit" name="gravar" value="Gravar" class="ui labeled icon button"/>-->
            </form>
            <!-- Texto<input type="text" class="texto" value="aa # aa # aa # aa # aa # aa # aa # aa # aa # aa # aa # aa # aa # aa # aa # aa # "/>&nbsp;
            Palavra<input type="text" class="palavra"/><br>  -->

        </div>
        <div class="ui center aligned basic segment">
            <div class="ui horizontal divider">
                Ou
            </div>
        </div>

        <div class="ui center aligned container">
                <button class="ui big labeled icon yellow button " id="sub" disabled>
                    <i class="eye icon"></i>
                    Visualizar
                </button>
        </div>



                <!--<div class="ui segment" id="content">-->
                <div class="ui segment text center aligned" id="result"></div>
                <div class="ui segment" id="ans"></div>

                <div id="successMessage">
                    <h2>You did it!</h2>
                    <button onclick="init()">Play Again</button>
                </div>
                <!--</div>-->
</div>
</template>

<script>
import JQuery from 'jquery'
import 'jquery-ui'
import 'jquery-ui-dist/jquery-ui.min'
import 'jquery-ui-dist/jquery-ui.css'

import {mapState} from 'vuex'
import axios from 'axios'
import {baseApiUrl, showError} from '@/global'

export default {
    name: 'Dropdown',
    computed: mapState(['user']),
    data: function(){
        return{
            exercise: {
                parameters:{}
            }
        }
    },
    methods:{
        insert(){
            const url = `${baseApiUrl}/exerciseComplete`
            this.exercise.nm_url = 'dragDrop.js'
            this.exercise.cd_professor = this.user.cpf
            
            axios.post(url, this.exercise)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.exercise= {
                        parameters:{}
                    }
                })
                .catch(showError)
        }
    },
    mounted(){
        
        //Pegando os parametros passados pela URL ----------------------------------------------------------------
        let params = window.location.search.substring(1).split('&');

        //Criar objeto que vai conter os parametros
        let paramArray = {};

        //Passar por todos os parametros
        for(let i=0; i<params.length; i++) {
            //Dividir os parametros chave e valor
            let param = params[i].split('=');

            //Adicionar ao objeto criado antes
            paramArray[param[0]] = param[1];
        }

        //Verificando se os parametros estão presentes ------------------------------------------------------------
        if(paramArray.gravar){
            
            this.exercise.ds_texto = paramArray.areaTexto.replace(/%20%23%20/g, ' # ').replace(/%20%23/g, ' #').replace(/%23%20/g, '# ')

            this.exercise.ds_classificacao = paramArray.titulo.replace(/%20/g, ' ')

            if(paramArray.palavra1){
                this.exercise.parameters.palavra1 = new Object()
                this.exercise.parameters.palavra1.nm_texto = paramArray.palavra1
                this.exercise.parameters.palavra1.ds_img = paramArray.ex1wo1
            }

            if(paramArray.palavra2){
                this.exercise.parameters.palavra2 = new Object()
                this.exercise.parameters.palavra2.nm_texto = paramArray.palavra2
                this.exercise.parameters.palavra2.ds_img = paramArray.ex1wo2
            }

            if(paramArray.palavra3){
                this.exercise.parameters.palavra3 = new Object()
                this.exercise.parameters.palavra3.nm_texto = paramArray.palavra3
                this.exercise.parameters.palavra3.ds_img = paramArray.ex1wo3
            }

            if(paramArray.palavra4){
                this.exercise.parameters.palavra4 = new Object()
                this.exercise.parameters.palavra4.nm_texto = paramArray.palavra4
                this.exercise.parameters.palavra4.ds_img = paramArray.ex1wo4
            }

            if(paramArray.palavra5){
                this.exercise.parameters.palavra5 = new Object()
                this.exercise.parameters.palavra5.nm_texto = paramArray.palavra5
                this.exercise.parameters.palavra5.ds_img = paramArray.ex1wo5
            }

            if(paramArray.palavra6){
                this.exercise.parameters.palavra6 = new Object()
                this.exercise.parameters.palavra6.nm_texto = paramArray.palavra6
                this.exercise.parameters.palavra6.ds_img = paramArray.ex1wo6
            }

            if(paramArray.palavra7){
                this.exercise.parameters.palavra7 = new Object()
                this.exercise.parameters.palavra7.nm_texto = paramArray.palavra7
                this.exercise.parameters.palavra7.ds_img = paramArray.ex1wo7
            }

            if(paramArray.palavra8){
                this.exercise.parameters.palavra8 = new Object()
                this.exercise.parameters.palavra8.nm_texto = paramArray.palavra8
                this.exercise.parameters.palavra8.ds_img = paramArray.ex1wo8
            }

            if(paramArray.palavra9){
                this.exercise.parameters.palavra9 = new Object()
                this.exercise.parameters.palavra9.nm_texto = paramArray.palavra9
                this.exercise.parameters.palavra9.ds_img = paramArray.ex1wo9
            }

            if(paramArray.palavra10){
                this.exercise.parameters.palavra10 = new Object()
                this.exercise.parameters.palavra10.nm_texto = paramArray.palavra10
                this.exercise.parameters.palavra10.ds_img = paramArray.ex1wo10
            }

            // this.insert()
            // window.history.pushState("", "", "/");
        }
        
        //JQuery --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        let $ = JQuery
        $(init);
        $(createExe);
        $(textOberver);

            var correctCards = 0;
            function init() 
            {
                
                    // Hide the success message
                    $('#successMessage').hide();
                    $('#successMessage').css({
                            left: '580px',
                            top: '250px',
                            width: 0,
                            height: 0
                        } 
                    );
                
                    // Reset the game
                    correctCards = 0;
                    $("#dvSource").html();
                    $("#dvDrop").html();

                $("#dvSource img").draggable({
                        containment: '#content',
                        stack: '#dvSource img',
                        cursor: 'move',
                        revert: true
                    }
                )
                
                $("#dvDrop div").droppable({
                        accept: '#dvSource img', //We use the accept option with the selector "#cardPile div" to ensure that the slot will only accept our number cards, and not any other draggable element.
                        hoverClass: 'hovered', //The hoverClass option adds a CSS class to a droppable when a draggable is hovered over it � we use this option to add a class of 'hovered' to the element, which we'll highlight using CSS.
                        drop: handleCardDrop
                    }
                )
                
                //create exercices forms
                $("#addExe").click(function(){
                    if($("#menu").find(".exeContainer").length < 10){
                        var fileIdGenerate = "ex" + ($(document).find(".exeContainer").length + 1) + "wo" + 1;
                                        $("#menu").append(
                                "<div class='exeContainer' id='e"+($(document).find(".exeContainer").length + 1)+"'>"
                            +	"<br>"
                            +	"<h4>Exercício " + ($(document).find(".exeContainer").length + 1) + "</h4>"
                                                +	"<textarea rows='6' cols='30' class='texto' placeholder='Digite a frase aqui...'></textarea>&nbsp;"
                            +	"<div class='keyWord'>"
                            +	"<input type='file' name='"+fileIdGenerate+"' id='"+fileIdGenerate+"'/>"
                            +       "<label class='' for='"+fileIdGenerate+"'><img class='ui fluid image' id='img"+fileIdGenerate+"' src='src/images/square-image.png'></label><br>"
                            +	"<input type='text' class='palavra' placeholder='Palavra "+1+"'/>&nbsp;"
                            +	"</div>"
                                                +	"</div>"
                        );
                        
                        textOberver();
                    }
                });
                
                $("#removeExe").click(function(){
                    if($("#menu").find(".exeContainer").length > 1){
                        $("#menu").find(".exeContainer").last().remove();
                    }
                });
                
                //create exercicio face
                $("#sub").click(function(){
                        
                    $("#result").css("display","flex").empty();
                    $("#ans").css("display","flex").empty();
                    
                    var exercisesLength = $("#menu").find(".exeContainer").length;
                    
                    for(var j = 0; j < exercisesLength; j++){
                        $("#result").append("<div class='exeUnit'></div>");
                        $("#result").find(".exeUnit").last().append("<div class='org'></div>")
                        var elemen = $(".exeContainer")[j];
                        var text = $(elemen).find(".texto").val().split(" ");
                        var getWordsCount = 0;
                        for(var i = 0; i < text.length; i++){
                            if(text[i] != "#"){
                                $("#result").find(".exeUnit").last().find("div").last().append(text[i] + " ");
                            }
                            else{
                                var getKeyWord = $(elemen).find(".keyWord")[getWordsCount];
                                $('<div class="wordSlot">  </div>').data( 'word', $(getKeyWord).find(".palavra").last().val() ).appendTo($("#result").find(".exeUnit").last()).droppable( {
                                    accept: '#ans div',
                                    hoverClass: 'hovered',
                                    drop: handleCardDrop
                                } );
                                
                                $("#result").find(".exeUnit").last().append("<div class='org' ></div>");
                                
                                                        var imgSrc = $("#imgex1wo"+(getWordsCount + 1)).prop("src") != undefined ? $("#imgex1wo"+(getWordsCount + 1)).prop("src") : "src/images/square-image.png";
                                
                                                        $("#ans").append(
                                        "<div class='wordContainer'>"
                                    +		"<img src='"+imgSrc+"' alt='Image' height='80' width='80'>"
                                    + 	"</div>"
                                );
                                $('<div class="wordObject">'+$(getKeyWord).find(".palavra").last().val()+'</div>').data( 'word', $(getKeyWord).find(".palavra").last().val() ).attr( 'id', 'card1' ).appendTo( $("#ans").find(".wordContainer").last() ).draggable( {
                                    containment: '#content',
                                    stack: '#ans div',
                                    cursor: 'move',
                                    revert: true
                                } );
                                
                                getWordsCount++;
                            }
                        }
                        
                        $("#result").append("<hr>");
                    }
                        
                        $("#result").find("hr").last().remove();
                    
                });
            
                }
                
                //---------# funções #-------------
                
                function createExe(){
                    
                }
                
                function textOberver(){
                    
                            $(".texto").on("input",function(){
                        var text = $(this).val().split(" ");
                        var hashLength = $(this).parent().parent().find(".exe-cards .keyWord").length;
                        var hashCount = 0;
                        for(var i = 0; i < text.length; i++){
                                            if(text[i] == "#"){
                                                    hashCount++;
                                                    if(hashCount > hashLength && hashCount <= 10){
                                                            var fileIdGenerate = "ex" + ($(this).parent().parent().attr("id").charAt(1)) + "wo" + hashCount;
                                                            

                                                            var container = $("<div class='ui card form keyWord'></div>");
                                                            $("<input required type='file'name='"+fileIdGenerate+"' id='"+fileIdGenerate+"'/>")
                                                                    .on("change",function(){
                                                                                $(this).parent().find("label i").remove();
                                                                                $(this).parent().find("label img").remove();
                                                                                $(this).parent().find("label").append($("<img class='ui fluid image' id='img"+fileIdGenerate+"' src='"+ URL.createObjectURL(event.target.files[0]) +"'/>"));
                                                                                //$("#img" + $(this).prop("name")).prop("src", URL.createObjectURL(event.target.files[0]));
                                                                    })
                                                                    .appendTo(container);
                                                            $("<i class='plus icon'></i>").appendTo($("<label class='lblFile'for='"+fileIdGenerate+"'></label>").appendTo(container));
                                                            //$("<img class='ui fluid image' id='img"+fileIdGenerate+"' src='src/images/square-image.png'/>").appendTo($("<label for='"+fileIdGenerate+"'></label>").appendTo(container));

                                                            $("<input required name='palavra"+(hashCount)+"' type='text' class='palavra' placeholder='Palavra "+(hashCount)+"'/>").appendTo(container);
                                                            $(this).parent().parent().find('.exe-cards').append(container);
                                                            
        //                                                        $(this).parent().append(
        //									"<div class='ui card form keyWord'>"
        //								+	"<input type='file' name='"+fileIdGenerate+"' id='"+fileIdGenerate+"'/>"
        //                                                                +	"<label class='' for='"+fileIdGenerate+"'><img class='ui fluid image' id='img"+fileIdGenerate+"' src='src/images/square-image.png'></label><br>"
        //                                                                +	"<input name='palavra"+(hashCount)+"' type='text' class='palavra' placeholder='Palavra "+(hashCount)+"'/>&nbsp;"
        //								+	"</div>"
        //							);

                                                            $("input[type = file]").on("change",function(){
                                                                $("#img" + $(this).prop("name")).prop("src", URL.createObjectURL(event.target.files[0]));
                                                            });
                                                    }

                                            }
                                    }
                                    if(hashLength > hashCount){
                                            for(var x = hashLength; x > hashCount; x--){
                                                    if($(this).parent().parent().find(".exe-cards .keyWord").length > 1){
                                                            $(this).parent().parent().find(".exe-cards .keyWord").last().remove();

                                                    }
                                            }
                                    }
                                    
                                    if(hashCount > 0){
                                        $("#sub").prop("disabled",false);
                                    }
                                    else{
                                        $("#sub").prop("disabled",true);
                                    }
                                                        
                                });
                }
                
                //validator drag and drop
                function handleCardDrop( event, ui ) 
                {
                    var slotNumber = $(this).data( 'word' );
                    var cardNumber = ui.draggable.data( 'word' );
                    
                    //alert(bDrag)	  
                    if ( cardNumber == slotNumber ) 
                    {
                        
                        //ui.draggable.addClass( 'correct' );
                        ui.draggable.draggable( 'disable' );// this line decrease opacity and disable.
                        $(this).droppable( 'disable' ); 
                        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
                        ui.draggable.draggable( 'option', 'revert', false ); // this line drop the element.
                        correctCards++;
                    } 
                    
                    // If all the cards have been placed correctly then display a message
                    // and reset the cards for another go
        
                    if ( correctCards == 8 ) 
                    {	
                        $('#successMessage').show();
                        $('#successMessage').animate({
                                left: '380px',
                                top: '200px',
                                width: '400px',
                                height: '100px',
                                opacity: 1
                            });
                    }
                }
            $("input[type = file]").on("change",function(){
                $(this).parent().find("label i").remove();
                $(this).parent().find("label img").remove();
                $(this).parent().find("label").append($("<img class='ui fluid image' id='img"+$(this).prop("name")+"' src='"+ URL.createObjectURL(event.target.files[0]) +"'/>"));
                //$("#img" + $(this).prop("name")).prop("src", URL.createObjectURL(event.target.files[0]));
            });  
            }
        }

</script>


<style>
    
</style>
