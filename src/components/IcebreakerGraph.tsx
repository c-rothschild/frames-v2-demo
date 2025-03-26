import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ProfileNode {
  profileID: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  type: 'main' | 'connection';
}

interface Link {
  source: string | ProfileNode;
  target: string | ProfileNode;
}

interface GraphProps {
  profile: ProfileNode;
  connections: ProfileNode[];
}

export const IcebreakerGraph: React.FC<GraphProps> = ({ profile, connections }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Limit to max 8 connections for better visualization
  const displayedConnections = connections.slice(0, 8);
  
  useEffect(() => {
    if (!svgRef.current || !profile || !displayedConnections.length) return;
    
    // Get container dimensions
    const container = containerRef.current!;
    const containerWidth = container.clientWidth;
    const containerHeight = 250; // Fixed height
    
    // Set up SVG
    const svg = d3.select(svgRef.current)
      .attr('width', containerWidth)
      .attr('height', containerHeight);
    
    // Clear previous content
    svg.selectAll('*').remove();
    
    // Define the center point
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    
    // Create main node and connection nodes
    const nodes: ProfileNode[] = [
      { 
        ...profile, 
        type: 'main',
        x: centerX,
        y: centerY,
        fx: centerX, // Fix position for main node
        fy: centerY
      },
      ...displayedConnections.map(connection => ({
        ...connection,
        type: 'connection' as const
      }))
    ];
    
    // Create links from main node to each connection
    const links: Link[] = displayedConnections.map(connection => ({
      source: profile.profileID,
      target: connection.profileID
    }));
    
    // Set up force simulation
    const simulation = d3.forceSimulation<ProfileNode>(nodes)
      .force('link', d3.forceLink<ProfileNode, Link>(links)
        .id(d => d.profileID)
        .distance(100)
      )
      .force('charge', d3.forceManyBody<ProfileNode>().strength(-200))
      .force('center', d3.forceCenter<ProfileNode>(centerX, centerY))
      .force('collision', d3.forceCollide<ProfileNode>().radius(d => d.type === 'main' ? 40 : 30));
    
    // Create link lines
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1.5);
    
    // Create node groups
    const node = svg.append('g')
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', d => `node ${d.type}-node`)
      .call(drag(simulation));
    
    // Add circles for nodes
    node.append('circle')
      .attr('r', d => d.type === 'main' ? 24 : 18)
      .attr('fill', 'white')
      .attr('stroke', d => d.type === 'main' ? '#ff6b6b' : '#4dabf7')
      .attr('stroke-width', d => d.type === 'main' ? 2 : 1);
    
    // Add images inside circles
    node.append('clipPath')
      .attr('id', d => `clip-${d.profileID}`)
      .append('circle')
      .attr('r', d => d.type === 'main' ? 22 : 16);
    
    node.append('image')
      .attr('xlink:href', d => d.avatarUrl || '')
      .attr('x', d => d.type === 'main' ? -22 : -16)
      .attr('y', d => d.type === 'main' ? -22 : -16)
      .attr('width', d => d.type === 'main' ? 44 : 32)
      .attr('height', d => d.type === 'main' ? 44 : 32)
      .attr('clip-path', d => `url(#clip-${d.profileID})`)
      .on('error', function() {
        // Replace with initial on error
        const parentNode = d3.select(this.parentNode as Element);
        const data = parentNode.datum() as ProfileNode;
        
        d3.select(this).remove(); // Remove the image
        
        // Add a circle with initial
        parentNode.append('circle')
          .attr('r', data.type === 'main' ? 22 : 16)
          .attr('fill', data.type === 'main' ? '#ff6b6b' : '#4dabf7');
        
        parentNode.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', 'white')
          .attr('font-size', data.type === 'main' ? '16px' : '12px')
          .text((data.displayName || 'U').charAt(0).toUpperCase());
      });
    
    // Add text labels
    node.append('text')
      .attr('dy', d => d.type === 'main' ? 38 : 32)
      .attr('text-anchor', 'middle')
      .attr('fill', '#000')
      .attr('font-size', d => d.type === 'main' ? '11px' : '9px')
      .attr('font-weight', d => d.type === 'main' ? 'bold' : 'normal')
      .text(d => d.displayName || (d.type === 'main' ? 'User' : 'Connection'))
      .each(function(d) {
        // Truncate text if too long
        const textElement = d3.select(this);
        const text = textElement.text();
        const maxWidth = d.type === 'main' ? 70 : 60;
        
        if (this.getComputedTextLength() > maxWidth) {
          let truncatedText = text;
          while (truncatedText.length > 3 && this.getComputedTextLength() > maxWidth) {
            truncatedText = truncatedText.slice(0, -1);
            textElement.text(truncatedText + '...');
          }
        }
      });
    
    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as ProfileNode).x || 0)
        .attr('y1', d => (d.source as ProfileNode).y || 0)
        .attr('x2', d => (d.target as ProfileNode).x || 0)
        .attr('y2', d => (d.target as ProfileNode).y || 0);
      
      node
        .attr('transform', d => `translate(${d.x || 0}, ${d.y || 0})`);
    });
    
    // Add drag behavior
    function drag(simulation: d3.Simulation<ProfileNode, undefined>) {
      return d3.drag<SVGGElement, ProfileNode>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          if (d.type !== 'main') { // Keep the main node fixed
            d.fx = null;
            d.fy = null;
          }
        });
    }
    
    // If there are more connections than displayed, show a count
    if (connections.length > displayedConnections.length) {
      svg.append('text')
        .attr('x', containerWidth - 10)
        .attr('y', containerHeight - 10)
        .attr('text-anchor', 'end')
        .attr('font-size', '10px')
        .attr('fill', '#666')
        .text(`+${connections.length - displayedConnections.length} more connections`);
    }
    
    // Optional: Run simulation for a few ticks before displaying for better initial layout
    simulation.tick(10);
    
    // Return cleanup function
    return () => {
      simulation.stop();
    };
  }, [profile, displayedConnections]);
  
  return (
    <div className="social-graph-container mt-4">
      <h3 className="text-sm font-semibold mb-2">Social Network</h3>
      <div 
        ref={containerRef} 
        className="relative bg-gray-50 rounded-lg p-4 h-[250px] overflow-hidden"
      >
        <svg ref={svgRef} className="w-full h-full"></svg>
        
        {/* Show total connections count if more than what's displayed */}
        {connections.length > displayedConnections.length && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 pointer-events-none">
            +{connections.length - displayedConnections.length} more connections
          </div>
        )}
      </div>
    </div>
  );
};