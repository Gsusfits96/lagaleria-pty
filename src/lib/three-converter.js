import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

/**
 * Converts a 2D image (URL or Base64) to a 3D canvas model (.glb format)
 * using Three.js and GLTFExporter.
 * 
 * @param {string} imageUrl - The URL or Base64 string of the image.
 * @param {number} width_cm - Real-world width in cm.
 * @param {number} height_cm - Real-world height in cm.
 * @returns {Promise<Blob>} A promise that resolves to the exported .glb Blob.
 */
export async function convertImageToGLB(imageUrl, width_cm, height_cm) {
  return new Promise((resolve, reject) => {
    // 1. Create Scene
    const scene = new THREE.Scene();

    // 2. Load Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        
        // Convert cm to meters for accurate AR scale
        const w = width_cm / 100;
        const h = height_cm / 100;
        const depth = 0.04; // 4cm canvas thickness

        // 3. Create Geometry (Box)
        const geometry = new THREE.BoxGeometry(w, h, depth);

        // 4. Create Materials
        // Front face: The artwork image
        const frontMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.8,
          metalness: 0.1,
        });

        // Other faces: Black canvas edge
        const edgeMaterial = new THREE.MeshStandardMaterial({
          color: 0x111111,
          roughness: 0.9,
          metalness: 0.0,
        });

        // Box faces order: px, nx, py, ny, pz (front), nz (back)
        const materials = [
          edgeMaterial, // Right
          edgeMaterial, // Left
          edgeMaterial, // Top
          edgeMaterial, // Bottom
          frontMaterial, // Front
          edgeMaterial, // Back
        ];

        // 5. Create Mesh
        const mesh = new THREE.Mesh(geometry, materials);
        scene.add(mesh);

        // 6. Export to GLB
        const exporter = new GLTFExporter();
        exporter.parse(
          scene,
          (gltfBuffer) => {
            // the result is an ArrayBuffer when binary: true
            const blob = new Blob([gltfBuffer], { type: "model/gltf-binary" });
            resolve(blob);
          },
          (error) => {
            console.error("Error exporting GLB:", error);
            reject(error);
          },
          { binary: true } // Export as binary .glb
        );
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
        reject(error);
      }
    );
  });
}
