<template>
  <section id="overview">
    <div class="title-block gutter" ref="collide1">
      <h2 class="pad-t pre">{{ title }}</h2>
    </div>
    <canvas id="omoeba" ref="omoeba" width="1920" height="1080"></canvas>
    <div class="text-block" ref="collide2">
      <h3>{{ subtitle }}</h3>
      <div class="copy fs-p3">
        <p class="pre">{{ copy }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap';
import { useCardinalSpline } from '@/utils/spline.js';

// Globals
const omoeba = ref(null),
      collide1 = ref(null),
      collide2 = ref(null),
      numSegments = 18,
      segment = 360 / numSegments;

let ctx = null,
    cp = {
      'x': 960,
      'y': 540
    },
    points = [],
    tweens = [],
    raf = null,
    rotate = {
      'to': 0
    },
    scale = 1,
    constraints = [],
    tween_loop = 0;

// Props
const props = defineProps({
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  copy: {
    type: String
  }
});

// Mounted
onMounted(() => {
  // Spline Proto
  useCardinalSpline();

  // Canvas Settings
  ctx = omoeba.value.getContext('2d');
  ctx.globalCompositeOperation = 'xor';
  ctx.fillStyle = '#ff5501';

  // Listen
  window.addEventListener('resize', onResize);

  // Kick the tires and light the fires
  setTimeout(() => {
    // Resize
    window.dispatchEvent(new Event('resize'));

    // Initial Points
    points = randomizeAmplitudes();

    // Tween
    tween();

    // Render
    raf = requestAnimationFrame(render);
  }, 0);
});

// Unmount
onBeforeUnmount(() => {
  // Remove resize event listener
  window.removeEventListener('resize', onResize);

  // Cancel render
  window.cancelAnimationFrame(raf);

  // Kill tweens
  for(let i = 0; i < points.length; i++) {
    // Kill
    if(tweens[i]) {
      tweens[i].t1.kill();
      tweens[i].t2.kill();
      tweens[i].t3.kill();
    }
  }

  // Cancel tween loop
  clearTimeout(tween_loop);
});

function randomizeAmplitudes() {
  let amplitudes = [];

  // Rotation
  rotate.to += (Math.random() * 14) - 7;

  // New random amplitudes in the defined range
  for(let i = 0; i < numSegments; i++) {
    const r = (i * segment) + rotate.to,
          s = 10 * scale,
          v1 = constrain(r, (Math.random() * 100) + 400);

    amplitudes.push({
      'p1': v1,
      'p2': v1 - ((Math.random() * s) + 10),
      'r': r
    });
  }

  return amplitudes;
}

function getPoint(rotation, amplitude) {
  // Triangulate
  let x = amplitude * Math.sin(rotation * (Math.PI / 180)) + cp.x,
      y = amplitude * Math.cos(rotation * (Math.PI / 180)) + cp.y;

  return {x, y};
}

function constrain(rotation, amplitude) {
  let constrainedAmplitude = amplitude;

  // Check collisions and constrain
  const p = getPoint(rotation, amplitude),
        ip1 = lineIntersectsRect(cp.x, cp.y, p.x, p.y, constraints[0].x1, constraints[0].y1, constraints[0].x2, constraints[0].y2),
        ip2 = lineIntersectsRect(cp.x, cp.y, p.x, p.y, constraints[1].x1, constraints[1].y1, constraints[1].x2, constraints[1].y2);

  if(ip1) constrainedAmplitude = lineLength(cp.x, cp.y, ip1.x, ip1.y) + 1;
  if(ip2) constrainedAmplitude = lineLength(cp.x, cp.y, ip2.x, ip2.y) + 1;

  return constrainedAmplitude;
}

function lineIntersectsRect(x1, y1, x2, y2, rx1, ry1, rx2, ry2) {
  // Check each side of the rectangle
  let left = lineIntersectsLine(x1, y1, x2, y2, rx1, ry1, rx1, ry2);
  let right = lineIntersectsLine(x1, y1, x2, y2, rx2, ry1, rx2, ry2);
  let top = lineIntersectsLine(x1, y1, x2, y2, rx1, ry1, rx2, ry1);
  let bottom = lineIntersectsLine(x1, y1, x2, y2, rx1, ry2, rx2, ry2);

  // Return the first intersection point found
  if (left) return left;
  if (right) return right;
  if (top) return top;
  if (bottom) return bottom;

  // No intersection
  return null;
}

function lineIntersectsLine(x1, y1, x2, y2, x3, y3, x4, y4) {
  // Calculate the denominator
  let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  // Lines are parallel
  if (den === 0) {
    return null;
  }

  // Calculate the intersection point
  let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
  let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

  // Check if the intersection point lies on both line segments
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1)
    };
  } else {
    return null;
  }
}

function lineLength(x1, y1, x2, y2) {
  // Calculate the difference in x and y coordinates
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  // Use the Pythagorean theorem to calculate the length of the line
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function tween() {
  // New targets
  const amplitudes = randomizeAmplitudes();

  for(let i = 0; i < points.length; i++) {
    // Kill
    if(tweens[i]) {
      tweens[i].t1.kill();
      tweens[i].t2.kill();
      tweens[i].t3.kill();
    }

    // Tween
    tweens[i] = {
      t1: gsap.to(points[i], {p1: amplitudes[i].p1, ease: 'none', duration: 2}),
      t2: gsap.to(points[i], {p2: amplitudes[i].p2, ease: 'none', duration: 2}),
      t3: gsap.to(points[i], {r: amplitudes[i].r, ease: 'none', duration: 2})
    }
  }

  // Loop
  tween_loop = setTimeout(() => {
    tween();
  }, 2000);
}

function render() {
  // Loop
  raf = requestAnimationFrame(render);

  // Clear
  ctx.clearRect(0, 0, omoeba.value.width, omoeba.value.height);

  // Points
  let outsetPoints = [],
      insetPoints = [];

  for(let i = 0; i < points.length; i++) {
    let p1 = getPoint(points[i].r, points[i].p1),
        p2 = getPoint(points[i].r, points[i].p2);

    outsetPoints.push(p1.x, p1.y);
    insetPoints.push(p2.x, p2.y);

    // TEST
    // ctx.beginPath();
    // ctx.moveTo(cp.x, cp.y);
    // ctx.lineTo(p1.x, p1.y);
    // ctx.stroke();
  }

  // Outer
  let shape1 = new Path2D();
  shape1.curve(outsetPoints, 0.666, 10, true);
  ctx.fill(shape1);

  // Inner
  let shape2 = new Path2D();
  shape2.curve(insetPoints, 0.666, 10, true);
  ctx.fill(shape2);
}

function onResize(e) {
  scale = 1920 / omoeba.value.getBoundingClientRect().width;
  constraints = [
    {
      x1: (collide1.value.getBoundingClientRect().left - omoeba.value.getBoundingClientRect().left) * scale,
      y1: (collide1.value.getBoundingClientRect().top - omoeba.value.getBoundingClientRect().top) * scale,
      x2: (collide1.value.getBoundingClientRect().right - omoeba.value.getBoundingClientRect().left) * scale,
      y2: (collide1.value.getBoundingClientRect().bottom - omoeba.value.getBoundingClientRect().top) * scale
    },
    {
      x1: (collide2.value.getBoundingClientRect().left - omoeba.value.getBoundingClientRect().left) * scale,
      y1: (collide2.value.getBoundingClientRect().top - omoeba.value.getBoundingClientRect().top) * scale,
      x2: (collide2.value.getBoundingClientRect().right - omoeba.value.getBoundingClientRect().left) * scale,
      y2: (collide2.value.getBoundingClientRect().bottom - omoeba.value.getBoundingClientRect().top) * scale
    },
  ];
}
</script>

<style lang='scss'>
section#overview {
  width: 100%;
  padding-bottom: span(2);
  overflow: hidden;

  .title-block {
    padding-bottom: $space-s;
    display: flex;
    //border: 1px solid #f00;
  }

  #omoeba {
    width: 100%;
    height: auto;
    margin-top: span(-1);
    display: flex;
  }

  .text-block {
    width: calc(#{span(13)} - #{$space-s});
    margin: span(-1) auto 0px $space-s;
    padding: span(0.5) 0 0 0;
    display: flex;
    flex-direction: column;
    //border: 1px solid #f00;

    .copy {
      p {
        margin-top: $space-m;
      }
    }
  }

  @include respond-to($small-tablet) {
    .text-block {
      width: auto;
      margin: span(-1) span(1) 0px span(2.5);
      padding: span(0.5) 0 0 span(0.5);
      display: flex;
      flex-direction: column;

      .copy {
        p {
          margin-top: $space-m;
        }
      }
    }
  }

  @include respond-to($tablet) {
    padding-bottom: span(1);

    .title-block {
      h2 {
        width: span(10);
      }
    }

    .text-block {
      margin: span(-1) span(1) 0px span(6.5);
    }
  }

  @include respond-to($large-tablet) {
    #omoeba {
      margin-top: span(-1.5);
    }

    .text-block {
      margin: span(-1.5) span(1) 0px span(6.5);
    }
  }

  @include respond-to($desktop) {
    .text-block {
      margin: span(-1.75) span(1) 0px span(6.5);
    }
  }

  @include respond-to($average-desktop) {
    .title-block {
      h2 {
        width: span(8);
      }
    }

    #omoeba {
      margin-top: span(-1.75);
    }

    .text-block {
      margin: span(-1.5) span(1) 0px span(7.5);
    }
  }

  @include respond-to($macbook) {
    #omoeba {
      margin-top: span(-1.25);
    }
  }
}
</style>
