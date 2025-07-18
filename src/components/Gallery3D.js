import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./Gallery3D.css";

const IMAGES = [
  // Replace these URLs with your actual artwork
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c"
];

export default function Gallery3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    let width = mountRef.current.clientWidth;
    let height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#191c24");
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Cascade arrangement
    const group = new THREE.Group();
    IMAGES.forEach((url, i) => {
      const texture = new THREE.TextureLoader().load(url);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const geometry = new THREE.PlaneGeometry(3, 2);
      const mesh = new THREE.Mesh(geometry, material);
      // Cascade in 3D
      mesh.position.x = (i % 3 - 1) * 4;
      mesh.position.y = (1 - Math.floor(i / 3)) * 3;
      mesh.position.z = -i * 0.5;
      mesh.rotation.y = ((i % 2) - 0.5) * 0.3;
      group.add(mesh);
    });
    scene.add(group);

    // Animation
    let frameId;
    const animate = () => {
      group.rotation.y += 0.003;
      group.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <div className="gallery3d-container" ref={mountRef} />
  );
}
