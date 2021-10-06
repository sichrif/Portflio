import { parsePathData } from './SVGUtils'
import * as THREE from 'three'

export default function Icon3D({ path, color, isCCW, ...props }) {
  // Size and position normalization
  return (
    <group {...props}>
      <SvgPath d={path} color={color} isCCW={isCCW} scale={[1 / 12, -1 / 12, 1 / 12]} position={[-1, 1, 0]} />
    </group>
  )
}

function SvgPath({ d, color = '#000', isCCW = true, ...props }) {
  const path = parsePathData(d)
  const shapes = path.toShapes(isCCW)
  return (
    <group {...props}>
      {shapes.map((shape, i) => (
        <mesh key={i}>
          <shapeBufferGeometry args={[shape]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}
