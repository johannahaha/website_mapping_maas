<template>
    <div>
        <div id="tooltip" v-show="showHover" ref="tooltip">
            {{hoverMessage}}
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
                >
                    <image
                        :x="0"
                        y="-10"
                        :href="getIcon(bar.mode)"
                        :width="offsetLeft"
                        :height="offsetLeft"
                    />
                    <rect
                        :x="offsetLeft"
                        y="0"
                        :width="bar.width"
                        :height="5"
                        :style="barStyle(bar.mode)"
                        rx="2.5"
                        ry="2.5"
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
import * as d3 from "d3";

//let svg;

export default {
    data() {
        return {
            data: [],
            offsetLeft: 25,
            hoverMessage: "",
            showHover:false
        };
    },
    props: {
        width: Number,
        height: Number,
        path:String
    },
    methods: {
        setupLegend() {
            //svg = d3.select("#d3-barchart").select("svg");
            let scope = this;
            let filterList = ["car","bicycle","walk","public_transport"]
            d3.json(this.path).then(function (data) {
                // scope.data = data.nodes.map((d) => {
                //         console.log(d);
                //         return {
                //             transport_mode: d.title,
                //             route_sum: +d.route_from,
                //             route_mean: +d.route_mean,
                //         };
                //     });
                    scope.data = data.nodes.reduce(function(filtered, d) {
                    if (filterList.includes(d.title)) {
                        let node = {
                            transport_mode: d.title,
                            route_sum: +d.route_from,
                            route_mean: +d.route_mean,
                        }
                        filtered.push(node);
                    }
                    return filtered;
                    }, []);
            }).then(console.log(scope.data));
        },
        updateLegend(){
            console.log("update legend");
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
                console.log("give color of bike hehe");
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
            return this.height / this.data.length;
        },
        chartHeight() {
            return this.height;
        },
        chartWidth() {
            return this.width - this.offsetLeft;
        },
        scaleY() {
            const values = this.data.map((d) => d["route_sum"]);
            const domain = [0, d3.max(values)];
            const range = [0, this.chartWidth - this.offsetLeft];
            return d3.scaleLinear().domain(domain).range(range);
        },
        bars() {
            return this.data.map((d) => {
                const barWidth = this.scaleY(d["route_sum"]);
                return {
                    mode: d.transport_mode,
                    value: d["route_sum"],
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

svg {
    text {
        text-anchor: start;
        font-family:Roboto
    }
}
</style>