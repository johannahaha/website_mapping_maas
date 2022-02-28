<template>
    <div id="dataviz">
        <section id="intro">
            <h1 class="title">Our Mobility in Knots</h1>
            <div class="text" v-if="isEnglish"> 
                <p>Thanks to a study conducted by <a href="https://www.maas4.de">MaaS L.A.B.S.</a> at the University of Applied Sciences Potsdam and the University of Siegen, we were able to work with a dataset of 32 participants. They mostly are residents of a small part of northern Potsdam. Not only did they record their GPS pathways. They also collected the mode of transportation and the reason for each, very specific trip. That gave us a unique insight into a set of very privacy-sensitive yet highly interesting data points that possibly tell us more about how individual mobility works.</p></div>
            <div class="text" v-else> 
                <p>Dank einer von <a href="https://www.maas4.de">MaaS L.A.B.S.</a> an der Fachhochschule Potsdam und der Universität Siegen durchgeführten Studie konnten wir mit einem Datensatz von 32 Teilnehmer:innen arbeiten. Die meisten von ihnen leben in einem kleinen Stadtteil im Norden von Potsdam. Sie haben nicht nur ihre GPS-Wege aufgezeichnet. Sie erfassten auch das Verkehrsmittel und den Grund für jede einzelne, sehr spezifische Fahrt. Das gab uns einen einzigartigen Einblick in eine Reihe von sehr datenschutzsensiblen, aber hochinteressanten Datenpunkten, die uns möglicherweise mehr darüber verraten, wie individuelle Mobilität funktioniert.</p></div>
            <div v-for="text in welcome_intro" :key="text.id" class="text"> 
                <p v-if="isEnglish"> {{text.eng}} </p>
                <p v-else> {{text.de}} </p>
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
            <D3BarChart :width="widthSvgBarChart" :height="heightSvgBarChart" :isEnglish="isEnglish"/>
            <div id="outro_text">
                <div v-for="text in outro" :key="text.id" class="text"> 
                    <h3 v-if="isEnglish"> {{text.header.eng}} </h3>
                    <h3 v-else> {{text.header.de}} </h3>
                    <p v-if="isEnglish"> {{text.content.eng}} </p>
                    <p v-else> {{text.content.de}} </p>
                </div>
            </div>
            <div id="outro_credits">
                <h3> Credits </h3>
                <div id="outro_credits_team">
                    <div v-for="text in outro_team" :key="text.id" class="text"> 
                        <h4> {{text.name}} </h4>
                        <p v-if="isEnglish"> {{text.eng}} </p>
                        <p v-else> {{text.de}} </p>
                    </div>
                </div>
                <div v-for="text in outro_credits" :key="text.id" class="text"> 
                    <p v-if="isEnglish"> {{text.eng}} </p>
                    <p v-else> {{text.de}} </p>
                </div>
                <div class="text"> 
                    <h3 v-if="isEnglish">Study</h3>
                    <h3 v-else>Studie</h3>
                    <p v-if="isEnglish">Find out more about the MaaS L.A.B.S project on their website and keep up to date with new reseach and events: <a href="https://www.maas4.de">"https://www.maas4.de"</a>. The invitation to participate in this study "digital traces potsdam" is here: <a href="https://www.maas4.de/movinglab"></a>https://www.maas4.de/movinglab</p>
                    <p v-else>Finde mehr über das MaaS L.A.B.S Projekt, neue Updates, Forschung und Events auf ihrer Website: <a href="https://www.maas4.de">"https://www.maas4.de"</a>. Der Aufruf zur Teilnahme an dieser Studie "Digitale Spuren Potsdams" ist hier zu finden: <a href="https://www.maas4.de/movinglab"></a>https://www.maas4.de/movinglab</p>
                    <p>Stevens, G.; Pakusch, C.; Böhm, L.; Bossauer, P. (09.09.2021). Digital Traces Potsdam. DLR MovingLab Studie. Universität Siegen, MaaS L.A.B.S., <a href="https://movinglab.dlr.de/en/projects-campaigns/digital-traces-potsdam-maas-labs-research-project">https://movinglab.dlr.de/en/projects-campaigns/digital-traces-potsdam-maas-labs-research-project </a></p>
                    <h3>References</h3>
                    <p>Dörk, M. (18.06.2020). Experiments in Temporal & Relational Data Visualization [Slides]. University of Applied Sciences Potsdam.</p>
                    <p>Horne, Rp.; Jeffrey-Wilensky J.; Kranz, M.; Ozelli, K.; Stefaner, M. (12.06.2020). Reseacher Connections: Understanding a decade of collaborations in autism science [Project]. Spectrum News. <a href="https://connections.spectrumnews.org">https://connections.spectrumnews.org</a></p>
                    <p>Otten, H.; Hildebrandt, L.; Nagel, T.; Dörk, M.; Müller B. (2014 - 2018). Shifted Maps: Revealing networks in personal movement data [Project]. UCLAB, University of Applied Sciences Potsdam. <a href="https://uclab.fh-potsdam.de/projects/shifted-maps/">https://uclab.fh-potsdam.de/projects/shifted-maps/</a></p>
                    <p>Sedlmair, M., Meyer, M., and Munzner, T. (2012). Design study methodology: Reflections from the trenches and the stacks. IEEE Transactions on Visualization and Computer Graphics, 18(12):2431–2440. <a href="https://sci-hub.se/10.1109/TVCG.2012.213">https://doi.org/10.1109/TVCG.2012.213</a></p>
                    <p>Meyer, M. and Dykes, J. (2019). Criteria for rigor in visualization design study. IEEE transactions on visualization and computer graphics, 26(1):87–97. <a href="https://doi.org/10.1109/TVCG.2019.2934539">https://doi.org/10.1109/TVCG.2019.2934539</a></p>
                </div>
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
                step0:{id:0,eng:"This is the simplest possible mobility, as it only consists of one mode of mobility: Walking.",de:"Das ist die einfachste Form der Mobilität, da sie nur aus einer einzigen Art der Fortbewegung besteht: Gehen."},
                step1:{id:1,eng:'Just follow the arrow that begins at the knot “Start”. That will lead you to the mobility mode the person has chosen. From this point, you will get to the end of the path.',de:'Folge einfach dem Pfeil, der mit dem Punkt "Start" beginnt. Dieser führt dich zu dem Mobilitätsmodus, den die Person gewählt hat. Von diesem Punkt aus gelangst du zum Ende des Weges.'},
                step2:{id:2,eng:"As we can see, this person is starting and ending walks - nothing more.",de:"Wie wir sehen können, beginnt und beendet diese Person Spaziergänge - mehr nicht."},
                step3:{id:3,eng:"The more a participant used a specific switch between mobility modes, the thicker the connection between the knots gets.",de:"Je öfter eine Person bestimmten Mobilitätsmodi wechselt, desto breiter wird die Verbindung zwischen den Knoten."},
                step4:{id:4,eng:"There is no information about the time or the place of the mobility. That way, we ensure the privacy of each participant while still establishing a meaningful visualization. To give you some reference on the impact of each mode of transport, we added a small chart on the left. There, you can see how much time and how far this participant traveled with each mode in one trip on average.",de:"Es gibt keine Informationen über die Zeit oder den Ort der Mobilität. Auf diese Weise stellen wir die Privatsphäre der Teilnehmer:innen sicher und schaffen dennoch eine aussagekräftige Visualisierung. Damit ihr eine Referenz über die Bedeutung der Modi habt, könnt ihr euch die Grafik unten links anschauen. Dort könnt ihr sehen, wie lange und wie weit diese Person im Durschnitt eines der Modi verwendet. "},
                step5:{id:5,eng:"Let's make it a little more complicated and see what happens. This person walks and has a car, so two different modes of mobility. Sometimes the person does both, maybe taking a walk after a long drive or simply having to walk to the parking station.",de:"Jetzt wird es ein wenig komplizierter - schauen wir, was passiert. Diese Person geht zu Fuß und hat ein Auto, also gibt es zwei Mobilitätsarten. Manchmal macht die Person beides, vielleicht macht sie einen Spaziergang nach einer längeren Autofahrt oder muss einfach zu Fuß zum Parkplatz gehen."},
                step6:{id:6,eng:"Driving a car is closely linked to walking in this example - and wouldn't be possible without it. The explanation is straightforward: a person must walk to get to the car.",de:"Das Autofahren ist in diesem Beispiel eng mit dem Gehen verbunden - und wäre ohne dieses nicht möglich. Die Erklärung ist einfach: Eine Person muss gehen, um zum Auto zu gelangen."},
                step7:{id:7,eng:"This close link will get more interesting later when we see how public transportation and individual supporting mobility accounts for a flexible and very individual model of mobility that allows being spontaneous.",de:"Diese enge Verbindung wird später noch interessanter, wenn wir sehen, wie öffentliche Verkehrsmittel und individuell unterstützende Mobilität ein flexibles und sehr individuelles Mobilitätsmodell darstellen, das Spontanität zulässt."}
            },
            network_person1: {
                step8:{id:8,eng:"This is the first graph representing the mobility of one of the participants during the lockdown of march 2021. We can't see how the participant's mobility was before the pandemic, but we can clearly identify a focus on individual mobility.",de:"Das ist das erste Diagramm, das die Mobilität einer Person während des Lockdowns im März 2021 darstellt. Wir können nicht sehen, wie die Mobilität der Person vor der Pandemie war, aber wir können eindeutig einen Schwerpunkt auf der individuellen Mobilität erkennen."},
                step9:{id:9,eng:"It is the mobility of a person working nine-to-five. Getting to and from work by car and occasional errands at the local supermarket are the main reasons for mobility.",de:"Es ist die Mobilität einer Person, die von morgens bis abends vor Ort arbeitet. Der Weg zur und von der Arbeit mit dem Auto und gelegentliche Besorgungen im örtlichen Supermarkt sind die Hauptgründe für die Mobilität."},
                step10:{id:10,eng:'Here are some quotes from the conducted survey: "For me, my car is a necessary commodity that should only serve its purpose."',de:'Einige Zitate aus der durchgeführten Umfrage lauten: "Für mich ist mein Auto ein notwendiger Gebrauchsgegenstand, der nur seinen Zweck erfüllen sollte.'},
                step11:{id:11,eng:'"Due to the pandemic, I use public transport rather less and the car rather more often."',de:'"Wegen der Pandemie benutze ich die öffentlichen Verkehrsmittel etwas weniger und das Auto etwas öfter."'},
                step12:{id:12,eng:'"The car is my main means of transport. I think my mobility is typical for where I live."',de:'"Das Auto ist mein Hauptverkehrsmittel. Ich denke, meine Mobilität ist typisch für den Ort, an dem ich lebe."'},
            },
            network_person2:{
                step13:{id:13,eng:"When moving away from classic car-centric mobility, things can get complicated fast.",de:"Wenn man sich von der klassischen, autozentrierten Mobilität entfernt, kann es schnell kompliziert werden."},
                step14:{id:14,eng:'The participant stated in the survey: "Bicycling is my main mode of transportation and I do not own a car."',de:'Diese Person gab in der Umfrage an: "Das Fahrrad ist mein Hauptverkehrsmittel und ich besitze kein Auto."'},
                step15:{id:15,eng:'and "for me, avoiding rush hour was the biggest challenge to adapting my mobility behavior to the Corona pandemic - driving less to the office was not a challenge."',de:'und "Für mich war die größte Herausforderung bei der Anpassung meines Mobilitätsverhaltens an die Corona-Pandemie die Vermeidung der Hauptverkehrszeit - weniger ins Büro zu fahren war keine Herausforderung."'},
                step16:{id:16,eng:'Also, the participant has some wishes for their neighborhood: "there is a lack of a healthy food store, public playgrounds, swimming pool, recycling center, and vegetarian restaurant in my neighborhood."',de:'Die Person hat einige Wünsche für ihre Nachbarschaft: "Es fehlen ein Bioladen, öffentliche Spielplätze, ein Schwimmbad, ein Recyclingzentrum und ein vegetarisches Restaurant in meiner Nachbarschaft"'},
                step17:{id:17,eng:"Their mobility seems to be massively influenced by the pandemic. Most days, this person barely leaves the house - only for an occasional walk during the day.",de:"Ihre Mobilität scheint durch die Pandemie massiv beeinträchtigt zu sein. An den meisten Tagen verlässt diese Person kaum das Haus - nur für einen gelegentlichen Spaziergang am Tag."},
                step18:{id:18,eng:"Other days, the home office doesn't seem to do it. The participant travels by bike to the Main Station, waits for the regional train, and then heads off to work. On their way back, they run an errand or…",de:"An anderen Tagen scheint es mit dem Home Office nicht zu klappen. Die Person fährt mit dem Fahrrad zum Hauptbahnhof, wartet auf den Regionalzug und macht sich dann auf den Weg zur Arbeit. Auf dem Rückweg macht sie noch eine Besorgung oder..."},
                step19:{id:19,eng:"...pick someone up, maybe their kid. For this participant, the reason for using the bicycle is mainly the shorter travel time. This contrasts common beliefs, that this mobility is more time-consuming because it could depend on fixed schedules of trains or the physical place you locked your Bicycle.",de:" ... holt jemanden ab, vielleicht ein Kind. Für diese Person nutzt das Fahrrads vor allem wegeen der kürzeren Reisezeit. Dies steht im Gegensatz zu der allgemeinen Meinung, dass diese Art der Mobilität zeitaufwändiger sei, da sie von festen Fahrplänen der Züge oder dem Ort, an dem man sein Fahrrad abschließt, abhängen würde."},
                step20:{id:20,eng:"If you look at the visualisation, you can see a strong relationship between bicycling and short stops and vice versa. This could be related to the fact that traffic is not optimized for bicycles, so they have to stop frequently. Even though biking is the fastest mode of transport for the participant, it could still be better.",de:"Wenn du dir die Visualisierung ansiehst, kannst du eine starke Verbindung zwischen Radfahren und kurzen Stopps und umgekehrt erkennen. Das könnte damit zusammenhängen, dass der Verkehr nicht für Fahrräder optimiert ist, so dass häufig angehalten werden muss. Auch wenn das Fahrrad das schnellste Verkehrsmittel für diese Person ist, könnte es noch besser sein."}
            },
            network_person3:{
                step21:{id:21,eng:"The next participant has a diverse mobility and uses all modes of transport for different occasions.",de:"Die nächste Person hat eine sehr gemischte Mobilität und verwendet alle Verkehrmittel zu unterschiedlichen Anlässen."},
                step22:{id:22,eng:"Despite having a job ticket, the person drives to work by car. One reason for this could be the pandemic, as the person uses public transport much less as a result.",de:"Trotz eines Jobtickets fährt die Person mit dem Auto zur Arbeit. Ein Grund dafür könnte die Pandemie sein, da die Person den ÖPNV dadurch viel weniger benutzt."},
                step23:{id:23,eng:"Oftentimes, the persons combines the car ride to work with other errands. For example, they bring their kid to kindergarden or get groceries.",de:"Oft wird die Autofahrt zur Arbeit mit weiteren Orten kombiniert. Beispielsweise wird ein Kind zur Kita gebracht oder ein Einkauf erledigt."},
                step24:{id:24,eng:"In their free time, the person uses different means of transport such as the bicycle or public transport. They like to go for a walk in the nearby forest. For longer distances such as to the southwest of Berlin and shopping the car is used. Most mornings, they bring their kid to kindergarden with a bike.",de:"In ihrer Freizeit nutzt die Person unterschiedliche Verkehrsmittel wie das Fahrrad, den ÖPNV oder geht im nahegelegenen Wald spazieren. Für längere Strecken wie beispielsweise in den Südwesten Berlins und Einkäufe wird das Auto genutzt. An den meisten Morgenden bringt die Person ihr Kind mit dem Fahrrad zu Kita"},
                step25:{id:25,eng:'They say: "I bought the car for routes that are not accessible by public transport (last mile)."',de:'Sie sagt in der Umfrage:"Ich habe mir das Auto für Strecken angeschafft, die nicht mit dem ÖPNV erreichbar sind (letzte Meile)."'},
                step26:{id:26,eng:'"My neighborhood lacks a pharmacy, a youth center, a swimming pool, a sports club with a sports field, or a sports hall."',de:'"In meiner Nachbarschaft fehlt es an einer Apotheke, einem Jugendzentrum, einer Schwimmhalle, einem Sportverein mit Sportplatz oder einer Sporthalle."'},
                step27:{id:27,eng:"The nearest bus stop is less than a kilometer from home and very accessible.",de:"Die nächste Haltestelle ist unter einen Kilometer vom Zuhause entfernt und sehr gut erreichbar."},
                step28:{id:28,eng:'"Due to the pandemic, my mobility has decreased considerably, but it does not pose any major challenges. If anything, my mobility has become more climate-friendly. I use the bicycle just as often, but public transport and the car much less. Nevertheless, the car is my main means of transport."',de:'"Durch die Pandemie ist meine Mobilität stark rückläufig, bildet aber keine großen Herausforderungen. Meine Mobilität wurde eher klimafreundlicher. Ich nutze das Fahrrad genauso oft, den ÖPNV und das Auto aber viel weniger. Dennoch ist das Auto mein Hauptverkehrsmittel."'}
            },
            network_person6:{
                step29:{id:29,eng:"Similarly to our first person, they travel from Potsdam to Berlin for work.",de:"Ähnlich wie unsere erste Person pendelt diese Person zwischen Potsdam und Berlin."},
                step30:{id:30,eng:"For transit, they use public transport. It takes them about 50 minutes to get there.",de:"Zum Pendeln nutzt sie vor allem öffentliche Verkehrmittel. Für den Weg brauchen sie etwa 50 Minuten"},
                step31:{id:31,eng:"Taking the car would take 15 minutes less. But traffic and the time to look for a parking station is not included, so it would probably not be that much faster.",de:"Es wäre etwa fünfzehn Minuten schneller, das Auto zu nehmen. Darin ist allerdings kein Verkehr oder die Zeit, die es braucht einen Parkplatz zu suchen, eingerechnet."},
                step32:{id:32,eng:"To further cut down the transit, they occasionally take their bike with them on the train and use it to get from their home to the first train station. Sometimes, they use a bike-sharing service, but less often since the pandemic.",de:"Um den Arbeitsweg weiter zu verkürzen, nimmt die Person manchmal ihr Fahrrad mit in den Zug und verwendet es, um vom Bahnhof zum Zielort zu fahren. Manchmal verwenden sie einen Bike-Sharing-Service, aber seltener seit Pandemiebeginn."},
                step33:{id:33,eng:'Even though they normally optimize their transit time, sometimes it does not work out: "Today I missed the connecting regional train." The walk between the two stations is too long. They needed to wait 20 minutes for the next train to come.',de:'Obwohl die Person sich Mühe gibt, ihr Umsteigezeit zu optimieren, klappt das nicht immer: "Heute habe ich den Anschlusszug verpasst. Der Fußweg zwischen den zwei Stationen war zu lang". Sie musste 20 Minuten auf den nächsten Regionalzug warten.'},
                step34:{id:34,eng:"They own a car in their household. About that, they say: 'We did not buy it, we just borrowed it from a family member as they don't use it at the moment.'",de:'Ihr Haushalt besitzt ein Auto. "Wir haben es uns nicht bewusst gekauft. Ein Familienmitglied hat es uns geliehen, weil er es gerade nicht verwendet."'},
                step35:{id:35,eng:"They do not give the car any emotional value or memories. It only serves its purpose, but they do not need it specifically.",de:"Mit dem Auto verbinder sie keine Erinnerungen oder emotionale Werte. Es ist ein Gebrauchsgegenstand, auf den sie aber nicht angewiesen ist."},
                step36:{id:36,eng:"At their neighborhood and their workplace, they wish for roofed parking slots for the bike",de:"In ihrer Nachbarschaft würde sich die Person überdachte Parkplätze für das Rad wünschen."},
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
                        eng: "Every start point and destination, every transferring time, and every change of means of transport reveal something about the person. Working with this kind of data made us more aware of what can possibly be done with all those data points and also how we can visualize them without attacking the privacy of participants in the study. That's why we choose to look at networks and the interconnectedness of means of mobility.",
                        de: "Jeder Start- und Zielort, jede Umsteigezeit und jeder Wechsel des Verkehrsmittels verrät etwas über die einzelne Person. Durch die Arbeit mit dieser Art von Daten wurde uns bewusster, was man mit all diesen Datenpunkten machen kann und wie wir sie visualisieren können, ohne die Privatsphäre der Studienteilnehmenden zu verletzen. Deshalb haben wir uns für die Betrachtung von Netzwerken und die Verknüpfung von Mobilitätsmitteln entschieden."
                    },
                },
                text3:{
                    id:3,
                    header:{
                        eng: "Mobility is plural",
                        de: "Mobilität ist plural"
                    },
                    content:{
                        eng: "Our mobility behavior responds to various factors: the range of different means of transport, the availability and quality of public transport, our time budget, and, as can be seen well in the data, the current (pandemic) world situation. Mobility, however, never remains one-dimensional: Being mobile in a city means moving between modes of movement, looking for a combination of modes that work well together and suit your individual needs. These connections of means of transport give us reason to take a close look: which transfer feels good, which waiting time annoying? How many rental bicycles are enough when everyone has to go to work in the morning?",
                        de: "Unser Mobilitätsverhalten reagiert auf verschiedene Faktoren: das Angebot an verschiedenen Verkehrsmitteln, die Verfügbarkeit und Qualität des öffentlichen Verkehrs, unser Zeitbudget und, wie man an den Daten gut erkennen kann, die aktuelle (pandemische) Weltlage. Mobilität bleibt jedoch nie eindimensional: In einer Stadt mobil zu sein, bedeutet, sich zwischen verschiedenen Verkehrsmitteln zu bewegen und nach einer Kombination von Verkehrsmitteln zu suchen, die gut miteinander funktionieren und den individuellen Bedürfnissen entsprechen. Diese Verknüpfungen von Verkehrsmitteln geben uns Anlass, genau hinzuschauen: Welches Umsteigen fühlt sich gut an, welche Wartezeit nervt? Wie viele Leihfahrräder reichen aus, wenn jeder morgens zur Arbeit muss?"
                    },
                }
            },
            welcome_intro:{
                text2:{
                    id:2,
                    eng: "This data was recorded in early 2021, right when the pandemic was peaking again and certain lockdown measures were in place. That's why our dataset is also a glimpse into the world of mobility during a global pandemic.",
                    de: "Diese Daten wurden Anfang 2021 aufgezeichnet, genau zu dem Zeitpunkt, als die Pandemie ihren damaligen Höhepunkt erreichte und bestimmte Abriegelungsmaßnahmen in Kraft waren. Deshalb ist unser Datensatz auch ein Einblick in die Welt der Mobilität während einer globalen Pandemie."
                },
                text3:{
                    id:3,
                    eng: "We have selected four different people for the visualization. Of course, there are many more participants in the dataset. We carefully considered who to select and stuck with the people who had at least some mobility despite being blocked. From these individuals, we selected four individuals with distinct mobility patterns. That means different main modes of transportation, times, routes, and regularities within mobility. Even though this is of course anything but representative, we want to use it to represent a diverse spectrum of mobility patterns.",
                    de: "Für die Visualisierung haben wir vier verschiedene Personen ausgewählt. Natürlich gibt es im Datensatz viel mehr Teilnehmer:innen. Wir haben sorgfältig überlegt, wen wir auswählen sollten, und sind bei den Personen geblieben, die trotz der Sperrung zumindest eine gewisse Mobilität hatten. Aus diesen Personen haben wir vier Personen mit ausgeprägten Mobilitätsmustern ausgewählt - also mit unterschiedlichen Hauptverkehrsmitteln, Zeiten, Wegen und Regelmäßigkeiten innerhalb der Mobilität. Auch wenn dies natürlich alles andere als repräsentativ ist, wollen wir damit ein vielfältiges Spektrum an Mobilitätsmustern abbilden."
                },
                text4:{
                    id:4,
                    eng: "We asked ourselves how we can create a meaningful, rich visualization of the data while still ensuring the participants' privacy - and came up with mobility networks. But before we take a deep dive into our data, let's first go for a trial run...",
                    de: "Wir haben uns gefragt, wie wir eine aussagekräftige, reichhaltige Visualisierung der Daten erstellen und gleichzeitig die Privatsphäre der Teilnehmer:innen schützen können - und sind auf Mobilitätsnetzwerke gekommen. Aber bevor wir tief in unsere Daten eintauchen, machen wir erst einmal einen Probelauf..."
                },

            },
            outro_team:{
                text2: {
                    name: "Helmut Büttner",
                    eng: "Research, Data Analytics & Narrative Structure",
                    de: "Recherche, Datenanalyse & Struktur des Narrativs"
                },
                text3: {
                    name: "Johanna Hartmann",
                    eng: "Conception, Data Analytics / Processing, Data Viz & Web Development",
                    de: "Konzeption, Datenanalyse / Verarbeitung, Visualisierung & Webentwicklung"
                },
                text4: {
                    name: "Sascha Höver",
                    eng: "Design, Conception & Co-Design Workshop",
                    de: "Design, Konzeption & Co-Design Workshop"
                },
            },
            outro_credits:{
                text5: {
                    eng: "We finished the project on 28th February 2021.",
                    de: "Das Projekt haben wir am 28.02.2021 abgeschlossen."
                },
                text6: {
                    eng: "We developed this project for the course Mapping Cities – Making Cities by Prof. Dr. Marian Dörk at University of Applied Sciences Potsdam, Winter semester 2021/22. Thanks for your support and feedback!",
                    de: 'Wir haben dieses Projekt im Kurs Mapping Cities – Making Cities von Prof. Dr. Marian Dörk an der FH Potsdam im Wintersemester 2021/22 entwickelt. Vielen Dank für die Unterstützung!'
                },
                study:{
                    eng:"Special thanks also go to Christian Berkes and the MaaS L.a.b.s. team for the collaboration, your valuable feedback and for providing data for this project.",
                    de:"Ein besonderer Dank geht außerdem an Christian Berkes und das MaaS L.a.b.s. Team für die Möglichkeit zur Mitwirkung, die Zusammenarbeit, das Feedback und die Bereitstellung der Daten für dieses Projekt."
                }
            },
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

            let stepList = [0,3,5,8,13,21,29]
            
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

    a{
        text-decoration: underline;
        color:$light;
    }
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
    @include textblock;
    width: 66vw;
    margin-bottom: 4rem;
    margin: 0 auto;

    .text{
        padding:1rem 0;
    }
}

#outro_credits{
    @include textblock;

    p{
        margin: 1rem 0;
    }

    &_team{
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        h4{
            font-family: "Vollkorn";
            font-size:1.2rem;
        }

        p{
            width: 15vw;
        }
    }
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