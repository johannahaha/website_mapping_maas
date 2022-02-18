<template>
    <div id="dataviz">
        <section id="intro">
            <h1 class="title">OUR WORLD IN KNOTS</h1>
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
        <section id="scrolly">
            <article>
                <div class="step" data-step="0">
                    <!-- <img class="left" :src="img_path" /> -->
                    <div class="quote">"Mobility is very important."</div>
                </div>
                <div class="step" data-step="1">
                    <div class="quote">"Mobility is very important."</div>
                </div>

                <div class="step" data-step="2">
                    <div class="quote">"Mobility is relevant for our future."</div>
                </div>
                <div class="step" data-step="3">
                    <div class="quote">"Mobility is relevant now."</div>
                </div>
                <div class="step" data-step="4">
                    <div class="quote">"Mobility is still relevant now."</div>
                </div>
                <div class="step" data-step="5">
                    <div class="quote">"Mobility is still relevant."</div>
                </div>
                <div class="step" data-step="6">
                    <div class="quote">Dieses Netzwerk ist "Freizeit"</div>
                </div>
                <div class="step" data-step="7">
                    <div class="quote">Dieses Netzwerk ist "zur arbeit gehen"</div>
                </div>
                <div class="step" data-step="8">
                    <div class="quote">Dieses Netzwerk ist "Einkaufen, Besorgung".</div>
                </div>
                <div class="step" data-step="9">
                    <div class="quote">Dieses Netzwerk ist "jemanden bringen, abholen"</div>
                </div>
                <div class="step" data-step="10">
                    <div class="quote">Dieses Netzwerk ist "nach hause"</div>
                </div>
                <div class="step" data-step="11">
                    <div class="quote">Mobilität</div>
                </div>
                <div class="step" data-step="12">
                    <div class="quote">Mobilität</div>
                </div>
                <div class="step" data-step="13">
                    <div class="quote">Mobilität"</div>
                </div>
                <div class="step" data-step="14">
                    <div class="quote">Ende"</div>
                </div>
            </article>
            <D3Network class="network" ref="network"/>
            <!-- -->
        </section>
        <section id="outro">
<<<<<<< Updated upstream
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
=======
            <D3BarChart :width="widthSvgBarChart" :height="heightSvg"/>
            <div id="outro_text">
                <div class="text">
                    <h3>
                        Mobility is individual
                    </h3>
                    <p>
                        Each of us has his or her personal mobility preferences. How do I move around in everyday life, perhaps to experience beautiful moments in nature in between? Which shops do I integrate into my routines because they might have the best bread rolls in town? Where do I have to be at what time, and therefore can't spare a minute? These decisions and connections are highly individual and often difficult to capture. However, with this survey data, we were able to gain insight into individual mobility and the unique motivations of the participants.
                    </p>
                    </div>    
                <div class="text">
                    <h3>
                        Mobility is sensitive
                    </h3>
                    <p>
                        Every startpoint and destination, every transferring time, and every change of means of transport reveal something about the individual person. Working with this kind of data made us more aware of what can possibly be done with all those data points and also how we can visualize them without attacking the privacy of participants in the study. That's why we choose to look at networks and the interconnectedness of means of mobility.
                    </p>
                </div>  
                <div class="text">
                    <h3>
                        Mobility is plural
                    </h3>
                    <p>
                    Our mobility behavior responds to various factors: the range of different means of transport, the availability and quality of public transport, our time budget, and, as can be seen well in the data, the current (pandemic) world situation.
                    Mobility, however, never remains one-dimensional: Being mobile in a city means moving between modes of movement, looking for a combination of modes that work well together and suit your individual needs. These connections of means of transport give us reason to take a close look: which transfer feels good, which waiting time annoying? How many rental bicycles are enough when everyone has to go to work in the morning?    
                    </p>
                </div>
>>>>>>> Stashed changes
            </div>
        </section>
    </div>
</template>

<script>
import "intersection-observer"; // for cross-browser support
//import Scrollama from 'vue-scrollama' // local registration in this example, can also be globally registered
import scrollama from "scrollama";

import D3Network from "../components/D3Network.vue";
import D3BarChart from "../components/D3BarChart.vue";

export default {
    components: {
        D3Network,
        D3BarChart
    },
    data() {
        return {
            img_path: "/img/nomadic-julien-wxLBz2kzY9c-unsplash.jpg",
            scroller: scrollama(),
            step: 0,
            progress: 0,
        };
    },
<<<<<<< Updated upstream
=======
    computed:{
        heightPx: function(){return this.height * 0.05 + "px"},
        paddingPx: function(){return this.height * 0.1 + "px"},
        widthSvg: function(){
            return this.width *0.66},
        heightSvg: function(){
            let height = this.height - this.onvertRemToPixels(2)
            return height
        },
        widthSvgBarChart:function(){
            return this.width *0.8},
    },
>>>>>>> Stashed changes
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
            this.step = response.index;
            response.element.classList.add("is-active");

<<<<<<< Updated upstream
            if([0,2,4,6,7,8,9,10].includes(this.step)){//this.step === 2 || this.step === 4 || this.step.in()){
                console.log("lets update graph")
=======
            let stepList = [0,3,5,8,13,21,22,23,24]
            
            if(step.direction === "down" && stepList.includes(this.step)){
>>>>>>> Stashed changes
                this.$refs.network.updateGraph(this.step)
            }

        },
        onProgress(step) {
            // console.log('progress', step)
            this.step = step.index;
            this.progress = step.progress;
        },
        onExit(response) {
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
    line-height: 1.5rem;
}

h1{
  font-size:2rem;
  left:0;
  padding: 1rem 0;
  margin-bottom: 10vh;
  //margin-left:5vw;
  color:$lightgreen;
}

#intro, #outro {
    z-index: 2;
    width: 60vw;       
    align-self: flex-start;
<<<<<<< Updated upstream
    margin: 5vh 10vw;
=======
    padding: 2rem 5vw;
    margin-bottom: 4rem;

    &_text{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items:flex-start;
        gap: 5vw;
    }


    .text{
        h3{
            padding: 2rem 0;
            font-family: Vollkorn;
            font-size:1.5rem;
        }
        p {
            padding: 2rem 0;
        }
    }

    
>>>>>>> Stashed changes

}


#scrolly {
    z-index: 2;
    display:flex;
    flex-direction: row;

    #sticky_overlay{
        position:sticky;
        bottom:0;
        right:0;
    }

    .network {
        position:sticky;
        width: 75vw;
        height: 100vh;
        // background-color: $darkgrey;
        z-index:0;
        right:0;
        top:0;

    }

    article{
        width: 24vw;
        position:relative;
        z-index: 1;
        pointer-events: none;
        left: 0;
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