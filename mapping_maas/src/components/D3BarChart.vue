<template>
    <div id="bar-chart-container">
        <h3>  How far did a participant on average travel with each transport mode in a trip?</h3>
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
                        :x="bar.x - 10"
                        y="0"
                        :width="bar.width"
                        :height="15"
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
                        {{ toKilometer(bar.value) }} km
                    </text>
                </g>
            </svg>
        </div>
        (vielleicht eher in unsere Dokumentation als auf unserer Seite)
        A trip consists of several routes with different modes of transport that are needed to get from the start to the destination. To determine the average meters traveled by each mode of transportation, we first added up the routes traveled by each mode of transportation in each trip. Then we averaged these routes. If we had calculated only the average meters of all recorded routes without taking the trips into account, we would have distorted the result. Because then we would have ignored the fact that, for example, one uses several means of public transport in a row and walks in between. You don't do that when you use a car, so it would look like a car covers much longer distances.
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
            offsetRight: 25,
        };
    },
    props: {
        width: Number,
        height: Number,
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
            return (this.height - 25) / this.data.length;
        },
        chartHeight() {
            return this.height;
        },
        chartWidth() {
            return this.width - this.offsetRight;
        },
        scaleY() {
            const values = this.data.map((d) => d["route_mean"]);
            const domain = [0, d3.max(values)];
            const range = [0, this.chartWidth - this.offsetRight];
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
        this.setupBarChart();
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_config.scss";

#bar-chart-container{
    margin: 10% 0;

    h3{
        @include small-headline;
    }
}

svg {
    text {
        text-anchor: start;
        font-family:Roboto
    }
}
</style>