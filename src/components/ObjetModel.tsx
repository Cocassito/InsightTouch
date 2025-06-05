import { useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Object3DModel = forwardRef((_, ref) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/model/Prototype_IT.glb");
  const meshRefs = useRef<{ [key: string]: THREE.Mesh }>({});

  // Fonction pour parcourir récursivement la scène et stocker les références
  const traverseScene = (object: THREE.Object3D) => {
    if (object instanceof THREE.Mesh) {
      meshRefs.current[object.name] = object;
      // Log pour identifier les noms des meshes disponibles
      console.log("Found mesh:", object.name);
    }
    object.children.forEach(traverseScene);
  };

  useEffect(() => {
    if (groupRef.current) {
      traverseScene(groupRef.current);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    getMesh: () => groupRef.current,
    // Ajouter une méthode pour accéder à un mesh spécifique
    getMeshByName: (name: string) => meshRefs.current[name],
    // Ajouter une méthode pour obtenir tous les meshes
    getAllMeshes: () => meshRefs.current
  }));

  // Cloner la scène pour éviter les conflits de référence
  const clonedScene = scene.clone();
  
  return (
    <group ref={groupRef}>
      <primitive
        object={clonedScene}
        position={[0, 0, 0]}
        scale={[100, 100, 100]}
      />
    </group>
  );
});

// Précharger le modèle pour de meilleures performances
useGLTF.preload("/model/Prototype_IT.glb");
