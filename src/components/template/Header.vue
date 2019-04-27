<template>
    <header class="header">
        <div class="icon">
                <img src="../../assets/alphabeta2.png" alt="Alpha" height="80px">
        </div>
        <UserDropdown v-if="!hideUserDropdown"/>
    </header>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
    name: 'Header',
    components: {UserDropdown},
    props:{
        hideUserDropdown: Boolean
    }
}
</script>

<style>
    .header{
        grid-area: header;
        margin: 0;
        background: linear-gradient(to right, #fcb045,#fd1d1d, #833ab4 );

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header .icon{
        margin-left: 50px;
    }

    .user-dropdown{
        margin-right: 50px; 
    }
</style>
