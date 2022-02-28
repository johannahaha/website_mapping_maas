<template>
    <div>
        <div id="description">{{this.currentDescription}}</div>
        <D3Legend id="legend" ref="legend" :height="heightLegend" :width="widthLegend" :path="currentPath" :isEnglish="isEnglish"></D3Legend>
        <div id="tooltip" v-show="showHover" ref="tooltip">
            {{hoverMessage}}
        </div>
        <div id="d3-network" :height="heightPx" :width="widthPx"> <svg id="svg" :view-box="viewBox" preserveAspectRatio='xMaxYMax meet' :style="{height:heightPx, width:widthPx}"> </svg> </div>
    </div>
</template>


<script>
import D3Legend from "../components/D3Legend.vue";

import * as d3 from "d3";
import { gsap } from 'gsap';

let simulation;
let node,link,marker,svg, startlink
let colorBasics, colorCar, colorBicycle, colorWalk, colorPublicTransport;
let edgeWidth, nodeSize;
let timer;
//let svgDom;

export default {
    components:{
        D3Legend
    },
    data(){
        return{
            i:0,
            marker_size:10,
            currentNetwork: "network_person1",
            currentPath: "/json/intro1.json",
            hoverMessage: "",
            currentDescription:"",
            description: {
                network_intro1: {
                    de:"Einleitung",
                    eng:"Introduction"
                },
                network_intro2: {
                    de:"Einleitung",
                    eng:"Introduction"
                },
                network_intro3: {
                    de:"Einleitung",
                    eng:"Introduction"
                },
                network_person1: {
                    de:"1. Zur Arbeit Fahren",
                    eng:"1. Driving to Work"
                },
                network_person2: {
                    de:"2. Homeoffice & Fahrrad",
                    eng:"2. Homeoffice & Bicycle"
                },
                network_person3: {
                    de:"3. Gemische Mobilität",
                    eng:"3. Mixed Mobility"
                },
                network_person6: {
                    de:"4. S-Bahn nach Berlin",
                    eng:"4. Train to Berlin"
                },
            },
            showHover:false,
            type:"",
            nodeData : [],
            linkData : [],
            isDragging:false,
            hover_data: {
                eng:{
                    car: "car",
                    bicycle: "bicycle",
                    public_transport: "public transport (bus, tram, train)",
                    start: "starting point of a journey",
                    end: "end point of a journey",
                    stationary: "short stop in between",
                    walk:"walking"
                },
                de: {
                    car: "Auto",
                    bicycle: "Fahrrad",
                    public_transport: "Öffenliche Verkehrmittel (Bus, Tram, Bahn)",
                    start: "Start einer Fahrt",
                    end: "Ende einer Fahrt",
                    stationary: "kurzer Zwischenstop",
                    walk:"Zu Fuß"
                }
            },
        }
    },
    props:{
        width: Number,
        height: Number,
        isEnglish:Boolean
    },
    watch: {
        isEnglish: function() {
            this.changeDescription()
        }
    },
    methods: {
        setupGraph() {

            svg = d3.select("#d3-network").select("svg");
            let scope = this;

            //COLORS
            colorBasics = d3.scaleLinear()
                .domain([1,80])
                .range(["#333","#eee"])
                .interpolate(d3.interpolateHsl)

            colorWalk = d3.scaleLinear()
                .domain([1,80])
                .range(["#598DB3","#80CAFF"])
                .interpolate(d3.interpolateHsl)
            
            colorCar = d3.scaleLinear()
                .domain([1,80])
                .range(["#B3B3B3","#fff"])
                .interpolate(d3.interpolateHsl)

            colorPublicTransport = d3.scaleLinear()
                .domain([1,80])
                .range(["#6159B3","#8A80FF"])
                .interpolate(d3.interpolateHsl)
            
            colorBicycle = d3.scaleLinear()
                .domain([1,80])
                .range(["#74B359","#A6FF80"])
                .interpolate(d3.interpolateHsl)

            
            //SCALES
            edgeWidth = d3.scaleLinear()
                .domain([1, 80])
                .range([3, 30]);
            
            nodeSize = d3.scaleLinear()
                .domain([10,120])
                //.range([10,20])
                .range([40, 70]);
    
            
            //SVG
            if (svg.empty()) {
                svg = d3.select("#svg")
                    // .attr("width", this.width)
                    // .attr("height", this.height);
            }

            d3.json(this.currentPath).then(function (graph) {

                scope.nodeData = d3.map(graph.nodes, function(d) {
                    return d.title;
                });

                //scope.nodeData = graph.nodes;
                scope.linkData = graph.edges.target;
                scope.currentNetwork = "network_intro1";
                scope.changeDescription();

                let widthScale = scope.width/11


                const forceLink = d3.forceLink(graph.edges).id(function (d) {
                    return d.title;
                }).distance(widthScale);


                simulation = d3
                    .forceSimulation(graph.nodes)
                    .force("charge", d3.forceManyBody().strength(-widthScale))
                    .force("collide", d3.forceCollide(widthScale * 1.5))
                    .force("link", forceLink)
                    .force("center", d3.forceCenter(scope.width / 2, scope.height / 2))
               
                marker = svg.append("defs")

                    .selectAll("marker")
                    .data(graph.edges, function (d) { return d.source.id + "-" + d.target.id; })
                    .enter()
                    .filter(function(d) { return d.source.title !== "start" })
                    .append("marker")
                    .attr("id", function (d) { 
                        let id = "marker_" + d.source.title + "-" + d.target.title
                        return id
                    })
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 0)
                    .attr("refY", 0)
                    .attr("markerWidth", d=> {
                        return scope.marker_size + d.value/2})
                    .attr("markerHeight", d=> {return scope.marker_size + d.value/2})
                    .attr("markerUnits","userSpaceOnUse")
                    .attr("orient", "auto")
                    .attr("fill", d=> {
                        return scope.getColor(d.source.title,d.target.title,d.value)
                        //return d.color
                    })
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5")


                link = svg.append("g")
                    .attr("id","paths")
                    .selectAll(".path")
                    .data(graph.edges)
                    .enter()
                    .filter(function(d) { return d.source.title !== "start" })
                    .append("path")
                    .attr("class", "path")
                    .attr('stroke',function(d) { 
                        return scope.getColor(d.source.title,d.target.title,40)
                    // return d.source.color;
                    })
                    .attr("stroke-opacity",1)
                    .attr("stroke-width", function (d) {
                        return edgeWidth(d.value);
                    })
                    .attr("marker-end", function(d) { 
                        return "url(#marker_" + (d.source.title + "-" + d.target.title) + ")"; })
                    .attr("id", function (d){
                        return d.source.title + "-" + d.target.title
                    })
                    .attr("fill","none")
                    .attr("ref", function (d){
                        return d.source.title + "-" + d.target.title
                    });
                link.on("pointerenter",scope.enterTooltip)
                link.on("pointermove",scope.moveTooltip)
                link.on("pointerleave",scope.leaveTooltip)

                startlink = svg.append("g")
                    .attr("id","paths_start")
                    .selectAll(".path_start")
                    .data(graph.edges)
                    .enter()
                    .filter(function(d) { return d.source.title === "start" })
                    .append("path")
                    .attr("class", "path_start")
                    .attr('stroke',function(d) { 
                        return scope.getColor(d.source.title,d.target.title,40)
                    // return d.source.color;
                    })
                    .attr("stroke-opacity",1)
                    .attr("stroke-width", function (d) {
                        return edgeWidth(d.value);
                    })
                    .attr("id", function (d){
                        return d.source.title + "-" + d.target.title
                    })
                    .attr("fill","none")
                    .attr("ref", function (d){
                        return d.source.title + "-" + d.target.title
                    });
                startlink.on("pointerenter",scope.enterTooltip)
                startlink.on("pointermove",scope.moveTooltip)
                startlink.on("pointerleave",scope.leaveTooltip)

                // We create a <circle> SVG element for each node
                // in the graph, and we specify a few attributes.

                node = svg.append("g")
                    //.attr("transform",translate)
                    .attr("id","nodes")
                    .selectAll(".node")
                    .data(graph.nodes)
                    .enter()
                    .append("svg:image")
                    .attr("href",d => {return scope.getIcon(d.title)})
                    .attr("width", function (d) {
                        return nodeSize(d.weight);
                    })
                    .attr("height", function (d) {
                        return nodeSize(d.weight);
                    })
                    // .attr("width", scope.iconSize)
                    // .attr("height", scope.iconSize)
                    .attr("x", d => {return -nodeSize(d.weight)/2})
                    .attr("y", d => {return -nodeSize(d.weight)/2})


                    //.append("circle")
                    .attr("class", "node")
                     //.append("circle")
                    // .attr("r", function(d) {
                    //     return d.weight * 10;
                    // }) // radius
                    // .style("fill", d => {
                    //     //return d.color;
                    //     return scope.getColor(d.title,40)
                    // })
                    .each(function(d) {
                        if (d.title === "start"){
                            d.fx = scope.width/8;
                            d.fy = scope.height/8;
                            //this.showHover = false;
                            this.isDragging = true
                        }
                        else if(d.title === "end"){
                            d.fx = scope.width - scope.width/8;
                            d.fy = scope.height - scope.height/8;
                            this.isDragging = false;
                        }
                        else{
                            d.fx = undefined
                            d.fy = undefined
                        }
                    })

                    .call(d3.drag()
                            .on("start", function (event, d) {
                                if(d.title === "start" || d.title === "end"){
                                    return
                                }
                                if (!event.active)
                                    simulation.alphaTarget(0.3).restart();
                                d.fx = d.x;
                                d.fy = d.y;
                            })
                            .on("drag", function (event, d) {
                                if(d.title === "start" || d.title === "end"){
                                    return
                                }
                                d.fx = event.x;
                                d.fy = event.y;
                            })
                            .on("end", function (event, d) {
                                if(d.title === "start" || d.title === "end"){
                                    return
                                }
                                if (!event.active) simulation.alphaTarget(0);
                                d.fx = null;
                                d.fy = null;
                            })
                    );

                node.append("title").text(function (d) {
                    return d.title;
                });
                node.on("pointerenter",scope.enterTooltip)
                node.on("pointermove",scope.moveTooltip)
                node.on("pointerleave",scope.leaveTooltip)

                    



                // We bind the positions of the SVG elements
                // to the positions of the dynamic force-directed
                // graph, at each time step.
                simulation.on("tick", scope.onTick);
                console.log("mounted done");
            });
        },
        transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        },
        getIcon(title){
            let path = "/img/" + title + ".svg"
            return path
        },
        getLinkAttributeSetup(d){
            let dx = d.target.x - d.source.x;
            let dy = d.target.y - d.source.y;
            let dr = Math.sqrt(dx * dx + dy * dy);
            return (
                "M" + d.source.x + "," + d.source.y +"A" + dr + "," + dr +  " 0 0,1 " + d.target.x + "," + d.target.y
            );
        },
        getLinkAttributeUpdate(d,hasMarker){
            let id = d.source.title + "-" + d.target.title;
            let thisPath = document.getElementById(id)
            let pl = thisPath.getTotalLength()
            let r = 0
            if(hasMarker){
                r = nodeSize(d.target.weight)/2 + this.getMarkerLength(this.marker_size + d.value/2)   
            }
            let m = thisPath.getPointAtLength(pl - r)

            let startx = d.source.x;
            let starty = d.source.y;

            let dx = m.x - startx
            let dy = m.y - starty
            let dr = Math.sqrt(dx * dx + dy * dy);

            return (
                "M" +  startx + "," + starty + "A" + dr + "," + dr +  " 0 0,1 " + m.x + "," +  m.y
            );
        },
        onTick(){
            try{
                if (this.i==3) return;
                //this.i++;
                
                link.attr("d", d => {
                    return this.getLinkAttributeSetup(d)
                });
                link.attr("d", d => {
                    return this.getLinkAttributeUpdate(d,true)
                });
                startlink.attr("d", d => {
                    return this.getLinkAttributeSetup(d)
                });
                startlink.attr("d", d => {
                    return this.getLinkAttributeUpdate(d,false)
                });
                node.attr("transform", this.transform);
                //text.attr("transform", this.transform);
            }
            catch(error){
                console.log("error on tick",error);
                this.i = 3; //so it stops
            }
        },
        handleNetworkUpdate(step){
            let path = ""
            if(step === 0){
                this.updateNetworkData("network_intro1","/json/intro1.json")
            }
            else if(step === 3){
                this.updateNetworkData("network_intro2","/json/intro2.json")
            }
            else if(step === 5){
                this.updateNetworkData("network_intro3","/json/intro3.json")
            }
            else if(step === 8){
                this.updateNetworkData("network_person1","/json/person1.json")
            }
            else if(step === 13){
                this.updateNetworkData("network_person2","/json/person2.json")
            }
            else if(step === 21){
                this.updateNetworkData("network_person3","/json/person3.json")
            }
            else if(step === 29){
                this.updateNetworkData("network_person6","/json/person6.json")
            }
            return path;

        },
        getMarkerLength(size){
            return Math.sqrt(size**2 + size**2)
        },
        getColor(title,target,value){
            if(title === "car"){
                return colorCar(value);
            } 
            else if(title=== "bicycle"){
                return colorBicycle(value);
            } 
            else if(title === "walk"){
                return colorWalk(value);
            }

            else if(title === "public_transport"){
                return colorPublicTransport(value);
            }

            else if(title ==="stationary" || title ==="start"){
                return this.getColor(target,target,value)
            }
            return colorBasics(value); 
        },
        changeDescription(){
            let info = this.description[this.currentNetwork]
            if(this.isEnglish){
                this.currentDescription = info.eng
            }
            else{
                this.currentDescription = info.de
            }
        },
        updateNetworkData(updatedNetwork,updatedPath){
            if(this.currentNetwork !== updatedNetwork){
                this.currentNetwork = updatedNetwork
                this.currentPath = updatedPath
                this.changeDescription();
                this.showHover = false
            }
        },
        updateGraph(step){
            let scope = this;
            this.handleNetworkUpdate(step);
            
            d3.json(this.currentPath).then(function (graph) {
                scope.$refs.legend.updateLegend();


                const t = svg.transition().duration(2000)

                svg.selectAll("marker").remove()

                marker = marker.data(graph.edges, function(d) { 
                    return "marker_" + d.source + "-" + d.target;
                });

                marker = marker
                    .join(
                        enter => enter
                            .filter(function(d) { return d.source !== "start" })
                            .append("marker")
                            .attr("id", function (d) { 
                                let id = "marker_" + d.source + "-" + d.target
                                return id
                            })
                            .attr("viewBox", "0 -5 10 10")
                            .attr("refX", 0)
                            .attr("refY", 0)
                            .attr("orient", "auto")
                            .append("path")
                            .attr("d", "M0,-5L10,0L0,5"),
                        update => update
                            .filter(function(d) { return d.source !== "start" })
                            .attr("markerWidth", d=> {
                                return scope.marker_size + d.value/2})
                            .attr("markerHeight", d=> {return scope.marker_size + d.value/2}))
                            .attr("fill", (d)=> {
                                return scope.getColor(d.source,d.target,d.value)
                            //return d.color
                            })
                            .attr("opacity", 0)
                            .call(update => update.transition(t)
                                .attr("opacity", 1.0)),
                        exit => exit.remove()
                    .merge(marker)


                node = node.data(graph.nodes, function(d) { return d.index;});

                node = node.join(
                    enter => enter
                        .append("svg:image")
                        .attr("href",d => {return scope.getIcon(d.title)})
                        .attr("width", function (d) {
                            return nodeSize(d.weight);
                        })
                        .attr("height", function (d) {
                            return nodeSize(d.weight);
                        })
                        .attr("x", d => {return -nodeSize(d.weight)/2})
                        .attr("y", d => {return -nodeSize(d.weight)/2})
                        .each(function(d) {
                            if (d.title === "start"){
                                d.fx = scope.width/8;
                                d.fy = scope.height/8;
                            }
                            else if(d.title === "end"){
                                d.fx = scope.width - scope.width/8;
                                d.fy = scope.height - scope.height/8;
                            }
                            else{
                                d.fx = undefined
                                d.fy = undefined
                            }
                        })
                        .style("opacity", 0)
                        .attr("cx", () => {
                            return 10
                        })
                        .attr("cy", () => {
                            return 10

                        })
                        .call(enter => enter.transition(t)
                            .style("opacity", 1)),
                    exit => exit
                        .call(exit => exit.transition(t)
                            .attr("opacity", 0))
                        .remove()
                    )

                node.on("pointerenter",scope.enterTooltip)
                node.on("pointermove",scope.moveTooltip)
                node.on("pointerleave",scope.leaveTooltip)
                node.call(d3.drag()
                            .on("start", function (event, d) {
                                if (!event.active)
                                    simulation.alphaTarget(0.3).restart();
                                d.fx = d.x;
                                d.fy = d.y;
                            })
                            .on("drag", function (event, d) {
                                d.fx = event.x;
                                d.fy = event.y;
                            })
                            .on("end", function (event, d) {
                                if (!event.active) simulation.alphaTarget(0);
                                d.fx = null;
                                d.fy = null;
                            })
                    );

                // Apply the general update pattern to the links.
                link = link.data(graph.edges, function(d) { return d.source + "-" + d.target; });

                link = link.join(
                    enter => enter
                        .filter(function(d) { return d.source !== "start" })
                        .append("path")
                        .attr('stroke',function(d) { 
                            //return d.color
                            return scope.getColor(d.source,d.target,d.value)
                        })
        
                        .attr("stroke-width", function (d) {
                            return edgeWidth(d.value);
                        })
                        .attr("stroke-opacity",1)
                        .attr("marker-end", function(d) { 
                            return "url(#marker_" + (d.source + "-" + d.target) + ")"; })
                        .attr("id", function (d){
                            return d.source + "-" + d.target
                        })
                        .attr("fill","none")
                        .attr("stroke-opacity", 0)
                        .call(enter => enter.transition(t)
                            .attr("stroke-opacity", 1.0)),
                    exit => exit
                        .call(exit => exit.transition(t)
                            .attr("stroke-opacity", 0))
                        .remove()
                    )
                link.on("pointerenter",scope.enterTooltip)
                link.on("pointermove",scope.moveTooltip)
                link.on("pointerleave",scope.leaveTooltip)

                startlink = startlink.data(graph.edges, function(d) { return d.source + "-" + d.target; });

                startlink = startlink.join(
                    enter => enter
                        .filter(function(d) { return d.source === "start" })
                        .append("path")
                        .attr('stroke',function(d) { 
                            //return d.color
                            return scope.getColor(d.source,d.target,d.value)
                        })
        
                        .attr("stroke-width", function (d) {
                            return edgeWidth(d.value);
                        })
                        .attr("stroke-opacity",1)
                        .attr("id", function (d){
                            return d.source + "-" + d.target
                        })
                        .attr("fill","none")
                        .attr("stroke-opacity", 0)
                        .call(enter => enter.transition(t)
                            .attr("stroke-opacity", 1.0)),
                    exit => exit
                        .call(exit => exit.transition(t)
                            .attr("stroke-opacity", 0))
                        .remove()
                    )
                startlink.on("pointerenter",scope.enterTooltip)
                startlink.on("pointermove",scope.moveTooltip)
                startlink.on("pointerleave",scope.leaveTooltip)

                // Update and restart the simulation.
                simulation.nodes(graph.nodes);
                simulation.force("link").links(graph.edges);
                simulation.alpha(1).restart();

                scope.nodeData = graph.nodes.target;
                scope.linkData = graph.edges.target;
            })

        },
        enterTooltip(e,d){
            let tooltip = this.$refs.tooltip
            gsap.to(tooltip,{
                duration:1,
                opacity:1,
                onComplete: () => {this.showHover = true}
            })
            //tooltip.style("opacity", 1)

            let data = this.hover_data.eng
            if(!this.isEnglish){
                data = this.hover_data.de
            }

            if(e.target.tagName === "image"){
                this.hoverMessage = data[d.title];
            }
            else if (e.target.tagName === "path"){
                this.hoverMessage = data[d.source.title]

                if(d.source.title === "start"|| d.source.title === "stationary"){
                    this.hoverMessage = data[d.target.title];
                }
            }
        },
        moveTooltip(e,d){

            let tooltip = this.$refs.tooltip

            if(e.target.tagName === "image"){

                gsap.set(tooltip, {
                    x: d.x-nodeSize(d.weight)/2,
                    y: d.y-nodeSize(d.weight)-30//+nodeSize(d.weight)+10,       
                })

                if(d.title === "end"){
                    gsap.set(tooltip, {
                        x: d.x-nodeSize(d.weight)*2,      
                    })
                }
            }
            else if(e.target.tagName === "path"){
                //console.log(e)
                gsap.to(tooltip, {
                    duration:0.1,
                    x: d3.pointer(e)[0] + 30,
                    y: d3.pointer(e)[1] - 20  
                })
            }


        },
        leaveTooltip(){
            let tooltip = this.$refs.tooltip
            clearTimeout(timer);
            timer = setTimeout(()=>{
                gsap.to(tooltip,{
                duration:1,
                opacity:0,
                onComplete: () => {this.showHover = false}
            })
            },2000);
        },
        node(nodeId) {
            return this.nodeData.find(function (node) {
                return node.id == nodeId;
            })
        },
        resizeSimulation(){
            let scope = this;

            node.each(function(d) {
                if (d.title === "start"){
                    d.fx = scope.width/8;
                    d.fy = scope.height/8;
                    //this.showHover = false;
                }
                else if(d.title === "end"){
                    d.fx = scope.width - scope.width/8;
                    d.fy = scope.height - scope.height/8;
                }
            })

            let widthScale = scope.width/11

            //TODO: FORCE LINK
            //TODO: USE HEIGHT BETTER OR IN GENERAL SPACE ON MOBILE
            simulation
                .force("charge", d3.forceManyBody().strength(-widthScale))
                .force("collide", d3.forceCollide(widthScale * 1.5))
                .force("center", d3.forceCenter(this.width / 2, this.height / 2))
                // 0.3 is arbitrary
                .alpha(0.3)
                .restart()
        }
    },
    mounted() {
        this.setupGraph();
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
        heightLegend: function(){
            return this.height * 0.2
        },
        widthLegend: function(){
            return this.width * 0.4
        },
    }
};
</script>

<style lang="scss">
@import "@/assets/_config.scss";

#node_labels{
    .node_label{
        position:absolute;
        font-size:1.3rem;
        color:red;
    }
}
#legend{
    position:absolute;
    z-index:1;
    bottom: 0;
    left:0;
}

#tooltip{
    @include tooltip
}

#description{
    position: absolute;
    @include small-headline;
    padding-top:2.5rem;
    padding-bottom: 0rem;
    left: 50%;
    transform: translate(-50%, 0);
}

</style>
