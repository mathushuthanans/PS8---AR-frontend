<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AR PM2.5 Scene</title>
    <!-- Tailwind CSS CDN for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
            },
          },
        },
      };
    </script>
    <!-- A-Frame and AR.js CDNs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aframe/1.5.0/aframe.min.js"></script>
    <!-- Note: AR.js is often included after A-Frame. Ensure the correct version/CDN for your use case. -->
    <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>

    <!-- React and ReactDOM CDNs (for using React components within HTML) -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <!-- Babel CDN for JSX transformation in the browser (for demonstration purposes) -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>
        body { margin: 0; overflow: hidden; font-family: 'Inter', sans-serif; }
        /* A-Frame scene styles to ensure it covers the whole viewport */
        a-scene {
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
        }
    </style>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div id="root" class="w-full h-screen relative"></div>

    <script type="text/babel">
        // Ensure THREE is available from A-Frame
        const THREE = window.THREE || (typeof AFRAME !== 'undefined' && AFRAME.THREE);

        // React component for the AR Scene
        function ARScene({ pm25 }) {
            const sceneRef = React.useRef(null);
            const hasInitialized = React.useRef(false);
            const [message, setMessage] = React.useState('');
            const messageTimeoutRef = React.useRef(null);

            // Function to show a temporary message on screen
            const showMessage = React.useCallback((text, duration = 3000) => {
                setMessage(text);
                if (messageTimeoutRef.current) {
                    clearTimeout(messageTimeoutRef.current);
                }
                messageTimeoutRef.current = setTimeout(() => {
                    setMessage('');
                }, duration);
            }, []);

            // Effect to initialize the AR scene and molecule spawning
            React.useEffect(() => {
                // Prevent re-initialization on re-renders
                if (hasInitialized.current) return;
                hasInitialized.current = true;

                const sceneEl = sceneRef.current;
                if (!sceneEl) {
                    console.error("A-Frame scene element not found.");
                    return; // Ensure scene element is available
                }

                const parent = sceneEl.querySelector('#particles');
                const camera = sceneEl.querySelector('a-camera');

                if (!parent || !camera) {
                    console.error("Required A-Frame entities (particles or camera) not found.");
                    return;
                }

                // Function to create a single molecule A-Frame entity
                const createMolecule = (pmValue) => {
                    const molecule = document.createElement('a-entity');

                    // Center sphere
                    const center = document.createElement('a-sphere');
                    center.setAttribute('radius', '0.02');
                    center.setAttribute('color', randomGradientColor());
                    center.setAttribute('position', '0 0 0');
                    molecule.appendChild(center);

                    // Left sphere
                    const left = document.createElement('a-sphere');
                    left.setAttribute('radius', '0.01');
                    left.setAttribute('color', randomGradientColor());
                    left.setAttribute('position', '-0.04 0 0');
                    molecule.appendChild(left);

                    // Right sphere
                    const right = document.createElement('a-sphere');
                    right.setAttribute('radius', '0.01');
                    right.setAttribute('color', randomGradientColor());
                    right.setAttribute('position', '0.04 0 0');
                    molecule.appendChild(right);

                    // Add rotation animation to the molecule
                    molecule.setAttribute('animation__rot', 'property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear');
                    // Add the custom random-drift component for movement
                    molecule.setAttribute('random-drift', '');

                    // Add click listener to show PM2.5 info
                    molecule.addEventListener('click', () => {
                        showMessage(`PM2.5 = ${pmValue} µg/m³`);
                    });

                    return molecule;
                };

                // Function to generate a random grayscale color
                const randomGradientColor = () => {
                    const lightness = Math.random() * 60; // Random lightness between 0 and 60
                    return `hsl(0, 0%, ${lightness}%)`; // Grayscale color
                };

                // Initial burst of molecules in a sphere around the user
                // The count of molecules is based on pm25 value for visual representation
                const initialCount = Math.min(Math.floor(Math.pow(pm25, 1.3)), 200); // Cap initial count
                for (let i = 0; i < initialCount; i++) {
                    const molecule = createMolecule(pm25);
                    
                    // Spawn within a spherical area around the camera
                    const distance = 2 + Math.random() * 4; // Distance from 2 to 6 meters
                    const theta = Math.random() * 2 * Math.PI; // Azimuthal angle
                    const phi = Math.acos(2 * Math.random() - 1); // Polar angle for even distribution on sphere
                    
                    // Convert spherical to Cartesian coordinates
                    const x = distance * Math.sin(phi) * Math.cos(theta);
                    const y = distance * Math.sin(phi) * Math.sin(theta);
                    const z = distance * Math.cos(phi);
                    
                    molecule.setAttribute('position', `${x} ${y} ${z}`);
                    if (parent) parent.appendChild(molecule);
                }

                // Continuous spawning of molecules
                const interval = setInterval(() => {
                    // Ensure camera and parent exist before trying to spawn
                    if (!camera || !camera.object3D || !parent) return;

                    const molecule = createMolecule(pm25);
                    
                    // Spawn within a spherical area around the camera
                    const distance = 2 + Math.random() * 4;
                    const theta = Math.random() * 2 * Math.PI;
                    const phi = Math.acos(2 * Math.random() - 1);
                    
                    const x = distance * Math.sin(phi) * Math.cos(theta);
                    const y = distance * Math.sin(phi) * Math.sin(theta);
                    const z = distance * Math.cos(phi);
                    
                    molecule.setAttribute('position', `${x} ${y} ${z}`);
                    parent.appendChild(molecule);

                    // Limit the total number of molecules in the scene for performance
                    if (parent.children.length > 300) { // Keep max molecules around 300
                        parent.removeChild(parent.children[0]); // Remove the oldest molecule
                    }
                }, 1000); // Spawn a new molecule every second

                // Cleanup function: clear the interval when the component unmounts
                return () => {
                    clearInterval(interval);
                    if (messageTimeoutRef.current) {
                        clearTimeout(messageTimeoutRef.current);
                    }
                    // Remove all children from the parent when component unmounts
                    if (parent) {
                        while (parent.firstChild) {
                            parent.removeChild(parent.firstChild);
                        }
                    }
                };
            }, [pm25, showMessage]); // Re-run effect if pm25 changes

            return (
                <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
                    {/* A-Frame Scene */}
                    <a-scene
                        ref={sceneRef}
                        embedded // Makes the scene fit within the HTML document, not full screen
                        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;" // AR.js configuration
                        renderer="antialias: true; colorManagement: true;" // Renderer settings for better quality
                    >
                        {/* Entity to hold all the particle molecules */}
                        <a-entity id="particles"></a-entity>

                        {/* Camera setup */}
                        <a-camera 
                            fov="80" // Wide field of view for a more immersive experience
                            position="0 1.6 0" // Initial camera position (e.g., eye level)
                            wasd-controls-enabled="false" // Disable keyboard WASD controls
                            // The look-controls component allows camera rotation via mouse (desktop) or touch (mobile)
                            // pointerLockEnabled: true locks the cursor for continuous looking on desktop
                        >
                            <a-entity look-controls="pointerLockEnabled: true"></a-entity>
                        </a-camera>
                    </a-scene>

                    {/* Custom Message Box for PM2.5 Info */}
                    {message && (
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-gray-800 bg-opacity-70 text-white px-5 py-2 rounded-lg z-[2000] text-lg text-center pointer-events-none">
                            {message}
                        </div>
                    )}
                </div>
            );
        }

        // AFRAME Custom Component: random-drift
        // This component makes molecules slowly drift around their origin point.
        // It checks if the component is already registered to prevent errors on hot reloads.
        if (typeof AFRAME !== 'undefined' && !AFRAME.components['random-drift']) {
            AFRAME.registerComponent('random-drift', {
                schema: {
                    maxDistance: { type: 'number', default: 1.5 } // Maximum distance a molecule can drift from its origin
                },

                init() {
                    // Store the initial position of the molecule as its origin
                    this.origin = this.el.object3D.position.clone();
                    // Initialize a random velocity for each axis
                    this.velocity = {
                        x: (Math.random() - 0.5) * 0.0005, // Small random velocity
                        y: (Math.random() - 0.5) * 0.0005,
                        z: (Math.random() - 0.5) * 0.0005
                    };
                },

                tick(time, deltaTime) {
                    const pos = this.el.object3D.position; // Get the current position of the entity
                    const dt = deltaTime || 16; // Use deltaTime for frame-rate independent movement

                    // Update position based on velocity and delta time
                    pos.x += this.velocity.x * dt;
                    pos.y += this.velocity.y * dt;
                    pos.z += this.velocity.z * dt;

                    // Calculate the offset from the original spawning point
                    const offset = {
                        x: pos.x - this.origin.x,
                        y: pos.y - this.origin.y,
                        z: pos.z - this.origin.z
                    };

                    const { maxDistance } = this.data;

                    // Reverse velocity if molecule drifts too far from its origin on any axis
                    if (Math.abs(offset.x) > maxDistance) this.velocity.x *= -1;
                    if (Math.abs(offset.y) > maxDistance) this.velocity.y *= -1;
                    if (Math.abs(offset.z) > maxDistance) this.velocity.z *= -1;
                }
            });
        }

        // Render the ARScene component into the 'root' div
        // You can set the pm25 value here
        const pm25Value = 50; // Example PM2.5 value, you can change this

        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <ARScene pm25={pm25Value} />
            </React.StrictMode>
        );
    </script>
</body>
</html>
