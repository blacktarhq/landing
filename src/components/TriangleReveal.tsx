import { useEffect, useState } from "react";

interface Block {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  color: string;
}

export default function TriangleReveal({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [showBlocks, setShowBlocks] = useState(false);

  useEffect(() => {
    // Generate larger, brutalist geometric blocks
    const blockWidth = 200;
    const blockHeight = 200;

    const cols = Math.ceil(window.innerWidth / blockWidth) + 2;
    const rows = Math.ceil(window.innerHeight / blockHeight) + 2;

    const colors = ["#000", "#d21e1e"]; // Only red and black
    const newBlocks: Block[] = [];
    let blockId = 0;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const x = col * blockWidth;
        const y = row * blockHeight;

        newBlocks.push({
          id: blockId++,
          x,
          y,
          width: blockWidth + 5,
          height: blockHeight + 5,
          delay: Math.random() * 0.4, // Faster, more abrupt
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    setBlocks(newBlocks);
    setShowBlocks(true);

    // Shorter animation duration for brutalist feel
    const timeout = setTimeout(() => {
      onComplete();
    }, 700);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Black background */}
      <div
        className="absolute inset-0 bg-black z-10"
        style={{
          opacity: showBlocks ? 0 : 1,
        }}
      />

      {/* Brutalist block pattern - harsh geometric reveal */}
      {showBlocks && (
        <svg className="absolute inset-0 w-full h-full z-30">
          <defs>
            <mask id="blockMask">
              <rect width="100%" height="100%" fill="white" />
              {blocks.map((block) => {
                const { x, y, width, height, delay, id } = block;

                return (
                  <rect
                    key={id}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill="black"
                    style={{
                      animation: `blockAppear 0.01s step-end ${delay}s forwards`,
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
            fill="#000"
            mask="url(#blockMask)"
          />
        </svg>
      )}

      {/* Red/Black blocks that flash */}
      {showBlocks && blocks.slice(0, 15).map((block) => (
        <div
          key={`color-${block.id}`}
          className="absolute"
          style={{
            left: block.x,
            top: block.y,
            width: block.width,
            height: block.height,
            backgroundColor: block.color,
            opacity: 0,
            animation: `colorFlash 0.08s ease-in ${block.delay}s`,
            border: '1px solid #000',
          }}
        />
      ))}

      <style>{`
        @keyframes blockAppear {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes colorFlash {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
