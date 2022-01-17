<template>
    <div id="dataviz">
        <section id="intro">
            <h1 class="title">Our Mobility in Knots</h1>
            <div class="text">
                Thanks to a study conducted by FHP and Universität Siegen, we were able to work with a dataset of 32 participants. They mostly are residents of a small part of northern Potsdam. Not only did they record their GPS pathways. They also collected the mode of transportation and the reason for each, very specific trip. That gave us a unique insight into a set of very privacy-sensitive yet highly interesting data points that possibly tell us more about how individual mobility works. 
                <br><br>
                This data was recorded in early 2021, right when the pandemic was peaking again and certain lockdown measures were in place. That's why our dataset is also a glimpse into the world of mobility during a global pandemic.
                <br><br>
                We asked ourselves how we can create a meaningful, rich visualization of the data while still ensuring the participants' privacy - and came up with mobility networks. But before we take a deep dive into our data, let's first go for a trial run...
            </div>
        </section>
        <section id="scrolly">
            <article>
                <div class="step" data-step="0">
                    <!-- <img class="left" :src="img_path" /> -->
                    <div class="quote" :style="{'margin-top': heightPx}">This is the simplest possible mobility, as it only consists one mode of mobility: Walking.</div>
                </div>
                <div class="step" data-step="1" :style="{'margin-top': heightPx}">
                    <div class="quote">Just follow the arrow that begins at the knot “Start”. That will lead you to the mobility mode the person has chosen. From this point, you will get to the end of the path.</div>
                </div>

                <div class="step" data-step="2" :style="{'margin-top': heightPx}">
                    <div class="quote">As we can see, this person is starting and ending walks - nothing more.</div>
                </div>
                <div class="step" data-step="3" :style="{'margin-top': heightPx}">
                    <div class="quote">The more a participant used a specific switch between mobility modes, the thicker the connection between the knots gets.</div>
                </div>
                <div class="step" data-step="4" :style="{'margin-top': heightPx}">
                    <div class="quote">There is no information about the time or the place of the mobility. That way, we ensure the privacy of each participant while still establishing a meaningful visualization.</div>
                </div>
                <transition name="fade">
                    <div class="step" data-step="5" :style="{'margin-top': heightPx}">
                        <div class="quote">Lets make it a little more complicated and see what happens. This person walks and has a car, so two different modes of mobility. Sometimes the person does both, maybe taking a walk after a longer drive or simply having to walk to find where they have left the car before.</div>
                    </div>
                </transition>
                <div class="step" data-step="6" :style="{'margin-top': heightPx}">
                    <div class="quote">Driving a car is closely linked to walking in this example - and wouldn't be possible without it. The explanation is straightforward: a person must walk to get to the car.</div>
                </div>
                <div class="step" data-step="7" :style="{'margin-top': heightPx}">
                    <div class="quote">This close link will get more interesting later, when we see how public transportation and individual supporting mobility accounts for a flexible and very individual model of mobility that allows to be spontanious.</div>
                </div>
                <div class="step" data-step="8" :style="{'margin-top': heightPx}">
                    <div class="quote">This is the first graph representing the mobility of one of the participants during the lockdown of march 2021. We can't see how the participants mobility was before the pandemic, but we can clearly identify a focus on individual mobility.</div>
                </div>
                <div class="step" data-step="9" :style="{'margin-top': heightPx}">
                    <div class="quote">This is a nine-to-five-persons mobility. Walking towards the car, driving towards work and back and occasionally doing errands in local supermarkets are the main reasons for mobility.</div>
                </div>
                <div class="step" data-step="10" :style="{'margin-top': heightPx}">
                    <div class="quote">When moving away from classic car-centric mobility, things can get complicated fast.</div>
                </div>
                <div class="step" data-step="11" :style="{'margin-top': heightPx}">
                    <div class="quote">Our next participant's mobility seems to be massively influenced by the pandemic. Most days, this person barely leaves the house - only for an occasional walk during the day.</div>
                </div>
                <div class="step" data-step="12" :style="{'margin-top': heightPx}">
                    <div class="quote">Other days, the home office doesn't seem to do it. The participant travels by bike to the Main Station, waits for the regional train, and then heads off to work. On their way back, they run an errand or…</div>
                </div>
                <div class="step" data-step="13" :style="{'margin-top': heightPx}">
                    <div class="quote">...pick someone up, maybe their kid. This kind of mobility is maybe more time-consuming because it could depend on fixed schedules of trains or the physical place you locked your bicycle, but it allows you to be flexible in your mobility without being drawn into the rush hour.</div>
                </div>
                <!-- <div class="step" data-step="13" :style="{'margin-top': heightPx}">
                    <div class="quote">You can see how the bicycle is the most used mode of mobility.</div>
                </div> -->
                <div class="step" data-step="14" :style="{'margin-top': heightPx}">
                    <div class="quote">Person 6</div>
                </div>
                <div class="step" data-step="15" :style="{'margin-top': heightPx}">
                    <div class="quote">Person 6</div>
                </div>
                <div class="step" data-step="16" :style="{'margin-top': heightPx}">
                    <div class="quote">Ende"</div>
                </div>
            </article>
            <D3Network class="network sticky" ref="network" :width="widthSvg" :height="heightSvg"/>
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
                <h3>
                    Mobilität ist individuell 
                </h3>
                <p>
                    Jede:r von uns hat ihre/seine ganz persönlichen Mobilitätsvorlieben. Wie bewege ich mich im Alltag, um zwischendurch vielleicht auch schöne Momente in der Natur zu erleben? Welche Orte integriere ich in meine Routinen, weil es dort vielleicht die besten Brötchen der Stadt gibt? Wo muss ich zu welchem Zeitpunkt sein, und kann deshalb keine Minute erlauen? Diese Entscheidungen und Verbindungen sind sehr individuell und oft nur schwer erfassbar. Mit diesen Befragungsdaten konnten jedoch einen Einblick in die individuelle Mobilität und die einzigartigen Beweggründe der Teilnehmer:innen bekommen.
                </p>
                </div>    
            <div class="text">
                <h3>
                    Mobilität ist sensibel
                </h3>
                <p>
                Jeder Ziel- und Endpunkt, jede Umstiegsuhrzeit und jeder Verkehrsmittelwechsel verrät etwas über die einzelne Person. Mit den Erkenntnissen, die wir zu moderner Überwachung durch private Firmen wie auch Staaten haben zeigt sich die Sprengkraft der Daten, die Anbieter wie Google, Facebook oder E-Scooter-Anbieter sammeln. Diese Daten sind besonders wertvoll und sollten auch besonders geschützt werden - dies erfordert spezielle Maßnahmen wie ein Verbot zur Nutzung von Daten für Werbezwecke bei der Ausschreibung von MAAS-Stationen.
                </p>
            </div>  
            <div class="text">
                <h3>
                    Mobilität ist plural
                </h3>
                <p>
                Unser individuelles Mobilitätsverhalten reagiert auf verschiedene Faktoren: Das Angebot an verschiedenen Verkehrsmitteln, die Verfügbarkeit und Taking des öffentlichen Nahverkehrs, unser individuelles Zeitbudget und, wie in den Daten gut zu sehen ist, die aktuelle (pandemische) Weltsituation. Mobilität bleibt jedoch niemals eindimensional: Sie findet fast immer zwischen Bewegungsarten, zwischen unterschiedlichsten und in Kombination von miteinander ideal funktionierenden Verkehrsmitteln statt. Diese Verbindungen von Verkehrsmitteln geben uns Anlass zur genauen Betrachtung: Welcher Umstieg fühlt sich gut an, welche Wartezeit nervig? Wie viele Leihfahrräder sind genug, wenn morgens alle zur Lohnarbeit fahren müssen?
                </p>
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
        paddingPx: function(){return this.height * 0.2 + "px"},
        widthSvg: function(){
            console.log("width before", this.width)
            return this.width *0.66},
        heightSvg: function(){
            let height = this.height - this.onvertRemToPixels(2)
            console.log("new height - rem",height)
            return height}
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
                gsap.to(this.lastStep,{opacity:0.0,duration:3})
            }

            this.step = step.index;
            this.lastStep = step.element
            gsap.set(step.element,{opacity:0})
            gsap.to(step.element,{opacity:1.0,duration:3})

            if([0,3,5,8,11,14].includes(this.step)){//this.step === 2 || this.step === 4 || this.step.in()){
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
        },
        onvertRemToPixels(rem) {    
            return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
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
  margin: 7rem 0;
  //margin-left:5vw;
  color:$light;
  font-family: Vollkorn;
}

#intro{
    width: 66vw;
    padding: 2rem 5vw;
    margin-bottom: 4rem;
    margin: 0 auto;
}

#outro {
    z-index: 2;
    width: 100vw;       
    align-self: flex-start;
    padding: 2rem 5vw;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:flex-start;
    gap: 5vw;
    margin-bottom: 4rem;


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

    

}


#scrolly {
    z-index: 2;
    display:flex;
    flex-direction: row;

    .sticky{
        position:sticky;
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
        //width: 33vw;
        position:relative;
        z-index: 1;
        pointer-events: none;
        left: 0;
    }

    .text {
        z-index:2;
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
        padding: 30vw 5vw;
        //padding-top:200px;
        //margin-top:100%;
        //width: 100%
    }


    .step.is-active {
        color: $light;
    }

}
</style>