<template>
    <div id="d3-example"></div>
</template>


<script>
import * as d3 from "d3";

let simulation;

export default {
    methods:{

        setupGraph(){
            const width = 600;
            const height = 600;

            //const color = d3.scale.category10();

            // We create a force-directed dynamic graph layout.
            let svg = d3.select("#d3-example").select("svg")
            //let scope = this;

            if (svg.empty()) {
                svg = d3.select("#d3-example").append("svg")
                    .attr("width", width)
                    .attr("height", height);
            }

            // We load the JSON file.
            d3.json("/json/13999graphdata.json").then(function(graph){
                // In this block, the file has been loaded
                // and the 'graph' object contains our graph.
                console.log("loaded data");

                const forceLink = d3.forceLink(graph.edges).id(function(d) { 
                    return d.title; 
                    })

                simulation = d3.forceSimulation(graph.nodes)
                    .force("charge", d3.forceManyBody())
                    .force("link", forceLink)
                    .force("center", d3.forceCenter())
                    //.force("forceX", d3.forceX().strength(.1).x(width * .5))
                    //.force("forceY", d3.forceY().strength(.1).y(height * .5))


                // We load the nodes and links in the
                // force-directed graph.
                //simulation.link(graph.edges)
                console.log("simulation with edges");

                // We create a <line> SVG element for each link
                // in the graph.
                let link = svg.selectAll(".link")
                    .data(graph.edges)
                    .enter().append("line")
                    .attr("class", "link")
                    .attr("stroke", function(d) {
                        // The node color depends on the club.

                        return d.source.color;
                    })
                    .attr("stroke-width", function(d) {
                        // The node color depends on the club.
                        return d.value/100;
                    })
                
                // We create a <circle> SVG element for each node
                // in the graph, and we specify a few attributes.
                
                let node = svg.selectAll(".node")
                    .data(graph.nodes)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 5)  // radius
                    .style("fill", function(d) {
                        // The node color depends on the club.
                        return d.color;
                    })
                    .call(d3.drag()
                        .on("start", function (event,d) {
                            console.log(d);
                            if (!event.active) simulation.alphaTarget(0.3).restart();
                            d.fx = d.x;
                            d.fy = d.y;
                        })
                        .on("drag", function (event,d) {
                            d.fx = event.x;
                            d.fy = event.y;
                        })
                        .on("end",function(event,d) {
                            if (!event.active) simulation.alphaTarget(0);
                                d.fx = null;
                                d.fy = null;
                        })
                    )

                console.log(this);
                console.log(svg);
                console.log(node)
                // The name of each node is the node number.
                node.append("title")
                    .text(function(d) { return d.title; });

                // We bind the positions of the SVG elements
                // to the positions of the dynamic force-directed
                // graph, at each time step.
                simulation.on("tick", function() {
                console.log("tick lets go")
                link.attr("x1", function(d){return d.source.x})
                    .attr("y1", function(d){return d.source.y})
                    .attr("x2", function(d){return d.target.x})
                    .attr("y2", function(d){return d.target.y});

                node.attr("cx", function(d){return d.x})
                    .attr("cy", function(d){return d.y});
                });

                simulation.tick(3);
            });

        }
    },
    mounted(){
        this.setupGraph();
    }
}
</script>
