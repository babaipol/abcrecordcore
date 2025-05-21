/**
 * ABCRecordCore Waveform Visualization
 * Creates a 3D waveform visualization for the hero section
 */

document.addEventListener('DOMContentLoaded', () => {
    const waveformContainer = document.getElementById('waveformVisualization');
    
    if (!waveformContainer) return;
    
    // Check if we should use canvas or WebGL based on browser support
    const useWebGL = (() => {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    })();
    
    // Canvas-based 2D waveform as fallback
    if (!useWebGL) {
        createCanvasWaveform(waveformContainer);
    } else {
        createWebGLWaveform(waveformContainer);
    }
});

/**
 * Creates a 2D canvas waveform visualization
 * @param {HTMLElement} container - The container element for the waveform
 */
function createCanvasWaveform(container) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    container.appendChild(canvas);
    
    // Set canvas size
    const resize = () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Generate wave data
    const waveCount = 3; // Number of waves
    const waves = [];
    
    for (let i = 0; i < waveCount; i++) {
        waves.push({
            amplitude: (i + 1) * 15, // Height of the wave
            frequency: 0.005 / (i + 1), // Frequency
            speed: 0.1 - (i * 0.02), // Speed of movement
            phase: Math.random() * Math.PI * 2, // Starting position
            color: `rgba(138, 43, 226, ${0.3 - (i * 0.1)})` // Color with decreasing opacity
        });
    }
    
    // Animation variables
    let animationFrame;
    let time = 0;
    
    // Draw function
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const centerY = canvas.height / 2;
        
        // Draw each wave
        waves.forEach(wave => {
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            
            for (let x = 0; x < canvas.width; x++) {
                const y = Math.sin((x * wave.frequency) + wave.phase + time * wave.speed) * wave.amplitude;
                ctx.lineTo(x, centerY + y);
            }
            
            // Complete the wave by drawing to the bottom and back to start
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            
            ctx.fillStyle = wave.color;
            ctx.fill();
        });
        
        time += 0.05;
        animationFrame = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Cleanup function
    return () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener('resize', resize);
    };
}

/**
 * Creates a WebGL-based 3D waveform visualization
 * @param {HTMLElement} container - The container element for the waveform
 */
function createWebGLWaveform(container) {
    // This is a simplified version that would normally use Three.js or another WebGL library
    // We're simulating the effect with a canvas animation for the demo
    
    // Create particle container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    container.appendChild(particlesContainer);
    
    // Create animated particles
    const particleCount = 150;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 5 + 2;
        const depth = Math.random();
        const speed = Math.random() * 1.5 + 0.5;
        const delay = Math.random() * 2;
        
        // Create particle style
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(138, 43, 226, ${0.2 + (depth * 0.3)});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            z-index: ${Math.floor(depth * 10)};
            opacity: ${0.3 + (depth * 0.7)};
            animation: particle-float ${5 - (speed * 2)}s ease-in-out infinite;
            animation-delay: -${delay}s;
            box-shadow: 0 0 ${8 + (depth * 8)}px rgba(138, 43, 226, ${0.2 + (depth * 0.4)});
        `;
        
        particles.push(particle);
        particlesContainer.appendChild(particle);
    }
    
    // Create keyframe animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(10px);
            }
            50% {
                transform: translateY(10px) translateX(-15px);
            }
            75% {
                transform: translateY(15px) translateX(8px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Also add a canvas waveform at the bottom for the full effect
    const canvasContainer = document.createElement('div');
    canvasContainer.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40%;
        overflow: hidden;
    `;
    container.appendChild(canvasContainer);
    
    // Create the canvas waveform at the bottom
    createCanvasWaveform(canvasContainer);
    
    // Cleanup function would normally remove event listeners and stop animations
    return () => {
        particles.forEach(p => p.remove());
        style.remove();
    };
}
