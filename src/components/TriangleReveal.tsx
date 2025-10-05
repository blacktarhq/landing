import { useEffect, useState } from "react";

interface Triangle {
  id: number;
  x: number;
  y: number;
  size: number;
  inverted: boolean;
  delay: number;
}

export default function TriangleReveal({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [triangles, setTriangles] = useState<Triangle[]>([]);
  const [showTriangles, setShowTriangles] = useState(false);

  useEffect(() => {
    // Generate triangles immediately
    const triangleWidth = 200; // Set to 200px wide
    const triangleHeight = 100; // 2:1 ratio - wider than tall

    const cols = Math.ceil(window.innerWidth / triangleWidth) + 4;
    const rows = Math.ceil(window.innerHeight / triangleHeight) + 4;

    const newTriangles: Triangle[] = [];
    let triangleId = 0;

    // Create overlapping grid to eliminate all gaps
    for (let row = -2; row < rows; row++) {
      for (let col = -2; col < cols; col++) {
        const x = col * triangleWidth;
        const y = row * triangleHeight;

        // Base triangles
        newTriangles.push({
          id: triangleId++,
          x: x,
          y: y,
          size: triangleWidth + 2, // Slight overlap
          inverted: false,
          delay: Math.random() * 0.7,
        });

        newTriangles.push({
          id: triangleId++,
          x: x,
          y: y,
          size: triangleWidth + 2, // Slight overlap
          inverted: true,
          delay: Math.random() * 0.7,
        });

        // Offset triangles for complete coverage
        newTriangles.push({
          id: triangleId++,
          x: x + triangleWidth / 2,
          y: y,
          size: triangleWidth + 2, // Slight overlap
          inverted: false,
          delay: Math.random() * 0.7,
        });

        newTriangles.push({
          id: triangleId++,
          x: x + triangleWidth / 2,
          y: y,
          size: triangleWidth + 2, // Slight overlap
          inverted: true,
          delay: Math.random() * 0.7,
        });
      }
    }

    setTriangles(newTriangles);
    setShowTriangles(true);

    // Complete animation
    const timeout = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Beige background overlay */}
      <div
        className="absolute inset-0 bg-[#dcd8c0] z-10"
        style={{
          opacity: showTriangles ? 0 : 1,
        }}
      />

      {/* Triangle mask overlay - triangles cut through white to show content */}
      {showTriangles && (
        <svg className="absolute inset-0 w-full h-full z-30">
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
            fill="#dcd8c0"
            mask="url(#triangleMask)"
          />
        </svg>
      )}

      <style>{`
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
