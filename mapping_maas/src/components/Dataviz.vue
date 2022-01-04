<template>
    <div id="dataviz">
        <section id="intro">
            <h1 class="title">Dataviz: Mapping Maas</h1>
            <div class="text">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in
                hendrerit in vulputate velit esse molestie consequat, vel illum
                dolore eu feugiat nulla facilisis at vero eros et accumsan et
                iusto odio dignissim qui blandit praesent luptatum zzril delenit
                augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor
                sit amet
            </div>
            <D3Network/>
        </section>
        <section id="scrolly">
            <Network id="network"/>
            <article>
                <div class="step" data-step="1">
                    <img class="left" :src="img_path" />
                </div>
                <div class="step" data-step="2">
                    <div class="quote">"Mobility is very important"</div>
                </div>

                <div class="step" data-step="3">
                    <div class="quote">"Mobility is relevant for our future."</div>
                </div>
                <div class="step" data-step="4">
                    <div class="quote">"Mobility relevant now."</div>
                </div>
            </article>
        </section>
        <section id="outro">
            <div class="text">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in
                hendrerit in vulputate velit esse molestie consequat, vel illum
                dolore eu feugiat nulla facilisis at vero eros et accumsan et
                iusto odio dignissim qui blandit praesent luptatum zzril delenit
                augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor
                sit amet
            </div>
        </section>
    </div>
</template>

<script>
import "intersection-observer"; // for cross-browser support
//import Scrollama from 'vue-scrollama' // local registration in this example, can also be globally registered
import scrollama from "scrollama";

import Network from "../components/Network.vue";
import D3Network from "../components/D3Network.vue";

export default {
    components: {
        Network,
        D3Network
    },
    data() {
        return {
            img_path: "/img/nomadic-julien-wxLBz2kzY9c-unsplash.jpg",
            scroller: scrollama(),
            step: 0,
            progress: 0,
        };
    },
    mounted() {
        this.scroller
            .setup({
                step: "#scrolly article .step",
                offset: 0.5,
                progress: true,
                debug: false,
            })
            .onStepEnter(this.onEnter)
            .onStepProgress(this.onProgress)
            .onStepExit(this.onExit);
    },
    methods: {
        onEnter(response) {
            console.log("enter", response);
            this.step = response.index;
            response.element.classList.add("is-active");
        },
        onProgress(step) {
            // console.log('progress', step)
            this.step = step.index;
            this.progress = step.progress;
        },
        onExit(response) {
            console.log("exit", response);
            this.step = response.index;
            response.element.classList.remove("is-active");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_config.scss";

#dataviz {
    position: relative;
    display: flex;
    flex-direction: column;
}

h1{
  font-size:2rem;
  left:0;
  padding: 1rem 0;
  margin-left:5vw;
  color:$lightgreen;
}

#intro, #outro {
    z-index: 2;
    width: 60vw;       
    align-self: flex-start;
    margin: 5vw;

}


#scrolly {
    z-index: 2;

    #network {
        position:sticky;
        width: 100vw;
        height: 100vh;
        background-color: $darkgrey;
        z-index:0;
        top: 5vh;

    }

    article{
        position:relative;
        z-index: 1;
    }

    .text {
        z-index:2;
    }

    img {
        width: 60vw;
        margin: 5vw;

        &.left {
            align-self: flex-start;
        }

        &.right {
            align-self: flex-end;
        }
    }


    .quote {
        align-self: center;
        font-size: 2rem;
        font-style: italic;
        margin: 5vh 10vh;
        margin-top:100vh;
    }


    .step.is-active {
        color: $lightgreen;
    }

}
</style>