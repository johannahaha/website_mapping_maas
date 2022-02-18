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
                <div v-for="text in intro" :key="text.id" :data-step="text.id" class="step" :style="{'margin-top': heightPx}"> 
                    <div class="quote" v-if="isEnglish">{{text.eng}}</div>
                    <div class="quote" v-else>{{text.de}}</div>
                </div>
                <div v-for="text in network_person1" :key="text.id" :data-step="text.id" class="step" :style="{'margin-top': heightPx}"> 
                    <div class="quote" v-if="isEnglish">{{text.eng}}</div>
                    <div class="quote" v-else>{{text.de}}</div>
                </div>
                <div v-for="text in network_person2" :key="text.id" :data-step="text.id" class="step" :style="{'margin-top': heightPx}"> 
                    <div class="quote" v-if="isEnglish">{{text.eng}}</div>
                    <div class="quote" v-else>{{text.de}}</div>
                </div>
                <div v-for="text in network_person3" :key="text.id" :data-step="text.id" class="step" :style="{'margin-top': heightPx}"> 
                    <div class="quote" v-if="isEnglish">{{text.eng}}</div>
                    <div class="quote" v-else>{{text.de}}</div>
                </div>
                <div v-for="text in network_person4" :key="text.id" :data-step="text.id" class="step" :style="{'margin-top': heightPx}"> 
                    <div class="quote" v-if="isEnglish">{{text.eng}}</div>
                    <div class="quote" v-else>{{text.de}}</div>
                </div>
                <div v-for="text in network_person5" :key="text.id" :data-step="text.id" class="step" :style="{'margin-top': heightPx}"> 
                    <div class="quote" v-if="isEnglish">{{text.eng}}</div>
                    <div class="quote" v-else>{{text.de}}</div>
                </div>
                <div v-for="text in network_person6" :key="text.id" :data-step="text.id" class="step" :style="{'margin-top': heightPx}"> 
                    <div class="quote" v-if="isEnglish">{{text.eng}}</div>
                    <div class="quote" v-else>{{text.de}}</div>
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
    props:{
        isEnglish:{
            type:Boolean
        }
    },
    data() {
        return {
            scroller: scrollama(),
            step: 0,
            progress: 0,
            height:600,
            width:600,
            lastStep:null,
            //scrollingText:{
            intro: {
                step0:{id:0,eng:"This is the simplest possible mobility, as it only consists one mode of mobility: Walking.",de:"hi"},
                step1:{id:1,eng:"Just follow the arrow that begins at the knot “Start”. That will lead you to the mobility mode the person has chosen. From this point, you will get to the end of the path.",de:"hi"},
                step2:{id:2,eng:"As we can see, this person is starting and ending walks - nothing more.",de:"hi"},
                step3:{id:3,eng:"The more a participant used a specific switch between mobility modes, the thicker the connection between the knots gets.",de:"hi"},
                step4:{id:4,eng:"There is no information about the time or the place of the mobility. That way, we ensure the privacy of each participant while still establishing a meaningful visualization.",de:"hi"},
                step5:{id:5,eng:"Lets make it a little more complicated and see what happens. This person walks and has a car, so two different modes of mobility. Sometimes the person does both, maybe taking a walk after a longer drive or simply having to walk to find where they have left the car before.",de:"hi"},
                step6:{id:6,eng:"Driving a car is closely linked to walking in this example - and wouldn't be possible without it. The explanation is straightforward: a person must walk to get to the car.",de:"hi"},
                step7:{id:7,eng:"This close link will get more interesting later, when we see how public transportation and individual supporting mobility accounts for a flexible and very individual model of mobility that allows to be spontanious.",de:"hi"}
            },
            network_person1: {
                step8:{id:8,eng:"This is the first graph representing the mobility of one of the participants during the lockdown of march 2021. We can't see how the participants mobility was before the pandemic, but we can clearly identify a focus on individual mobility.",de:"hi"},
                step9:{id:9,eng:"This is a nine-to-five-persons mobility. Walking towards the car, driving towards work and back and occasionally doing errands in local supermarkets are the main reasons for mobility.",de:"hi"},
                step10:{id:10,eng:'Here are some quotes from the conducted survey: "For me, my car is a necessary commodity that should only serve its purpose."',de:"hi"},
                step11:{id:11,eng:'"Due to the pandemic, I use public transport rather less and the car rather more often."',de:"hi"},
                step12:{id:12,eng:'"The car is my main means of transport. I think my mobility is typical for where I live."',de:"hi"},
            },
            network_person2:{
                step13:{id:13,eng:"When moving away from classic car-centric mobility, things can get complicated fast.",de:"hi"},
                step14:{id:14,eng:'The participant stated in the survey: "Bicycling is my main mode of transportation and I do not own a car."',de:"hi"},
                step15:{id:15,eng:'and "for me, avoiding rush hour was the biggest challenge to adapting my mobility behavior to Corona pandemic - driving less to the office was not a challenge."',de:"hi"},
                step16:{id:16,eng:'>Also, the participant has some wishes for their neighborhood: "there is a lack of a health food store, public playgrounds, swimming pool, recycling center, and vegetarian restaurant in my neighborhood."',de:"hi"},
                step17:{id:17,eng:"Their mobility seems to be massively influenced by the pandemic. Most days, this person barely leaves the house - only for an occasional walk during the day.",de:"hi"},
                step18:{id:18,eng:"Other days, the home office doesn't seem to do it. The participant travels by bike to the Main Station, waits for the regional train, and then heads off to work. On their way back, they run an errand or…",de:"hi"},
                step19:{id:19,eng:"...pick someone up, maybe their kid. For this participant, the reason for using the bicycle is mainly the shorter travel time. This contrasts common beliefs, that this mobility is more time-consuming because it could depend on fixed schedules of trains or the physical place you locked your Bicycle.",de:"hi"},
                step20:{id:20,eng:"If you look at the visualisation, you can see a strong correlation between bicycling and short stops and vice versa. This could be related to the fact that traffic is not optimized for bicycles, so they have to stop frequently. Even though biking is the fastest mode of transport for the participant, it could still be better.",de:"hi"}
            },
            network_person3:{
                step21:{id:21,eng:"person 3",de:"person3"}
            },
            network_person4:{
                step22:{id:22,eng:"person 4",de:"person4"}
            },
            network_person5:{
                step23:{id:23,eng:"person 5",de:"person5"}
            },
            network_person6:{
                step24:{id:24,eng:"person 6",de:"person6"}
            }
            //}
        };
    },
    computed:{
        heightPx: function(){return this.height * 0.05 + "px"},
        paddingPx: function(){return this.height * 0.1 + "px"},
        widthSvg: function(){
            return this.width *0.66},
        heightSvg: function(){
            let height = this.height - this.onvertRemToPixels(2)
            return height
        }
    },
    mounted() {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.scroller
            .setup({
                step: "#scrolly article .step",
                offset: 0.6,
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

            let stepList = [0,3,5,8,13,21,22,23,24]
            
            console.log("step: ",step.index)
            if(step.direction === "down" && stepList.includes(this.step)){
                this.$refs.network.updateGraph(this.step)
            }
            else if(step.direction === "up" && stepList.includes(this.step+1)){
                let index = stepList.indexOf(this.step+1) - 1
                this.$refs.network.updateGraph(stepList[index])
            }
            

        },
        onProgress(step) {
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
        padding: 15vw 5vw;
        //padding-top:200px;
        //margin-top:100%;
        //width: 100%
    }


    .step.is-active {
        color: $light;
    }

}
</style>