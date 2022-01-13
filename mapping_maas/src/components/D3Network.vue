<template>
    <div id="d3-network" ref="d3-network">
        <h3>Aktuell zu sehen: {{this.currentNetwork}}</h3>
        <div id="hover" v-show="showHover" ref="hover">
            <h3>What people say about the {{type}}</h3>{{hoverMessage}}.
        </div>
    </div>
</template>


<script>
import * as d3 from "d3";
import { gsap } from 'gsap';

let simulation;
let node,link,text,marker,svg;
let timer;
let colorBasics, colorCar, colorBicycle, colorWalk, colorPublicTransport;
//let svgDom;

let default_data = {
                car: "this is a car",
                bicycle: "bicycles are great",
                bus: "bus is here",
                train: "I take the train",
                start: "I started the trip",
                end: "end of a trip",
                stationary: "nothin happens",
                walk:"walk walk walk"
            }

export default {
    data(){
        return{
            selections: {},
            i:0,
            width:600,
            height:600,
            marker_size:10,
            edgeScale: 0.3,
            currentNetwork: "network_person1",
            currentPath: "/json/intro1.json",
            hoverMessage: "",
            showHover:false,
            type:"",
            iconPaths: {
                bicycle: "/img/bicycle-solid.svg",
                car: "/img/car-solid.svg"
            },
            hover_data: {
                network_intro1: default_data,
                network_intro2: default_data,
                network_person1: default_data,
                network_person2: default_data,
                network_einkaufen: default_data,
                network_zur_arbeit: default_data,
                network_bringen: default_data,
                network_nach_hause: default_data,
                network_freizeit: default_data,
                network_person3: default_data,
                network_person4: default_data,
                network_person5: default_data,
            }
        }
    },
    computed:{
            marker_length: function(){
                console.log("marker length",Math.sqrt(this.marker_size**2 + this.marker_size**2))
                return Math.sqrt(this.marker_size**2 + this.marker_size**2)
            }
    },
    methods: {
        setupGraph() {

            svg = d3.select("#d3-network").select("svg");
            let scope = this;
            colorBasics = d3.scaleSequential()
                .domain([80,1])
                .interpolator(d3.interpolateGreys);

            colorCar = d3.scaleSequential()
                .domain([80,1])
                .interpolator(d3.interpolatePurples);
            
            colorBicycle = d3.scaleSequential()
                .domain([80,1])
                .interpolator(d3.interpolateGreens);

            colorWalk = d3.scaleSequential()
                .domain([80,1])
                .interpolator(d3.interpolateBlues);

            colorPublicTransport = d3.scaleSequential()
                .domain([80,1])
                .interpolator(d3.interpolateReds);

            if (svg.empty()) {
                svg = d3
                    .select("#d3-network")
                    .append("svg")
                    .attr("width", this.width)
                    .attr("height", this.height);
            }

            d3.json(this.currentPath).then(function (graph) {
                console.log("loaded data");
                scope.currentNetwork = "network_intro1";


                const forceLink = d3.forceLink(graph.edges).id(function (d) {
                    return d.title;
                }).distance(100);

                simulation = d3
                    .forceSimulation(graph.nodes)
                    .force("charge", d3.forceManyBody().strength(-100))
                    .force("collide", d3.forceCollide(150))
                    .force("link", forceLink)
                    .force("center", d3.forceCenter(scope.width / 2, scope.height / 2))
                    //.force("x", d3.forceX(scope.width / 3).strength(0))
                    //.force("y", d3.forceY(scope.height * 3).strength(0))
                //.force("forceX", d3.forceX().strength(.1).x(width * .5))
                //.force("forceY", d3.forceY().strength(.1).y(height * .5))

                console.log("simulation with edges");
               
                marker = svg.append("defs")
                    //.attr("transform",translate)
                    .selectAll("marker")
                    .data(graph.edges, function (d) { return d.source.id + "-" + d.target.id; })
                    //.data(["marker"])
                    .enter()
                    .append("marker")
                    // .attr("id", function (d) {
                    //     return d
                    // })
                    .attr("id", function (d) { 
                        let id = "marker_" + d.source.title + "-" + d.target.title
                        console.log(id)
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
                    //.attr("fill", "#004e64")
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5")
                    //.merge(marker);


                // We create a <line> SVG element for each link
                // in the graph.
                link = svg.append("g")
                    //.attr("transform",translate)
                    .attr("id","paths")
                    .selectAll(".path")
                    .data(graph.edges)
                    .enter()
                    .append("path")
                    .attr("class", "path")
                    .attr('stroke',function(d) { 
                        return scope.getColor(d.source.title,d.value)
                    // return d.source.color;
                    })
                    .attr("stroke-width", function (d) {
                        return d.value * scope.edgeScale;
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

                console.log(scope.width)

                node = svg.append("g")
                    //.attr("transform",translate)
                    .attr("id","nodes")
                    .selectAll(".node")
                    .data(graph.nodes)
                    .enter()
                    // .append("svg:image")
                    // .attr("href",d => {return scope.getIcon(d.title)})
                    // // //.attr("href", "img/bicycle-solid.svg")
                    // .attr("width", 40)
                    // .attr("height", 40)
                    // .attr("x", -8)
                    // .attr("y", -8)
                    // .attr("x", 228)
                    // .attr("y",53)
                    // .append('text')
                    // .attr('width', "30px" )
                    // .attr('height', "30px" ) // this will set the height and width
                    // .attr("class","fas fa-bicycle")
                    //.attr('text-anchor', 'middle')
                    //.attr('dominant-baseline', 'central')
                    // .attr("font-family", "'Font Awesome 5 Free'")
                    // // 900: solid icons, 400: regular icons
                    // .attr("font-weight", 900)
                    // // JavaScript unicode escaping
                    // .text("\uf015")
                    //.attr("class","fas fa-bicycle")
                    //.attr('font-family', "'Font Awesome 5 Free'")
                    //.text("\uf84a");


                    .append("circle")
                    .attr("class", "node")
                    .attr("r", function(d) {
                        return d.weight * 10;
                    }) // radius
                    // .style("fill", function (d) { //fill normaly
                    //     // The node color depends on the club.
                    //     return d.color;
                    // })
                    .style("fill", d => {
                        return scope.getColor(d.title,40)
                    })
                    .each(function(d) {
                        if (d.title === "start"){
                            console.log("set fx for start",scope.width/4)
                            d.fx = scope.width/8;
                            d.fy = scope.height/8;
                        }
                        else if(d.title === "end"){
                            console.log("set fx for end",scope.width - scope.width/4)
                            d.fx = scope.width - scope.width/8;
                            d.fy = scope.height - scope.height/8;
                        }
                        else{
                            d.fx = undefined
                            d.fy = undefined
                        }
                    });

                    // .call(d3.drag()
                    //         // .on("start", function (event, d) {
                    //         //     console.log(d);
                    //         //     if (!event.active)
                    //         //         simulation.alphaTarget(0.3).restart();
                    //         //     d.fx = d.x;
                    //         //     d.fy = d.y;
                    //         // })
                    //         .on("drag", function (event, d) {
                    //             d.fx = event.x;
                    //             d.fy = event.y;
                    //         })
                    //         .on("end", function (event, d) {
                    //             if (!event.active) simulation.alphaTarget(0);
                    //             d.fx = null;
                    //             d.fy = null;
                    //         })
                    // );

                console.log(svg);
                // The name of each node is the node number.
                node.append("title").text(function (d) {
                    return d.title;
                });
                node.on("mouseenter", scope.onHover);
                node.on("click", scope.onClick);
                node.on("mouseleave", scope.leaveHover);

                text = svg.append("g")
                    .attr("id","node_labels")
                    //.attr("transform",translate)
                    .selectAll("text")
                    .data(graph.nodes)
                    .enter().append("text")
                    .attr("class","node_label")
                    .attr("x", 8)
                    .attr("y", ".31em")
                    .attr("fill", function () {
                        // The node color depends on the club.
                        return "white"
                        //return d.color;
                    })
                    //.style("font-size", "10px")
                    .text(function(d) {
                        return d.title;
                });
                console.log(text);
                text.on("mouseenter", scope.onHover);
                text.on("click", scope.onClick);
                text.on("mouseleave", scope.leaveHover);

                // We bind the positions of the SVG elements
                // to the positions of the dynamic force-directed
                // graph, at each time step.
                let pathElements = d3.select("#paths")
                console.log(pathElements)
                simulation.on("tick", scope.onTick);
                console.log("mounted done");
            });
        },
        transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        },
        getIcon(title){
            if(title in this.iconPaths){
                console.log(title, "is in icons");
                return this.iconPaths[title]
            }
            else{
                return this.iconPaths["car"]
            }
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
                    //let id = "path_"+ d.index
                    let id = d.source.title + "-" + d.target.title;
                    //console.log(scope.$refs);
                    let thisPath = document.getElementById(id)
                    //let thisPath = d3.select("#paths").select(id)
                    let pl = thisPath.getTotalLength()
                    let r = d.target.weight * 20 + this.marker_length //16.97 is the "size" of the marker Math.sqrt(12**2 + 12 **2)
                    let m = thisPath.getPointAtLength(pl - r)

                    let dx = m.x - d.source.x
                    let dy = m.y - d.source.y
                    let dr = Math.sqrt(dx * dx + dy * dy);

                    return (
                        "M" +  d.source.x + "," + d.source.y + "A" + dr + "," + dr +  " 0 0,1 " + m.x + "," +  m.y
                    );
                });
                node.attr("transform", this.transform);
                text.attr("transform", this.transform);
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
            else if(step === 2){
                this.updateNetworkData("network_intro2","/json/intro2.json")
            }
            else if(step === 4){
                this.updateNetworkData("network_person1","/json/person1graphdata.json")
            }
            else if(step === 6){
                this.updateNetworkData("network_person2","/json/person2graphdata.json")
                this.currentNetwork = "network_person2"
                path = "/json/person2graphdata.json"
            }
            else if(step === 7){
                this.updateNetworkData("network_person3","/json/person3graphdata.json")
            }
            else if(step === 8){
                this.updateNetworkData("network_person4","/json/person4graphdata.json")
            }
            else if(step ===9){
                this.updateNetworkData("network_person5","/json/person5graphdata.json")
            }
            else if(step === 10){
                this.updateNetworkData("network_person6","/json/person6graphdata.json")
            }
            else if(step === 11){
                this.updateNetworkData("network_zur_arbeit","/json/zur_arbeitgraphdata.json")
            }
            else if(step === 12){
                this.currentNetwork = "network_einkaufen"
                path = "/json/einkaufengraphdata.json"
            }
            else if(step === 13){
                this.currentNetwork = "network_jemanden_holen_bringen"
                path = "/json/bringengraphdata.json"
            }
            else if(step === 14){
                this.currentNetwork = "network_nach_hause"
                path = "/json/nach_hausegraphdata.json"
            }
            else{
                this.currentNetwork = "person1"
                path = "/json/person1graphdata.json"
            }
            return path;
        },
        updateNetworkData(updatedNetwork,updatedPath){
            if(this.currentNetwork !== updatedNetwork){
                this.currentNetwork = updatedNetwork
                this.currentPath = updatedPath
            }

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
            //let svg = d3.select("#d3-network").select("svg");
            let scope = this;
            this.handleNetworkUpdate(step);
            //let path = this.getCurrentPath(step);
            
            d3.json(this.currentPath).then(function (graph) {
                // Apply the general update pattern to the nodes.

                const t = svg.transition()
                    .duration(5000)
                    .ease(d3.easeLinear);

                marker = marker.data(graph.edges, function(d) { 
                    return "marker_" + d.source + "-" + d.target;
                });

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
                        exit => exit.remove(),
                        update => update
                            .attr("markerWidth", d=> {
                                return scope.marker_size + d.value/2})
                            .attr("markerHeight", d=> {return scope.marker_size + d.value/2}))
                    .merge(marker)
                    .attr("markerWidth", d=> {
                            return scope.marker_size + d.value/2})
                        .attr("markerHeight", d=> {return scope.marker_size + d.value/2})
                        .attr("markerUnits","userSpaceOnUse")
                        .attr("fill", d=> {
                            return scope.getColor(d.source,d.value)
                            //return d.color
                        })
                        .attr("orient", "auto")
                        .append("path")
                        .attr("d", "M0,-5L10,0L0,5")


                node = node.data(graph.nodes, function(d) { return d.index;});

                node = node.join(
                    enter => enter
                        .append("circle")
                        .attr("r", function(d) {
                            return d.weight * 10;
                        }) // radius
                        // .style("fill", function (d) {
                        //     return d.color;
                        // })
                        .style("fill", function (d) {
                            return scope.getColor(d.title,40)
                        })
                        .each(function(d) {
                            if (d.title === "start"){
                                console.log("set fx for start")
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
                        }),
                    exit => exit
                        .call(exit => exit.transition(t))
                        .attr("r", 1e-6)
                        .remove()
                    )


                node.on("mouseenter", scope.onHover);
                node.on("click", scope.onClick);
                node.on("mouseleave", scope.leaveHover);
                
                text = text.data(graph.nodes, function(d) { 
                    return d.index;
                });
                text.exit().remove();
                text = text.enter()
                    //.attr("id","node_labels")
                    .append("text")
                    .attr("x", 8)
                    .attr("y", ".31em")
                    .attr("fill", function () {
                        // The node color depends on the club.
                        return "white"
                        //return d.color;
                    })
                    .attr("class","node_label")
                    //.style("font-size", "1rem")
                    .text(function(d) {
                        return d.title;
                    })
                text.on("mouseenter", scope.onHover);
                text.on("click", scope.onClick);
                text.on("mouseleave", scope.leaveHover);

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
                            // The node color depends on the club.
                            return d.value * scope.edgeScale;
                        })
                        .attr("marker-end", function(d) { 
                            //console.log("url(#marker_" + (d.source + "-" + d.target) + ")")
                            return "url(#marker_" + (d.source + "-" + d.target) + ")"; })
                        .attr("id", function (d){
                            return d.source + "-" + d.target
                        })
                        .attr("fill","none"),
                        // .call(enter => enter.transition(t))
                        // // .attr("x1", d => {
                        // //     console.log(d.source.x)
                        // //     d.source.x})
                        // // .attr("y1", d => d.source.y)
                        // // .attr("x2", d => d.target.x)
                        // // .attr("y2", d => d.target.y)
                        // .attr("stroke-opacity", 0),
                    exit => exit
                        .call(exit => exit.transition(t))
                        // .attr("x1", d => {
                        //     console.log(d.source.x)
                        //     d.source.x})
                        // .attr("y1", d => d.source.y)
                        // .attr("x2", d => d.target.x)
                        // .attr("y2", d => d.target.y)
                        .attr("stroke-opacity", 0)
                        .remove()
                    )
                    
                    // .attr("ref", function (d){
                    //     return d.source.title + "-" + d.target.title
                    // });
                    //.merge(link);
                console.log(link);
                // Update and restart the simulation.
                simulation.nodes(graph.nodes);
                simulation.force("link").links(graph.edges);
                simulation.alpha(1).restart();
            })

        },
        onHover(e, d) {
            console.log("hovering");
            console.log(e,d)
            console.log(e.target)

            if(e.target.classList.contains('node')){
                console.log("changing radius",e.currentTarget)
                d3.select(e.currentTarget)
                    .transition()
                    .attr("r", d => d.weight * 12.0)
                    .attr("fill","white")
            }
            // if(e.target.classList.contains('node_label')){
            //     d3.select(e.currentTarget)
            //         .transition()
            //         .style("font-size", "30px");
            // }
    

            //this.todoHovered = `${d.text} is ${d.done ? 'done' : 'not done'}`;
        },
        onClick(e,d){
            let data = this.hover_data[this.currentNetwork]

            this.type = d.title
            this.hoverMessage = data[this.type];
            this.showHover = true;
            
            gsap.to(this.$refs.hover, {
                duration:0.5,
                ease:"power3",
                x: d.x,
                y: d.y-100 //ich weiß nicht, warum minus
            })
        },
        leaveHover(e){
            console.log("hover out");
            d3.select(e.currentTarget)
                .transition()
                .attr("r", d => d.weight * 10.0)
                .attr("fill",d => d.color)
            // d3.select(e.currentTarget)
            //         //.style('font-size', 'Nem')
            //         .transition()
            //         .style("font-size", "1.3rem");
            
            clearTimeout(timer);
            timer = setTimeout(()=>{
                this.showHover = false;
                console.log("leave hover")
            },3000);
        }

    },
    mounted() {
        this.height = window.innerHeight;
        this.width = window.innerWidth  * 0.75;
        this.setupGraph();
        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight
            this.windowWidth = window.innerWidth;
        })
    },
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
#hover{
    background-color: $mediumblue;
    padding: 1rem;
    color: $dark;
    display: inline-block;
    z-index:2;
    position:absolute;
    text-align:middle;

    h3{
        font-size:1rem;
    }
}

</style>
