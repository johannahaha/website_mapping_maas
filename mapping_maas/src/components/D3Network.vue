<template>
    <div>
        <h3>Aktuell zu sehen: {{this.currentNetwork}}</h3>
        <div id="tooltip" v-show="showHover" ref="tooltip">
            {{hoverMessage}}
        </div>
        <div id="d3-network" :height="heightPx" :width="widthPx"> <svg id="svg" :view-box="viewBox" preserveAspectRatio='xMaxYMax meet' :style="{height:heightPx, width:widthPx}"> </svg> </div>
    </div>
</template>


<script>
import * as d3 from "d3";
import { gsap } from 'gsap';

let simulation;
let node,link,marker,svg
let colorBasics, colorCar, colorBicycle, colorWalk, colorPublicTransport;
let edgeWidth, nodeSize;
//let svgDom;

let default_data = {
                car: "Auto",
                bicycle: "Fahrrad",
                public_transport: "Öffentliche Verkehrsmittel (Bus, Tram, Bahn)",
                start: "Startpunkt einer Fahrt",
                end: "Endpunkt einer Fahrt",
                stationary: "kurzer Zwischenstopp",
                walk:"Zu Fuß"
            }

export default {
    data(){
        return{
            i:0,
            marker_size:10,
            currentNetwork: "network_person1",
            currentPath: "/json/intro1.json",
            hoverMessage: "",
            showHover:false,
            type:"",
            nodeData : [],
            linkData : [],
            isDragging:false,
            hover_data: {
                network_intro1: default_data,
                network_intro2: default_data,
                network_person1: default_data,
                network_person3: default_data,
                network_person6: default_data,
            }
        }
    },
    props:{
        width: Number,
        height: Number,
    },
    methods: {
        setupGraph() {

            svg = d3.select("#d3-network").select("svg");
            let scope = this;
            // colorBasics = d3.scaleSequential()
            //     .domain([80,1])
            //     .interpolator(d3.interpolateGreys);
            
            // colorBasics = d3.scaleLinear()
            //     .domain([1,80])
            //     .range(["#f1e1bc","#f2fo0eb"])
            //     .interpolate(d3.interpolateHsl)

            colorBasics = d3.scaleLinear()
                .domain([1,80])
                .range(["#333","#eee"])
                .interpolate(d3.interpolateHsl)

            colorWalk = d3.scaleLinear()
                .domain([1,80])
                .range(["#3e4b6d","#d7e1ff"])
                .interpolate(d3.interpolateHsl)
            
            colorCar = d3.scaleLinear()
                .domain([1,80])
                .range(["#26732e","#cdeaca"])
                .interpolate(d3.interpolateHsl)

            colorPublicTransport = d3.scaleLinear()
                .domain([1,80])
                .range(["#732667","#dff7f4"])
                .interpolate(d3.interpolateHsl)
            
            colorBicycle = d3.scaleLinear()
                .domain([1,80])
                .range(["#979933","#e7e4bd"])
                .interpolate(d3.interpolateHsl)

            
            edgeWidth = d3.scaleLinear()
                .domain([1, 80])
                .range([3, 30]);
            
            nodeSize = d3.scaleLinear()
                .domain([10,120])
                .range([40, 70]);
    
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

                let widthScale = scope.width/9


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
                        return scope.getColor(d.source.title,d.value)
                        //return d.color
                    })
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5")


                // We create a <line> SVG element for each link
                // in the graph.
                link = svg.append("g")
                    .attr("id","paths")
                    .selectAll(".path")
                    .data(graph.edges)
                    .enter()
                    .append("path")
                    .attr("class", "path")
                    .attr('stroke',function(d) { 
                        return scope.getColor(d.source.title,40)
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
                node.on("mouseenter",scope.enterTooltip)
                node.on("mousemove",scope.moveTooltip)
                node.on("mouseleave",scope.leaveTooltip)

                    



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
            // if(title in this.iconPaths){
            //     console.log(title, "is in icons");
            //     return this.iconPaths[title]
            // }
            // else{
            //     return this.iconPaths["car"]
            // }
        },
        onTick(){
            try{
                if (this.i==3) return;
                //this.i++;
                
                link.attr("d", function (d) {
                    let dx = d.target.x - d.source.x;
                    let dy = d.target.y - d.source.y;
                    let dr = Math.sqrt(dx * dx + dy * dy);
                    return (
                        "M" + d.source.x + "," + d.source.y +"A" + dr + "," + dr +  " 0 0,1 " + d.target.x + "," + d.target.y
                    );
                });
                link.attr("d", d => {
                    let id = d.source.title + "-" + d.target.title;
                    let thisPath = document.getElementById(id)
                    let pl = thisPath.getTotalLength()
                    let r = nodeSize(d.target.weight)/2 + this.getMarkerLength(this.marker_size + d.value/2)//16.97 is the "size" of the marker Math.sqrt(12**2 + 12 **2)
                    let m = thisPath.getPointAtLength(pl - r)

                    let startx = d.source.x;
                    let starty = d.source.y;

                    let dx = m.x - startx
                    let dy = m.y - starty
                    let dr = Math.sqrt(dx * dx + dy * dy);

            

                    return (
                        "M" +  startx + "," + starty + "A" + dr + "," + dr +  " 0 0,1 " + m.x + "," +  m.y
                    );
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
            else if(step === 1){
                this.updateNetworkData("network_intro2","/json/intro2.json")
            }
            else if(step === 4){
                this.updateNetworkData("network_intro3","/json/intro3.json")
            }
            else if(step === 6){
                this.updateNetworkData("network_person1","/json/person1graphdata.json")
            }
            else if(step === 10){
                this.updateNetworkData("network_person3","/json/person3graphdata.json")
            }
            // else if(step === 7){
            //     this.updateNetworkData("network_person3","/json/person3graphdata.json")
            // }
            else if(step === 12){
                this.updateNetworkData("network_person6","/json/person6graphdata.json")
            }
            // else if(step ===9){
            //     this.updateNetworkData("network_person5","/json/person5graphdata.json")
            // }
            // else if(step === 10){
            //     this.updateNetworkData("network_person6","/json/person6graphdata.json")
            // }
            // else if(step === 11){
            //     this.updateNetworkData("network_zur_arbeit","/json/zur_arbeitgraphdata.json")
            // }
            // else if(step === 12){
            //     this.currentNetwork = "network_einkaufen"
            //     path = "/json/einkaufengraphdata.json"
            // }
            // else if(step === 13){
            //     this.currentNetwork = "network_jemanden_holen_bringen"
            //     path = "/json/bringengraphdata.json"
            // }
            // else if(step === 14){
            //     this.currentNetwork = "network_nach_hause"
            //     path = "/json/nach_hausegraphdata.json"
            // }
            // else{
            //     this.currentNetwork = "person1"
            //     path = "/json/person1graphdata.json"
            // }
            return path;
        },
        updateNetworkData(updatedNetwork,updatedPath){
            if(this.currentNetwork !== updatedNetwork){
                this.currentNetwork = updatedNetwork
                this.currentPath = updatedPath
            }

        },
        getMarkerLength(size){
            return Math.sqrt(size**2 + size**2)
        },
        getColor(title,value){
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
            return colorBasics(value); 
        },
        updateGraph(step){
            let scope = this;
            this.handleNetworkUpdate(step);
            
            d3.json(this.currentPath).then(function (graph) {



                const t = svg.transition().duration(2000)

                svg.selectAll("marker").remove()

                marker = marker.data(graph.edges, function(d) { 
                    return "marker_" + d.source + "-" + d.target;
                });

                //marker = marker.join(update => update.remove())
                marker = marker
                    .join(
                        enter => enter
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
                            .attr("markerWidth", d=> {
                                return scope.marker_size + d.value/2})
                            .attr("markerHeight", d=> {
                                return scope.marker_size + d.value/2}))
                            .attr("fill", (d)=> {
                                return scope.getColor(d.source,d.value)
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

                node.on("mouseenter",scope.enterTooltip)
                node.on("mousemove",scope.moveTooltip)
                node.on("mouseleave",scope.leaveTooltip)
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
                        .append("path")
                        .attr('stroke',function(d) { 
                            //return d.color
                            return scope.getColor(d.source,d.value)
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

                // Update and restart the simulation.
                simulation.nodes(graph.nodes);
                simulation.force("link").links(graph.edges);
                simulation.alpha(1).restart();

                scope.nodeData = graph.nodes.target;
                scope.linkData = graph.edges.target;
            })

        },
        enterTooltip(e,d){
            this.showHover = true
            //tooltip.style("opacity", 1)
            let data = this.hover_data[this.currentNetwork]

            this.hoverMessage = data[d.title];
        },
        moveTooltip(e,d){

            let tooltip = this.$refs.tooltip

            gsap.set(tooltip, {
                x: d.x-nodeSize(d.weight)/2,
                y: d.y-nodeSize(d.weight)-30//+nodeSize(d.weight)+10,       
            })

            if(d.title === "end"){
                gsap.set(tooltip, {
                x: d.x-nodeSize(d.weight)*2,      
            })
            }
        },
        leaveTooltip(){
            this.showHover = false;
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

            let widthScale = scope.width/9

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
            return this.height + "px"},
        widthPx: function(){
            return this.width + "px"},
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
#tooltip{
    background-color: $light;
    padding: 0.5rem;
    color: $darkgrey;
    display: block;
    z-index:2;
    position:absolute;
    text-align:middle;
    border-radius: 1rem;

    h3{
        font-size:1rem;
    }
}

</style>
