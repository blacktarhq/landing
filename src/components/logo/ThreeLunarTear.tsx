import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";

// Physics simulation for weighted movement
class PhysicsNode {
  position = new THREE.Vector3();
  velocity = new THREE.Vector3();
  force = new THREE.Vector3();
  mass = 1;

  applyForce(force: THREE.Vector3) {
    this.force.add(force.clone().multiplyScalar(1 / this.mass));
  }

  update(damping = 0.95) {
    this.velocity.add(this.force);
    this.velocity.multiplyScalar(damping);
    this.position.add(this.velocity);
    this.force.set(0, 0, 0);
  }
}

function Petal({
  length,
  width,
  open = Math.PI / 3,
  opacity = 0.98,
}: {
  length: number;
  width: number;
  open?: number;
  opacity?: number;
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();

    // Create a simple, elegant petal shape - wider at base, pointed at tip
    shape.moveTo(0, 0);

    // Right side of petal
    shape.bezierCurveTo(
      width * 0.6, length * 0.2,
      width * 0.7, length * 0.5,
      width * 0.4, length * 0.8
    );
    shape.bezierCurveTo(
      width * 0.2, length * 0.95,
      0, length,
      0, length
    );

    // Left side of petal (mirror)
    shape.bezierCurveTo(
      0, length,
      -width * 0.2, length * 0.95,
      -width * 0.4, length * 0.8
    );
    shape.bezierCurveTo(
      -width * 0.7, length * 0.5,
      -width * 0.6, length * 0.2,
      0, 0
    );

    const extrudeSettings = {
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 2,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [length, width]);

  return (
    <mesh rotation={[open, 0, 0]} position={[0, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial
        color={0xffffff}
        roughness={0.6}
        metalness={0.0}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Flower() {
  const groupRef = useRef<THREE.Group>(null!);
  const petalGroupRef = useRef<THREE.Group>(null!);
  const stamenGroupRef = useRef<THREE.Group>(null!);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseDelta, setMouseDelta] = useState({ x: 0, y: 0 });
  const prevMousePos = useRef({ x: 0, y: 0 });

  // Physics nodes for different parts
  const physics = useRef({
    flower: new PhysicsNode(),
    petals: new PhysicsNode(),
    stamens: new PhysicsNode(),
  });

  // Set masses for weighted movement
  useEffect(() => {
    physics.current.flower.mass = 0.8;
    physics.current.petals.mass = 1.2; // Heavier petals
    physics.current.stamens.mass = 0.5; // Lighter stamens
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newX = (event.clientX / window.innerWidth) * 2 - 1;
      const newY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Calculate mouse velocity
      setMouseDelta({
        x: (newX - prevMousePos.current.x) * 2,
        y: (newY - prevMousePos.current.y) * 2,
      });

      setMousePos({ x: newX, y: newY });
      prevMousePos.current = { x: newX, y: newY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !petalGroupRef.current || !stamenGroupRef.current) return;

    // Apply forces based on mouse movement (wind effect)
    const windForce = new THREE.Vector3(mouseDelta.x * 0.15, mouseDelta.y * 0.1, 0);
    physics.current.flower.applyForce(windForce);
    physics.current.petals.applyForce(windForce.clone().multiplyScalar(1.5));
    physics.current.stamens.applyForce(windForce.clone().multiplyScalar(2.0));

    // Apply gravity-like restoring force
    const restoreForce = physics.current.flower.position.clone().multiplyScalar(-0.05);
    physics.current.flower.applyForce(restoreForce);

    const petalRestore = physics.current.petals.position.clone().multiplyScalar(-0.08);
    physics.current.petals.applyForce(petalRestore);

    const stamenRestore = physics.current.stamens.position.clone().multiplyScalar(-0.12);
    physics.current.stamens.applyForce(stamenRestore);

    // Update physics
    physics.current.flower.update(0.92);
    physics.current.petals.update(0.88);
    physics.current.stamens.update(0.85);

    // Apply physics to main group
    const targetRotX = physics.current.flower.position.y * 0.3 + THREE.MathUtils.degToRad(10) * -mousePos.y;
    const targetRotY = physics.current.flower.position.x * 0.5 + THREE.MathUtils.degToRad(12) * mousePos.x;
    const targetRotZ = physics.current.flower.position.x * 0.4 + THREE.MathUtils.degToRad(8) * mousePos.x;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.1,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.1,
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotZ,
      0.1,
    );

    // Apply secondary movement to petals
    petalGroupRef.current.rotation.z = physics.current.petals.position.x * 0.2;
    petalGroupRef.current.rotation.x = physics.current.petals.position.y * 0.15;

    // Apply tertiary movement to stamens (more dramatic)
    stamenGroupRef.current.rotation.z = physics.current.stamens.position.x * 0.4;
    stamenGroupRef.current.position.y = physics.current.stamens.position.y * 0.05;

    // Slight position shift
    groupRef.current.position.x = physics.current.flower.position.x * 0.1;
    groupRef.current.position.y = 1.2 + physics.current.flower.position.y * 0.08;
  });

  return (
    <group ref={groupRef} rotation={[Math.PI - 0.6, 0, -0.3]} position={[1.5, 0.3, 0]}>
      {/* Petals group with physics */}
      <group ref={petalGroupRef}>
        {/* 5 petals - bigger and more closed */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <group key={`petal-${i}`} rotation={[0, angle, 0]}>
              <Petal length={1.2} width={0.5} open={Math.PI / 3.2} opacity={0.98} />
            </group>
          );
        })}

        {/* Central pistil - dark center */}
        <mesh position={[0, 0.05, 0]}>
          <coneGeometry args={[0.08, 0.25, 8]} />
          <meshStandardMaterial color={0x1a1a1a} roughness={0.8} />
        </mesh>
      </group>

      {/* Stamens group with physics */}
      <group ref={stamenGroupRef}>
        {/* Dark stamens hanging down around the pistil */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2 + Math.PI / 5;
          const radius = 0.06;
          return (
            <group key={`stamen-${i}`} rotation={[0, angle, 0]}>
              <mesh position={[radius, 0.2, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 0.4, 6]} />
                <meshStandardMaterial color={0x000000} roughness={0.9} />
              </mesh>
              <mesh position={[radius, 0.4, 0]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshStandardMaterial color={0x000000} roughness={0.8} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Stem - thin black stem angled */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3.0, 12]} />
        <meshStandardMaterial color={0x000000} roughness={0.95} />
      </mesh>
    </group>
  );
}

export default function ThreeLunarTear({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Canvas
      className={className}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      camera={{ fov: 40, position: [4, 0, 0] }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1.0} position={[5, 2, 3]} color={0xffffff} />
      <directionalLight intensity={0.4} position={[-2, 3, -2]} color={0xffffff} />
      <pointLight intensity={0.3} position={[4, -1, 2]} color={0xffffff} />

      <Flower />
    </Canvas>
  );
}
