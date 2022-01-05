<template>
    <div id="d3-example" ref="d3-example"></div>
</template>


<script>
import * as d3 from "d3";

let simulation;
let node,link,text;
//let svgDom;

export default {
    data(){
        return{
            selections: {},
            i:0,
            windowHeight:600,
            windowWidth:600,
            marker_size:8
        }
    },
    computed:{
            marker_length: function(){
                console.log(Math.sqrt(this.marker_size**2 + this.marker_size**2))
                return Math.sqrt(this.marker_size**2 + this.marker_size**2)
            }
    },
    methods: {
        setupGraph() {
            const width = this.windowWidth;
            const height = this.windowHeight;
            //const translate = "translate(" + width/2 + "," + height/2 + ") scale(3)";
            //const translate = "translate(0,0) scale(3)";

            //const color = d3.scale.category10();

            // We create a force-directed dynamic graph layout.
            let svg = d3.select("#d3-example").select("svg");
            let scope = this;

            if (svg.empty()) {
                svg = d3
                    .select("#d3-example")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
            }

            // We load the JSON file.
            d3.json("/json/13999graphdata.json").then(function (graph) {
                // In this block, the file has been loaded
                // and the 'graph' object contains our graph.
                console.log("loaded data");


                const forceLink = d3.forceLink(graph.edges).id(function (d) {
                    return d.title;
                }).distance(height/2).strength(0.1);

                simulation = d3
                    .forceSimulation(graph.nodes)
                    .force("charge", d3.forceManyBody().strength(-120))
                    .force("link", forceLink)
                    .force("center", d3.forceCenter(width / 2, height / 2));
                //.force("forceX", d3.forceX().strength(.1).x(width * .5))
                //.force("forceY", d3.forceY().strength(.1).y(height * .5))

                // We load the nodes and links in the
                // force-directed graph.
                //simulation.link(graph.edges)
                console.log("simulation with edges");

               
                svg.append("defs")
                    //.attr("transform",translate)
                    .selectAll("marker")
                    .data(["marker"])
                    .enter()
                    .append("marker")
                    .attr("id", function (d) {
                        return d
                    })
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 0)
                    .attr("refY", 0)
                    .attr("markerWidth", scope.marker_size)
                    .attr("markerHeight", scope.marker_size)
                    .attr("orient", "auto")
                    .attr("fill", "#004e64")
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5");

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
                    .attr("stroke", function (d) {
                        // The node color depends on the club.
                        return d.source.color;
                    })
                    .attr("stroke-width", function (d) {
                        // The node color depends on the club.
                        return d.value / 100;
                    })
                    .attr("marker-end", "url(#marker)")
                    .attr("id", function (d){
                        return "path_" + d.index;
                    })
                    .attr("fill","none")
                    .attr("ref", function (d){
                        return "path_" + d.index;
                    });

                // We create a <circle> SVG element for each node
                // in the graph, and we specify a few attributes.

                node = svg.append("g")
                    //.attr("transform",translate)
                    .attr("id","nodes")
                    .selectAll(".node")
                    .data(graph.nodes)
                    .enter()
                    .append("circle")
                    .attr("class", "node")
                    .attr("r", function(d) {
                        return d.weight * 4;
                    }) // radius
                    .style("fill", function (d) {
                        // The node color depends on the club.
                        return d.color;
                    })
                    .call(
                        d3
                            .drag()
                            .on("start", function (event, d) {
                                console.log(d);
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

                console.log(svg);
                // The name of each node is the node number.
                node.append("title").text(function (d) {
                    return d.title;
                });

                text = svg.append("g")
                    //.attr("transform",translate)
                    .selectAll("text")
                    .data(graph.nodes)
                    .enter().append("text")
                    .attr("x", 8)
                    .attr("y", ".31em")
                    .attr("fill", function (d) {
                        // The node color depends on the club.
                        return d.color;
                    })
                    .style("font-size", "10px")
                    .text(function(d) {
                        return d.title;
                });
                console.log(text);

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
        onTick(){
            //if (this.i==3) return;
            this.i++;

            // link.attr("x1", function (d) {
            //     return d.source.x;
            //     })
            //     .attr("y1", function (d) {
            //         return d.source.y;
            //     })
            //     .attr("x2", function (d) {
            //         return d.target.x;
            //     })
            //     .attr("y2", function (d) {
            //         return d.target.y;
            //     });

            // node.attr("cx", function (d) {
            //     return d.x;
            //     })
            //     .attr("cy", function (d) {
            //         return d.y;
            //     });
            link.attr("d", function (d) {
                let dx = d.target.x - d.source.x;
                let dy = d.target.y - d.source.y;
                let dr = Math.sqrt(dx * dx + dy * dy);
                return (
                    "M" + d.source.x + "," + d.source.y +"A" + dr + "," +
                    dr +  " 0 0,1 " + d.target.x + "," + d.target.y
                );
            });
            link.attr("d", d => {
                let id = "path_"+ d.index
                //console.log(scope.$refs);
                let thisPath = document.getElementById(id)
                //let thisPath = d3.select("#paths").select(id)
                let pl = thisPath.getTotalLength()
                let r = d.target.weight * 4 + this.marker_length //16.97 is the "size" of the marker Math.sqrt(12**2 + 12 **2)
                let m = thisPath.getPointAtLength(pl - r)

                let dx = m.x - d.source.x
                let dy = m.y - d.source.y
                let dr = Math.sqrt(dx * dx + dy * dy);

                return (
                    "M" +  d.source.x + "," + d.source.y + "A" +
                    dr + "," + dr +  " 0 0,1 " + m.x + "," +  m.y
                );
            });
            node.attr("transform", this.transform);
            text.attr("transform", this.transform);

        }
    },
    mounted() {
        this.windowHeight = window.innerHeight
        this.windowWidth = window.innerWidth;
        this.setupGraph();
        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight
            this.windowWidth = window.innerWidth;
        })
    },
};
</script>
