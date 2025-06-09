import { useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { xor } from "three/tsl";

export const Object3DModel = forwardRef((_, ref) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/model/Prototype_IT.glb");
  const meshRefs = useRef<{ [key: string]: THREE.Mesh }>({});

  // Cloner la scène pour éviter les conflits de référence
  const clonedScene = scene.clone();

  useEffect(() => {
    console.log("=== ANALYSE DU MODÈLE 3D ===");
    clonedScene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        console.log(`\nMesh trouvé: "${node.name}"`);
        console.log("UUID:", node.uuid);
        console.log("Type:", node.type);
        
        if (Array.isArray(node.material)) {
          console.log("Matériaux multiples:");
          node.material.forEach((mat, index) => {
            console.log(`- Matériau ${index}:`, {
              type: mat.type,
              uuid: mat.uuid
            });
          });
        } else {
          console.log("Matériau unique:", {
            type: node.material.type,
            uuid: node.material.uuid
          });
        }
        
        const applyMaterialProperties = (material: THREE.Material) => {
          if (material instanceof THREE.MeshStandardMaterial) {
            // Créer un nouveau matériau pour chaque mesh
            const newMaterial = new THREE.MeshStandardMaterial();
            
            // Propriétés de base communes
            newMaterial.transparent = true;
            newMaterial.opacity = 0;
            newMaterial.side = THREE.DoubleSide;
            newMaterial.needsUpdate = true;

            // Appliquer les propriétés spécifiques
            switch(node.name) {
              case 'Container':
                console.log("Appliqué: Container - Noir mat");
                newMaterial.color.setHex(0x21242b);
                newMaterial.metalness = 0.1;
                newMaterial.roughness = 0.9;
                newMaterial.envMapIntensity = 1;
                break;
                
              case 'ContainerCircle':
                console.log("Appliqué: ContainerCircle - Noir mat foncé");
                newMaterial.color.setHex(0x21242b);
                newMaterial.metalness = 0.2;
                newMaterial.roughness = 0.9;
                newMaterial.envMapIntensity = 1;
                break;
                
              case 'Baisse':
              case 'Hausse':
                console.log("Appliqué: Baisse/Hausse - Métal standard");
                newMaterial.color.setHex(0xC0C0C0);
                newMaterial.metalness = 0.8;
                newMaterial.roughness = 0.2;
                newMaterial.envMapIntensity = 1;
                break;
                
              case 'Indice1':
              case 'Indice2':
              case 'indice3':
                console.log("Appliqué: Indice - Métal standard");
                newMaterial.color.setHex(0xf4f6f7);
                newMaterial.metalness = 0.8;
                newMaterial.roughness = 0.2;
                newMaterial.envMapIntensity = 1;
                break;

                 
              case 'On':
                console.log("Appliqué: Indice - Métal standard");
                newMaterial.color.setHex(0x21242b);
                newMaterial.metalness = 0.8;
                newMaterial.roughness = 0.2;
                newMaterial.envMapIntensity = 1;
                break;
                
              case 'Bille':
                console.log("Appliqué: Bille - Métal brillant");
                newMaterial.color.setHex(0xcccccc);
                newMaterial.metalness = 0.7;
                newMaterial.roughness = 0.3;
                newMaterial.envMapIntensity = 0; // Désactive complètement les reflets HDR
                break;
                
              default:
                console.log(`Non traité: ${node.name}`);
                newMaterial.color.copy((material as THREE.MeshStandardMaterial).color);
                newMaterial.metalness = 0.8;
                newMaterial.roughness = 0.2;
                newMaterial.envMapIntensity = 1;
            }
            
            // Appliquer le nouveau matériau au mesh
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
    console.log("=== FIN ANALYSE ===");
  }, [clonedScene]);

  useImperativeHandle(ref, () => ({
    getMesh: () => groupRef.current,
    getMeshByName: (name: string) => meshRefs.current[name],
    getAllMeshes: () => meshRefs.current
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

// Précharger le modèle pour de meilleures performances
useGLTF.preload("/model/Prototype_IT.glb");
