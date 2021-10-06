import { ShapePath, Vector2 } from 'three'

// Extracted from https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/SVGLoader.js

// Default dots per inch
const defaultDPI = 90

// Accepted units: 'mm', 'cm', 'in', 'pt', 'pc', 'px'
const defaultUnit = 'px'

export function parsePathData(d) {
  var path = new ShapePath()

  var point = new Vector2()
  var control = new Vector2()

  var firstPoint = new Vector2()
  var isFirstPoint = true
  var doSetFirstPoint = false

  var commands = d.match(/[a-df-z][^a-df-z]*/gi)

  for (var i = 0, l = commands.length; i < l; i++) {
    var command = commands[i]

    var type = command.charAt(0)
    var data = command.substr(1).trim()

    if (isFirstPoint === true) {
      doSetFirstPoint = true
      isFirstPoint = false
    }

    switch (type) {
      case 'M':
        var numbers = parseFloats(data)
        for (var j = 0, jl = numbers.length; j < jl; j += 2) {
          point.x = numbers[j + 0]
          point.y = numbers[j + 1]
          control.x = point.x
          control.y = point.y

          if (j === 0) {
            path.moveTo(point.x, point.y)
          } else {
            path.lineTo(point.x, point.y)
          }

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'H':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j++) {
          point.x = numbers[j]
          control.x = point.x
          control.y = point.y
          path.lineTo(point.x, point.y)

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'V':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j++) {
          point.y = numbers[j]
          control.x = point.x
          control.y = point.y
          path.lineTo(point.x, point.y)

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'L':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 2) {
          point.x = numbers[j + 0]
          point.y = numbers[j + 1]
          control.x = point.x
          control.y = point.y
          path.lineTo(point.x, point.y)

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'C':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 6) {
          path.bezierCurveTo(numbers[j + 0], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], numbers[j + 5])
          control.x = numbers[j + 2]
          control.y = numbers[j + 3]
          point.x = numbers[j + 4]
          point.y = numbers[j + 5]

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'S':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 4) {
          path.bezierCurveTo(
            getReflection(point.x, control.x),
            getReflection(point.y, control.y),
            numbers[j + 0],
            numbers[j + 1],
            numbers[j + 2],
            numbers[j + 3]
          )
          control.x = numbers[j + 0]
          control.y = numbers[j + 1]
          point.x = numbers[j + 2]
          point.y = numbers[j + 3]

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'Q':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 4) {
          path.quadraticCurveTo(numbers[j + 0], numbers[j + 1], numbers[j + 2], numbers[j + 3])
          control.x = numbers[j + 0]
          control.y = numbers[j + 1]
          point.x = numbers[j + 2]
          point.y = numbers[j + 3]

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'T':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 2) {
          var rx = getReflection(point.x, control.x)
          var ry = getReflection(point.y, control.y)
          path.quadraticCurveTo(rx, ry, numbers[j + 0], numbers[j + 1])
          control.x = rx
          control.y = ry
          point.x = numbers[j + 0]
          point.y = numbers[j + 1]

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'A':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 7) {
          // skip command if start point == end point
          if (numbers[j + 5] == point.x && numbers[j + 6] == point.y) continue

          var start = point.clone()
          point.x = numbers[j + 5]
          point.y = numbers[j + 6]
          control.x = point.x
          control.y = point.y
          parseArcCommand(path, numbers[j], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], start, point)

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'm':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 2) {
          point.x += numbers[j + 0]
          point.y += numbers[j + 1]
          control.x = point.x
          control.y = point.y

          if (j === 0) {
            path.moveTo(point.x, point.y)
          } else {
            path.lineTo(point.x, point.y)
          }

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'h':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j++) {
          point.x += numbers[j]
          control.x = point.x
          control.y = point.y
          path.lineTo(point.x, point.y)

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'v':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j++) {
          point.y += numbers[j]
          control.x = point.x
          control.y = point.y
          path.lineTo(point.x, point.y)

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'l':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 2) {
          point.x += numbers[j + 0]
          point.y += numbers[j + 1]
          control.x = point.x
          control.y = point.y
          path.lineTo(point.x, point.y)

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'c':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 6) {
          path.bezierCurveTo(
            point.x + numbers[j + 0],
            point.y + numbers[j + 1],
            point.x + numbers[j + 2],
            point.y + numbers[j + 3],
            point.x + numbers[j + 4],
            point.y + numbers[j + 5]
          )
          control.x = point.x + numbers[j + 2]
          control.y = point.y + numbers[j + 3]
          point.x += numbers[j + 4]
          point.y += numbers[j + 5]

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 's':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 4) {
          path.bezierCurveTo(
            getReflection(point.x, control.x),
            getReflection(point.y, control.y),
            point.x + numbers[j + 0],
            point.y + numbers[j + 1],
            point.x + numbers[j + 2],
            point.y + numbers[j + 3]
          )
          control.x = point.x + numbers[j + 0]
          control.y = point.y + numbers[j + 1]
          point.x += numbers[j + 2]
          point.y += numbers[j + 3]

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'q':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 4) {
          path.quadraticCurveTo(point.x + numbers[j + 0], point.y + numbers[j + 1], point.x + numbers[j + 2], point.y + numbers[j + 3])
          control.x = point.x + numbers[j + 0]
          control.y = point.y + numbers[j + 1]
          point.x += numbers[j + 2]
          point.y += numbers[j + 3]

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 't':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 2) {
          var rx = getReflection(point.x, control.x)
          var ry = getReflection(point.y, control.y)
          path.quadraticCurveTo(rx, ry, point.x + numbers[j + 0], point.y + numbers[j + 1])
          control.x = rx
          control.y = ry
          point.x = point.x + numbers[j + 0]
          point.y = point.y + numbers[j + 1]

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'a':
        var numbers = parseFloats(data)

        for (var j = 0, jl = numbers.length; j < jl; j += 7) {
          // skip command if no displacement
          if (numbers[j + 5] == 0 && numbers[j + 6] == 0) continue

          var start = point.clone()
          point.x += numbers[j + 5]
          point.y += numbers[j + 6]
          control.x = point.x
          control.y = point.y
          parseArcCommand(path, numbers[j], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], start, point)

          if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
        }

        break

      case 'Z':
      case 'z':
        path.currentPath.autoClose = true

        if (path.currentPath.curves.length > 0) {
          // Reset point to beginning of Path
          point.copy(firstPoint)
          path.currentPath.currentPoint.copy(point)
          isFirstPoint = true
        }

        break

      default:
        console.warn(command)
    }
    doSetFirstPoint = false
  }

  return path
}

function parseFloats(string) {
  var array = string.split(/[\s,]+|(?=\s?[+\-])/)

  for (var i = 0; i < array.length; i++) {
    var number = array[i]
    // Handle values like 48.6037.7.8
    // TODO Find a regex for this

    if (number.indexOf('.') !== number.lastIndexOf('.')) {
      var split = number.split('.')

      for (var s = 2; s < split.length; s++) {
        array.splice(i + s - 1, 0, '0.' + split[s])
      }
    }

    array[i] = parseFloatWithUnits(number)
  }

  return array
}

function parseFloatWithUnits(string) {
  var theUnit = 'px'

  if (typeof string === 'string' || string instanceof String) {
    for (var i = 0, n = units.length; i < n; i++) {
      var u = units[i]

      if (string.endsWith(u)) {
        theUnit = u
        string = string.substring(0, string.length - u.length)
        break
      }
    }
  }

  var scale = undefined

  if (theUnit === 'px' && defaultUnit !== 'px') {
    // Conversion scale from  pixels to inches, then to default units

    scale = unitConversion['in'][defaultUnit] / defaultDPI
  } else {
    scale = unitConversion[theUnit][defaultUnit]

    if (scale < 0) {
      // Conversion scale to pixels

      scale = unitConversion[theUnit]['in'] * defaultDPI
    }
  }

  return scale * parseFloat(string)
}

function getReflection(a, b) {
  return a - (b - a)
}

function parseArcCommand(path, rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, start, end) {
  if (rx == 0 || ry == 0) {
    // draw a line if either of the radii == 0
    path.lineTo(end.x, end.y)
    return
  }

  x_axis_rotation = (x_axis_rotation * Math.PI) / 180

  // Ensure radii are positive
  rx = Math.abs(rx)
  ry = Math.abs(ry)

  // Compute (x1', y1')
  var dx2 = (start.x - end.x) / 2.0
  var dy2 = (start.y - end.y) / 2.0
  var x1p = Math.cos(x_axis_rotation) * dx2 + Math.sin(x_axis_rotation) * dy2
  var y1p = -Math.sin(x_axis_rotation) * dx2 + Math.cos(x_axis_rotation) * dy2

  // Compute (cx', cy')
  var rxs = rx * rx
  var rys = ry * ry
  var x1ps = x1p * x1p
  var y1ps = y1p * y1p

  // Ensure radii are large enough
  var cr = x1ps / rxs + y1ps / rys

  if (cr > 1) {
    // scale up rx,ry equally so cr == 1
    var s = Math.sqrt(cr)
    rx = s * rx
    ry = s * ry
    rxs = rx * rx
    rys = ry * ry
  }

  var dq = rxs * y1ps + rys * x1ps
  var pq = (rxs * rys - dq) / dq
  var q = Math.sqrt(Math.max(0, pq))
  if (large_arc_flag === sweep_flag) q = -q
  var cxp = (q * rx * y1p) / ry
  var cyp = (-q * ry * x1p) / rx

  // Step 3: Compute (cx, cy) from (cx', cy')
  var cx = Math.cos(x_axis_rotation) * cxp - Math.sin(x_axis_rotation) * cyp + (start.x + end.x) / 2
  var cy = Math.sin(x_axis_rotation) * cxp + Math.cos(x_axis_rotation) * cyp + (start.y + end.y) / 2

  // Step 4: Compute θ1 and Δθ
  var theta = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry)
  var delta = svgAngle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry) % (Math.PI * 2)

  path.currentPath.absellipse(cx, cy, rx, ry, theta, theta + delta, sweep_flag === 0, x_axis_rotation)
}

// Units

var units = ['mm', 'cm', 'in', 'pt', 'pc', 'px']

// Conversion: [ fromUnit ][ toUnit ] (-1 means dpi dependent)
var unitConversion = {
  mm: {
    mm: 1,
    cm: 0.1,
    in: 1 / 25.4,
    pt: 72 / 25.4,
    pc: 6 / 25.4,
    px: -1,
  },
  cm: {
    mm: 10,
    cm: 1,
    in: 1 / 2.54,
    pt: 72 / 2.54,
    pc: 6 / 2.54,
    px: -1,
  },
  in: {
    mm: 25.4,
    cm: 2.54,
    in: 1,
    pt: 72,
    pc: 6,
    px: -1,
  },
  pt: {
    mm: 25.4 / 72,
    cm: 2.54 / 72,
    in: 1 / 72,
    pt: 1,
    pc: 6 / 72,
    px: -1,
  },
  pc: {
    mm: 25.4 / 6,
    cm: 2.54 / 6,
    in: 1 / 6,
    pt: 72 / 6,
    pc: 1,
    px: -1,
  },
  px: {
    px: 1,
  },
}

function svgAngle(ux, uy, vx, vy) {
  var dot = ux * vx + uy * vy
  var len = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy)
  var ang = Math.acos(Math.max(-1, Math.min(1, dot / len))) // floating point precision, slightly over values appear
  if (ux * vy - uy * vx < 0) ang = -ang
  return ang
}
