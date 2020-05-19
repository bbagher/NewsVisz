  
import { max, scaleLinear, scaleBand, axisLeft, axisBottom, extent, scaleTime, line } from 'd3';
  
  
// export const addBR = () => {
//      let text = document.getElementsByClassName('content')[0].textContent.split("','").join("")

//     document.getElementsByClassName('content')[0].textContent = text    

//     let newt = ''
//     let c= 0;
//     for (let l = 0; l < document.getElementsByClassName('content')[0].innerHTML.length; l += 1) {
//       if (document.getElementsByClassName('content')[0].innerHTML[l] === '.' && c === 4) {
//         newt += '<br><br>'
//         c = 0
//       }
//       else if (document.getElementsByClassName('content')[0].innerHTML[l] === '.') {
//         c += 1
//         newt += document.getElementsByClassName('content')[0].innerHTML[l]
//       }
//       else newt += document.getElementsByClassName('content')[0].innerHTML[l]
//       console.log(c)
//     }
//     document.getElementsByClassName('content')[0].innerHTML = newt
//   }
export const addBR = content => {
     let text = content.split("','").join("")

    let newt = ''
    let c= 0;
    for (let l = 0; l < text.length; l += 1) {
      if (text[l] === '.' && c === 4) {
        newt += '<br><br>'
        c = 0
      }
      else if (text[l] === '.') {
        c += 1
        newt += text[l]
      }
      else newt += text[l]
    }
    text = newt
    return text
  }


export const lolliPopRenderSVG = (title, data, svg, width, height) => {


    const yLabel = 'Words Found'
    const xLabel = 'Frequency'

    const xValue = d => d.freq;
    const yValue = d => d.word;
    const margin = {left: 150, top: 50, right: 50, bottom: 50}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xScale = scaleLinear()
                    .domain([0, max(data, xValue)])
                    .range([0, innerWidth])


    const yScale = scaleBand()
                    .range([0, innerHeight])
                    .domain(data.map(yValue))
                    .padding(1)
                    
                    
                    const g = svg.append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`)
   
                    
    g.append('g').call(axisLeft(yScale)).selectAll('.domain').remove()
    g.append('g').call(axisBottom(xScale)).attr('transform', `translate(0,${innerHeight})`).selectAll('.domain').remove()

    
    g.append('text')
          .attr('x', innerWidth/2)
          .attr('class', 'title')
          .attr('text-anchor','middle')
          .style('fill', 'black')
          .text(title)

    g.append('text')
          .attr('class', 'axis-label')
          .attr('y', -60)
          .attr('x', -innerHeight/2)
          .attr('text-anchor','middle')
          .style('fill', 'black')
          .attr('transform', 'rotate(-90)')
          .text(yLabel)

    
    g.append('text')
          .attr('class', 'axis-label')
          .attr('y', innerHeight + 40)
          .attr('x', innerWidth/2)
          .attr('text-anchor','middle')
          .style('fill', 'black')
          .text(xLabel)


    g.selectAll('myline').data(data)
      .enter().append('line')
      .attr('y1', d => yScale(yValue(d)))
      .attr('y2', d => yScale(yValue(d)))
      .attr('x1', d => xScale(xValue(d)))
      .attr('x2', xScale(0))
      .attr("stroke", "grey")

    g.selectAll("mycircle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(xValue(d)))
      .attr("cy", d => yScale(yValue(d)))
      .attr("r", "4")
      .style("fill", "#69b3a2")
      .attr("stroke", "black")
   
}


export const lineChartRenderSVG = (data, svg, width, height) => {

    const yLabel = 'Sentiment Score'
    const xLabel = 'Date'

    const title =  `MSFT News Sentiment`

    const xValue = d => d.date;
    const yValue = d => d.score;
    const circleRadius = 2;
    const margin = {left: 150, top: 60, right: 50, bottom: 90}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom


    const xScale = scaleTime()
                    .domain(extent(data, xValue))
                    .range([0, innerWidth])
                    .nice()

    const yScale = scaleLinear()
                    .domain(extent(data, yValue))
                    .range([innerHeight, 0])

    
    const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

    const xAxis = axisBottom(xScale).tickSize(-innerHeight-15)
    const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(15)

    g.append('text')
          .attr('x', innerWidth/2)
          .attr('class', 'title')
          .attr('text-anchor','middle')
          .style('fill', 'black')
          .text(title)

    g.append('text')
          .attr('class', 'axis-label')
          .attr('y', -60)
          .attr('x', -innerHeight/2)
          .attr('text-anchor','middle')
          .style('fill', 'black')
          .attr('transform', 'rotate(-90)')
          .text(yLabel)

    
    g.append('text')
          .attr('class', 'axis-label')
          .attr('y', innerHeight + 60)
          .attr('x', innerWidth/2)
          .attr('text-anchor','middle')
          .style('fill', 'black')
          .text(xLabel)

    g.append('g').call(yAxis).selectAll('.domain').remove()
    g.append('g').call(xAxis).attr('transform', `translate(0,${innerHeight + 20})`).selectAll('.domain').remove()

    const lineGenerator = line().x(d => xScale(xValue(d))).y(d => yScale(yValue(d)))


    g.append('path')
      .attr('d', lineGenerator(data))
      .attr('class', 'line-path')
      .style('fill', 'blue')
      .style('fill-opacity', 0.2)
      .style('stroke', 'black')
      .style('stoke-width', '3px')

      

    g.selectAll('circle').data(data)
      .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius)
      
}