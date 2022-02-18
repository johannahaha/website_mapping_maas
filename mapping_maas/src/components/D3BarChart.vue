<template>
    <div>
        Average Meters made with each mode of transport (of all participants)
        <div id="d3-network" :height="heightPx" :width="widthPx"> 
             <svg id="svg" :view-box="viewBox" preserveAspectRatio='xMaxYMax meet' :style="{height:heightPx, width:widthPx}">
                <g v-for="(bar, i) in bars" :key="`bar-${i}`" :transform="`translate(0 ${barHeight * (i + 0.5)})`">
                    <rect :x="bar.x" y="0" :width="bar.width" :height="20" />
                    <text :x="bar.x" y="0" dy="-0.5em">
                        {{ bar.value }}
                    </text>
                    <text :x="0" y="0" dy="1.5em">
                        {{ bar.mode }}
                    </text>
                </g>
            </svg> 
        </div>
    </div>
</template>

<script>
import * as d3 from "d3";

//let svg;

export default {
    data() {
        return {
            data: []

        }
    },
    props:{
        width: Number,
        height: Number
    },
    methods:{
        setupBarChart(){
            //svg = d3.select("#d3-barchart").select("svg");
            let scope = this;
            d3.json( "/json/totalgraphdata.json").then(function (data) {
                scope.data = data.nodes.map(d => {
                    console.log(d)
                    return {
                        transport_mode: d.title,
                        route_sum: +d.route_from,
                        route_mean: +d.route_mean
                    }
                })
            })
        }
    },
    computed:{
        viewBox: function(){
            return '0 0 '+ this.width + ' ' + this.height;
        },
        heightPx: function(){
            return this.height + "px"
        },
        widthPx: function(){
            return this.width + "px"
        },
        barHeight () {
            return this.height/ this.data.length
        },
        chartHeight () {
            return this.height
        },
        chartWidth () {
            return this.width
        },
        scaleY () {
            const values = this.data.map(d => d["route_mean"])
            const domain = [0, d3.max(values)]
            const range = [0, this.chartWidth]
            return d3.scaleLinear().domain(domain).range(range)
        },
        bars () {
            return this.data.map(d => {
                const barWidth = this.scaleY(d["route_mean"])
                console.log(barWidth)
                return {
                    mode: d.transport_mode,
                    value: d["route_mean"],
                    x: this.chartWidth - barWidth,
                    width: barWidth
                }
            })
        }
    },
    mounted() {
        this.setupBarChart();
    },
}
</script>

<style lang="scss" scoped>

@import "@/assets/_config.scss";

svg{
    text{
        text-anchor: start;
        fill: $light;
    }
    rect{
        fill: $light;
    }
}

</style>