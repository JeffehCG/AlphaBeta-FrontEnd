<template>
    <aside class="menu">
        <div class="options">
            <router-link to="/">
                <div class="button color1">
                    Inicio
                </div>
            </router-link>
            <router-link to = "/classroom">
                <div class="button color2">
                    Turmas
                </div>
            </router-link>
            <router-link to = "/listExercise">
                <div class="button color3">
                    Exercicios
                </div>
            </router-link>
            <router-link v-if="user.teacher" to = "/buildExercise">
                <div class="button color4">
                    Novo Exercicio
                </div>
            </router-link>
        </div>
    </aside>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'Menu',
    computed: mapState(['user']),
}
</script>

<style>
    .menu{
        grid-area: menu;
        background-color: #ccc;
        border-bottom: #0005 solid 1px;
        padding-top: 10px;
    }

    .menu .options{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .options .button{
        padding: 10px;
        border-radius: 10vh;
        font-size: 1.2rem;
        color: #fff;
        font-weight: 500;
        width: 150px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

        display: flex;
        justify-content: center;
    }
    .options a,
    .options a:hover{
        text-decoration: none;
    }
    .options a .color1{
        background-color: #fcb045;
    }

    .options a .color1:hover{
        background-color: #9c6619;
    }

    .options .color2{
        background-color: #fd1d1d;
    }

    .options .color2:hover{
        background-color: #921616;
    }

    .options .color3{
        background-color: #11baee;
    }

    .options .color3:hover{
        background-color: #1d626b;
    }

    .options .color4{
        background-color: #833ab4;
    }

    .options .color4:hover{
        background-color: #431761;
    }
    
</style>
