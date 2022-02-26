<template>
    <div id="dataviz">
        <section id="intro">
            <h1 class="title">Our Mobility in Knots</h1>
            <div v-for="text in welcome_intro" :key="text.id" class="text"> 
                <p v-if="isEnglish"> {{text.eng}} </p>
                <p v-else> {{text.de}} </p>
                <br><br>
            </div>
        </section>
        <section id="scrolly">
            <article>
                <div v-for="text in network_intro" :key="text.id" :data-step="text.id" class="step" :style="{'margin-top': heightPx}"> 
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
            <D3Network class="network sticky" ref="network" :width="widthSvg" :height="heightSvg" :isEnglish="isEnglish"/>
        </section>
        <section id="outro">
            <D3BarChart :width="widthSvgBarChart" :height="heightSvgBarChart"/>
            <div id="outro_text">
                <div v-for="text in outro" :key="text.id" class="text"> 
                    <h3 v-if="isEnglish"> {{text.header.eng}} </h3>
                    <h3 v-else> {{text.header.de}} </h3>
                    <p v-if="isEnglish"> {{text.content.eng}} </p>
                    <p v-else> {{text.content.de}} </p>
                </div>
            </div>
            <p>Ein Projekt von: Johanna Hartmann, Helmut Büttner, Sascha Höver</p>
            <p>Entstanden im Kurs "Mapping Cities - Making Cities" 2021 an der FH Potsdam bei Marian Dörk.</p> 
            <p>Ein besonderer Dank geht an Christian Berkes und das M.a.A.S Labs Team für die Möglichkeit zur Mitwirkung, das Feedback und die Bereitstellung der Daten für dieses Projekt.</p>             
        </section>
    </div>
</template>

<script>
import "intersection-observer"; // for cross-browser support
//import Scrollama from 'vue-scrollama' // local registration in this example, can also be globally registered
import scrollama from "scrollama";
import { gsap } from 'gsap';

import D3Network from "../components/D3Network.vue";
import D3BarChart from "../components/D3BarChart.vue";


export default {
    components: {
        D3Network,
        D3BarChart
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
            network_intro: {
                step0:{id:0,eng:"This is the simplest possible mobility, as it only consists one mode of mobility: Walking.",de:"Das ist die einfachste Form der Mobilität, da sie nur aus einer einzigen Art der Fortbewegung besteht: Gehen."},
                step1:{id:1,eng:'Just follow the arrow that begins at the knot “Start”. That will lead you to the mobility mode the person has chosen. From this point, you will get to the end of the path.',de:'Folge einfach dem Pfeil, der mit dem Punkt "Start" beginnt. Dieser führt dich zu dem Mobilitätsmodus, den die Person gewählt hat. Von diesem Punkt aus gelangst du zum Ende des Weges.'},
                step2:{id:2,eng:"As we can see, this person is starting and ending walks - nothing more.",de:"Wie wir sehen können, beginnt und beendet diese Person Spaziergänge - mehr nicht."},
                step3:{id:3,eng:"The more a participant used a specific switch between mobility modes, the thicker the connection between the knots gets.",de:"Je öfter eine Person bestimmten Mobilitätsmodi wechselt, desto breiter wird die Verbindung zwischen den Knoten."},
                step4:{id:4,eng:"There is no information about the time or the place of the mobility. That way, we ensure the privacy of each participant while still establishing a meaningful visualization.",de:"Es gibt keine Informationen über die Zeit oder den Ort der Mobilität. Auf diese Weise stellen wir die Privatsphäre der Teilnehmer:innen sicher und schaffen dennoch eine aussagekräftige Visualisierung."},
                step5:{id:5,eng:"Lets make it a little more complicated and see what happens. This person walks and has a car, so two different modes of mobility. Sometimes the person does both, maybe taking a walk after a longer drive or simply having to walk to the parking station.",de:"Jetzt wird es ein wenig komplizierter - schauen wir, was passiert. Diese Person geht zu Fuß und hat ein Auto, also gibt es zwei Mobilitätsarten. Manchmal macht die Person beides, vielleicht macht sie einen Spaziergang nach einer längeren Autofahrt oder muss einfach zu Fuß zum Parkplatz gehen."},
                step6:{id:6,eng:"Driving a car is closely linked to walking in this example - and wouldn't be possible without it. The explanation is straightforward: a person must walk to get to the car.",de:"Das Autofahren ist in diesem Beispiel eng mit dem Gehen verbunden - und wäre ohne dieses nicht möglich. Die Erklärung ist einfach: Eine Person muss gehen, um zum Auto zu gelangen."},
                step7:{id:7,eng:"This close link will get more interesting later, when we see how public transportation and individual supporting mobility accounts for a flexible and very individual model of mobility that allows to be spontanious.",de:"Diese enge Verbindung wird später noch interessanter, wenn wir sehen, wie öffentliche Verkehrsmittel und individuell unterstützende Mobilität ein flexibles und sehr individuelles Mobilitätsmodell darstellen, das Spontanität zulässt."}
            },
            network_person1: {
                step8:{id:8,eng:"This is the first graph representing the mobility of one of the participants during the lockdown of march 2021. We can't see how the participants mobility was before the pandemic, but we can clearly identify a focus on individual mobility.",de:"Das ist das erste Diagramm, das die Mobilität einer Person während des Lockdowns im März 2021 darstellt. Wir können nicht sehen, wie die Mobilität der Person vor der Pandemie war, aber wir können eindeutig einen Schwerpunkt auf der individuellen Mobilität erkennen."},
                step9:{id:9,eng:"Dies ist die Mobilität einer Person, die täglich mit dem Auto zur Arbeit fährt. Walking towards the car, driving towards work and back and occasionally doing errands in local supermarkets are the main reasons for mobility.",de:"Dies ist die Mobilität zum Arbeitsplatz der Person. Der Weg zum Auto, die Fahrt zur Arbeit und zurück und gelegentliche Besorgungen im örtlichen Supermarkt sind die Hauptgründe für die Mobilität."},
                step10:{id:10,eng:'Here are some quotes from the conducted survey: "For me, my car is a necessary commodity that should only serve its purpose."',de:'Einige Zitate aus der durchgeführten Umfrage lauten: "Für mich ist mein Auto ein notwendiger Gebrauchsgegenstand, der nur seinen Zweck erfüllen sollte.'},
                step11:{id:11,eng:'"Due to the pandemic, I use public transport rather less and the car rather more often."',de:'"Wegen der Pandemie benutze ich die öffentlichen Verkehrsmittel etwas weniger und das Auto etwas öfter."'},
                step12:{id:12,eng:'"The car is my main means of transport. I think my mobility is typical for where I live."',de:'"Das Auto ist mein Hauptverkehrsmittel. Ich denke, meine Mobilität ist typisch für den Ort, an dem ich lebe."'},
            },
            network_person2:{
                step13:{id:13,eng:"When moving away from classic car-centric mobility, things can get complicated fast.",de:"Wenn man sich von der klassischen, autozentrierten Mobilität entfernt, kann es schnell kompliziert werden."},
                step14:{id:14,eng:'The participant stated in the survey: "Bicycling is my main mode of transportation and I do not own a car."',de:'Diese Person gab in der Umfrage an: "Das Fahrrad ist mein Hauptverkehrsmittel und ich besitze kein Auto."'},
                step15:{id:15,eng:'and "for me, avoiding rush hour was the biggest challenge to adapting my mobility behavior to Corona pandemic - driving less to the office was not a challenge."',de:'und "Für mich war die größte Herausforderung bei der Anpassung meines Mobilitätsverhaltens an die Corona-Pandemie die Vermeidung der Hauptverkehrszeit - weniger ins Büro zu fahren war keine Herausforderung."'},
                step16:{id:16,eng:'Also, the participant has some wishes for their neighborhood: "there is a lack of a health food store, public playgrounds, swimming pool, recycling center, and vegetarian restaurant in my neighborhood."',de:'Die Person hat einige Wünsche für ihre Nachbarschaft: "Es fehlen ein Bioladen, öffentliche Spielplätze, ein Schwimmbad, ein Recyclingzentrum und ein vegetarisches Restaurant in meiner Nachbarschaft"'},
                step17:{id:17,eng:"Their mobility seems to be massively influenced by the pandemic. Most days, this person barely leaves the house - only for an occasional walk during the day.",de:"Ihre Mobilität scheint durch die Pandemie massiv beeinträchtigt zu sein. An den meisten Tagen verlässt diese Person kaum das Haus - nur für einen gelegentlichen Spaziergang am Tag."},
                step18:{id:18,eng:"Other days, the home office doesn't seem to do it. The participant travels by bike to the Main Station, waits for the regional train, and then heads off to work. On their way back, they run an errand or…",de:"An anderen Tagen scheint es mit dem Home Office nicht zu klappen. Die Person fährt mit dem Fahrrad zum Hauptbahnhof, wartet auf den Regionalzug und macht sich dann auf den Weg zur Arbeit. Auf dem Rückweg macht sie noch eine Besorgung oder..."},
                step19:{id:19,eng:"...pick someone up, maybe their kid. For this participant, the reason for using the bicycle is mainly the shorter travel time. This contrasts common beliefs, that this mobility is more time-consuming because it could depend on fixed schedules of trains or the physical place you locked your Bicycle.",de:" ... holt jemanden ab, vielleicht ein Kind. Für diese Person nutzt das Fahrrads vor allem wegeen der kürzeren Reisezeit. Dies steht im Gegensatz zu der allgemeinen Meinung, dass diese Art der Mobilität zeitaufwändiger sei, da sie von festen Fahrplänen der Züge oder dem Ort, an dem man sein Fahrrad abschließt, abhängen würde."},
                step20:{id:20,eng:"If you look at the visualisation, you can see a strong relationship between bicycling and short stops and vice versa. This could be related to the fact that traffic is not optimized for bicycles, so they have to stop frequently. Even though biking is the fastest mode of transport for the participant, it could still be better.",de:"Wenn du dir die Visualisierung ansiehst, kannst du eine starke Verbindung zwischen Radfahren und kurzen Stopps und umgekehrt erkennen. Das könnte damit zusammenhängen, dass der Verkehr nicht für Fahrräder optimiert ist, so dass häufig angehalten werden muss. Auch wenn das Fahrrad das schnellste Verkehrsmittel für diese Person ist, könnte es noch besser sein."}
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
                step24:{id:24,eng:"person 6",de:"person6"},
                step25:{id:25,eng:"Similarly to our first person, they travel from Potsdam to Berlin for work.",de:"Ähnlich wie unsere erste Person pendelt diese Person zwischen Potsdam und Berlin."},
                step26:{id:26,eng:"For transit, they use public transport. It takes them about 50 minutes to get their.",de:"Zum Pendeln nutzt sie vor allem öffentliche Verkehrmittel. Für den Weg brauchen sie etwa 50 Minuten"},
                step27:{id:27,eng:"Taking the car would take 15 minutes less. But traffic and the time to look for a parking station is not included, so it would probably not be that much faster.",de:"Es wäre etwa fünfzehn Minuten schneller, das Auto zu nehmen. Darin ist allerdings kein Verkehr oder die Zeit, die es braucht einen Parkplatz zu suchen, eingerechnet."},
                step28:{id:28,eng:"To further cut down the transit, they occasionally take their bike with them in the train and use it to get from their home to the first train station. Sometimes, they use a bike sharing service, but less often since the pandemic",de:"Um den Arbeitsweg weiter zu verkürzen, nimmt die Person manchmal ihr Fahrrad mit in den Zug und verwendet es, um vom Bahnhof zum Zielort zu fahren. Manchmal verwenden sie einen Bike-Sharing-Service, aber seltener seit Pandemiebeginn."},
                step29:{id:29,eng:'Even though normally they optimize their transit time, sometimes it does not work out: "Today I missed the connecting regional train. The foot way between the two stations is too far". They needed to wait 20 minutes for the next train to come.',de:'Obwohl die Person sich Mühe gibt, ihr Umsteigezeit zu optimieren, klappt das nicht immer: "Heute habe ich den Anschlusszug verpasst. Der Fußweg zwischen den zwei Stationen war zu lang". Sie musste 20 Minuten auf den nächsten Regionalzug warten.'},
                step31:{id:31,eng:"They own a car in their household. About that, they say: 'We did not buy it, we just borrowed it from a friend as they don't use it at the moment'",de:'Ihr Haushalt besitzt ein Auto. "Wir haben es uns nicht bewusst gekauft. Ein Freund hat es uns geliehen, weil er es gerade nicht verwendet."'},
                step32:{id:32,eng:"They do not give the car any emotional value or memories. It only serves its purpose, but they do not need it specifically.",de:"Mit dem Auto verbinder sie keine Erinnerungen oder emotionale Werte. Es ist ein Gebrauchsgegenstand, auf den sie aber nicht angewiesen ist."},
                step33:{id:33,eng:"At their neighborhood and their workplace, they wish for roofed parking slots for the bike",de:"In ihrer Nachbarschaft würde sich die Person überdachte Parkplätze für das Rad wünschen."},
            },
            outro:{
                text1:{
                    id:1,
                    header:{
                        eng: "Mobility is individual",
                        de: "Mobilität ist individuell"
                    },
                    content:{
                        eng: "Each of us has his or her personal mobility preferences. How do I move around in everyday life, perhaps to experience beautiful moments in nature in between? Which shops do I integrate into my routines because they might have the best bread rolls in town? Where do I have to be at what time, and therefore can't spare a minute? These decisions and connections are highly individual and often difficult to capture. However, with this survey data, we were able to gain insight into individual mobility and the unique motivations of the participants.",
                        de: "Jeder von uns hat seine persönlichen Mobilitätsvorlieben. Wie bewege ich mich im Alltag, um vielleicht zwischendurch schöne Momente in der Natur zu erleben? Welche Geschäfte binde ich in meine Routine ein, weil es dort vielleicht die besten Brötchen der Stadt gibt? Wo muss ich zu welcher Zeit sein und kann deshalb keine Minute erübrigen? Diese Entscheidungen und Zusammenhänge sind sehr individuell und oft schwer zu erfassen. Mit den Umfragedaten konnten wir jedoch einen Einblick in die individuelle Mobilität und die besonderen Beweggründe der Teilnehmer:innen gewinnen."
                    },
                },
                text2:{
                    id:2,
                    header:{
                        eng: "Mobility is sensitive",
                        de: "Mobilität ist sensibel"
                    },
                    content:{
                        eng: "Every startpoint and destination, every transferring time, and every change of means of transport reveal something about the individual person. Working with this kind of data made us more aware of what can possibly be done with all those data points and also how we can visualize them without attacking the privacy of participants in the study. That's why we choose to look at networks and the interconnectedness of means of mobility.",
                        de: "Jeder Start- und Zielort, jede Umsteigezeit und jeder Wechsel des Verkehrsmittels verrät etwas über die einzelne Person. Durch die Arbeit mit dieser Art von Daten wurde uns bewusster, was man mit all diesen Datenpunkten machen kann und wie wir sie visualisieren können, ohne die Privatsphäre der Studienteilnehmer:innen zu verletzen. Deshalb haben wir uns für die Betrachtung von Netzwerken und die Verknüpfung von Mobilitätsmitteln entschieden."
                    },
                },
                text3:{
                    id:3,
                    header:{
                        eng: "Mobility is Plural",
                        de: "Mobilität ist Plural"
                    },
                    content:{
                        eng: "Our mobility behavior responds to various factors: the range of different means of transport, the availability and quality of public transport, our time budget, and, as can be seen well in the data, the current (pandemic) world situation. Mobility, however, never remains one-dimensional: Being mobile in a city means moving between modes of movement, looking for a combination of modes that work well together and suit your individual needs. These connections of means of transport give us reason to take a close look: which transfer feels good, which waiting time annoying? How many rental bicycles are enough when everyone has to go to work in the morning?",
                        de: "Unser Mobilitätsverhalten reagiert auf verschiedene Faktoren: das Angebot an verschiedenen Verkehrsmitteln, die Verfügbarkeit und Qualität des öffentlichen Verkehrs, unser Zeitbudget und, wie man an den Daten gut erkennen kann, die aktuelle (pandemische) Weltlage. Mobilität bleibt jedoch nie eindimensional: In einer Stadt mobil zu sein, bedeutet, sich zwischen verschiedenen Verkehrsmitteln zu bewegen und nach einer Kombination von Verkehrsmitteln zu suchen, die gut miteinander funktionieren und den individuellen Bedürfnissen entsprechen. Diese Verknüpfungen von Verkehrsmitteln geben uns Anlass, genau hinzuschauen: Welches Umsteigen fühlt sich gut an, welche Wartezeit nervt? Wie viele Leihfahrräder reichen aus, wenn jeder morgens zur Arbeit muss?"
                    },
                }
            },
            welcome_intro:{
                text1:{
                    id:1,
                    eng: "Thanks to a study conducted by MaaS L.A.B.S. at FH Potsdam and University of Siegen, we were able to work with a dataset of 32 participants. They mostly are residents of a small part of northern Potsdam. Not only did they record their GPS pathways. They also collected the mode of transportation and the reason for each, very specific trip. That gave us a unique insight into a set of very privacy-sensitive yet highly interesting data points that possibly tell us more about how individual mobility works.",
                    de: "Dank einer von MaaS L.A.B.S. an der FH Potsdam und der Universität Siegen durchgeführten Studie konnten wir mit einem Datensatz von 32 Teilnehmer:innen arbeiten. Die meisten von ihnen leben in einem kleinen Stadtteil im Norden von Potsdam. Sie haben nicht nur ihre GPS-Wege aufgezeichnet. Sie erfassten auch das Verkehrsmittel und den Grund für jede einzelne, sehr spezifische Fahrt. Das gab uns einen einzigartigen Einblick in eine Reihe von sehr datenschutzsensiblen, aber hochinteressanten Datenpunkten, die uns möglicherweise mehr darüber verraten, wie individuelle Mobilität funktioniert."
                },
                text2:{
                    id:2,
                    eng: "This data was recorded in early 2021, right when the pandemic was peaking again and certain lockdown measures were in place. That's why our dataset is also a glimpse into the world of mobility during a global pandemic.",
                    de: "Diese Daten wurden Anfang 2021 aufgezeichnet, genau zu dem Zeitpunkt, als die Pandemie ihren damaligen Höhepunkt erreichte und bestimmte Abriegelungsmaßnahmen in Kraft waren. Deshalb ist unser Datensatz auch ein Einblick in die Welt der Mobilität während einer globalen Pandemie."
                },
                text3:{
                    id:3,
                    eng: "We have selected four different people for the visualization. Of course, there are many more participants in the dataset. We carefully considered who to select and stuck with the people who had at least some mobility despite being blocked. From these individuals, we selected four individuals with distinct mobility patterns - that is, with different main modes of transportation, times, routes, and regularities within mobility. Even though this is of course anything but representative, we want to use it to represent a diverse spectrum of mobility patterns.",
                    de: "Für die Visualisierung haben wir vier verschiedene Personen ausgewählt. Natürlich gibt es im Datensatz viel mehr Teilnehmer:innen. Wir haben sorgfältig überlegt, wen wir auswählen sollten, und sind bei den Personen geblieben, die trotz der Sperrung zumindest eine gewisse Mobilität hatten. Aus diesen Personen haben wir vier Personen mit ausgeprägten Mobilitätsmustern ausgewählt - also mit unterschiedlichen Hauptverkehrsmitteln, Zeiten, Wegen und Regelmäßigkeiten innerhalb der Mobilität. Auch wenn dies natürlich alles andere als repräsentativ ist, wollen wir damit ein vielfältiges Spektrum an Mobilitätsmustern abbilden."
                },
                text4:{
                    id:4,
                    eng: "We asked ourselves how we can create a meaningful, rich visualization of the data while still ensuring the participants' privacy - and came up with mobility networks. But before we take a deep dive into our data, let's first go for a trial run...",
                    de: "Wir haben uns gefragt, wie wir eine aussagekräftige, reichhaltige Visualisierung der Daten erstellen und gleichzeitig die Privatsphäre der Teilnehmer:innen schützen können - und sind auf Mobilitätsnetzwerke gekommen. Aber bevor wir tief in unsere Daten eintauchen, machen wir erst einmal einen Probelauf..."
                },

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
        },
        widthSvgBarChart:function(){
            return this.width *0.8
        },
        heightSvgBarChart:function(){
            return this.height * 0.6
        },
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
    margin-bottom: 4rem;

    &_text{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items:flex-start;
        gap: 5vw;

        .text{
            h3{
                @include small-headline;
            }
            p {
                padding: 2rem 0;
            }
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