<template>
    <div>
        <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
            integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
            crossorigin="anonymous"
        />
        <header>
            <a href="/" @click="reloadPage">Our Mobility in Knots</a>
        </header>
        <div id="language">
            <!-- <label for="language">Language:</label> -->
            <select name="language" id="language_button" @change="changeLanguage($event)">
                <option value="eng">English</option>
                <option value="de">Deutsch</option>
            </select>
        </div>
        <Dataviz :isEnglish="isEnglish" />
    </div>
</template>

<script>
import Dataviz from "./components/Dataviz.vue";

export default {
    name: 'App',
    metaInfo: {
        meta: [
            { charset: 'utf-8' },
            { name: 'Our Mobility in Knots', content: 'width=device-width, initial-scale=1' }
        ]
    },
    components: {
        Dataviz,
    },
    data() {
        return {
            language: "eng",
        };
    },
    computed: {
        isEnglish: function () {
            if (this.language === "eng") {
                return true;
            } 
            else if (this.language === "de") {
                return false;
            }
            return true;
        },
    },
    methods: {
        reloadPage() {
            window.location.reload();
        },
        changeLanguage(e) {
            this.language = e.target.value;
        },
    },
};
</script>

<style lang="scss">
@import "./assets/_config.scss";

* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

#app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $light;
    margin: 0;
    background-color: $darkgrey;
}

// #nav a {
//   font-weight: bold;
// }

#language {
    position:fixed;
    z-index: 3;
    right:0;
    margin: 5vw;

    &_button{
        -webkit-appearance:none;
        font-family:Vollkorn;
        color:$light;
        background-color: $darkgrey;
        border:2px solid $light;
        border-radius:1rem;
        padding:0.25rem;
    }
}

header {
    position: fixed;
    z-index: 3;
    background-color: $light;
    padding: 0.5rem;
    color: $darkgrey;
    display: block;
    text-align: left;
    border-radius: 1rem;
    font-family: Vollkorn;
    font-size: 1.3rem;
    margin: 5vw;
    margin-top: 2rem;

    a {
        text-decoration: none;
        color: $darkgrey;
    }
}
</style>
