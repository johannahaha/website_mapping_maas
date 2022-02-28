<template>
    <div id="bar-chart-container">
        <div class="bar_chart_text">
            <h3 v-if="isEnglish">  How far and how long do the participants on average travel with each transport mode?</h3>
            <h3 v-else>  Wie weit und wie lange reisen die Studienteilnehmer:innen durchschnittlich mit jedem Verkehrsmittel?</h3>
            <p v-if="isEnglish"> {{text.intro.eng}} </p>
            <p v-else> {{text.intro.de}} </p>
        </div>
        <div id="legend_buttons">
            <input type="radio" id="km" value="km" v-model="legendMode" />
            <label for="one">km</label>

            <input type="radio" id="min" value="min" v-model="legendMode" />
            <label for="two">min</label>
        </div>
        <div id="d3-bar-chart" :height="heightPx" :width="widthPx">
            <svg
                id="svg"
                :view-box="viewBox"
                preserveAspectRatio="xMaxYMax meet"
                :style="{ height: heightPx, width: widthPx }"
            >
                <g
                    v-for="(bar, i) in bars"
                    :key="`bar-${i}`"
                    :transform="`translate(0 ${barHeight * (i + 0.3)})`"
                >
                    <image
                        :x="chartWidth - offsetRight / 2"
                        :y="-(offsetRight - 10) / 3"
                        :href="getIcon(bar.mode)"
                        :width="offsetRight"
                        :height="offsetRight"
                    />
                    <rect
                        :x="bar.x - offsetRight / 2"
                        y="0"
                        :width="bar.width"
                        :height="offsetRight / 2"
                        :style="barStyle(bar.mode)"
                        rx="7.5"
                        ry="7.5"
                    />
                    <text
                        :x="bar.x"
                        y="0"
                        dy="-0.5em"
                        :style="textStyle(bar.mode)"
                    >
                        {{ getBarValueByTitle(bar.mode) }} {{legendMode}}
                    </text>
                </g>
            </svg>
        </div>
        
        <div class="bar_chart_text">
            <div v-for="text in text.outro" :key="text.id" class="text"> 
                <p v-if="isEnglish"> {{text.eng}} </p>
                <p v-else> {{text.de}} </p>
            </div>
        </div>
    </div>
</template>

<script>
//parts of this code are from this course / repo: https://github.com/uclab-potsdam/scrollytelling-beginners

import * as d3 from "d3";

//let svg;

export default {
    data() {
        return {
            data: [],
            //offsetRight: 25,
            legendMode:"km",
            text:{
                intro:{
                    eng:"As you could already tell from the small graphs on the lower left, it is nonetheless important to reflect and compare the impact of each mode of transport. Therefore, we now look at all participants of the study together and visualize, how far and how long they travel on average with each mode.",
                    de:"Wie auch schon in den kleinen Grafiken unten links zu sehen war, ist es dennoch wichtig, sich die Wirkung der einzelnen Verkehrsmittel klarzumachen und zu vergleichen. Daher haben wir hier nochmal alle Teilnehmenden der Studie zusammengenommen und geschaut, wie weit und wie lange sie jeweils mit dem jeweiligen Verkehrsmittel fahren."
                },
                outro:{
                    text1:{
                        eng:"How did we calculate this averages? Each of the recorded trips consists of smaller legs with different means of transport that the person needs to get to the destination. So, to calculate the average length and average time for each mode of transport, we had to be careful that the small legs did not distort the result. Therefore, we first calculated the total distances for each mode of transportation within a trip - so it doesn't matter if you had to change trains during the trip. From these total distances, we then calculated the average.",
                        de:"Wie haben wir diese Durchschnittswerte berechnet? Jeder der aufgenommen Fahrten besteht aus kleineren Teilstrecken mit verschiedenen Verkehrsmitteln, die die Person braucht, um zum Ziel zu gelangen. Um die Durchschnittslänge und Durchschnittszeit für jedes Verkehrsmittel zu berechnen, mussten wir also aufpassen, dass die kleinen Teilstrecken das Ergebnis nicht verfälschen. Daher haben wir zunächst die Gesamtstrecken für jedes Verkehrmittel innerhalb einer Fahrt berechnet - also ist es egal, ob man während der Bahnstrecke umsteigen musste. Von diese Gesamtstrecken haben wir dann den Durchschnitt ermittelt."
                    },
                    text2:{
                        eng:"As expected, people travel on average with the car and the public transport the farest. The difference between the two is only a few kilometers. The networks you saw before hihlighted the more frequent use of bicycles and walking. However, this bar chart shows that in total one single trip with the car or public transport, respectively, has a higher impact.",
                        de:"Wie erwartet reisten die Teilnehmenden mit dem Auto und den öffentlichen Verkersmitteln am weitesten. Der Unterschied zwischen beiden beträgt bloß ein paar Kilometer. Während die Netzwerkgrafiken vor allem die häufigeren Modi von Fahrrad und zu Fuß gehen herausgehoben hat, kann man hier sehen, dass insgesamt eine Autofahrt bzw. eine Fahrt mit dem öffentlicheren Verkehrmitteln ein höheres Gewicht hat."
                    },
                    text3:{
                        eng:"So what is our conclusion in total?",
                        de:"Was ist insgesamt unsere Erkenntnis?"
                    }

                },
            },
        };
    },
    props: {
        width: Number,
        height: Number,
        isEnglish:Boolean
    },
    methods: {
        setupBarChart() {
            //svg = d3.select("#d3-barchart").select("svg");
            let scope = this;
            let filterList = ["car","bicycle","walk","public_transport"]
            d3.json("/json/totalgraphdata.json").then(function (data) {
                scope.data = data.nodes.reduce(function(filtered, d) {
                if (filterList.includes(d.title)) {
                    let node = {
                        transport_mode: d.title,
                        route_mean: +d.route_from,
                        time: +d.time_from
                    }
                    filtered.push(node);
                }
                return filtered;
                }, []);

            });
        },
        getIcon(title) {
            let path = "/img/" + title + ".svg";
            return path;
        },
        getColor(title) {
            if (title === "car") {
                return "#E3E3E3";
            } else if (title === "bicycle") {
                return "#95E673";
            } else if (title === "walk") {
                return "#73B6E6";
            } else if (title === "public_transport") {
                return "#7C73E6";
            } else if (title === "stationary" || title === "start") {
                return "#BABABA";
            }
            return "#BABABA";
        },
        getBarValueByTitle(title){
            let datapoint = this.data.find(element => element["transport_mode"] === title)
            if(this.valueMode === "route_mean"){
                let route_mean = this.toKilometer(datapoint[this.valueMode])
                return route_mean;
            }
            else{
                console.log(datapoint[this.valueMode])
                return datapoint[this.valueMode]
            }
        },
        toKilometer(value) {
            return Math.round(value / 10) / 100; //2 decimals
        },
        barStyle(title) {
            return { fill: String(this.getColor(title)), rx: "20", ry: "30" };
        },
        textStyle(title) {
            return { fill: String(this.getColor(title)) };
        }
    },
    computed: {
        offsetRight:function(){
            console.log("offset:",this.width / 50)
            let offset = this.width / 40.0
            return Math.max(offset,20.0);
        },
        viewBox: function () {
            return "0 0 " + this.width + " " + this.height;
        },
        heightPx: function () {
            return this.height + "px";
        },
        widthPx: function () {
            return this.width + "px";
        },
        barHeight() {
            return (this.height - this.offsetRight) / this.data.length;
        },
        chartHeight() {
            return this.height;
        },
        chartWidth() {
            return this.width - this.offsetRight;
        },
        scaleY() {
            const values = this.data.map((d) => d[this.valueMode]);
            const domain = [0, d3.max(values)];
            const range = [0, this.chartWidth - this.offsetRight];
            return d3.scaleLinear().domain(domain).range(range);
        },
        bars() {
            return this.data.map((d) => {
                const barWidth = this.scaleY(d[this.valueMode]);
                return {
                    mode: d.transport_mode,
                    value: d[this.valueMode],
                    x: this.chartWidth - barWidth,
                    width: barWidth,
                };
            });
        },
        valueMode(){
            if(this.legendMode === "km"){
                return "route_mean";
            }
            else if(this.legendMode === "min"){
                return "time";
            }
            return "route_mean";
        }
    },
    mounted() {
        this.setupBarChart();
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_config.scss";

#bar-chart-container{
    margin: 10% 0;

    .bar_chart_text{
        @include textblock;
    }
}

svg {
    text {
        text-anchor: start;
        font-family:Roboto
    }
}

#legend_buttons{
    display:flex;
    flex-direction: row;
    align-items:center;
}

input[type="radio"] {
    @include radiobutton
  
}
</style>