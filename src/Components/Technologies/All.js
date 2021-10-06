import { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { OrbitControls, ContactShadows, Sphere } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { useGesture } from 'react-use-gesture'
import styled from 'styled-components'
import {mdiLaravel ,mdiAndroidStudio ,mdiReact, mdiGithub,mdiAngular, mdiVuejs , mdiGit,mdiDatabase, mdiNodejs, mdiBootstrap, mdiLanguageJava } from '@mdi/js'
import Icon3D from './Icon3D'

// You can use any icon from @mdi/js:
const icons = [
  { path: mdiLaravel, color: '#f72c1f' },
  { path: mdiAndroidStudio, color: '#88bb56' },
  { path: mdiVuejs, color: '#41b783' },
  { path: mdiAngular, color: 'red' },
  { path: mdiReact, color: '#61dafb' },
  { path: mdiGithub, color: '#000' },
  { path: mdiGit, color: '#f05030' },
  { path: mdiDatabase, color: '#f05030' },
  { path: mdiNodejs, color: 'green' },
  { path: mdiLanguageJava, color: '#4288c7' },
]

export default function All() {
  // For centering list of icons
  const idxMiddle = (icons.length - 1) / 2
  return (
    <allstyle>

    <Canvas colorManagement={false} camera={{ position: [0, 1, 10] }}>
      <ambientLight intensity={[0.2]} />
      <pointLight position={[2, 2, 2]} />
      <OrbitControls />
      {icons.map((props, i) => (
        <AnimatedIcon key={i} {...props} position-x={(i - idxMiddle) * 2} />
      ))}
      <ContactShadows rotation-x={Math.PI / 2} position={[0, -1.5, 0]} opacity={0.4} width={10} height={10} blur={2} far={1.5} />
    </Canvas>
    </allstyle>
  )
}

function AnimatedIcon({ path, color, invert = false, ...props }) {
  const [spins, setSpins] = useState(0)
  const spring = useSpring({ rotation: [0, spins * Math.PI, 0] })
  const canSpin = useRef(false)
  const bind = useGesture({
    onMove: ({ vxvy: [vx] }) => {
      if (canSpin.current && vx !== 0) {
        setSpins(spins + Math.sign(vx))
        canSpin.current = false
      }
    },
    onPointerOver: () => (canSpin.current = true),
  })
  return (
    <a.group {...spring} {...bind()} {...props}>
      <Turntable>
        <Float amplitude={0.3} speed={2}>
          <Icon3D path={path} color={color} isCCW={!invert} />
          {/* Transparent sphere to generate a shadow */}
          <Sphere args={[1, 4, 32]} scale-z={0.1}>
            <meshStandardMaterial opacity={0} transparent />
          </Sphere>
          {/* Bounding sphere for events */}
          <Sphere visible={false} />
        </Float>
      </Turntable>
    </a.group>
  )
}

// Slowly spin around
function Turntable(props) {
  const ref = useRef()
  useFrame((_, delta) => (ref.current.rotation.y += delta))
  return <group ref={ref} {...props} />
}

// Float up and down
function Float({ speed = 1, amplitude = 1, ...props }) {
  const ref = useRef()
  useFrame(({ clock }) => (ref.current.position.y = amplitude * Math.sin(clock.elapsedTime * speed)))
  return <group ref={ref} {...props} />
}


const allstyle = styled(All)`
html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: radial-gradient(white, #ddd);
}

`;