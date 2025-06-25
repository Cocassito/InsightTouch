import { useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Object3DModel = forwardRef((_, ref) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/model/ModelAnimTest.glb");
  const meshRefs = useRef<{ [key: string]: THREE.Mesh }>({});
  const { actions, names } = useAnimations(animations, groupRef);
  console.log(names);

  const clonedScene = scene.clone();

  useEffect(() => {
    clonedScene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        const applyMaterialProperties = (material: THREE.Material) => {
          if (material instanceof THREE.MeshStandardMaterial) {
            const newMaterial = new THREE.MeshStandardMaterial();

            newMaterial.transparent = true;
            newMaterial.opacity = 0;
            newMaterial.side = THREE.DoubleSide;
            newMaterial.needsUpdate = true;

            switch (node.name) {
              case "Container":
                newMaterial.color.setHex(0x21242b);
                newMaterial.metalness = 0.1;
                newMaterial.roughness = 0.9;
                newMaterial.envMapIntensity = 1;
                break;

              case "ContainerCircle":
                newMaterial.color.setHex(0x21242b);
                newMaterial.metalness = 0.2;
                newMaterial.roughness = 0.9;
                newMaterial.envMapIntensity = 1;
                break;

              case "Baisse":
              case "Hausse":
                newMaterial.color.setHex(0xc0c0c0);
                newMaterial.metalness = 0.8;
                newMaterial.roughness = 0.2;
                newMaterial.envMapIntensity = 1;
                break;

              case "Indice1":
              case "Indice2":
              case "indice3":
                newMaterial.color.setHex(0xf4f6f7);
                newMaterial.metalness = 0.8;
                newMaterial.roughness = 0.2;
                newMaterial.envMapIntensity = 1;
                break;

              case "On":
                newMaterial.color.setHex(0x21242b);
                newMaterial.metalness = 0.8;
                newMaterial.roughness = 0.2;
                newMaterial.envMapIntensity = 1;
                break;

              case "Bille":
                newMaterial.color.setHex(0xcccccc);
                newMaterial.metalness = 0.7;
                newMaterial.roughness = 0.3;
                newMaterial.envMapIntensity = 0;
                break;

              default:
                newMaterial.color.copy(
                  (material as THREE.MeshStandardMaterial).color
                );
                newMaterial.metalness = 0.8;
                newMaterial.roughness = 0.2;
                newMaterial.envMapIntensity = 1;
            }

            node.material = newMaterial;
          }
        };

        if (Array.isArray(node.material)) {
          node.material = node.material.map(() => {
            const newMat = new THREE.MeshStandardMaterial();
            applyMaterialProperties(newMat);
            return newMat;
          });
        } else {
          applyMaterialProperties(node.material);
        }

        meshRefs.current[node.name] = node;
      }
    });
  }, [clonedScene]);

  useImperativeHandle(ref, () => ({
    getMesh: () => groupRef.current,
    getMeshByName: (name: string) => meshRefs.current[name],
    getAllMeshes: () => meshRefs.current,
    playAnimation: (name: string) => {
      actions[name]?.reset().fadeIn(0.5).play();
    },
    stopAnimation: (name: string) => {
      actions[name]?.fadeOut(0.5).stop();
    },
    getActions: () => actions,
  }));

  return (
    <group ref={groupRef}>
      <primitive
        object={clonedScene}
        position={[0, 0, 0]}
        scale={[40, 40, 40]}
      />
    </group>
  );
});

useGLTF.preload("/model/ModelAnimTest.glb");
