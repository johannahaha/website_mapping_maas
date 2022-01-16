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
                    <div class="quote" :style="{'margin-top': '100px'}">Hier siehst du eine solche Vernetzung. Dieses Netzwerk bedeutet, dass die Person zu Fuß vom Startpunkt zum Endpunkt gelaufen ist.</div>
                </div>
                <div class="step" data-step="1" :style="{'margin-top': heightPx}">
                    <div class="quote">Je öfter die Person eine Vernetzungslinie verwendet hat, desto dicker ist sie. Hier ist die Person als öfter zum Start zum Endpunkt gegangen.</div>
                </div>

                <div class="step" data-step="2" :style="{'margin-top': heightPx}">
                    <div class="quote">Noch sagt das Netzwerk wenig aus. Spannend wird es erst, wenn man weitere Mobilitätsarten dazunimmt.</div>
                </div>
                <div class="step" data-step="3" :style="{'margin-top': heightPx}">
                    <div class="quote">"Hier sieht man zusätzlich das Auto. Die Person ist also oft erst gelaufen, dann Auto gefahren, und ist dann wieder gelaufen."</div>
                </div>
                <div class="step" data-step="4" :style="{'margin-top': heightPx}">
                    <div class="quote">"Dieses Muster lässt sich leicht dadurch erklären, dass das die Person zunächst zum Auto läuft, dann Richtung Zielort fährt, das Auto dort parkt und dann zum Zielort läuft."</div>
                </div>
                <transition name="fade">
                    <div class="step" data-step="5" :style="{'margin-top': heightPx}">
                        <div class="quote">"Mobility is still relevant."</div>
                    </div>
                </transition>
                <div class="step" data-step="6" :style="{'margin-top': heightPx}">
                    <div class="quote">Dieses Netzwerk ist "Freizeit"</div>
                </div>
                <div class="step" data-step="7" :style="{'margin-top': heightPx}">
                    <div class="quote">Dieses Netzwerk ist "zur arbeit gehen"</div>
                </div>
                <div class="step" data-step="8" :style="{'margin-top': heightPx}">
                    <div class="quote">Dieses Netzwerk ist "Einkaufen, Besorgung".</div>
                </div>
                <div class="step" data-step="9" :style="{'margin-top': heightPx}">
                    <div class="quote">Dieses Netzwerk ist "jemanden bringen, abholen"</div>
                </div>
                <div class="step" data-step="10" :style="{'margin-top': heightPx}">
                    <div class="quote">Dieses Netzwerk ist "nach hause"</div>
                </div>
                <div class="step" data-step="11" :style="{'margin-top': heightPx}">
                    <div class="quote">Mobilität</div>
                </div>
                <div class="step" data-step="12" :style="{'margin-top': heightPx}">
                    <div class="quote">Mobilität</div>
                </div>
                <div class="step" data-step="13" :style="{'margin-top': heightPx}">
                    <div class="quote">Mobilität"</div>
                </div>
                <div class="step" data-step="14" :style="{'margin-top': heightPx}">
                    <div class="quote">Ende"</div>
                </div>
            </article>
            <D3Network class="network sticky" ref="network" :width="widthSvg" :height="height"/>
            <!-- <div class="legend">
                <div class="sticky">
                    <div class="legend_item">
                        <img src = "/img/start.svg"/> <div class="description"> Startpunkt <br>eines Weges </div>
                    </div>
                    <div class="legend_item">
                        <img src = "/img/end.svg"/> <div class="description"> Endpunkt <br>eines Weges </div>
                    </div>
                    <div class="legend_item">
                        <img src = "/img/car.svg"/> <div class="description"> Auto </div>
                    </div>
                    <div class="legend_item">
                        <img src = "/img/bicycle.svg"/> <div class="description"> Fahrrad </div>
                    </div>
                    <div class="legend_item">
                        <img src = "/img/walk.svg"/> 
                        <div class="description"> Zu Fuß </div>
                    </div>
                    <div class="legend_item">
                        <img src = "/img/public_transport.svg"/> 
                        <div class="description"> Öffentliche Verkehrsmittel <br>(Bus, Tram, S-Bahn)</div>
                    </div>
                </div>
            
            </div> -->
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
import { gsap } from 'gsap';

import D3Network from "../components/D3Network.vue";


export default {
    components: {
        D3Network
    },
    data() {
        return {
            scroller: scrollama(),
            step: 0,
            progress: 0,
            height:600,
            width:600,
            lastStep:null
        };
    },
    computed:{
        heightPx: function(){return this.height *0.8 + "px"},
        widthSvg: function(){return this.width *0.75}
    },
    mounted() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.scroller
            .setup({
                step: "#scrolly article .step",
                offset: 0.8,
                progress: true,
                debug: false,
            })
            .onStepEnter(this.onEnter)
            .onStepProgress(this.onProgress)
            .onStepExit(this.onExit);
        window.addEventListener("resize", this.onResize);
    },
    methods: {
        onEnter(step) {
            if(this.lastStep){
                gsap.to(this.lastStep,{opacity:0.0,duration:2,ease:"power3"})
            }

            this.step = step.index;
            this.lastStep = step.element
            gsap.set(step.element,{opacity:0})
            gsap.to(step.element,{opacity:1.0,duration:2,ease:"power3"})

            if([0,1,4,6,10].includes(this.step)){//this.step === 2 || this.step === 4 || this.step.in()){
                console.log("lets update graph")
                this.$refs.network.updateGraph(this.step)
            }

        },
        onProgress(step) {
            // console.log('progress', step)
            this.step = step.index;
            this.progress = step.progress;
        },
        onExit(step) {
            this.step = step.index;
            step.element.classList.remove("is-active");

        },
        onResize(){
            this.height = window.innerHeight;
            this.width = window.innerWidth;
            this.$refs.network.resizeSimulation();
        }
    }
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
  margin-bottom: 2rem;
  //margin-left:5vw;
  color:$light;
}

#intro, #outro {
    z-index: 2;
    width: 60vw;       
    align-self: flex-start;
    margin: 2rem 10vw;

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

    .sticky{
        position:sticky;
    }

    .legend{
        bottom:0;
        z-index:2;
        display:flex;
        flex-direction:column;

        .sticky{
            bottom:0;

            .legend_item{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0.75rem;
            width:3vw;

            .description{
                padding-left:1rem;
            }
        }
        }


    }

    .network {
        // background-color: $darkgrey;
        z-index:0;
        right:0;
        top:0;
        width:100%;
        height:100%

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

    .step{
        opacity:0;
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 1s;
        }
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }

    }

    .quote {
        padding: 0 5vw;
        //margin-top:100%;
        //width: 100%
    }


    .step.is-active {
        color: $light;
    }

}
</style>