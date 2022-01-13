<template>
    <div id="dataviz">
        <section id="intro">
            <h1 class="title">OUR WORLD IN KNOTS</h1>
            <div class="text">
                <h3>
                    Mobilität ist individuell 
                </h3>
                <p>
                    Jede:r von uns hat ihre/seine ganz persönlichen Mobilitätsvorlieben. Wie bewege ich mich im Alltag, um zwischendurch vielleicht auch schöne Momente in der Natur zu erleben? Welche Orte integriere ich in meine Routinen, weil es dort vielleicht die besten Brötchen der Stadt gibt? Wo muss ich zu welchem Zeitpunkt sein, und kann deshalb keine Minute erlauen? Diese Entscheidungen und Verbindungen sind sehr individuell und oft nur schwer erfassbar. Mit diesen Befragungsdaten konnten jedoch einen Einblick in die individuelle Mobilität und die einzigartigen Beweggründe der Teilnehmer:innen bekommen.
                </p>

                <h3>
                    Mobilität ist sensibel
                </h3>
                <p>
                Jeder Ziel- und Endpunkt, jede Umstiegsuhrzeit und jeder Verkehrsmittelwechsel verrät etwas über die einzelne Person. Mit den Erkenntnissen, die wir zu moderner Überwachung durch private Firmen wie auch Staaten haben zeigt sich die Sprengkraft der Daten, die Anbieter wie Google, Facebook oder E-Scooter-Anbieter sammeln. Diese Daten sind besonders wertvoll und sollten auch besonders geschützt werden - dies erfordert spezielle Maßnahmen wie ein Verbot zur Nutzung von Daten für Werbezwecke bei der Ausschreibung von MAAS-Stationen.
                </p>

                <h3>
                    Mobilität ist plural
                </h3>
                <p>
                Unser individuelles Mobilitätsverhalten reagiert auf verschiedene Faktoren: Das Angebot an verschiedenen Verkehrsmitteln, die Verfügbarkeit und Taking des öffentlichen Nahverkehrs, unser individuelles Zeitbudget und, wie in den Daten gut zu sehen ist, die aktuelle (pandemische) Weltsituation. Mobilität bleibt jedoch niemals eindimensional: Sie findet fast immer zwischen Bewegungsarten, zwischen unterschiedlichsten und in Kombination von miteinander ideal funktionierenden Verkehrsmitteln statt. Diese Verbindungen von Verkehrsmitteln geben uns Anlass zur genauen Betrachtung: Welcher Umstieg fühlt sich gut an, welche Wartezeit nervig? Wie viele Leihfahrräder sind genug, wenn morgens alle zur Lohnarbeit fahren müssen?
                </p>
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

import D3Network from "../components/D3Network.vue";

export default {
    components: {
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
            this.step = response.index;
            response.element.classList.add("is-active");

            if([0,2,4,6,7,8,9,10].includes(this.step)){//this.step === 2 || this.step === 4 || this.step.in()){
                console.log("lets update graph")
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
    margin: 5vh 10vw;

    .text {
        h3{
            padding: 2rem 0;
        }
        p {
            padding: 2rem 0;
        }
    }

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