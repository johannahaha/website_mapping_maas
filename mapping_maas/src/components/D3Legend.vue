<template>
    <div>
        <div v-if="isEnglish" id="tooltip" v-show="showHover" ref="tooltip" :style="`{'color': ${getColor(currentHover)}}`">
            This participant {{hoverMessage}} km.
        </div>
        <div v-else id="tooltip" v-show="showHover" ref="tooltip" :style="`{'color': ${getColor(currentHover)}}`">
            Diese Person {{hoverMessage}} km.
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
                        :x="0"
                        y="-10"
                        :href="getIcon(bar.mode)"
                        :width="offsetLeft"
                        :height="offsetLeft"
                        :name="bar.mode"
                    />
                    <rect
                        :x="offsetLeft"
                        y="0"
                        :width="bar.width"
                        :height="5"
                        :style="barStyle(bar.mode)"
                        rx="2.5"
                        ry="2.5"
                        :name="bar.mode"
                    />
                    <!-- <text
                        :x="bar.x"
                        y="0"
                        dy="-0.5em"
                        :style="textStyle(bar.mode)"
                    >
                        {{ toKilometer(bar.value) }} km
                    </text> -->
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
            offsetLeft: 25,
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
            }
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
                        let node = {
                            transport_mode: d.title,
                            route_mean: +d.route_from,
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
            return Math.round(value / 10) / 100; //2 decimals
        },
        barStyle(title) {
            return { fill: String(this.getColor(title)), rx: "20", ry: "30" };
        },
        textStyle(title) {
            return { fill: String(this.getColor(title)) };
        },
        getRouteMean(title){
            let datapoint = this.data.find(element => element["transport_mode"] === title)
            let route_mean = this.toKilometer(datapoint["route_mean"])
            return route_mean;
        },
        changeHoverMessage(){
            let info = this.description[this.currentHover]
            if (this.isEnglish){
                this.hoverMessage = info.eng
            }
            else{
                this.hoverMessage = info.de
            }
            this.hoverMessage += this.getRouteMean(this.currentHover)
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
            return this.width - this.offsetLeft;
        },
        scaleY() {
            //const values = this.data.map((d) => d["route_sum"]);

            //const domain = [0, d3.max(values)];
            const domain = [0, 37000]; //max value for comparability
            const range = [0, this.chartWidth - this.offsetLeft];
            return d3.scaleLinear().domain(domain).range(range);
        },
        bars() {
            return this.data.map((d) => {
                const barWidth = this.scaleY(d["route_mean"]);
                return {
                    mode: d.transport_mode,
                    value: d["route_mean"],
                    x: this.chartWidth - barWidth,
                    width: barWidth,
                };
            });
        },
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
        text-anchor: start;
        font-family:Roboto
    }
}
</style>