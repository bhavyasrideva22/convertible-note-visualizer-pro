
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface EquityChartProps {
  equityPercentage: {
    standard: number;
    discounted: number;
    capped: number;
  };
  conversion: {
    type: string;
    value: number;
  };
}

const EquityChart = ({ equityPercentage, conversion }: EquityChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  // Get the equity percentage that will be used based on conversion type
  const investorEquity = conversion.value;
  const founderEquity = 100 - investorEquity;
  
  const data = [
    { name: 'Investors', value: investorEquity },
    { name: 'Founders', value: founderEquity }
  ];
  
  const COLORS = ['#e9c46a', '#245e4f'];
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md border rounded-md">
          <p className="font-medium">{payload[0].name}: {payload[0].value.toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          animationDuration={800}
          animationBegin={300}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={index === activeIndex ? 2 : 0}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom" 
          height={36} 
          formatter={(value, entry, index) => (
            <span className="font-medium text-charcoal">{value}: {data[index].value.toFixed(2)}%</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EquityChart;
