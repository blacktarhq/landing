import { useEffect, useState } from "react";

interface Triangle {
  id: number;
  x: number;
  y: number;
  size: number;
  inverted: boolean;
  delay: number;
}

interface Line {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

export default function TriangleReveal({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [triangles, setTriangles] = useState<Triangle[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [showLines, setShowLines] = useState(false);
  const [showTriangles, setShowTriangles] = useState(false);

  useEffect(() => {
    // Generate diagonal grid lines
    const newLines: Line[] = [];
    const spacing = 100;
    let id = 0;

    // Diagonal lines going one direction
    for (let i = -window.innerHeight; i < window.innerWidth + window.innerHeight; i += spacing) {
      newLines.push({
        id: id++,
        x1: i,
        y1: 0,
        x2: i + window.innerHeight,
        y2: window.innerHeight,
        delay: Math.random() * 0.1,
      });
    }

    // Diagonal lines going the other direction
    for (let i = 0; i < window.innerWidth + window.innerHeight; i += spacing) {
      newLines.push({
        id: id++,
        x1: i,
        y1: 0,
        x2: i - window.innerHeight,
        y2: window.innerHeight,
        delay: Math.random() * 0.1,
      });
    }

    setLines(newLines);
    setShowLines(true);

    // After lines, show triangles
    setTimeout(() => {
      setShowLines(false);

      // Generate triangles that completely tile the screen with no gaps
      const triangleHeight = 80;
      const triangleWidth = triangleHeight * 2; // 2:1 ratio

      // Extra padding to ensure coverage beyond viewport edges
      const cols = Math.ceil(window.innerWidth / triangleWidth) + 4;
      const rows = Math.ceil(window.innerHeight / triangleHeight) + 4;

      const newTriangles: Triangle[] = [];
      let triangleId = 0;

      // Create overlapping triangles to ensure no gaps
      for (let row = -2; row < rows; row++) {
        for (let col = -2; col < cols; col++) {
          const x = col * triangleWidth;
          const y = row * triangleHeight;

          // Create both up and down triangles at each position
          newTriangles.push({
            id: triangleId++,
            x: x,
            y: y,
            size: triangleWidth,
            inverted: false,
            delay: Math.random() * 0.5,
          });

          newTriangles.push({
            id: triangleId++,
            x: x,
            y: y,
            size: triangleWidth,
            inverted: true,
            delay: Math.random() * 0.5,
          });

          // Add offset triangles to fill gaps
          newTriangles.push({
            id: triangleId++,
            x: x + triangleWidth / 2,
            y: y,
            size: triangleWidth,
            inverted: false,
            delay: Math.random() * 0.5,
          });

          newTriangles.push({
            id: triangleId++,
            x: x + triangleWidth / 2,
            y: y,
            size: triangleWidth,
            inverted: true,
            delay: Math.random() * 0.5,
          });
        }
      }

      setTriangles(newTriangles);
      setShowTriangles(true);
    }, 300);

    // Complete animation - super fast
    const timeout = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* White background overlay */}
      <div
        className="absolute inset-0 bg-white transition-opacity duration-700"
        style={{
          opacity: showTriangles ? 0 : 1,
        }}
      />

      {/* Lines animation */}
      {showLines && (
        <svg className="absolute inset-0 w-full h-full">
          {lines.map((line) => (
            <line
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#000000"
              strokeWidth="2"
              className="line-draw"
              style={{
                strokeDasharray: "2000",
                strokeDashoffset: "2000",
                animation: `drawLine 0.2s ease-out ${line.delay}s forwards`,
              }}
            />
          ))}
        </svg>
      )}

      {/* Triangle mask overlay - triangles cut through white to show content */}
      {showTriangles && (
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <mask id="triangleMask">
              <rect width="100%" height="100%" fill="white" />
              {triangles.map((triangle) => {
                const { x, y, size, inverted, delay, id } = triangle;

                // Create wider triangles (width is 'size', height is size/2)
                const height = size / 2;

                // Up triangle: point at top, base at bottom
                // Down triangle: base at top, point at bottom
                const points = inverted
                  ? `${x},${y} ${x + size},${y} ${x + size / 2},${y + height}` // Point down
                  : `${x},${y + height} ${x + size},${y + height} ${x + size / 2},${y}`; // Point up

                return (
                  <polygon
                    key={id}
                    points={points}
                    fill="black"
                    style={{
                      animation: `triangleAppear 0.05s step-end ${delay}s forwards`,
                      opacity: 0,
                    }}
                  />
                );
              })}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="white"
            mask="url(#triangleMask)"
          />
        </svg>
      )}

      <style>{`
        @keyframes drawLine {
          to {
            strokeDashoffset: 0;
          }
        }

        @keyframes triangleAppear {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
