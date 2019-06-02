<template>
    <div>
        <!-- <div>{{ paramsExercise }}</div> -->
        <div v-html="exercise_processed.phrase"></div>
        <br><br>
        <!-- <div>{{paramsExercise}}</div> -->
        <div class="words_area" v-html="exercise_processed.params"></div>
        <!-- <div class="empty">
        <div class="fill" draggable="true"></div>
        </div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div> -->
    </div>
    
</template>

<script>
// import JQuery from 'jquery'
// import 'jquery-ui'
// import 'jquery-ui-dist/jquery-ui.min'
// import 'jquery-ui-dist/jquery-ui.css'


import {baseApiUrl,showError} from '@/global'
import axios from 'axios'
// import { async } from 'q';
// import { Script } from 'vm';
// import { scrypt } from 'crypto';

export default {
    name: 'Viewexercise',
    data: function(){
        return{
            exercise: {},
            paramsExercise: [],
            exercise_processed: {
                'phrase': "",
                'params': ""
            }

        }
    },
    methods: {
        loadExercise(){
            const url = `${baseApiUrl}/exerciseComplete/${this.$route.params.id}`
            axios.get(url).then(res => {
                this.exercise = res.data;
                let phrase_split = this.exercise.ds_texto.split("#");
                let qt_params = this.exercise.ds_texto.split("#").length - 1;
                let new_phrase = "";

                [].map.call(phrase_split, function(obj, i){
                    new_phrase += obj;
                    new_phrase += i < qt_params ? "<div id='lacum_"+(i+1)+"' class='empty'></div>" : ""; 
                })
                 this.exercise_processed.phrase = new_phrase;
                 
                
            }).catch(showError)
            // .finally(() => this.construct_exercise())
        },
        async loadParansExercise(){
            const url = `${baseApiUrl}/exerciseComplete/params/${this.$route.params.id}`
            axios.get(url).then(res => {
                this.paramsExercise = res.data;
                let paramsDOM = "";
                 
                [].map.call(this.paramsExercise, obj =>{
                    let imageUrl = "data:image/jpeg;base64, "+obj.ds_img;
                    // paramsDOM += "<div><div id='word_"+obj.cd_parametro+"' class='fill' draggable='true'><img src='"+imageUrl+"'/></div><div>"+obj.nm_texto+"</div></div>"
                    paramsDOM += `<div class='words-container'><div><img src='${imageUrl}'/></div><div id='word_${obj.cd_parametro}' class='fill' draggable='true'>${obj.nm_texto}</div></div>`    
                });
                this.exercise_processed.params = paramsDOM;
            }).catch(showError)
            .finally(() => this.construct_exercise())
        },
        construct_exercise(){
            const filled = document.querySelectorAll('.fill');
            const empties = document.querySelectorAll('.empty');
            const finalScore = document.querySelectorAll('.fill').length;
            let score = 0;
            let word_hold;
            const self = this; //instanciando o vue;
            
            //loop throught empties and call drag events
            for(const empty of empties){
                empty.addEventListener('dragover', dragOver);
                empty.addEventListener('dragenter', dragEnter);
                empty.addEventListener('dragleave', dragLeave);
                empty.addEventListener('drop', dragDrop);
            }

            // Fill  Listeners
            for(const fill of filled){
                fill.addEventListener('dragstart', dragStart);
                fill.addEventListener('dragend', dragEnd);
            }
            

            //dragFunction
            function dragStart(){
                word_hold = this.id;
                this.className += ' hold';
                setTimeout(() => (this.className = 'invisible'), 0) ;
            }

            function dragEnd(){
                this.className = 'fill';
                
            }

            function dragOver(e){
                e.preventDefault();
            }

            function dragEnter(e){
                e.preventDefault();
                this.className += ' hovered';
            }

            function dragLeave(){
                this.className = 'empty';
            }

            function dragDrop(){
                this.className = 'empty';
                if(this.id == "lacum_" + word_hold.split("_")[1]){
                    this.append(document.getElementById(word_hold));
                    score++;
                    
                    if(finalScore == score)
                        self.exerciseDone();
                }
            }
            
        },
        exerciseDone(){
            //write what to do here jeff
        }
    },
    mounted: function(){
    this.loadExercise();
    this.loadParansExercise();
    }
}
</script>

<style>
body{
    /* background: darksalmon; */
}

div.fill{
    /* background-image: url('http://source.unsplash.com/random/150x150'); */
    position: relative;
    height: 35px;
    width: 125px;
    text-align: center;
    top: 0px;
    left: 0px;
    cursor: pointer;
    border: 3px dotted lightblue;
    border-radius: 5px;
}

div.empty{
    display: inline-block;
    height: 41px;
    width: 131px;
    margin: 0;
    border: 3px salmon solid;
    border-radius: 5px;
    background-color: white;
}

.lacuns_area{
    display: flex;
    flex-direction: row;
}

.lacuns_area .phrase{
    line-height: 40px;
    margin: 0 7px;
}

.hold {
    border: solid #ccc 4px;
}

.empty.hovered {
    background: #f4f4f4;
    border-style: dashed;
}

.invisible {
    display: none;
}

.words_area{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.words-container{
    width: 150px;
    display: flex;
    flex-direction: column;
}

.words_area div img,
.words_area div:first-child
/* .lacuns_area div  */
{
    position: relative;
    right: 3px;
    width: 134px;
    height: 130px;
    margin-bottom: 5px;
    
}

</style>
