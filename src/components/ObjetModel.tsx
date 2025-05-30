import { useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";

export const Object3DModel = forwardRef((_, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useImperativeHandle(ref, () => ({
    getMesh: () => meshRef.current,
  }));

  return (
  <mesh ref={meshRef} position={[0, 0, 0]}>
  <boxGeometry args={[1, 1, 1]} />
  <meshPhongMaterial color="red" transparent opacity={0} />
</mesh>

  );
});
