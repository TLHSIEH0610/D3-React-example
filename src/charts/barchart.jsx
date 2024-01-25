import * as d3 from "d3";
import { useEffect, useRef } from "react";

const data = [
  {
    label: "Actively against",
    value: 20,
    color: "#D61635",
  },
  { label: "Unsure", value: 10, color: "#FA6C2F" },
  { label: "Peace", value: 14, color: "#F2C900" },
  { label: "Friends", value: 44, color: "#28C24D" },
  { label: "Trusted Allies", value: 21, color: "#3692DC" },
];

const Barchart = () => {
  const ref = useRef();

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.label))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const max = Math.max(...data.map((d) => d.value)) * 1.2;
    console.log({ max });
    const y = d3.scaleLinear().domain([0, max]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", (d) => d.color);
  }, []);

  return <svg width={460} height={400} id="barchart" ref={ref} />;
};

export default Barchart;
