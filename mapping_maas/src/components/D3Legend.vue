<template>
    <div>
        <input type="radio" id="km" value="km" v-model="legendMode" />
        <label for="one">km</label>

        <input type="radio" id="min" value="min" v-model="legendMode" />
        <label for="two">min</label>
        <div v-if="isEnglish" id="tooltip" v-show="showHover" ref="tooltip" :style="`{'color': ${getColor(currentHover)}}`">
            This participant {{hoverMessage}} {{legendMode}}.
        </div>
        <div v-else id="tooltip" v-show="showHover" ref="tooltip" :style="`{'color': ${getColor(currentHover)}}`">
            Diese Person {{hoverMessage}} {{legendMode}}.
        </div>
        <div id="d3-legend" :height="heightPx" :width="widthPx" :path="path">
            <svg
                id="svg"
                :view-box="viewBox"
                preserveAspectRatio="xMaxYMax meet"
                :style="{ height: heightPx, width: widthPx }"
            >
                <g
                    v-for="(bar, i) in bars"
                    :key="`bar-${i}`"
                    :transform="`translate(0 ${barHeight * (i + 0.5)})`"
                    @mouseover="(event) => {onEnter(event)}"
                    @mouseleave="onLeave"
                    :name="bar.mode"
                >
                    <image
                        :x="offsetLeft"
                        y="-12.5"
                        :href="getIcon(bar.mode)"
                        :width="iconSize"
                        :height="iconSize"
                        :name="bar.mode"
                    />
                    <rect
                        :x="iconSize + offsetLeft"
                        y="0"
                        :width="bar.width"
                        :height="5"
                        :style="barStyle(bar.mode)"
                        rx="2.5"
                        ry="2.5"
                        :name="bar.mode"
                    />
                    <text
                        :x="offsetLeft" 
                        y="0"
                        dy="0.5em"
                        dx="-0.5em"
                        :style="textStyle(bar.mode)"
                    > {{getBarValueByTitle(bar.mode)}} {{legendMode}}
                    </text>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
//parts of this code are from this course / repo: https://github.com/uclab-potsdam/scrollytelling-beginners

import * as d3 from "d3";
import { gsap } from 'gsap';

//let svg;

export default {
    data() {
        return {
            data: [],
            iconSize: 30,
            offsetLeft:80,
            hoverMessage: "",
            showHover:false,
            currentHover:"walk",
            description:{
                public_transport:{
                    eng:"drove with public transport on average ",
                    de:"fährt öffentliche Verkehrmittel durchschnittlich "
                },
                car:{
                    eng:"drove with a car on average ",
                    de:"fährt das Auto durchschnittlich "
                },
                walk:{
                    eng:"walked on average ",
                    de:"läuft im Durschnitt "
                },
                bicycle:{
                    eng:"drove the bicycle on average ",
                    de:"fährt das Fahrrad im Durschnitt "
                },
            },
            legendMode:"km",
            updatedScale:false,
        };
    },
    props: {
        width: Number,
        height: Number,
        path:String,
        isEnglish:Boolean
    },
    methods: {
        setupLegend() {
            let scope = this;
            let filterList = ["car","bicycle","walk","public_transport"] // filter out stationary, start and end

            d3.json(this.path).then(function (data) {
                    scope.data = data.nodes.reduce(function(filtered, d) {
                    if (filterList.includes(d.title)) {
                        console.log(d)
                        let node = {
                            transport_mode: d.title,
                            route_mean: +d.route_from,
                            time:+d.time_from
                        }
                        filtered.push(node);
                    }
                    return filtered;
                    }, []);
            });
        },
        updateLegend(){
            this.setupLegend();
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
        toKilometer(value) {
            return Math.round(value / 100) / 10; //2 decimals
        },
        barStyle(title) {
            return { fill: String(this.getColor(title)), rx: "20", ry: "30" };
        },
        textStyle(title) {
            return { fill: String(this.getColor(title)) };
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
        changeHoverMessage(){
            console.log(this.currentHover)
            let info = this.description[this.currentHover]
            if (this.isEnglish){
                this.hoverMessage = info.eng
            }
            else{
                this.hoverMessage = info.de
            }
            this.hoverMessage += this.getBarValueByTitle(this.currentHover)
        },
        onEnter(e){
            this.showHover = true;
            let name = e.target.getAttribute('name')
            this.currentHover = name;   
            this.changeHoverMessage();

            let tooltip = this.$refs.tooltip;
            gsap.set(tooltip, {
                    left: this.chartWidth/3,
                    y: d3.pointer(e)[1]       
                })
        },
        onLeave(){
            this.showHover = false;
        }
    },
    watch: {
        isEnglish: function() {
            this.changeHoverMessage()
        }
    },
    computed: {
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
            return this.height / this.data.length;
        },
        chartHeight() {
            return this.height;
        },
        chartWidth() {
            return this.width - this.iconSize;
        },
        scaleY() {
            //const values = this.data.map((d) => d["route_sum"]);

            //const domain = [0, d3.max(values)];
            const domain = [0, this.maxRange]; //max value for comparability
            const range = [0, this.chartWidth - this.iconSize - this.offsetLeft];
            return d3.scaleLinear().domain(domain).range(range);
        },
        bars() {
            console.log("redo bars")
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
        maxRange(){
            if(this.legendMode === "km"){
                return 37000;
            }
            else if(this.legendMode === "min"){
                return 120;
            }
            return 120;
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
        this.setupLegend();
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_config.scss";

#tooltip{
    @include tooltip;
}

svg {
    text {
        text-anchor: end;
        font-family:Roboto;
        padding-right:0.5rem;
    }
}
</style>